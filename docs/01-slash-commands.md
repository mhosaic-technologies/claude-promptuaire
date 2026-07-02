# 01 — Slash commands

Les *slash commands* sont les commandes que vous tapez en commençant par `/` **à l'intérieur d'une session Claude Code**. Tapez `/` pour ouvrir le sélecteur et filtrer en tapant des lettres (`/mem` → `/memory`).

> Vérifié sur Claude Code **2.1.191**. La liste exacte dépend de votre version et des plugins/skills installés.

**Difficulté** : 1 (trivial) → 5 (expert).

---

## Session & contexte

### `/clear` — difficulté 1
Efface la conversation et repart d'un contexte vierge. Supprime tout l'historique de la fenêtre de contexte : idéal pour passer à une tâche **sans rapport** sans payer le coût en tokens de l'ancien contexte.
```
/clear
```
> À privilégier entre deux tâches distinctes plutôt que `/compact`, qui conserve un résumé.

### `/compact` — difficulté 2
Résume la conversation pour libérer de la fenêtre de contexte tout en gardant les éléments clés. Utile quand la session est longue mais que vous continuez **la même** tâche. Vous pouvez guider le résumé.
```
/compact garde les décisions d'architecture et le TODO
```
> Se déclenche aussi automatiquement près de la limite. Pour une coupure nette, préférez `/clear`.

### `/context` — difficulté 2
Visualise l'occupation de la fenêtre de contexte (system prompt, CLAUDE.md, fichiers, outils, historique). Indispensable pour décider quand compacter ou nettoyer.
```
/context
```

### `/add-dir` — difficulté 1
Ajoute un répertoire de travail accessible pour la session (multi-repo, données externes). La config `.claude/` du dossier ajouté **n'est pas** découverte : c'est uniquement un accès fichiers.
```
/add-dir ../autre-repo
```

### `/rewind` — difficulté 3
Revient à un état antérieur du **code** et/ou de la **conversation** (checkpoints). Permet d'annuler une série de changements après une mauvaise piste. Aussi accessible via `Échap + Échap` (prompt vide). **Depuis v2.1.191**, `/rewind` peut aussi reprendre une conversation à un état **antérieur à un `/clear`** : un effacement trop hâtif n'est plus définitif.
```
/rewind
```

### `/resume` — difficulté 2
Reprend une conversation précédente via un sélecteur. Équivalent interactif de `claude --resume`.
```
/resume
```

### `/export` — difficulté 1
Exporte le transcript de la session dans un fichier (archivage, partage, doc).
```
/export
```

### `/goal` — difficulté 2
**En clair :** vous donnez un but mesurable et Claude enchaîne les étapes en autonomie jusqu'à l'atteindre, au lieu de s'arrêter à chaque tour. Bascule la session en **mode autonome** : après chaque tour, un évaluateur rapide (Haiku) vérifie la condition ; tant qu'elle n'est pas remplie, Claude relance un tour guidé par le verdict ; dès qu'elle l'est, le goal se ferme. `/goal` seul affiche l'état (condition, durée, tours, tokens) ; `/goal clear` l'arrête.
```
/goal tous les tests de test/auth passent et le lint est clean
```
> Introduit en **v2.1.139**. L'évaluateur juge uniquement sur la conversation (il ne lit pas les fichiers) : rendez la condition observable dans le fil. Ajoutez « or stop after N turns » pour borner la durée. Nécessite le dialogue de confiance ; désactivé si les hooks sont bloqués. À distinguer de `/loop` (relance à intervalle fixe).

---

## Configuration

### `/config` — difficulté 1
Ouvre l'éditeur interactif des paramètres (thème, mode d'éditeur dont Vim, modèle par défaut, dictée vocale…). Écrit dans `settings.json`. Depuis **v2.1.181**, forme rapide `/config clé=valeur` pour régler un paramètre directement depuis le prompt (ex. `/config thinking=false`) ; `/config --help` liste les clés.

