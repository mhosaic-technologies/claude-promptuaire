# 02 — Flags & CLI

Arguments passés au lancement de `claude` depuis le terminal, et sous-commandes (`claude mcp`, `claude update`…). Tout est vérifié sur **Claude Code 2.1.191** (`claude --help`).

**Difficulté** : 1 (trivial) → 5 (dangereux / expert).

---

## Session

| Flag | Diff. | Description | Exemple |
|------|:----:|-------------|---------|
| `-c, --continue` | 1 | Reprend la conversation **la plus récente** du dossier, contexte complet. | `claude -c` |
| `-r, --resume [id]` | 2 | Reprend par ID ou via un **sélecteur** de sessions récentes. | `claude --resume` |
| `--fork-session` | 3 | Avec `--resume`/`--continue` : crée une **branche** indépendante au lieu de réutiliser l'original. | `claude -c --fork-session` |
| `-n, --name <nom>` | 1 | Nom lisible de la session (prompt, picker, titre de terminal). | `claude -n "fix-auth"` |
| `--from-pr [n]` | 2 | Reprend la session liée à une **pull request**. | `claude --from-pr 123` |
| `-w, --worktree [nom]` | 4 | Lance dans un **git worktree** isolé (combiner avec `--tmux`). | `claude -w feature-x --tmux` |
| `--session-id <uuid>` | 4 | Force un ID de session précis (UUID valide). | `claude --session-id …` |

---

## Modèle & raisonnement

| Flag | Diff. | Description | Exemple |
|------|:----:|-------------|---------|
| `--model <m>` | 2 | Modèle de la session : alias (`opus`, `sonnet`, `haiku`, `fable`) ou ID complet. | `claude --model opus` |
| `--effort <niv>` | 2 | Budget de raisonnement : `low`, `medium`, `high`, `xhigh`, `max`. | `claude --effort high` |
| `--fallback-model <m>` | 3 | Modèles de secours si le principal est indisponible (`--print` uniquement). | `claude -p --fallback-model "opus,sonnet"` |
| `--max-budget-usd <$>` | 2 | Plafonne la dépense d'une exécution headless. | `claude -p --max-budget-usd 2.00` |

> Voir [05 — Modèles & bonnes pratiques](05-modeles-bonnes-pratiques.md).

---

## Mode headless (`--print`) — l'Agent SDK

`claude -p` est le **point d'entrée du mode headless / Agent SDK** (ex-Claude Code SDK). Ce n'est **pas** une simple complétion : il lance un **agent complet** (lecture de fichiers, outils, **plusieurs tours agentiques**) puis s'arrête. Base de toute automatisation (scripts, CI, pipelines). Doc programmatique : `code.claude.com/docs → agent-sdk`.

| Flag | Diff. | Description | Exemple |
|------|:----:|-------------|---------|
| `-p, --print` | 2 | Lance un agent non-interactif (via le SDK) puis quitte. `claude -c -p` continue en headless. | `claude -p "résume" < f.md` |
| `--output-format <f>` | 2 | `text` (défaut), `json` (objet : résultat + métadonnées coût/tours), `stream-json` (flux). | `claude -p "…" --output-format json` |
| `--max-turns <n>` | 2 | Plafonne le nombre de **tours agentiques** ; sort en erreur au-delà. Garde-fou complémentaire de `--max-budget-usd`. | `claude -p "fix lint" --max-turns 5` |
| `--json-schema <schema>` | 4 | Force une sortie **JSON validée** par un JSON Schema (structured outputs). | `claude -p --json-schema '{…}' "extrais…"` |
| `--input-format <f>` | 3 | `text` (défaut) ou `stream-json` (entrée streamée). | `claude -p --input-format stream-json` |
| `--include-partial-messages` | 3 | Émet les chunks au fil de l'eau (avec `stream-json`). | — |
| `--no-session-persistence` | 2 | La session n'est pas sauvegardée (runs éphémères). | `claude -p --no-session-persistence "…"` |

---

## Permissions & sécurité

| Flag | Diff. | Description | Exemple |
|------|:----:|-------------|---------|
| `--permission-mode <m>` | 2 | `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`. | `claude --permission-mode plan` |
| `--allowedTools <…>` | 3 | Pré-autorise des outils avec motifs (`Bash(git *)`, `Edit`). | `claude --allowedTools "Bash(git *)" "Edit"` |
| `--disallowedTools <…>` | 3 | Interdit des outils ; s'applique dans **tous** les modes. | `claude --disallowedTools "Bash(rm *)"` |
| `--allow-dangerously-skip-permissions` | 4 | Rend `bypassPermissions` **disponible** sans l'activer par défaut (plus sûr). | — |
| `--dangerously-skip-permissions` | 5 | **Désactive toutes** les vérifications. Uniquement en conteneur/VM isolé. | `claude --dangerously-skip-permissions` |

