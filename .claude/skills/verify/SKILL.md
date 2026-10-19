---
name: verify
description: Vérifier un changement de komogo-web en vrai (build de prod + e2e Playwright), en FR/EN et sur Android/iPhone/desktop.
---

# Vérifier komogo-web

`komogo.fr` est une passerelle vers l'app native (cf. README) : landing,
interstitiel `/e/[slug]`, `/auth/confirm`, pages légales. Rien à créer ni à
semer, on vérifie le rendu.

## Lancer

```bash
pnpm build && PORT=3123 pnpm start &
pnpm exec playwright install --only-shell chromium   # une fois par version de Playwright
BASE_URL=http://localhost:3123 TEST_EVENT_SLUG=<slug> node test-e2e.mjs
```

- Build de prod, pas `pnpm dev` : certaines erreurs (props non sérialisables
  passées à un Client Component, par exemple) ne sortent qu'au rendu de prod.
- `TEST_EVENT_SLUG` : un Komo existant, le même que le secret GitHub. Sans lui,
  l'interstitiel et l'image OG ne sont pas testés.

## Au-delà de test-e2e.mjs

Quand le changement dépend de la langue ou de la plateforme, piloter Playwright
dans un script du scratchpad (`require('<repo>/node_modules/playwright')`) :

- Langue : `browser.newContext({ locale: 'en-US' })`, le site lit `Accept-Language`.
- Plateforme : `userAgent` Android / iPhone / desktop (`detectPlatform` dans `lib/store.ts`),
  viewport `{ width: 400, height: 850 }`.
- Sur Android, l'interstitiel et `/auth/confirm` redirigent vers `komogo://` :
  neutraliser `window.location.replace` via `context.addInitScript` pour garder
  la page inspectable.
- Ignorer les 404 sur `/_vercel/insights` et `/_vercel/speed-insights` : ces
  scripts n'existent qu'une fois déployé.

## Pièges

- Lecture seule : la base Supabase est partagée avec l'app native, ne rien y
  écrire.
- Une page d'erreur répond parfois 200 : vérifier le contenu affiché, pas
  seulement le statut HTTP.
