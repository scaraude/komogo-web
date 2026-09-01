// Service worker d'auto-destruction : la PWA est retirée au profit de l'app
// native. Il remplace l'ancien SW chez tous les visiteurs, se désinscrit et
// recharge les onglets pour sortir de l'ancien cache. Le claim() est requis :
// sans lui les onglets restent contrôlés par l'ancien worker et matchAll ne
// retourne rien. À conserver tel quel tant que des navigateurs peuvent encore
// porter l'ancien service worker.
self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      await self.clients.claim()
      await self.registration.unregister()
      const clients = await self.clients.matchAll({ type: 'window' })
      for (const client of clients) client.navigate(client.url)
    })()
  )
})
