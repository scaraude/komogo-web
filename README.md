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

Le site partage le projet Supabase de l'app, mais `anon` n'a aucun droit sur les tables. L'unique lecture est la RPC `security definer` `get_event_preview(p_slug)` (titre, dates, destination, compte de participants, initiales). Les migrations vivent dans le repo de l'app — celles de `supabase/` ici sont l'historique de l'ancienne web app, elles ne sont plus la source.

## Service worker

`public/sw.js` est un **kill-switch** : l'ancienne PWA installait un service worker chez les visiteurs, celui-ci le remplace, se désinscrit et recharge les onglets. Le garder tant que des navigateurs peuvent encore porter l'ancien.

## Développement

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm typecheck
pnpm test       # vitest (unitaires)
pnpm lint
node test-e2e.mjs   # e2e Playwright contre la prod (BASE_URL et TEST_EVENT_SLUG pour surcharger)
```

Variables d'env : voir `.env.local.example` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`).

## Déploiement

Projet Vercel `komogo-web`, domaine `komogo.fr` (+ `www`). Après tout changement autour des redirections, vérifier :

```bash
curl -I https://komogo.fr/.well-known/assetlinks.json   # 200, sans redirection
```
