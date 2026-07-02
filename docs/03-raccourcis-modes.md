# 03 — Raccourcis & modes

Raccourcis clavier, saisie, mode Vim, et **modes de permission** de Claude Code. Vérifié sur **2.1.191**.

> 💡 L'interface web (`web/index.html`) propose un **sélecteur macOS / Windows** qui adapte automatiquement tous les raccourcis à votre système.

## Correspondance Mac ↔ Windows

La grande majorité des raccourcis utilisent **Ctrl** et sont identiques partout (y compris sur Mac : c'est bien Ctrl, pas Cmd). Seuls les raccourcis à base de **Option** changent :

| Action | macOS | Windows / Linux |
|--------|-------|-----------------|
| Changer de modèle | `Option+P` | `Alt+P` |
| Extended thinking on/off | `Option+T` | `Alt+T` |
| Fast mode on/off | `Option+O` | `Alt+O` |
| Saut de ligne (alternative) | `Option+Entrée`* | `Ctrl+J` |
| Coller une image | `Ctrl+V` (`Cmd+V` sur iTerm2) | `Ctrl+V` (`Alt+V` sous WSL) |
| Tout le reste (Échap, Ctrl+C, Ctrl+O, Ctrl+R, Shift+Tab, !, @, #…) | identique | identique |

\* nécessite « Option as Meta » dans les réglages du terminal. `Shift+Enter` et `Ctrl+J` marchent des deux côtés.

---

## Modes de permission

Le **mode de permission** détermine quand Claude demande votre confirmation. On le change en cours de session avec **`Shift+Tab`** (la barre de statut indique le mode courant), ou au lancement avec `--permission-mode`, ou par défaut dans les settings.

| Mode | Auto-approuve | Bon usage | Statut |
|------|---------------|-----------|--------|
| **`default`** | Lectures seules | Démarrage, travail sensible | `⏵ Ask before edits` |
| **`acceptEdits`** | Lectures + éditions + fs courant (mkdir, mv, rm, sed…) | Itérer sur du code, relire via `git diff` | `⏵⏵ accept edits on` |
| **`plan`** | Lectures seules (+ planification) | Explorer et **proposer** avant d'agir | — |
| **`auto`** | Presque tout, avec classifieur de sécurité | Longues tâches, faible friction | `⏵⏵⏵ auto mode on` |
| **`dontAsk`** | Uniquement les règles `allow` | CI verrouillée, non-interactif | (explicite) |
| **`bypassPermissions`** | **Tout**, sans garde-fou | Conteneurs/VM isolés **uniquement** | (explicite) |

**Cycle `Shift+Tab`** : `default` → `acceptEdits` → `plan` (→ `auto` si éligible → `bypass` si activé).

- **`plan`** est le réflexe recommandé pour toute tâche non triviale : Claude rédige un plan, puis vous choisissez comment l'exécuter (auto / acceptEdits / manuel).
- **`auto`** requiert un modèle récent et l'activation admin (Teams/Enterprise) ; le classifieur bloque `curl | bash`, déploiements prod, suppressions massives, et respecte les limites que vous énoncez (« ne pousse pas »). Il se met en pause s'il bloque trop souvent. **Depuis v2.1.183**, il bloque aussi par défaut le git destructeur (`git reset --hard`, `git checkout -- .`, `git clean -fd`, `git stash drop`), `git commit --amend` (si le commit n'est pas de l'agent) et `terraform/pulumi/cdk destroy` non demandés.
- **`bypassPermissions`** : ⚠️ aucune protection contre l'injection de prompt, refusé en root, désactivable par l'admin. À éviter sur une machine de travail réelle.

**Chemins protégés** (jamais auto-approuvés en default/acceptEdits/plan) : `.git`, `.claude` (sauf worktrees), `.vscode`, `.idea`, fichiers rc du shell (`.bashrc`, `.zshrc`…), `.npmrc`, `.gitconfig`, `.mcp.json`…

---

## Contrôle de la session

| Raccourci | Diff. | Effet |
|-----------|:----:|-------|
| **`Échap`** | 1 | Interrompt Claude (réponse/outil) en gardant le travail déjà fait. |
| **`Échap Échap`** | 2 | Prompt avec texte → l'efface ; prompt vide → ouvre le menu **rewind**. |
| **`Ctrl+C`** | 1 | Interrompt ; sinon efface l'entrée (1×) puis quitte (2×). |
| **`Ctrl+D`** | 1 | Envoie EOF et quitte proprement. |
| **`Ctrl+L`** | 1 | Redessine l'écran (si l'affichage est corrompu). |
| **`Shift+Tab`** | 1 | Fait défiler les **modes de permission**. |

---

## Saisie du prompt

| Élément | Diff. | Effet |
|---------|:----:|-------|
| **`@`** | 1 | Mention de fichier avec autocomplétion : `@src/app.ts explique ça`. |
| **`!`** | 1 | **Mode shell** : `! npm test` exécute directement, la sortie est ajoutée. **v2.1.186+** : la sortie déclenche aussi une réponse automatique de Claude. |
| **`#`** | 1 | **Mémoire rapide** : `# toujours utiliser pnpm ici` enregistre en `CLAUDE.md`. |
| **`/`** | 1 | Ouvre le sélecteur de slash commands ; filtre en tapant. |
| Multiligne | 1 | `Shift+Enter` (terminaux modernes), `\`+Entrée ou `Ctrl+J` (universels). |
| Coller une image | 1 | `Ctrl+V` (Cmd+V iTerm2, Alt+V Windows/WSL) → chip `[Image #N]`. |

> Pour `Shift+Enter` dans VS Code / Cursor / Alacritty / Zed : lancer `/terminal-setup`.

---

## Navigation & affichage

| Raccourci | Diff. | Effet |
|-----------|:----:|-------|
| `↑` / `↓` | 1 | Historique des prompts (après être au bord d'une saisie multiligne). |
| **`Ctrl+R`** | 2 | Recherche inversée dans l'historique (Ctrl+S change la portée). |
| **`Ctrl+O`** | 1 | Ouvre/ferme le **transcript** (appels d'outils, logs, MCP). |
| **`Ctrl+T`** | 1 | Affiche/masque la **liste des tâches**. |
| `Ctrl+G` / `Ctrl+X Ctrl+E` | 2 | Ouvre le prompt dans `$EDITOR`. |

---

## Bascules de modèle / fonctionnalité

| Raccourci | Diff. | Effet |
|-----------|:----:|-------|
| **`Option+P` / `Alt+P`** | 1 | Change de modèle sans effacer le prompt — le réflexe « ascenseur » : Opus pour l'étape dure, retour Sonnet ensuite. |
| **`Option+T` / `Alt+T`** | 1 | Active/désactive l'**extended thinking** (sans effet sur Fable 5, toujours en thinking). |
| **`Option+O` / `Alt+O`** | 1 | Active/désactive le **fast mode** — le même Opus servi plus vite, pas un downgrade. |

---

## Mode Vim (optionnel) — difficulté 3

Activé via `/config → Editor mode` (la commande dédiée `/vim` a été retirée). Le prompt se pilote en NORMAL/INSERT/VISUAL.

- **Bascule de mode** : `Échap` (NORMAL), `i`/`I`/`a`/`A`, `o`/`O`, `v`/`V`.
- **Navigation** : `h j k l`, `w`/`b`/`e`, `0`/`$`/`^`, `gg`/`G`, `f{c}`/`F{c}`/`t{c}`, `;`/`,`.
- **Édition** : `x`, `dd`, `D`, `dw`/`cw`, `cc`/`C`, `yy`/`p`/`P`, `>>`/`<<`, `J`, `u`, `.`.
- **Text objects** (avec `d`/`c`/`y`) : `iw`/`aw`, `i"`/`a"`, `i(`/`a(`, `i{`/`a{`…

> Courbe d'apprentissage réelle pour les non-vimistes ; gain net pour les habitués.
