---
name: maj-modeles
description: Met à jour la liste des modèles Claude (noms, IDs, prix, contextes, capacités) dans docs/05 partie Modèles + web/data.js. Utiliser quand un nouveau modèle Claude sort, quand les prix changent, ou quand l'utilisateur demande de rafraîchir la doc des modèles.
---

# Mise à jour — Modèles Claude

Met à jour le référentiel des modèles : noms, alias, IDs exacts, prix par MTok, fenêtres de contexte, spécificités. **Les IDs et prix doivent venir d'une source officielle, jamais de mémoire** (les IDs inventés provoquent des erreurs API).

> ⚠️ **Avant de commencer, lis [`_principes-verification.md`](../_principes-verification.md)** — règles transverses : croiser les sources, **re-vérifier chaque affirmation** avant application (un modèle « suspendu » / « retiré » doit être confirmé sur la page officielle), tracer source + date.

## Sources de vérité

1. **La skill `claude-api`** du projet/environnement si disponible : table des modèles (IDs exacts, prix, contextes) — bon **point de départ**, mais c'est un cache daté.
2. **Docs officielles LIVE** : https://platform.claude.com/docs/en/about-claude/models/overview.md et /docs/en/about-claude/pricing.md (WebFetch). **En cas de conflit avec la skill `claude-api`, la doc live prime** (incident réel 2026-07-02 : minimums de cache périmés dans le bundle, corrects sur la page live).
3. **API Models** si une clé est disponible : `GET /v1/models` fait foi pour les capacités
4. En session Claude Code : `/model` liste les modèles proposés

> 🚨 **Statut d'un modèle (GA / suspendu / déprécié / retiré) : SEULE la page `models/overview.md` live fait foi.** Une mention de suspension/retrait lue ailleurs (release notes app, article, agent, mémoire) doit être confrontée à cette page avant toute action — incident réel : « Fable 5 suspendu » lu dans une source secondaire alors que la page officielle le donnait GA.

## Fichiers à mettre à jour

| Fichier | Contenu |
|---------|---------|
| `web/data.js` | `CLAUDE_META.models` (tableau structuré) + entrées `section: "models", sub: "modeles"` (une fiche par modèle + la fiche `mdl-pricing`) |
| `docs/05-modeles-bonnes-pratiques.md` | Partie 1 — Les modèles (tableau comparatif + descriptions) |

## Procédure

1. Récupérer la liste à jour : modèles actifs, alias, IDs complets, prix entrée/sortie par MTok, contexte, spécificités (ex. « thinking adaptatif toujours actif »). **Attention au vocabulaire thinking** : « extended thinking » (budget fixe, rejeté en 400 sur Fable/Opus 4.7+) ≠ « thinking adaptatif » (le modèle dose lui-même) — ne pas confondre dans les fiches.
2. Mettre à jour `CLAUDE_META.models` dans `web/data.js` (champs : alias, id, label, inPrice, outPrice, context, note).
3. Mettre à jour/créer les fiches `mdl-*` (`sub: "modeles"`) :
   - une fiche par modèle actif recommandé, avec `simple` (le « rôle » du modèle en une image : grand cerveau, couteau suisse, sprinter…) et `pro` (quand le choisir, pattern d'usage)
   - la fiche `mdl-pricing` : son `output` contient le tableau comparatif affiché dans le mockup — le régénérer
   - retirer les fiches des modèles retirés, signaler les dépréciations dans `notes`
4. Reporter dans `docs/05` partie 1 : tableau comparatif + recommandations d'usage.
5. Vérifier la cohérence des références aux modèles AILLEURS dans le projet : fiches /model, --model, bonnes pratiques (bp-right-model), raccourcis (fast mode), docs 01-03. Mettre à jour si un modèle cité a changé.
6. Mettre à jour `CLAUDE_META.updated`.

## Vérification (obligatoire avant de conclure)

- `node --check web/data.js`.
- Chaque ID de modèle copié-collé depuis la source (pas reconstruit, pas de suffixe de date inventé).
- Contrôle visuel : serveur de preview `web` (`.claude/launch.json`, port 4321) ou ouvrir `web/index.html` → Modèles & bonnes pratiques → chip Modèles : fiches et tableau de prix à jour.
