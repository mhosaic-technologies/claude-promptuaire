# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Le projet

**Le Promptuaire** (`claude-promptuaire`) : documentation de formation **en français** des commandes Claude (Claude Code CLI + app Claude), parcourue via une interface web statique. Le contenu est **auto-maintenu par les skills `/maj-*`** — c'est le cœur du projet, pas un à-côté.

## Architecture — la seule chose à vraiment comprendre

**`web/data.js` est la source de vérité unique** (~177 fiches dans `window.COMMANDS`, méta dans `window.CLAUDE_META`, sections dans `window.SECTIONS`). Les Markdown `docs/01` à `06` en sont des **miroirs** : toute modification de contenu doit être reportée dans les deux, sinon ils divergent.

- Une fiche = `{ id, section, sub?, category, name, oneLine, simple, details, pro, example?, output?, difficulty (1-5), notes?, win?, mockup? }`. La dualité **`simple`** (vulgarisation débutant) / **`pro`** (astuce avancée) est la signature pédagogique — obligatoire.
- Préfixes d'`id` par section : `slash-`, `cli-`, `sc-` (shortcuts), `app-`, `mdl-`, `bp-`, `opt-`. Les `id` doivent rester uniques.
- `win: {...}` obligatoire pour tout raccourci utilisant Option/Cmd (surcharge affichée via le toggle macOS/Windows).
- `notes` porte **source + date absolue** pour toute info sensible (prix, statut, version).
- `web/index.html` est autonome (zéro dépendance, zéro build) : il charge `data.js` et génère un mockup SVG par fiche (`terminal`/`chat`/`cowork`/`code` selon `mockup` ou la section).

## Mise à jour du contenu : passer par les skills, pas à la main

Pour rafraîchir la doc, utiliser les skills `/maj-modeles`, `/maj-claude-code`, `/maj-app-claude`, `/maj-bonnes-pratiques`, `/maj-optimisation` — ou **`/maj-tout`** qui les enchaîne **dans cet ordre** (modèles d'abord : les autres y font référence) puis fait une passe de cohérence. Chaque skill lit d'abord `.claude/skills/_principes-verification.md` (règles transverses : dérives de *comportement* et pas seulement add/remove, croisement binaire + doc officielle, **doc live > caches/bundles > mémoire**, jamais d'affirmation non confirmée).

- Sous-agents : **séquentiels uniquement** — toutes les skills écrivent dans `data.js`.
- **Chaque exécution s'enregistre dans `docs/maj/JOURNAL.md`** (entrée en tête : date, déclencheur, résumé, conflits de sources tranchés). C'est la mémoire du projet — la consulter avant un run pour connaître les fausses alertes déjà écartées.

## Commandes

```bash
node --check web/data.js     # OBLIGATOIRE après toute édition de data.js
```

Contrôle visuel : serveur de preview `web` défini dans `.claude/launch.json` (port 4321), ou double-clic sur `web/index.html`. Pas de build, pas de lint, pas de tests — projet statique.

## Pièges connus (vécus)

- **Compteurs codés en dur** : `README.md` contient des totaux chiffrés (arborescence + « Sections couvertes ») sous deux formats — « 177 entrées » ET « (56) ». Les re-vérifier après tout ajout/retrait de fiche.
- `CLAUDE_META.version`/`updated` sont **recopiés** dans `README.md` et `docs/README.md` — les trois doivent rester alignés.
- La date du jour vient du contexte système — ne pas la déduire d'autre chose (erreur déjà commise).
- « Extended thinking » (budget fixe, rejeté en 400 sur Fable/Opus 4.7+) ≠ « thinking adaptatif » — vocabulaire à ne pas mélanger dans les fiches.
- Le contenu du site est en **français** (les fiches, les docs, les skills) ; la langue ne se « corrige » pas en anglais.
