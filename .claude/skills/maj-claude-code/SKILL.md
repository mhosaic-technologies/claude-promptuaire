---
name: maj-claude-code
description: Met à jour la documentation des slash commands, flags CLI et raccourcis/modes de Claude Code (docs/01, 02, 03 + web/data.js) en ré-inspectant la version installée. Utiliser quand l'utilisateur demande de mettre à jour, rafraîchir ou synchroniser la doc Claude Code, ou après une montée de version de Claude Code.
---

# Mise à jour — Claude Code (slash commands, CLI, raccourcis)

Ré-inspecte l'installation locale de Claude Code et met à jour la documentation + le catalogue web. **Ne jamais documenter de mémoire : chaque commande doit être vérifiée contre une source.**

> ⚠️ **Avant de commencer, lis [`_principes-verification.md`](../_principes-verification.md)** — règles transverses : vérifier les changements de **comportement/usage** (pas seulement add/remove/rename), croiser **binaire + docs officielles**, **re-vérifier chaque affirmation** avant application, tracer source + date.

## Sources de vérité (dans cet ordre)

1. **Inspection locale** (= existence & libellés exacts) : `claude --version` (**fait foi pour la version active** — `~/.local/share/claude/versions/` contient plusieurs bundles, ne pas déduire la version d'un chemin), `claude --help`, `claude mcp --help`, `claude plugin --help`, `claude config --help` ; `strings <binaire>` pour la table des commandes retirées.
   > ⚠️ **Bruit `strings`** : le binaire embarque un runtime JS (Node/Bun) dont les flags (`--async`, `--tls-*`, `--cacert`…) apparaissent dans `strings` sans être des flags Claude Code. Tout flag découvert par `strings` doit être **confirmé par `claude --help` ou la cli-reference** avant ajout (incident réel 2026-07-02 : diff strings 2.1.183→2.1.191 composé quasi uniquement de ce bruit).
2. **Release notes** : `/release-notes` en session, ou le changelog officiel.
3. **Docs officielles** (= **comportement** d'une commande/flag, pas seulement son existence) : `https://code.claude.com/docs/en/` — **cli-reference**, **agent-sdk** (mode headless `-p`), slash-commands, interactive-mode.
4. Si disponible, déléguer la collecte à l'agent `claude-code-guide` (il a accès aux docs officielles) — mais **re-vérifier ses affirmations** (principe n°3).

## Fichiers à mettre à jour

| Fichier | Contenu |
|---------|---------|
| `web/data.js` | Entrées `section: "slash"`, `"cli"`, `"shortcuts"` + `CLAUDE_META.version` et `CLAUDE_META.updated` |
| `docs/01-slash-commands.md` | Slash commands |
| `docs/02-cli-flags.md` | Flags & sous-commandes CLI |
| `docs/03-raccourcis-modes.md` | Raccourcis clavier (Mac ET Windows) & modes de permission |

## Procédure

1. Relever la version installée (`claude --version`) et la comparer à `CLAUDE_META.version` dans `web/data.js`. Si identique et pas de demande explicite, le signaler et demander si on continue.
2. Construire le diff depuis la version documentée : commandes/flags/raccourcis **ajoutés**, **supprimés**, **renommés** — **ET les changements de COMPORTEMENT/USAGE** d'entrées qui restent (relire la fiche existante et la comparer à la doc officielle ; ex. `claude -p` devenu l'entrée de l'Agent SDK avec boucle agentique). Voir principe n°1.
   - En pratique : passer en revue chaque fiche `slash`/`cli`/`shortcuts` déjà documentée, pas seulement chercher les nouveautés.
3. Pour chaque ajout/modification, créer ou amender l'entrée dans `web/data.js` en respectant le format existant (voir l'en-tête du fichier) :
   - `simple` : vulgarisation en une phrase, compréhensible par un débutant complet (image/analogie bienvenue)
   - `pro` : astuce ou nuance pour utilisateur avancé
   - `difficulty` : 1 (trivial) à 5 (expert), cohérent avec les entrées voisines
   - `win: {...}` : variante Windows/Linux **obligatoire** pour tout raccourci utilisant Option/Cmd
   - `output` : sortie simulée réaliste pour le mockup terminal
4. Reporter les mêmes changements dans les docs Markdown correspondants (mêmes infos, format du document existant).
5. Mettre à jour `CLAUDE_META.version` et `CLAUDE_META.updated` (date du jour) dans `web/data.js`.

## Vérification (obligatoire avant de conclure)

- `node --check web/data.js` (ou charger le fichier dans un navigateur) : aucune erreur de syntaxe.
- Cohérence des compteurs : le nombre d'entrées par section dans data.js correspond aux entêtes des docs.
- Contrôle visuel : serveur de preview `web` (`.claude/launch.json`, port 4321) ou ouvrir `web/index.html` — vérifier que les nouvelles entrées s'affichent (y compris la variante Windows via le toggle).
- Mettre à jour les dates/version mentionnées dans `README.md` et `docs/README.md` si elles changent.
