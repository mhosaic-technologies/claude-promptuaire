---
name: maj-optimisation
description: Enrichit et met à jour l'onglet « Optimiser les tokens » (économie de tokens, routage des modèles, cache, outils, mesure & budget) dans docs/06 + web/data.js (section optim). Utiliser quand l'utilisateur veut ajouter/rafraîchir des techniques d'économie de tokens ou de coût, ou après des annonces Anthropic sur le pricing, le caching, le batch ou les modèles.
---

# Mise à jour — Optimiser les tokens

Maintient le playbook d'optimisation des tokens et des coûts. Cette section est **destinée à grandir** : on y ajoute techniques, outils et solutions au fil des évolutions.

> ⚠️ **Avant de commencer, lis [`_principes-verification.md`](../_principes-verification.md)** — règles transverses : croiser les sources, **re-vérifier chaque chiffre/technique** avant ajout (prix, ratios, % d'économie), tracer source + date.

## Sources de vérité

1. **Pricing & modèles** : https://platform.claude.com/docs/en/about-claude/pricing.md et /about-claude/models/overview.md (WebFetch). La skill `claude-api` peut servir de point de départ pour les IDs/prix, **mais c'est un cache daté : pour tout chiffre sensible (prix, seuils, minimums, ratios), la page officielle LIVE prime en cas d'écart** — incident réel 2026-07-02 : minimums de cache par modèle périmés dans le bundle (Opus 4.8 donné à 4096 tok au lieu de 1024 sur la page live).
2. **Caching** : https://platform.claude.com/docs/en/build-with-claude/prompt-caching.md (économie, invalidateurs, TTL).
3. **Batch** : .../build-with-claude/batch-processing.md (−50 %). **Token counting** : .../token-counting.md.
4. **Effort / contexte** : docs effort, context-windows, context-editing, compaction.
5. **Release notes Claude Code** : nouvelles commandes/flags pertinents (ex. réglage d'auto-compact, --tools, --exclude-dynamic-system-prompt-sections).

## Fichiers à mettre à jour

| Fichier | Contenu |
|---------|---------|
| `web/data.js` | Entrées `section: "optim"` avec `sub: "routage" \| "contexte" \| "cache" \| "outils" \| "mesure"` + `CLAUDE_META.updated` |
| `docs/06-optimisation-tokens.md` | Les 5 leviers + le tableau de prix + la checklist finale |

## Cohérence avec les autres sections

- Les **prix/IDs de modèles** doivent rester alignés avec `CLAUDE_META.models` et la section Modèles (sinon lancer aussi `/maj-modeles`).
- Les **commandes citées** (/cost, /context, --tools, --max-budget-usd…) doivent exister dans la doc Claude Code (sinon `/maj-claude-code`).

## Procédure

1. Repérer les techniques/outils nouveaux ou à amender (sources ci-dessus + retour utilisateur).
2. Pour chaque levier, créer/amender une fiche `opt-*` au format existant :
   - `oneLine` : la règle en une phrase orientée économie.
   - `simple` : pourquoi ça fait économiser, avec une analogie accessible.
   - `details` : le comment, concret, avec chiffres quand pertinent (prix, ratios, break-even).
   - `pro` : le niveau au-dessus (pattern précis, piège, cumul de leviers).
   - `example` : commande/directive réelle ; `output` pour un mockup terminal parlant (/cost, /context…).
   - `difficulty` honnête ; `sub` correct.
3. Reporter dans `docs/06` (bon levier) **et** mettre à jour le tableau de prix + la checklist finale.
4. Mettre à jour `CLAUDE_META.updated`.

## Règles de qualité

- Chaque fiche = UNE technique actionnable, avec le « combien ça économise » et le « comment ».
- Privilégier les chiffres vérifiés (ratio sortie/entrée ≈5×, cache lecture ~0,1×/écriture ~1,25× (5 min) / 2× (1 h), batch −50 %, vision ~tokens/image). Marquer comme « à vérifier » tout chiffre incertain. Les chiffres fins qui bougent (minimums cacheables par modèle, % de gain d'une feature) : **toujours re-fetch de la page live au moment de la mise à jour**, jamais recopiés d'un cache.
- Renvois croisés bienvenus : si une technique recoupe une bonne pratique (ex. corriger tôt = éviter les régénérations), pointer l'onglet Bonnes pratiques (et réciproquement).
- Garder la dualité débutant (`simple`) / avancé (`pro`).

## Vérification (obligatoire avant de conclure)

- `node --check web/data.js` (ou charger dans un navigateur) : aucune erreur.
- Contrôle visuel : serveur de preview `web` (`.claude/launch.json`, port 4321) ou ouvrir `web/index.html` → onglet « Optimiser les tokens » : les 5 chips et compteurs sont bons, les nouvelles fiches s'ouvrent avec mockup.
- La checklist de fin de docs/06 reflète toutes les fiches `opt-*`.
