# Claude-promptuaire — Documentation & interface

Documentation complète des commandes utilisables via **Claude Code (CLI)** et **l'application Claude**, avec pour chacune un **niveau de difficulté de prise en main**, des explications, un exemple et un visuel — accompagnée d'une petite **interface web** pour tout parcourir.

> Source : inspection locale de **Claude Code 2.1.191** + documentation officielle. MàJ : **2026-07-02**.

## Contenu

```
.
├── docs/                       # Documentation Markdown
│   ├── README.md               #   index des documents
│   ├── 01-slash-commands.md    #   /commande en session
│   ├── 02-cli-flags.md         #   flags & sous-commandes CLI
│   ├── 03-raccourcis-modes.md  #   raccourcis (Mac ↔ Windows) & modes de permission
│   ├── 04-app-claude.md        #   app Claude : Chat · Cowork · Code
│   ├── 05-modeles-bonnes-pratiques.md  # Partie 1 Modèles · Partie 2 Bonnes pratiques
│   ├── 06-optimisation-tokens.md       # Playbook : économiser les tokens & coûts
│   └── maj/JOURNAL.md          #   journal des exécutions des skills /maj-*
├── web/
│   ├── index.html              # Interface web (double-clic, aucun serveur)
│   └── data.js                 # Catalogue (177 entrées) — maintenu par les skills
└── .claude/skills/             # 🔄 Skills de mise à jour
    ├── _principes-verification.md  #  règles communes (comportement, binaire+docs, re-vérif)
    ├── maj-claude-code/        #   /maj-claude-code  → docs 01-03 + data.js
    ├── maj-app-claude/         #   /maj-app-claude   → doc 04 + data.js
    ├── maj-modeles/            #   /maj-modeles      → doc 05 (P1) + data.js
    ├── maj-bonnes-pratiques/   #   /maj-bonnes-pratiques → doc 05 (P2) + data.js
    ├── maj-optimisation/       #   /maj-optimisation → doc 06 + data.js (section optim)
    └── maj-tout/               #   /maj-tout         → tout, dans l'ordre
```

## Lancer l'interface web

**Rien à installer, aucun serveur** :

```bash
open web/index.html      # macOS — ou double-clic dans le Finder
```

Fonctionne hors-ligne (`index.html` charge `data.js` localement). L'interface permet de :
- **filtrer par section** et **sous-section** (App Claude : Chat / Cowork / Code ; Modèles : Modèles / Bonnes pratiques) ;
- adapter les raccourcis à votre système via le **sélecteur macOS / Windows** ;
- **rechercher** (`/` pour focus) ;
- ouvrir le **détail** de chaque fiche : 💡 *En clair* (vulgarisation débutant), fonctionnement, exemple, 🚀 *Pour aller plus loin* (astuce avancée), à savoir, et un **visuel généré** (terminal, chat, Cowork ou Code selon la fiche) ;
- **signaler un problème** sur une fiche via le bouton flottant *⚠ Signaler* (bas-droite du panneau) : un motif pré-fait (« pas correct », « plus d'actualité », « à mettre à jour », ou champ libre) ouvre un e-mail pré-rempli vers `aurelien@mhosaic.com` (mailto, 100 % local — l'adresse est dans `CLAUDE_META.feedbackEmail`).

## Maintenir la documentation à jour

Cinq skills (utilisables dans Claude Code, depuis ce dossier) ré-inspectent les sources et mettent à jour docs + interface :

| Skill | Met à jour |
|-------|-----------|
| `/maj-claude-code` | Slash commands, flags CLI, raccourcis & modes (docs 01-03 + data.js) |
| `/maj-app-claude` | App Claude — Chat, Cowork, Code (doc 04 + data.js) |
| `/maj-modeles` | Modèles, prix, IDs (doc 05 partie 1 + data.js) |
| `/maj-bonnes-pratiques` | Bonnes pratiques (doc 05 partie 2 + data.js) |
| `/maj-optimisation` | Optimiser les tokens (doc 06 + section `optim` de data.js) |
| `/maj-tout` | Tout, dans le bon ordre, avec passe de cohérence finale |

Les données vivent dans `web/data.js` (séparées de l'interface) : les skills les mettent à jour sans risquer de casser l'affichage. Chaque exécution est consignée dans [`docs/maj/JOURNAL.md`](docs/maj/JOURNAL.md) (date, périmètre, changements, conflits de sources tranchés).

Toutes les skills suivent des **principes de vérification communs** ([`.claude/skills/_principes-verification.md`](.claude/skills/_principes-verification.md)) : vérifier les **changements de comportement/usage** (pas seulement les ajouts/retraits — ex. `claude -p` devenu l'entrée de l'Agent SDK), **croiser binaire + docs officielles**, et **re-vérifier chaque affirmation** avant de l'appliquer (les agents/recherches hallucinent parfois).

## Niveau de difficulté

| Niveau | Libellé | Signification |
|:------:|---------|---------------|
| 1 | Trivial | Marche du premier coup. |
| 2 | Facile | Une notion à saisir. |
| 3 | Intermédiaire | Demande un peu de configuration ou de contexte. |
| 4 | Avancé | Nécessite de comprendre des mécanismes (hooks, agents, MCP…). |
| 5 | Expert | À manier avec précaution (sécurité, environnements isolés). |

## Sections couvertes

- **Slash commands** (56) — `/clear`, `/compact`, `/context`, `/init`, `/agents`, `/mcp`, `/review`, `/goal`, `/plan`, `/effort`, `/fork`, `/tasks`, `/diff`, `/code-review`…
- **Flags & CLI** (22) — `claude -p`, `--model`, `--permission-mode`, `claude mcp add`, `claude ultrareview`…
- **Raccourcis & modes** (21) — `Shift+Tab`, `!`/`@`/`#`, mode Vim, **modes de permission** — avec variantes Mac/Windows.
- **App Claude** (29) — **Chat** (Projects, Artifacts, Slack, Research…), **Cowork** (travail délégué, livrables, pilotage mobile) et **Code** (Claude Code en GUI, add-ins Office).
- **Modèles & bonnes pratiques** (18) — **Modèles** (gamme, prix, contextes) et **Bonnes pratiques** (contexte, workflow).
- **Optimiser les tokens** (31) — le playbook complet : **Modèles & routage**, **Contexte**, **Cache**, **Outils & sortie**, **Mesure & budget**.

> Claude Code évolue vite : `/release-notes` et `claude update` pour rester à jour.
