---
name: maj-tout
description: Met à jour TOUTE la documentation Claude du projet (Modèles, Claude Code, App Claude, Bonnes pratiques, Optimisation tokens) en enchaînant les cinq skills de maintenance, puis vérifie la cohérence globale. Utiliser pour une mise à jour complète périodique (ex. mensuelle) ou après une grosse vague d'annonces.
---

# Mise à jour complète de la documentation

Orchestre les cinq skills de maintenance dans l'ordre, puis fait une passe de cohérence globale.

> ⚠️ **Principes transverses : [`_principes-verification.md`](../_principes-verification.md)** s'applique à chaque étape (changements de comportement, croisement binaire + docs, re-vérification des affirmations, traçabilité). Chaque skill enchaînée le rappelle.

## Enchaînement

Exécuter dans cet ordre (les modèles d'abord : les autres sections y font référence) :

1. **/maj-modeles** — modèles, prix, IDs (référentiel utilisé partout ailleurs)
2. **/maj-claude-code** — slash commands, flags CLI, raccourcis & modes
3. **/maj-app-claude** — app Claude : Chat, Cowork, Code
4. **/maj-bonnes-pratiques** — bonnes pratiques (peuvent référencer les nouveautés des étapes 1-3)
5. **/maj-optimisation** — onglet « Optimiser les tokens » (dépend des prix/modèles de l'étape 1)

Suivre la procédure de CHAQUE skill (lire son SKILL.md), y compris sa vérification.

### Orchestration par sous-agents (recommandé pour la charge)

Chaque étape peut être déléguée à un sous-agent, mais **strictement en SÉQUENTIEL** : toutes les skills écrivent dans `web/data.js` — des sous-agents parallèles se marcheraient dessus. Passer à chaque sous-agent : les faits déjà validés par les étapes précédentes (modèles/prix de l'étape 1, version/date de l'étape 2), l'interdiction de toucher aux autres sections et à `CLAUDE_META` hors de son périmètre, et l'exigence d'un rapport structuré (AJOUTÉ / MODIFIÉ / RETIRÉ / NON CONFIRMÉ + sources).

**Re-vérifier les affirmations surprenantes des sous-agents avant le rapport final** (principe n°3 s'applique aussi à eux) : en cas de conflit entre un sous-agent et un référentiel, trancher par un WebFetch de la page officielle live — la doc live prime sur tout cache/bundle. Deux issues réelles (2026-07-02) : un sous-agent avait raison contre le bundle `claude-api` (minimums de cache) ; un autre avait lu une fausse info (« Fable 5 suspendu ») qu'il a eu raison de ne pas appliquer.

## Passe de cohérence finale

Après les cinq mises à jour :

1. **Versions & dates** : `CLAUDE_META.version` / `CLAUDE_META.updated` (web/data.js) = version réellement inspectée / date du jour ; reportées dans `README.md` et `docs/README.md`.
2. **Compteurs** : nombre d'entrées par section/sous-section cohérent entre `web/data.js`, les chips de l'interface et les README. **Traquer aussi les compteurs chiffrés codés en dur** : `grep -rnE '[0-9]+ (entrées|fiches|commandes|flags|raccourcis|techniques)' README.md docs/` (incident réel 2026-07-02 : « 168 entrées » figé dans README.md alors que le total était passé à 177).
3. **Références croisées & dérive d'usage** : un modèle retiré n'est plus cité nulle part ; une commande renommée est renommée partout ; **et le comportement décrit de chaque commande/flag correspond toujours à la doc officielle** (principe n°1 — ex. `claude -p`).
4. **Syntaxe & rendu** : `node --check web/data.js` sans erreur ; contrôle visuel via le serveur de preview `web` (`.claude/launch.json`, port 4321) ou `web/index.html` — les 6 sections + le toggle macOS/Windows + un détail par type de mockup (terminal, chat, cowork, code). Compléter par un script de validation (doublons d'`id`, champs obligatoires) si beaucoup de fiches ont bougé.
5. **Journaliser le run** : ajouter l'entrée en tête de `docs/maj/JOURNAL.md` (principe n°6) — contexte (versions, total de fiches), tableau des 5 étapes avec leur résultat, conflits de sources tranchés, fichiers touchés.
6. Résumer à l'utilisateur : ce qui a changé, ce qui a été ajouté/retiré, ce qui reste incertain.
