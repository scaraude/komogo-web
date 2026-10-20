import { chromium } from 'playwright'

const BASE = process.env.BASE_URL ?? 'https://www.komogo.fr'
const APEX = BASE.replace('://www.', '://')
const TEST_EVENT_SLUG = process.env.TEST_EVENT_SLUG
async function run() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ locale: 'fr-FR' })
  const page = await context.newPage()
  const errors = []

  async function check(label, fn) {
    try {
      await fn()
      console.log(`✅ ${label}`)
    } catch (e) {
      console.log(`❌ ${label}: ${e.message}`)
      errors.push(label)
    }
  }

  await check('Landing charge avec la signature', async () => {
    await page.goto(BASE, { waitUntil: 'networkidle' })
    const h1 = await page.textContent('h1')
    if (!h1.trim()) throw new Error('h1 vide')
    const cta = await page.textContent('h2:has-text("Crew. Plan.")')
    if (!cta.includes('Go.')) throw new Error(`signature inattendue: "${cta}"`)
  })

  await check('Lien Google Play présent', async () => {
    const href = await page.getAttribute('a[href*="play.google.com"]', 'href')
    if (!href.includes('fr.komogo.app')) throw new Error(`href inattendu: ${href}`)
  })

  await check('Lien App Store présent', async () => {
    const href = await page.getAttribute('a[href*="apps.apple.com"]', 'href')
    if (!href.includes('id6801566470')) throw new Error(`href inattendu: ${href}`)
  })

  await check('Landing en anglais pour un navigateur anglophone', async () => {
    const englishContext = await browser.newContext({ locale: 'en-US' })
    const englishPage = await englishContext.newPage()
    await englishPage.goto(BASE, { waitUntil: 'networkidle' })
    const main = await englishPage.textContent('main')
    await englishContext.close()
    if (!main.includes('What if the planning actually went well for once?')) throw new Error('titre anglais absent')
  })

  await check('/auth/confirm propose de revenir dans l’app', async () => {
    await page.goto(`${BASE}/auth/confirm?token_hash=e2e&type=magiclink`, { waitUntil: 'networkidle' })
    const h1 = await page.textContent('h1')
    if (h1.trim() !== 'Encore un geste') throw new Error(`h1 inattendu: "${h1}"`)
    const href = await page.getAttribute('a[href^="komogo:"]', 'href')
    if (!href.includes('token_hash=e2e')) throw new Error(`deep link inattendu: ${href}`)
  })

  for (const path of ['/mes-komos', '/connexion']) {
    await check(`${path} redirige vers /`, async () => {
      const res = await fetch(`${BASE}${path}`, { redirect: 'manual' })
      if (res.status !== 308) throw new Error(`status ${res.status}`)
      const location = res.headers.get('location')
      if (new URL(location, BASE).pathname !== '/') throw new Error(`location ${location}`)
    })
  }

  for (const path of ['/confidentialite', '/suppression-compte']) {
    await check(`${path} répond 200`, async () => {
      const res = await fetch(`${BASE}${path}`)
      if (res.status !== 200) throw new Error(`status ${res.status}`)
    })
  }

  await check('assetlinks.json servi sur l’apex sans redirection', async () => {
    const res = await fetch(`${APEX}/.well-known/assetlinks.json`, { redirect: 'manual' })
    if (res.status !== 200) throw new Error(`status ${res.status}`)
    const body = await res.json()
    if (!JSON.stringify(body).includes('fr.komogo.app')) throw new Error('package absent')
  })

  await check('apple-app-site-association servi en 200', async () => {
    const res = await fetch(`${BASE}/.well-known/apple-app-site-association`, { redirect: 'manual' })
    if (res.status !== 200) throw new Error(`status ${res.status}`)
  })

  await check('Slug inconnu répond 404', async () => {
    const res = await fetch(`${BASE}/e/slug-inexistant-e2e`)
    if (res.status !== 404) throw new Error(`status ${res.status}`)
  })

  if (TEST_EVENT_SLUG) {
    await check('Interstitiel affiche le Komo et le store', async () => {
      await page.goto(`${BASE}/e/${TEST_EVENT_SLUG}`, { waitUntil: 'networkidle' })
      const main = await page.textContent('main')
      if (!main.includes("Ton crew t'invite")) throw new Error('page inattendue (erreur ?)')
      const body = await page.content()
      if (!body.includes('play.google.com')) throw new Error('lien store absent')
      const title = await page.textContent('h1')
      if (!title.trim()) throw new Error('titre vide')
    })

    await check('Image OG répond 200', async () => {
      const res = await fetch(`${BASE}/api/og/${TEST_EVENT_SLUG}`)
      if (res.status !== 200) throw new Error(`status ${res.status}`)
      if (!res.headers.get('content-type')?.includes('image')) throw new Error('pas une image')
    })
  } else {
    console.log('ℹ️ TEST_EVENT_SLUG absent : interstitiel et OG non testés sur un vrai Komo')
  }

  await browser.close()

  console.log('\n' + '─'.repeat(40))
  if (errors.length === 0) {
    console.log('✅ Tous les tests passent !')
  } else {
    console.log(`❌ ${errors.length} test(s) échoué(s): ${errors.join(', ')}`)
    process.exit(1)
  }
}

run()
