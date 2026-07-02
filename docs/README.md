# Le Promptuaire — Documentation des commandes Claude

Documentation complète des commandes utilisables via **Claude Code (CLI)** et **l'application Claude** (claude.ai / Desktop), avec pour chaque entrée un **niveau de difficulté de prise en main** (1 = trivial, 5 = expert), des explications, un exemple et un visuel.

> Source : inspection locale de **Claude Code 2.1.191** + documentation officielle. Dernière mise à jour : **2026-07-02**.
> Claude Code évolue vite : utilisez `/release-notes` et `claude update` pour rester à jour.

## Documents

| # | Document | Contenu | Skill de MàJ |
|---|----------|---------|--------------|
| 01 | [Slash commands](01-slash-commands.md) | Les commandes `/commande` tapées dans une session Claude Code. | `/maj-claude-code` |
| 02 | [Flags & CLI](02-cli-flags.md) | Arguments de lancement (`claude -p`, `--model`…) et sous-commandes (`claude mcp`, `claude update`…). | `/maj-claude-code` |
| 03 | [Raccourcis & modes](03-raccourcis-modes.md) | Raccourcis clavier (**Mac ↔ Windows**), saisie, mode Vim, et **modes de permission**. | `/maj-claude-code` |
| 04 | [App Claude](04-app-claude.md) | Les 3 espaces de l'app : **Chat**, **Cowork**, **Code**. | `/maj-app-claude` |
| 05 | [Modèles & bonnes pratiques](05-modeles-bonnes-pratiques.md) | **Partie 1** Modèles (gamme, prix) · **Partie 2** Bonnes pratiques (workflow). | `/maj-modeles` · `/maj-bonnes-pratiques` |
| 06 | [Optimiser les tokens](06-optimisation-tokens.md) | Playbook complet : routage des modèles, contexte, cache, outils & sortie, mesure & budget. | `/maj-optimisation` |

> `/maj-tout` enchaîne les skills avec une passe de cohérence finale. Chaque exécution est consignée dans le journal [`maj/JOURNAL.md`](maj/JOURNAL.md).

## Interface web

Une interface web — **un seul fichier autonome, sans serveur ni installation** — permet de parcourir et filtrer toutes ces commandes avec leur détail :

```bash
open ../web/index.html   # double-clic suffit
```

Style, données et logique sont inclus dans `web/index.html` ; un visuel est généré pour chaque commande.

## Échelle de difficulté

| Niveau | Libellé | Signification |
|--------|---------|---------------|
| 1 | Trivial | Marche du premier coup, rien à comprendre. |
| 2 | Facile | Une notion à saisir, sans plus. |
| 3 | Intermédiaire | Demande un peu de configuration ou de contexte. |
| 4 | Avancé | Nécessite de comprendre des mécanismes (hooks, agents, MCP…). |
| 5 | Expert | À manier avec précaution (sécurité, environnements isolés). |