### `/model` — difficulté 2
Change le modèle utilisé sans perdre le contexte. Raccourci : `Option+P` / `Alt+P`.
```
/model sonnet
```
> Voir [05 — Modèles & bonnes pratiques](05-modeles-bonnes-pratiques.md).

### `/memory` — difficulté 2
Édite les fichiers mémoire (`CLAUDE.md` projet et global `~/.claude/CLAUDE.md`) chargés en contexte. Raccourci : commencer une ligne par `#` ajoute une note en mémoire.

### `/statusline` — difficulté 3
Personnalise la barre de statut (modèle, branche git, mode, coût…) via un script.

### `/hooks` — difficulté 4
Configure des **hooks** : commandes shell exécutées à des moments précis (avant/après un outil, à l'arrêt…). Automatise des comportements que Claude ne garantit pas (linting, notifications, garde-fous). Demande de comprendre le cycle de vie des événements et le format JSON des settings.

### `/permissions` — difficulté 3
Gère les règles d'autorisation des outils (`allow` / `deny` / `ask`), ex. autoriser `Bash(git *)`, refuser `Bash(rm *)`. Réduit les confirmations. Bien doser : trop permissif = risque, trop strict = friction.

### `/terminal-setup` — difficulté 1
Installe les bindings du terminal (ex. `Shift+Enter` multiligne) pour VS Code, Cursor, Alacritty, Zed… Inutile dans iTerm2/WezTerm/Ghostty/Kitty/Warp/Apple Terminal.

### `/privacy-settings` — difficulté 1
Ouvre les paramètres de confidentialité du compte.

---

## Code & Review

### `/init` — difficulté 2
Génère un **`CLAUDE.md`** documentant le dépôt (architecture, commandes build/test, conventions). Ce fichier est chargé à chaque session pour donner un contexte durable. Relire et élaguer le résultat.
```
/init
```

### `/review` — difficulté 2
Lance une revue de la pull request / du diff courant : bugs et améliorations. **Depuis v2.1.186**, `/review <PR>` s'appuie sur le même moteur que `/code-review medium`. Variante cloud multi-agents via `/code-review ultra` (facturée, déclenchée par l'utilisateur, nécessite un dépôt git).

---

## Agents & MCP

### `/agents` — difficulté 4
Crée et gère des **subagents** spécialisés (description, prompt système, outils, modèle). Un bon découpage améliore la qualité et isole le contexte. Concevoir de bons agents demande de la pratique.

### `/mcp` — difficulté 3
Gère les serveurs **MCP** (Model Context Protocol) : état, authentification, outils exposés. MCP connecte Claude à des services externes (GitHub, Slack, bases de données…).
```
/mcp
```
> Configuration via `.mcp.json` ou `claude mcp add`. L'auth des serveurs distants peut être délicate.

---

## Compte & maintenance

### `/status` — difficulté 1
État de la session : authentification, modèle actif, version, répertoire, intégrations. Premier réflexe de diagnostic.

### `/cost` — difficulté 1
Tokens consommés (entrée/sortie/cache) et coût estimé. Surtout utile pour les utilisateurs API.

### `/usage` — difficulté 1
Consommation par rapport aux limites de l'abonnement (Pro/Max).

### `/doctor` — difficulté 1
Diagnostique l'installation et l'auto-updater. À lancer en cas de comportement anormal. Équivalent shell : `claude doctor`.

### `/login` · `/logout` — difficulté 1
Connexion / déconnexion du compte Anthropic. Équivalents : `claude auth login` / `claude auth logout`.

### `/upgrade` — difficulté 1
Met à niveau le plan ou déclenche l'installation de la dernière version selon le contexte. Mise à jour du binaire : `claude update`.

### `/release-notes` — difficulté 1
Affiche les nouveautés des dernières versions. À consulter après une mise à jour.

### `/bug` — difficulté 1
Signale un bug à Anthropic. Attention au contexte de session potentiellement joint.

