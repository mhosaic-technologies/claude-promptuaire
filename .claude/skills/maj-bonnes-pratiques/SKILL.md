---
name: maj-bonnes-pratiques
description: Enrichit et met à jour les bonnes pratiques d'utilisation de Claude (optimisation tokens, contexte, workflow) dans docs/05 partie Bonnes pratiques + web/data.js. Utiliser quand l'utilisateur veut ajouter ou rafraîchir des bonnes pratiques, ou après des annonces Anthropic sur les usages recommandés.
---

# Mise à jour — Bonnes pratiques

Enrichit le référentiel des bonnes pratiques : optimisation des tokens, hygiène de contexte, choix de modèle, workflow efficace. Cette section est **destinée à grandir** : on ajoute plus qu'on ne remplace.

> ⚠️ **Avant de commencer, lis [`_principes-verification.md`](../_principes-verification.md)** — règles transverses : vérifier les changements d'**usage recommandé**, **re-vérifier chaque affirmation** (une pratique « officielle » doit être sourcée — ex. `.claudeignore` n'existait pas), tracer source + date.

## Sources de vérité

1. **Anthropic engineering blog** : https://www.anthropic.com/engineering (articles sur l'usage agentique, le prompt engineering, Claude Code)
2. **Docs officielles** : best practices Claude Code, prompt caching, context windows (platform.claude.com/docs)
3. **Release notes** : les nouvelles fonctionnalités impliquent souvent de nouvelles pratiques
4. **L'expérience de l'utilisateur / retours terrain** (collègues, communauté) : si une pratique vient de là, la formaliser au même format. Flux éprouvé (2026-07-02, enrichissement de `bp-course-correct` sur retour d'un collègue) :
   - **Chercher d'abord la fiche existante** qui couvre le sujet (grep `bp-*`) et l'**enrichir** plutôt que créer un doublon ;
   - **Rattacher à la source officielle** quand elle existe (le retour terrain précise souvent un angle que la doc officielle survole — les deux se renforcent) ;
   - **Ajouter le renvoi croisé** si la pratique recoupe un autre onglet (ex. économie de tokens → onglet « Optimiser les tokens »).

## Fichiers à mettre à jour

| Fichier | Contenu |
|---------|---------|
| `web/data.js` | Entrées `section: "models", sub: "pratiques"` (ids `bp-*`) |
| `docs/05-modeles-bonnes-pratiques.md` | Partie 2 — Les bonnes pratiques (+ checklist récapitulative en fin de doc) |

## Procédure

1. Identifier les pratiques nouvelles ou à amender (sources ci-dessus + diff avec l'existant).
2. Pour chaque pratique, créer/amender une fiche `bp-*` au format existant :
   - `oneLine` : la règle en une phrase impérative
   - `simple` : pourquoi ça compte, avec une analogie accessible (ex. « comme prêter un tiroir de votre bureau… »)
   - `details` : le comment, concret et actionnable
   - `pro` : le niveau au-dessus — chiffres, pattern précis, piège connu
   - `example` : commande ou enchaînement réel
   - `difficulty` : honnête (une pratique simple à comprendre mais dure à appliquer = 3+)
3. Reporter dans `docs/05` partie 2 ET mettre à jour la **checklist récapitulative** en fin de document.
4. Si une pratique touche aux modèles (prix, capacités), vérifier la cohérence avec la partie Modèles (sinon lancer aussi /maj-modeles).
5. Mettre à jour `CLAUDE_META.updated`.

## Règles de qualité

- Une fiche = UNE pratique actionnable. Pas de fourre-tout.
- Chaque pratique doit dire « pourquoi » (gain concret : tokens, qualité, temps) et « comment » (geste précis).
- Garder la dualité débutant (`simple`) / avancé (`pro`) : c'est la signature de cette documentation.

## Vérification (obligatoire avant de conclure)

- `node --check web/data.js`.
- Contrôle visuel : serveur de preview `web` (`.claude/launch.json`, port 4321) ou ouvrir `web/index.html` → chip Bonnes pratiques : compteur et nouvelles fiches OK.
- La checklist de fin de docs/05 reflète toutes les fiches `bp-*`.
