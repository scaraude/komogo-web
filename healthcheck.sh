#!/usr/bin/env bash
# Healthcheck de la prod : quelques requêtes curl, sans navigateur.
#
#   TEST_EVENT_SLUG=<slug> ./healthcheck.sh
#
# Une page d'erreur peut répondre 200 : on cherche du contenu rendu. Les
# marqueurs commencent par « > » pour ne pas matcher les mêmes chaînes dans le
# payload RSC, où elles apparaissent entre guillemets.
set -uo pipefail

BASE="${BASE_URL:-https://www.komogo.fr}"
APEX="${BASE/:\/\/www./://}"
ERROR_PAGE='>(Aïe, ça a coincé|Oops, something got stuck)<'
body=$(mktemp)
failures=0

check() {
  local label=$1 url=$2 marker=$3 status
  status=$(curl -sS -o "$body" -w '%{http_code}' -H 'Accept-Language: fr' "$url") || status=000
  if [ "$status" = 200 ] && grep -qF -- "$marker" "$body" && ! grep -qE "$ERROR_PAGE" "$body"; then
    echo "✅ $label"
  else
    echo "❌ $label : HTTP $status sur $url"
    failures=$((failures + 1))
  fi
}

check 'Landing' "$BASE/" '>Crew. Plan.'
if [ -n "${TEST_EVENT_SLUG:-}" ]; then
  # Passe par la RPC get_event_preview, dont le schéma vit dans le repo de l'app.
  check 'Interstitiel d’invitation' "$BASE/e/$TEST_EVENT_SLUG" '>Ton crew t'
else
  echo "❌ TEST_EVENT_SLUG absent"
  failures=$((failures + 1))
fi
# App Links et Universal Links : servis sur l'apex en 200, sans redirection.
check 'assetlinks.json sur l’apex' "$APEX/.well-known/assetlinks.json" 'fr.komogo.app'
check 'apple-app-site-association sur l’apex' "$APEX/.well-known/apple-app-site-association" 'fr.komogo.app'

rm -f "$body"
exit $((failures > 0))