### `/help` — difficulté 1
Affiche l'aide et la liste des commandes disponibles. Point de départ pour découvrir votre version.

---

## Cœur utile additionnel (v2.1.x)

Commandes confirmées dans le binaire 2.1.191, au-delà des fondamentales ci-dessus.

### Workflow & session
- **`/plan`** (2) — Entre en mode plan (ou affiche le plan courant). Forme « commande » du mode plan.
- **`/effort`** (2) — Règle le niveau d'effort du modèle (low → max ; `ultracode` = xhigh + workflows).
- **`/fast`** (1) — Active/désactive le fast mode (même modèle, plus rapide). Aussi Option+O / Alt+O.
- **`/tasks`** (1) — Voir/gérer tout ce qui tourne en arrière-plan. Alias `/bashes`. Depuis v2.1.191, l'arrêt d'un agent depuis le panneau est définitif (plus de redémarrage automatique).
- **`/background`** (2) — Détache la session courante en agent d'arrière-plan. Alias `/bg`. Suivi `/tasks`, arrêt `/stop`.
- **`/diff`** (1) — Visionneuse des changements non commités et diffs par tour.
- **`/copy`** (1) — Copie la dernière réponse de Claude (`/copy N` pour la N-ième).
- **`/rename`** (1) — Renomme la conversation courante (auto si sans argument).
- **`/branch`** (2) — Crée un embranchement de la conversation au point courant. Retour via `/resume`.
- **`/fork`** (3) — Délègue à un subagent forké (hérite du contexte) en arrière-plan. v2.1.161+.

### Configuration & affichage
- **`/skills`** (1) — Liste les skills ; `t` trie par tokens, `Espace` masque une skill.
- **`/theme`** (1) — Change le thème de couleurs (auto/light/dark/colorblind/custom).
- **`/color`** (1) — Couleur de la barre de prompt de la session (utile en multi-fenêtres).
- **`/ide`** (1) — Gère les intégrations IDE et affiche leur état.
- **`/advisor`** (2) — Active un second modèle « conseiller » (`/advisor opus`, `off`). v2.1.98+.
- **`/plugin`** (2) — Gère les plugins Claude Code (`list`/`install`/`enable`/`disable`).
- **`/focus`** (1) — Vue épurée (prompt + résumé + réponse), fullscreen uniquement.
- **`/fewer-permission-prompts`** (2) — Construit une allowlist de permissions depuis votre usage réel.

### Cloud & compte
- **`/remote-control`** (2) — Rend la session pilotable depuis claude.ai. Alias `/rc`.
- **`/usage-credits`** (1) — Crédits pour continuer au-delà des limites (ex-`/extra-usage`).

### Code, revue & automatisation (skills intégrées)
- **`/code-review`** (3) — Revue du diff (bugs + nettoyages) ; niveaux d'effort, `--fix`, `--comment`, `ultra` (cloud).
- **`/simplify`** (2) — Nettoie le code modifié (qualité, pas de chasse aux bugs). v2.1.154+.
- **`/verify`** (3) — Vérifie qu'un changement marche en lançant réellement l'app. v2.1.145+.
- **`/security-review`** (3) — Revue de sécurité des changements en attente.
- **`/loop`** (2) — Lance un prompt/commande à intervalle régulier (`/loop 5m …`).
- **`/schedule`** (3) — Agents cloud planifiés (cron). Alias `/routines`.

---

## Commandes retirées (migrées)

Vérifié contre le binaire 2.1.191 — ces anciennes commandes n'existent plus comme telles :

| Ancienne commande | Où ça vit maintenant |
|-------------------|----------------------|
| `/vim` | `/config` → **Editor mode** (le mode Vim existe toujours) |
| `/output-style` | `/config` → **Output style** (la fonctionnalité existe toujours) |
| `/pr-comments` | Demandez à Claude en langage naturel de consulter les commentaires de la PR |
| `/extra-usage` | Renommée `/usage-credits` (fonctionnalité inchangée) |
