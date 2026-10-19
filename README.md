# Komogo Web

Le site `komogo.fr` est une **passerelle vers l'app native Komogo** ([repo `scaraude/komogo`](https://github.com/scaraude/komogo)) — rien d'autre. L'ancienne web app (création d'events, hub complet, PWA) a été démontée : deux implémentations du même produit n'étaient plus tenables, et un invité doit atterrir dans l'app, pas sur un clone web.

## Ce que sert le site

| Route | Rôle |
| --- | --- |
| `/` | Landing unique : pitch, capture de l'app, badge Google Play (iOS « bientôt »), QR code sur desktop. |
| `/e/[slug]` | Interstitiel d'invitation : tentative d'ouverture `komogo://`, titre/dates/destination du Komo, bouton store, lien en clair à recoller après installation. Cible réelle : les webviews in-app (Instagram, Messenger) qui n'honorent pas les App Links. |
| `/api/og/[slug]` | Image Open Graph de l'aperçu riche (WhatsApp & co) — c'est ce qui fait cliquer. |
| `/auth/confirm` | Interstitiel du retour OAuth quand l'app n'a pas intercepté le lien (cf. VIR-145, piste App Link HTTPS). Ne pas supprimer. |
| `/confidentialite`, `/suppression-compte` | Exigées par Apple et Google Play (URL de suppression de compte atteignable sans installer l'app). Ne pas supprimer. |
| `/mes-komos`, `/connexion`, `/e/[slug]/join` | 308 vers la passerelle — anciens favoris et liens. |

## `.well-known/` est intouchable

`public/.well-known/assetlinks.json` (quatre empreintes de signature, dont la post-quantique de Play) et `apple-app-site-association` conditionnent l'ouverture de l'app par les liens `komogo.fr/e/...`. Les supprimer ou les faire passer derrière une redirection casse tous les liens en circulation. La règle de `next.config.ts` qui exclut `/.well-known/` de la redirection apex → www reste strictement telle quelle : Google refuse de suivre une redirection pour `assetlinks.json`.

## Accès aux données

Le site partage le projet Supabase de l'app, mais `anon` n'a aucun droit sur les tables. L'unique lecture est la RPC `security definer` `get_event_preview(p_slug)` (titre, dates, destination, compte de participants, initiales). Les migrations vivent dans le repo de l'app.

## Service worker

`public/sw.js` est un **kill-switch** : l'ancienne PWA installait un service worker chez les visiteurs, celui-ci le remplace, se désinscrit et recharge les onglets. Le garder tant que des navigateurs peuvent encore porter l'ancien.

## Développement

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm typecheck
pnpm test       # vitest (unitaires)
pnpm lint
```

Tests e2e (Playwright) : contre la prod par défaut, `BASE_URL` pour viser un build local, `TEST_EVENT_SLUG` pour tester l'interstitiel sur un vrai Komo.

```bash
pnpm exec playwright install --only-shell chromium   # une fois par version de Playwright
pnpm build && PORT=3123 pnpm start &
BASE_URL=http://localhost:3123 TEST_EVENT_SLUG=<slug> node test-e2e.mjs
TEST_EVENT_SLUG=<slug> ./healthcheck.sh             # healthcheck contre la prod
```

Variables d'env : voir `.env.local.example` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`).

## CI et alertes

- `ci.yml`, sur chaque PR et chaque push sur `main` (les deux checks sont à rendre obligatoires sur `main` : sans merge, Vercel ne déploie pas la prod) :
  - job `check` : lint, typecheck, tests unitaires ;
  - job `e2e` : build de prod, puis `test-e2e.mjs` contre ce build.
- `healthcheck.yml` : `healthcheck.sh` (curl, sans navigateur) contre la prod, après chaque déploiement de prod, toutes les heures et à la demande. Il vérifie que la landing et un interstitiel s'affichent (donc que la RPC `get_event_preview` répond, son schéma vivant dans le repo de l'app) et que les fichiers `.well-known` sont servis sur l'apex. En cas d'échec, une alerte part dans le salon Discord de la CI.

Secrets GitHub :

| Secret | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Build de la CI (mêmes valeurs que `.env.local`). |
| `TEST_EVENT_SLUG` | Slug du Komo de démo de l'équipe, pour l'interstitiel et l'image OG. Chaque appel ajoute une ligne à `event_preview_hits` pour ce Komo : ne jamais y mettre celui d'un utilisateur. |
| `DISCORD_WEBHOOK_URL_KOMOGO_WEB_CI` | Webhook du salon Discord qui reçoit les alertes du healthcheck. |

GitHub désactive les workflows planifiés d'un repo public après 60 jours sans activité : le réactiver dans l'onglet Actions si besoin.

## Déploiement

Projet Vercel `komogo-web`, domaine `komogo.fr` (+ `www`). Après tout changement autour des redirections, vérifier :

```bash
curl -I https://komogo.fr/.well-known/assetlinks.json   # 200, sans redirection
```