> ⚠️ `--dangerously-skip-permissions` n'offre **aucune** protection contre l'injection de prompt et est refusé en root/sudo. Voir [03 — Modes de permission](03-raccourcis-modes.md#modes-de-permission).

---

## Contexte & system prompt

| Flag | Diff. | Description | Exemple |
|------|:----:|-------------|---------|
| `--add-dir <dirs…>` | 2 | Répertoires accessibles en plus du dossier courant. | `claude --add-dir ../lib ../data` |
| `--append-system-prompt <txt>` | 2 | **Ajoute** au system prompt par défaut (sans le remplacer). | `claude --append-system-prompt "Réponds en français."` |
| `--system-prompt <txt>` | 2 | **Remplace** entièrement le system prompt. | — |
| `--tools <…>` | 2 | Restreint les outils (`""` = aucun, `"default"` = tous, ou liste). | `claude --tools "Read,Edit,Bash"` |
| `--exclude-dynamic-system-prompt-sections` | 4 | Améliore la **réutilisation du cache** entre exécutions (déplace cwd/env/git). | — |

---

## MCP & plugins

| Flag / commande | Diff. | Description | Exemple |
|------|:----:|-------------|---------|
| `--mcp-config <…>` | 4 | Charge des serveurs MCP depuis un JSON pour la session. | `claude --mcp-config ./mcp.json` |
| `--strict-mcp-config` | 3 | N'utilise **que** les serveurs `--mcp-config` (isolation/tests). | — |
| `claude mcp add <nom> -- <cmd>` | 3 | Ajoute un serveur MCP (stdio ou HTTP). | `claude mcp add github -- npx -y @modelcontextprotocol/server-github` |
| `claude mcp list / get / remove` | 1 | Liste / inspecte / supprime des serveurs. | `claude mcp list` |
| `claude mcp login / logout <nom>` | 2 | **v2.1.186+** : authentifie (OAuth) ou déconnecte un serveur sans ouvrir `/mcp`. `--no-browser` imprime l'URL en SSH. | `claude mcp login sentry` |
| `claude mcp add-from-claude-desktop` | 2 | Importe la config MCP de Claude Desktop (macOS/WSL). | — |
| `--plugin-dir <path>` | 2 | Charge un plugin depuis un dossier/zip pour la session. | `claude --plugin-dir ./my-plugin` |

---

## Maintenance & diagnostic

| Commande / flag | Diff. | Description | Exemple |
|------|:----:|-------------|---------|
| `claude update` / `upgrade` | 1 | Met à jour Claude Code vers la dernière version. | `claude update` |
| `claude doctor` | 1 | Vérifie l'auto-updater et l'environnement. | `claude doctor` |
| `-v, --version` | 1 | Affiche la version (ici : 2.1.191). | `claude -v` |
| `-h, --help` | 1 | Aide d'une commande ou globale. | `claude mcp --help` |
| `-d, --debug [filtre]` | 2 | Logs détaillés (filtre `api,hooks` ou négation `!1p`). | `claude -d api,hooks` |
| `--safe-mode` | 2 | Désactive **toutes** les personnalisations (CLAUDE.md, skills, plugins, hooks, MCP…). | `claude --safe-mode` |
| `--bare` | 3 | Mode minimal : pas de LSP, mémoire auto, keychain, CLAUDE.md… | `claude --bare` |
| `claude config` | 2 | Lit/écrit la config hors session (l'éditeur `/config` est plus simple). | `claude config` |
| `claude project purge [chemin]` | 2 | Supprime **tout l'état local** d'un projet (transcripts, tâches, historique, config). `--dry-run` d'abord ! | `claude project purge ~/work/repo --dry-run` |

> Pour isoler un problème lié à une config perso, `--safe-mode` est le premier réflexe.

---

## Revue de code (shell)

| Commande | Diff. | Description | Exemple |
|------|:----:|-------------|---------|
| `claude ultrareview [cible]` | 3 | Revue cloud **multi-agents** non interactive (branche, `<PR#>` ou base). Imprime les findings (sortie 0/1). `--json`, `--timeout <min>`. Équivalent shell de `/code-review ultra`. | `claude ultrareview 1234 --json` |

> Facturée, nécessite un dépôt git. Idéale en CI / pré-merge.
