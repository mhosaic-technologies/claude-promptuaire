/*
 * data.js — Catalogue unique des commandes & fonctionnalités Claude
 * Source vérifiée : Claude Code 2.1.191 (inspection locale + docs officielles)
 *
 * ⚠️ MAINTENANCE : ce fichier est mis à jour par les skills du projet
 *    (/maj-claude-code, /maj-app-claude, /maj-modeles, /maj-bonnes-pratiques).
 *    L'interface (index.html) ne contient AUCUNE donnée : tout est ici.
 *
 * Champs par entrée :
 *   id         : identifiant unique (slug)
 *   section    : 'slash' | 'cli' | 'shortcuts' | 'app' | 'models'
 *   sub        : sous-section (app: 'chat'|'cowork'|'code' ; models: 'modeles'|'pratiques')
 *   category   : sous-catégorie d'affichage
 *   name       : nom de la commande / fonctionnalité
 *   win        : (optionnel) surcharges pour Windows/Linux { name, example, details… }
 *   oneLine    : résumé en une phrase
 *   simple     : « En clair » — explication vulgarisée pour débutants
 *   details    : explication du fonctionnement (2-4 phrases)
 *   pro        : « Pour aller plus loin » — astuce / nuance pour utilisateurs avancés
 *   example    : exemple concret d'utilisation
 *   output     : (optionnel) sortie simulée affichée dans le mockup
 *   difficulty : 1 (trivial) à 5 (maîtrise difficile)
 *   notes      : pièges, prérequis, commandes liées
 *   mockup     : 'terminal' (défaut) | 'chat' | 'cowork' | 'code' — style du visuel
 */

window.CLAUDE_META = {
  version: "2.1.191",
  updated: "2026-07-02",
  feedbackEmail: "aurelien@mhosaic.com",
  models: [
    { alias: "fable",  id: "claude-fable-5",   label: "Fable 5",   inPrice: 10, outPrice: 50, context: "1M",   note: "Thinking adaptatif toujours actif" },
    { alias: "opus",   id: "claude-opus-4-8",  label: "Opus 4.8",  inPrice: 5,  outPrice: 25, context: "1M",   note: "Le plus capable" },
    { alias: "sonnet", id: "claude-sonnet-4-6",label: "Sonnet 4.6",inPrice: 3,  outPrice: 15, context: "1M",   note: "Équilibre vitesse/qualité" },
    { alias: "haiku",  id: "claude-haiku-4-5", label: "Haiku 4.5", inPrice: 1,  outPrice: 5,  context: "200K", note: "Le plus rapide / économe" }
  ]
};

window.DIFFICULTY_LABELS = { 1: "Trivial", 2: "Facile", 3: "Intermédiaire", 4: "Avancé", 5: "Expert" };

window.SECTIONS = [
  { id: "slash",     label: "Slash commands", icon: "⌘", blurb: "Commandes /commande tapées dans une session Claude Code." },
  { id: "cli",       label: "Flags & CLI",    icon: "❯", blurb: "Arguments de lancement et sous-commandes du terminal." },
  { id: "shortcuts", label: "Raccourcis & modes", icon: "⇧", blurb: "Raccourcis clavier (Mac/Windows) et modes de permission.", platformSwitch: true },
  { id: "app",       label: "App Claude",     icon: "◆", blurb: "Les 3 espaces de l'app : Chat, Cowork et Code.",
    subs: [ { id: "chat", label: "Chat" }, { id: "cowork", label: "Cowork" }, { id: "code", label: "Code" } ] },
  { id: "models",    label: "Modèles & bonnes pratiques", icon: "✸", blurb: "Choisir un modèle et bien travailler.",
    subs: [ { id: "modeles", label: "Modèles" }, { id: "pratiques", label: "Bonnes pratiques" } ] },
  { id: "optim",     label: "Optimiser les tokens", icon: "↓", blurb: "Le playbook complet : économiser les tokens, router les modèles, outils & mesure.",
    subs: [ { id: "routage", label: "Modèles & routage" }, { id: "contexte", label: "Contexte" }, { id: "cache", label: "Cache" }, { id: "outils", label: "Outils & sortie" }, { id: "mesure", label: "Mesure & budget" } ] }
];

window.COMMANDS = [
  /* ============================== SLASH COMMANDS ============================== */
  {
    id: "slash-help", section: "slash", category: "Aide", name: "/help",
    oneLine: "Affiche l'aide et la liste des commandes disponibles.",
    simple: "La commande à taper quand on est perdu : elle liste tout ce que Claude Code sait faire.",
    details: "Ouvre l'aide intégrée : liste des slash commands, raccourcis principaux et liens utiles. C'est le point de départ pour découvrir ce qui est disponible dans votre version.",
    pro: "Tapez simplement / puis quelques lettres pour filtrer instantanément les commandes, sans passer par /help.",
    example: "/help",
    output: "Available commands:\n  /clear     Clear conversation\n  /compact   Summarize & free context\n  /model     Switch model\n  /agents    Manage subagents\n  ...",
    difficulty: 1,
    notes: "La liste exacte dépend de la version et des plugins/skills installés."
  },
  {
    id: "slash-clear", section: "slash", category: "Session", name: "/clear",
    oneLine: "Efface la conversation et repart d'un contexte vierge.",
    simple: "Comme effacer un tableau blanc : on repart de zéro, Claude oublie tout ce qui précède dans la session.",
    details: "Supprime tout l'historique de la session courante de la fenêtre de contexte. Idéal pour passer à une tâche sans rapport sans payer le coût en tokens de l'ancien contexte. Irréversible pour la session en cours.",
    pro: "Faire /clear systématiquement entre deux sujets distincts est un réflexe d'expert : un historique hors-sujet dégrade la qualité ET le coût.",
    example: "/clear",
    output: "✔ Conversation cleared. Starting fresh.",
    difficulty: 1,
    notes: "À privilégier entre deux tâches distinctes plutôt que /compact, qui garde un résumé."
  },
  {
    id: "slash-compact", section: "slash", category: "Contexte", name: "/compact",
    oneLine: "Résume la conversation pour libérer de la fenêtre de contexte.",
    simple: "Claude se fait un résumé de la conversation pour libérer de la place, sans perdre le fil de la tâche en cours.",
    details: "Remplace l'historique par un résumé condensé, en conservant les éléments clés. Utile quand la session devient longue et que vous voulez continuer la même tâche sans perdre le fil. Vous pouvez guider le résumé avec une instruction.",
    pro: "Donnez une instruction de compactage ciblée (« garde le TODO et les décisions d'architecture ») pour contrôler exactement ce qui survit au résumé.",
    example: '/compact garde les décisions d\'architecture et le TODO',
    output: "Compacting…\n✔ kept 4 200 tokens (was 78 000). Continuing.",
    difficulty: 2,
    notes: "Se déclenche aussi automatiquement près de la limite. Pour une coupure nette, préférez /clear."
  },
  {
    id: "slash-context", section: "slash", category: "Contexte", name: "/context",
    oneLine: "Visualise l'occupation de la fenêtre de contexte.",
    simple: "Une jauge qui montre ce qui remplit la « mémoire de travail » de Claude : fichiers lus, historique, outils…",
    details: "Affiche la répartition des tokens : system prompt, CLAUDE.md, fichiers lus, outils, historique. Indispensable pour comprendre ce qui consomme votre contexte et décider quand compacter ou nettoyer.",
    pro: "Surveillez la part de l'historique : au-delà de ~70 %, lancez /compact ou /clear vous-même avant que l'auto-compactage ne décide à votre place.",
    example: "/context",
    output: "Context: 62 400 / 200 000 tokens (31%)\n  System ........ 8%\n  CLAUDE.md ..... 3%\n  History ...... 78%\n  Tools ........ 11%",
    difficulty: 2,
    notes: "Lire ce panneau avant de décider entre /compact et /clear."
  },
  {
    id: "slash-cost", section: "slash", category: "Compte", name: "/cost",
    oneLine: "Affiche le coût et la consommation de tokens de la session.",
    simple: "Le compteur de consommation : combien de tokens (et de dollars, sur API) la session a utilisés.",
    details: "Montre les tokens consommés (entrée/sortie/cache) et, le cas échéant, le coût estimé. Utile pour les utilisateurs API ; sur abonnement, sert surtout à suivre la consommation.",
    pro: "La ligne « cache read » est le signal clé : une part élevée signifie que votre contexte stable (CLAUDE.md, fichiers) est bien réutilisé à ~10 % du prix.",
    example: "/cost",
    output: "Session: 1.2M in / 84k out\n  Cache read: 920k (saved ~73%)\n  Est. cost: $2.14",
    difficulty: 1,
    notes: "Voir aussi /usage pour les limites d'abonnement."
  },
  {
    id: "slash-usage", section: "slash", category: "Compte", name: "/usage",
    oneLine: "Affiche votre consommation par rapport aux limites de l'abonnement.",
    simple: "Montre où vous en êtes de votre forfait : limites horaires et hebdomadaires de votre plan.",
    details: "Indique où vous en êtes dans vos quotas (limites horaires/hebdomadaires selon le plan). Pratique pour anticiper un plafond avant une grosse session.",
    pro: "Si la fenêtre hebdo approche du plein, déléguez les tâches simples à Haiku ou planifiez le gros travail après le reset.",
    example: "/usage",
    difficulty: 1,
    notes: "Disponible sur les plans avec abonnement (Pro/Max)."
  },
  {
    id: "slash-config", section: "slash", category: "Configuration", name: "/config",
    oneLine: "Ouvre l'éditeur interactif des paramètres.",
    simple: "Le panneau de réglages : thème, modèle par défaut, mode d'éditeur, dictée vocale…",
    details: "Interface pour modifier le thème, le mode d'éditeur (dont Vim), le style de sortie (Output style), le modèle par défaut, la dictée vocale, etc., sans éditer le JSON à la main. Depuis v2.1.181, `/config clé=valeur` règle un paramètre directement depuis le prompt (ex. `/config thinking=false`), sans ouvrir le menu ; `/config --help` liste les clés disponibles. Les changements sont écrits dans settings.json.",
    pro: "La forme rapide `/config clé=valeur` marche aussi en mode -p et Remote Control : idéale pour scripter un réglage ou le changer à la volée. C'est aussi le point d'entrée des réglages qui avaient leur propre commande : le **mode Vim** (anciennement /vim) et le **style de sortie** (anciennement /output-style).",
    example: "/config   ·   /config thinking=false",
    difficulty: 1,
    notes: "Équivalent GUI de ~/.claude/settings.json. Forme rapide `/config clé=valeur` (v2.1.181). Héberge Editor mode (Vim) et Output style depuis le retrait de /vim et /output-style."
  },
  {
    id: "slash-model", section: "slash", category: "Configuration", name: "/model",
    oneLine: "Change le modèle utilisé dans la session.",
    simple: "Change de « cerveau » en cours de route : plus puissant pour le difficile, plus rapide et économe pour le simple.",
    details: "Bascule entre Opus, Sonnet, Haiku, Fable (ou un ID complet) sans perdre le contexte. Choisissez un modèle plus léger pour des tâches simples et économiser, un modèle plus puissant pour le raisonnement complexe.",
    pro: "Montez sur Opus le temps d'un débogage épineux puis redescendez sur Sonnet : le contexte est intégralement conservé, seul le modèle change.",
    example: "/model sonnet",
    output: "Model → Sonnet 4.6 (claude-sonnet-4-6)",
    difficulty: 2,
    notes: "Raccourci : Option+P (macOS) / Alt+P (Windows). Voir la section Modèles."
  },
  {
    id: "slash-init", section: "slash", category: "Code & Review", name: "/init",
    oneLine: "Génère un fichier CLAUDE.md documentant le dépôt.",
    simple: "Demande à Claude d'écrire la « notice » de votre projet (CLAUDE.md), qu'il relira à chaque session pour mieux travailler.",
    details: "Analyse le projet et crée un CLAUDE.md décrivant l'architecture, les commandes de build/test et les conventions. Ce fichier est chargé à chaque session pour donner du contexte durable à Claude. À relancer quand le projet évolue beaucoup.",
    pro: "Relisez et élaguez le CLAUDE.md généré : chaque ligne est rechargée à chaque session, donc la densité d'information prime sur l'exhaustivité.",
    example: "/init",
    output: "Analyzing repository…\n✔ Wrote CLAUDE.md (build, test, structure, conventions)",
    difficulty: 2,
    notes: "Relire et corriger le CLAUDE.md généré ; c'est un point d'appui majeur pour la qualité."
  },
  {
    id: "slash-memory", section: "slash", category: "Configuration", name: "/memory",
    oneLine: "Édite les fichiers de mémoire (CLAUDE.md) chargés en contexte.",
    simple: "Ouvre le carnet de notes permanent de Claude : ce qu'il doit retenir pour ce projet (ou pour vous, globalement).",
    details: "Ouvre les fichiers mémoire (projet, global ~/.claude/CLAUDE.md) pour y ajouter des instructions persistantes. Raccourci : commencer une ligne par # ajoute rapidement une note en mémoire.",
    pro: "Hiérarchie utile : ~/.claude/CLAUDE.md (préférences perso globales) < CLAUDE.md projet (conventions d'équipe) < instructions de session (ponctuel).",
    example: "/memory",
    difficulty: 2,
    notes: "Le préfixe # dans le prompt enregistre une mémoire en un geste."
  },
  {
    id: "slash-agents", section: "slash", category: "Agents & MCP", name: "/agents",
    oneLine: "Crée et gère des subagents spécialisés.",
    simple: "Crée des « assistants spécialisés » (relecteur, chercheur, testeur…) à qui Claude peut déléguer des sous-tâches.",
    details: "Interface pour définir des agents (description, prompt système, outils autorisés, modèle) que Claude peut déléguer pour des tâches ciblées. Un bon découpage en agents améliore la qualité et isole le contexte.",
    pro: "Limitez les outils de chaque agent à son strict besoin : un agent de recherche en lecture seule est à la fois plus sûr et plus focalisé. Affectez Haiku aux agents à fort volume.",
    example: "/agents",
    difficulty: 4,
    notes: "Concevoir de bons agents (périmètre, outils) demande de la pratique. Lié à la délégation parallèle."
  },
  {
    id: "slash-mcp", section: "slash", category: "Agents & MCP", name: "/mcp",
    oneLine: "Gère les serveurs MCP (Model Context Protocol) connectés.",
    simple: "Le tableau de bord des « branchements » de Claude vers vos outils externes : GitHub, Slack, bases de données…",
    details: "Affiche l'état des serveurs MCP, permet de les authentifier et d'inspecter les outils exposés. MCP connecte Claude à des services externes (GitHub, Slack, bases de données…).",
    pro: "Un serveur en échec se diagnostique avec `claude mcp get <nom>` ; en cas de conflit, `--strict-mcp-config` isole une configuration précise pour la session.",
    example: "/mcp",
    output: "MCP servers:\n  github   ● connected (12 tools)\n  sentry   ○ needs auth\n  postgres ● connected (4 tools)",
    difficulty: 3,
    notes: "Configuration via .mcp.json ou `claude mcp add`. L'auth des serveurs distants peut être délicate."
  },
  {
    id: "slash-review", section: "slash", category: "Code & Review", name: "/review",
    oneLine: "Lance une revue de la pull request / du diff courant.",
    simple: "Claude relit votre code et signale bugs et améliorations, comme un collègue qui ferait la revue de votre PR.",
    details: "Demande à Claude d'examiner les changements (PR ou diff local) et de remonter bugs et améliorations. Depuis v2.1.186, `/review <PR>` s'appuie sur le même moteur de revue que `/code-review medium`. Variante cloud multi-agents via /code-review ultra (facturée, déclenchée par l'utilisateur).",
    pro: "/code-review ultra lance une revue cloud multi-agents bien plus profonde sur la branche courante (ou /code-review ultra <PR#> pour une PR GitHub).",
    example: "/review",
    difficulty: 2,
    notes: "Depuis v2.1.186, /review <PR> utilise le moteur de /code-review medium (source : changelog Claude Code). La revue « ultra » nécessite un dépôt git."
  },
  {
    id: "slash-rewind", section: "slash", category: "Session", name: "/rewind",
    oneLine: "Revient à un état antérieur de la conversation et du code.",
    simple: "La machine à remonter le temps : revenez à un état antérieur du code et/ou de la discussion, comme un « annuler » géant.",
    details: "Ouvre un menu pour restaurer le code et/ou la conversation à un point précédent (checkpoints). Permet d'annuler une série de changements et de repartir d'un état sain. Aussi accessible via Échap + Échap. Depuis v2.1.191, /rewind peut aussi reprendre une conversation à un état antérieur à un /clear.",
    pro: "Distinguez « restaurer le code seul » (garder la discussion) de « restaurer les deux » : le premier est précieux pour retenter le même objectif avec un prompt différent. Filet de sécurité utile : un /clear trop hâtif n'est plus définitif, /rewind peut remonter avant.",
    example: "/rewind",
    difficulty: 3,
    notes: "Distinguer rewind du code vs rewind de la conversation. Très utile après une mauvaise piste. v2.1.191 : permet de remonter avant un /clear (source : changelog Claude Code, 2026-06-25)."
  },
  {
    id: "slash-resume", section: "slash", category: "Session", name: "/resume",
    oneLine: "Reprend une conversation précédente via un sélecteur.",
    simple: "Rouvre une ancienne conversation exactement là où vous l'aviez laissée, avec toute sa mémoire.",
    details: "Affiche la liste des sessions passées pour en reprendre une avec son contexte. Équivalent interactif de `claude --resume`.",
    pro: "`claude -c --fork-session` reprend la dernière session en créant une branche indépendante : idéal pour explorer une variante sans écraser l'original.",
    example: "/resume",
    difficulty: 2,
    notes: "En ligne de commande : `claude -c` (dernière) ou `claude -r` (sélecteur)."
  },
  {
    id: "slash-export", section: "slash", category: "Session", name: "/export",
    oneLine: "Exporte la conversation courante dans un fichier.",
    simple: "Sauvegarde la conversation dans un fichier, pour l'archiver ou la partager.",
    details: "Sauvegarde le transcript de la session (par ex. en Markdown) pour archivage, partage ou documentation. Utile pour conserver une trace d'une session importante.",
    pro: "Exportez vos sessions de référence (un gros refactor réussi, une investigation de bug) : elles deviennent de la documentation de démarche réutilisable.",
    example: "/export",
    difficulty: 1,
    notes: "Pratique pour partager une démarche ou alimenter une doc."
  },
  {
    id: "slash-goal", section: "slash", category: "Session", name: "/goal",
    oneLine: "Fixe une condition de réussite et laisse Claude travailler en autonomie jusqu'à l'atteindre.",
    simple: "Vous donnez un but mesurable (« tous les tests passent ») et Claude enchaîne les étapes tout seul jusqu'à l'atteindre, au lieu de s'arrêter à chaque tour pour vous demander la suite.",
    details: "Bascule la session en mode autonome : après chaque tour, un évaluateur rapide (Haiku) vérifie si la condition est remplie. Tant que non, Claude relance un tour, guidé par le verdict de l'évaluateur ; dès que oui, le goal se ferme automatiquement. `/goal` seul affiche l'état (condition, durée, tours, tokens) ; `/goal clear` l'arrête.",
    pro: "L'évaluateur juge UNIQUEMENT sur la conversation (il ne lit pas les fichiers) : rendez la condition observable dans le fil (« les tests affichent 0 failed »). Ajoutez « or stop after N turns » pour borner la durée. Brille avec une spec complète donnée d'emblée et un effort élevé sur Opus 4.8 / Fable 5.",
    example: "/goal tous les tests de test/auth passent et le lint est clean",
    output: "🎯 Goal: tests test/auth passent + lint clean\n  turn 1 → tests… 3 failed\n  turn 2 → patch refresh token… 1 failed\n  turn 3 → lint --fix · tests…\n✔ Goal atteint (3 tours · 2m14s · 0.38$)",
    difficulty: 2,
    notes: "Introduit en v2.1.139. Nécessite le dialogue de confiance accepté ; désactivé si les hooks sont bloqués par les settings. Condition ≤ 4 000 caractères. Survit à /resume (le compteur de tours est remis à zéro). À distinguer de /loop (relance à intervalle fixe)."
  },
  {
    id: "slash-hooks", section: "slash", category: "Configuration", name: "/hooks",
    oneLine: "Configure des hooks déclenchés par des événements.",
    simple: "Des automatismes : « à chaque fois que Claude fait X, exécute Y » — lancer le linter après chaque édition, recevoir une notification à la fin…",
    details: "Les hooks exécutent des commandes shell à des moments précis (avant/après un outil, à l'arrêt, etc.). Ils permettent d'automatiser des comportements que Claude lui-même ne garantit pas (linting, notifications, garde-fous).",
    pro: "Un hook PreToolUse peut bloquer ou amender une commande avant son exécution : c'est le seul garde-fou que le prompt seul ne peut pas garantir.",
    example: "/hooks",
    difficulty: 4,
    notes: "Puissant mais demande de comprendre le cycle de vie des événements et le format JSON des settings."
  },
  {
    id: "slash-permissions", section: "slash", category: "Configuration", name: "/permissions",
    oneLine: "Gère les règles d'autorisation des outils (allow/deny/ask).",
    simple: "Définit ce que Claude a le droit de faire sans vous demander la permission — et ce qui lui est interdit.",
    details: "Permet d'ajouter des règles fines (ex. autoriser `Bash(git *)`, refuser `Bash(rm *)`) pour réduire les demandes de confirmation. Les règles sont stockées dans les settings et appliquées selon le mode.",
    pro: "Les règles deny priment dans TOUS les modes, même bypass : auditez-les en premier. La skill /fewer-permission-prompts propose une allowlist basée sur votre usage réel.",
    example: "/permissions",
    difficulty: 3,
    notes: "Bien doser : trop permissif = risque, trop strict = friction."
  },
  {
    id: "slash-statusline", section: "slash", category: "Configuration", name: "/statusline",
    oneLine: "Configure la barre de statut du terminal.",
    simple: "Personnalise la ligne d'informations en bas du terminal : modèle actif, branche git, coût…",
    details: "Personnalise les informations affichées dans la status line (modèle, branche git, mode, coût…) via un script. Améliore la visibilité de l'état de la session.",
    pro: "La statusline exécute votre script avec un JSON décrivant la session en entrée : affichez les indicateurs que VOUS pilotez (coût cumulé, mode, contexte).",
    example: "/statusline",
    difficulty: 3,
    notes: "Repose sur un script ; demande un peu de configuration."
  },
  {
    id: "slash-terminal-setup", section: "slash", category: "Configuration", name: "/terminal-setup",
    oneLine: "Configure les raccourcis clavier de votre terminal.",
    simple: "Règle votre terminal en un clic pour que Shift+Entrée fasse un retour à la ligne (au lieu d'envoyer le message).",
    details: "Installe les bindings nécessaires (ex. Shift+Enter pour le multiligne) dans les terminaux qui ne les gèrent pas nativement (VS Code, Cursor, Alacritty, Zed…).",
    pro: "Inutile dans iTerm2, WezTerm, Ghostty, Kitty, Warp et Apple Terminal : Shift+Enter y marche déjà nativement.",
    example: "/terminal-setup",
    difficulty: 1,
    notes: "Nécessaire surtout pour VS Code, Cursor, Alacritty et Zed."
  },
  {
    id: "slash-add-dir", section: "slash", category: "Contexte", name: "/add-dir",
    oneLine: "Ajoute un répertoire de travail accessible pour la session.",
    simple: "Donne à Claude l'accès à un dossier supplémentaire, en plus du projet courant.",
    details: "Accorde l'accès aux fichiers d'un dossier supplémentaire, au-delà du répertoire courant. La configuration .claude/ du dossier ajouté n'est pas découverte ; c'est uniquement un accès fichiers.",
    pro: "L'accès est strictement « fichiers » : les skills, hooks et CLAUDE.md du dossier ajouté ne sont PAS chargés — seul le projet de départ fait foi.",
    example: "/add-dir ../autre-repo",
    difficulty: 1,
    notes: "Équivalent CLI : `claude --add-dir`."
  },
  {
    id: "slash-status", section: "slash", category: "Compte", name: "/status",
    oneLine: "Affiche l'état de la session (compte, modèle, version, connexions).",
    simple: "La carte d'identité de la session : quel compte, quel modèle, quelle version, quelles connexions actives.",
    details: "Récapitule l'authentification, le modèle actif, la version, le répertoire et l'état des intégrations. Premier réflexe de diagnostic.",
    pro: "Premier réflexe avant /doctor : la plupart des « pannes » sont en réalité un mauvais compte connecté ou un modèle inattendu.",
    example: "/status",
    difficulty: 1,
    notes: "Pour les soucis d'installation, voir /doctor."
  },
  {
    id: "slash-doctor", section: "slash", category: "Maintenance", name: "/doctor",
    oneLine: "Diagnostique l'installation et l'auto-updater.",
    simple: "Le check-up santé de l'installation : vérifie que tout est à jour et fonctionne.",
    details: "Vérifie la santé de Claude Code (mise à jour, MCP, environnement) et signale les problèmes courants. À lancer quand quelque chose se comporte anormalement.",
    pro: "Combinez avec `claude --safe-mode` pour départager un bug produit d'un problème de configuration personnelle (hooks, plugins, CLAUDE.md).",
    example: "/doctor",
    difficulty: 1,
    notes: "Équivalent : `claude doctor` depuis le shell."
  },
  {
    id: "slash-login", section: "slash", category: "Compte", name: "/login",
    oneLine: "Se connecte à un compte Anthropic.",
    simple: "S'identifier auprès de Claude : nécessaire la première fois ou pour changer de compte.",
    details: "Authentifie la session (abonnement Claude ou clé API selon la configuration). Nécessaire au premier usage ou pour changer de compte.",
    pro: "Pour les environnements non interactifs (CI, serveurs), `claude setup-token` crée un jeton d'authentification longue durée.",
    example: "/login",
    difficulty: 1,
    notes: "Équivalent CLI : `claude auth login`. Voir aussi /logout."
  },
  {
    id: "slash-logout", section: "slash", category: "Compte", name: "/logout",
    oneLine: "Se déconnecte du compte Anthropic.",
    simple: "Se déconnecter : efface les identifiants stockés sur la machine.",
    details: "Efface les identifiants stockés. Utile pour changer de compte ou sur une machine partagée.",
    pro: "Sur une machine partagée, le réflexe de fin de session : /logout efface les identifiants locaux. En cas de conflit d'auth avec un profil `ant`, c'est aussi /logout qu'il faut faire pour garder le profil CLI.",
    example: "/logout",
    difficulty: 1,
    notes: "Équivalent : `claude auth logout`."
  },
  {
    id: "slash-bug", section: "slash", category: "Aide", name: "/bug",
    oneLine: "Signale un bug à Anthropic depuis la session.",
    simple: "Envoie un rapport de bug directement aux équipes d'Anthropic, sans quitter le terminal.",
    details: "Ouvre un flux pour rapporter un problème, en joignant éventuellement du contexte de session. Contribue à l'amélioration du produit.",
    pro: "Le rapport peut joindre du contexte de session : relisez ce qui part si la conversation contient des données sensibles.",
    example: "/bug",
    difficulty: 1,
    notes: "Attention au contenu partagé (peut inclure du contexte de session)."
  },
  {
    id: "slash-release-notes", section: "slash", category: "Aide", name: "/release-notes",
    oneLine: "Affiche les nouveautés des dernières versions.",
    simple: "Les nouveautés de la dernière mise à jour, sans quitter le terminal.",
    details: "Montre le changelog récent pour découvrir les nouvelles commandes et fonctionnalités. Utile après une mise à jour.",
    pro: "Claude Code sort plusieurs versions par semaine : un coup d'œil hebdomadaire aux release notes rentabilise vite (nouvelles commandes, raccourcis…).",
    example: "/release-notes",
    difficulty: 1,
    notes: "Claude Code évolue vite ; à consulter régulièrement."
  },
  {
    id: "slash-privacy", section: "slash", category: "Configuration", name: "/privacy-settings",
    oneLine: "Ouvre les paramètres de confidentialité.",
    simple: "Vos réglages de confidentialité (utilisation des données…), accessibles depuis la session.",
    details: "Permet de régler vos préférences de confidentialité (utilisation des données, etc.) directement depuis la session.",
    pro: "À vérifier une fois en début de projet, surtout en contexte pro : la politique d'utilisation des données peut être pilotée au niveau organisation sur Team/Enterprise.",
    example: "/privacy-settings",
    difficulty: 1,
    notes: "Réglages liés au compte."
  },
  {
    id: "slash-upgrade", section: "slash", category: "Compte", name: "/upgrade",
    oneLine: "Met à niveau le plan / déclenche la mise à jour selon le contexte.",
    simple: "Passer à un plan supérieur, ou installer la dernière version selon le contexte.",
    details: "Selon le contexte, propose de passer à un plan supérieur ou d'installer la dernière version. Pour mettre à jour le binaire, `claude update` est l'équivalent shell.",
    pro: "Ne pas confondre les deux usages : /upgrade vise le plan d'abonnement, `claude update` (shell) met à jour le binaire. Pour la version, /status ou `claude --version`.",
    example: "/upgrade",
    difficulty: 1,
    notes: "Mise à jour du binaire : `claude update`."
  },

  /* ===== SLASH — cœur utile additionnel (confirmé binaire 2.1.191) ===== */
  {
    id: "slash-plan", section: "slash", category: "Session", name: "/plan",
    oneLine: "Entre en mode plan (ou affiche le plan de la session courante).",
    simple: "Demande à Claude de réfléchir et de proposer un plan d'abord, sans rien modifier — vous validez avant qu'il agisse.",
    details: "Active le mode plan : Claude explore en lecture seule et rédige une démarche que vous approuvez avant exécution. Sans argument, affiche le plan courant ; avec une description, démarre directement sur ce sujet. Équivaut au cran « plan » du cycle Shift+Tab.",
    pro: "À l'approbation, choisissez le mode d'exécution (auto / acceptEdits / manuel) selon le risque. Réflexe recommandé dès qu'une tâche touche plus de 2-3 fichiers.",
    example: "/plan migre ce module vers TypeScript",
    output: "Plan mode ⏸ (lecture seule)\n  1. Repérer les imports JS du module\n  2. Convertir types + signatures\n  3. Adapter les tests\n→ Approuver ? (auto / acceptEdits / manuel)",
    difficulty: 2,
    notes: "Forme « commande » du mode plan (aussi via Shift+Tab). Voir les modes de permission."
  },
  {
    id: "slash-effort", section: "slash", category: "Configuration", name: "/effort",
    oneLine: "Règle le niveau d'effort de raisonnement du modèle.",
    simple: "Le bouton d'intensité de réflexion : bas pour aller vite et économiser, haut pour les problèmes difficiles.",
    details: "Définit l'effort (low / medium / high / xhigh / max) pour la session. Plus l'effort est élevé, plus Claude réfléchit et agit en profondeur — au prix de tokens et de latence. `ultracode` = xhigh + orchestration de workflows dynamiques.",
    pro: "Repères : `low` pour le mécanique, `high` pour le quotidien exigeant, `xhigh` pour le code et l'agentique, `max` quand l'erreur coûte plus cher que les tokens. Aussi via Option+T pour le thinking et la slider interactive.",
    example: "/effort xhigh",
    output: "Effort → xhigh  (raisonnement approfondi + outils)",
    difficulty: 2,
    notes: "Prend effet immédiatement. Voir aussi --effort au lancement et la fiche « Doser l'effort »."
  },
  {
    id: "slash-fast", section: "slash", category: "Configuration", name: "/fast",
    oneLine: "Active/désactive le fast mode.",
    simple: "Un accélérateur : les réponses arrivent plus vite, sans changer de modèle ni perdre en intelligence.",
    details: "Bascule le fast mode, qui accélère la génération (notamment d'Opus) sans passer à un modèle plus petit. Disponible sur Opus 4.6 et plus récents.",
    pro: "Fast mode n'est PAS un downgrade : c'est le même modèle servi plus vite. À activer pour les sessions interactives où la latence vous freine. Raccourci : Option+O / Alt+O.",
    example: "/fast",
    output: "⚡ Fast mode on",
    difficulty: 1,
    notes: "Raccourci équivalent : Option+O (macOS) / Alt+O (Windows)."
  },
  {
    id: "slash-tasks", section: "slash", category: "Session", name: "/tasks",
    oneLine: "Voir et gérer tout ce qui tourne en arrière-plan.",
    simple: "Le tableau de bord des travaux en arrière-plan : agents détachés, commandes longues, workflows — pour les suivre ou les arrêter.",
    details: "Ouvre la vue des éléments en arrière-plan (sessions détachées, bashes, agents) pour les inspecter, les reprendre ou les stopper. Alias `/bashes`. Depuis v2.1.191, arrêter un agent depuis ce panneau est définitif : il ne redémarre plus tout seul.",
    pro: "Couplé à /background (détacher) et /stop (arrêter) : vous lancez un gros travail en fond, continuez autre chose, et revenez via /tasks pour récupérer le résultat.",
    example: "/tasks",
    output: "Background:\n  ● agent: refacto-api        running (2m)\n  ● bash: npm run build       running\n  ○ agent: export-csv         done",
    difficulty: 1,
    notes: "Alias /bashes. Raccourci d'affichage : Ctrl+B pour mettre en arrière-plan. v2.1.191 : l'arrêt d'un agent depuis le panneau est désormais permanent (source : changelog Claude Code)."
  },
  {
    id: "slash-background", section: "slash", category: "Session", name: "/background",
    oneLine: "Détache la session courante pour la faire tourner en arrière-plan.",
    simple: "Renvoie le travail en cours « en coulisses » pour libérer votre terminal — il continue tout seul, vous le retrouvez plus tard.",
    details: "Détache la session active : elle poursuit son travail comme agent d'arrière-plan et libère le terminal. On la suit via /tasks et on l'arrête via /stop. Alias `/bg`.",
    pro: "Idéal pour les tâches longues et autonomes (surtout avec /goal) : détachez, faites autre chose, revenez quand c'est fini. /stop garde le transcript et le worktree.",
    example: "/background",
    output: "↳ Session détachée. Suivi : /tasks · Arrêt : /stop",
    difficulty: 2,
    notes: "Alias /bg. Voir /tasks (suivi) et /stop (arrêt en gardant transcript + worktree)."
  },
  {
    id: "slash-diff", section: "slash", category: "Code & Review", name: "/diff",
    oneLine: "Visionneuse interactive des changements non commités et par tour.",
    simple: "Affiche, comme un vrai outil de diff, ce qui a changé dans le code — global (git) ou tour par tour.",
    details: "Ouvre une vue de diff navigable : changements git non commités et diffs produits à chaque tour de la session. Navigation aux flèches.",
    pro: "Parfait compagnon du mode acceptEdits : laissez Claude éditer librement, puis relisez tout d'un bloc dans /diff avant de commiter.",
    example: "/diff",
    output: "src/auth/token.ts   +12 −4\nsrc/auth/index.ts   +3  −1\n(↑/↓ pour naviguer)",
    difficulty: 1,
    notes: "Inspection visuelle ; complète bien acceptEdits."
  },
  {
    id: "slash-copy", section: "slash", category: "Session", name: "/copy",
    oneLine: "Copie la dernière réponse de Claude dans le presse-papiers.",
    simple: "Met la dernière réponse de Claude dans votre presse-papiers, prête à coller ailleurs.",
    details: "Copie la dernière réponse (ou `/copy N` pour la N-ième plus récente). Si la réponse contient des blocs de code, un sélecteur s'ouvre ; `w` permet d'écrire dans un fichier.",
    pro: "Particulièrement utile en SSH où le copier-souris ne traverse pas : /copy met directement dans le presse-papiers système (activer l'accès clipboard iTerm2 si besoin).",
    example: "/copy   # ou /copy 2",
    output: "📋 Réponse copiée dans le presse-papiers",
    difficulty: 1,
    notes: "Sur certains terminaux, activer l'accès clipboard (ex. iTerm2)."
  },
  {
    id: "slash-rename", section: "slash", category: "Session", name: "/rename",
    oneLine: "Renomme la conversation courante.",
    simple: "Donne un nom clair à la session pour la retrouver facilement plus tard.",
    details: "Renomme la session active ; sans argument, un nom est généré automatiquement à partir de l'historique. Le nom apparaît dans le sélecteur /resume et le titre du terminal.",
    pro: "Nommez tôt et explicitement (« fix-auth-token ») : retrouver « la session du refactor » parmi 40 sessions anonymes via /resume est pénible.",
    example: "/rename fix-auth-token",
    difficulty: 1,
    notes: "Aussi : claude -n <nom> au lancement."
  },
  {
    id: "slash-branch", section: "slash", category: "Session", name: "/branch",
    oneLine: "Crée un embranchement de la conversation au point courant.",
    simple: "Duplique la discussion ici pour explorer une autre piste sans perdre ni abîmer la conversation d'origine.",
    details: "Crée un fork de la conversation à l'endroit courant. Vous explorez une variante, puis revenez à la branche d'origine avec /resume. Non destructif.",
    pro: "Pour déléguer la variante en tâche de fond plutôt que basculer dessus, utilisez /fork (subagent en arrière-plan) ; /branch reste dans votre fil principal.",
    example: "/branch",
    output: "🌿 Nouvelle branche créée ici. Retour : /resume",
    difficulty: 2,
    notes: "Non destructif. Voir /fork pour une variante déléguée en arrière-plan."
  },
  {
    id: "slash-fork", section: "slash", category: "Session", name: "/fork",
    oneLine: "Délègue à un subagent forké qui hérite de la conversation et travaille en arrière-plan.",
    simple: "Envoie un « clone » de Claude, qui connaît toute la conversation, traiter une directive en arrière-plan pendant que vous continuez.",
    details: "Lance un subagent forké héritant du contexte complet ; il travaille sur la directive donnée en arrière-plan (non bloquant) et renvoie son résultat. Introduit en v2.1.161.",
    pro: "Le doublé gagnant : le fork explore/produit sans encombrer votre contexte principal, et vous n'attendez pas. Suivi via /tasks. À distinguer de /branch (qui reste dans votre fil).",
    example: "/fork rédige les tests e2e pour le module auth",
    difficulty: 3,
    notes: "v2.1.161+. Non bloquant. Voir /tasks pour suivre, /branch pour un fork interactif."
  },
  {
    id: "slash-skills", section: "slash", category: "Configuration", name: "/skills",
    oneLine: "Liste les skills disponibles et contrôle leur visibilité.",
    simple: "Montre les « savoir-faire » dont Claude dispose ; vous pouvez en masquer pour qu'il ne les utilise pas.",
    details: "Affiche les skills disponibles avec leur description. Pressez `t` pour trier par coût en tokens, `Espace` pour masquer une skill à Claude.",
    pro: "Le tri par tokens est précieux : une skill volumineuse pèse en contexte à chaque session. Masquez celles que vous n'utilisez pas pour alléger et focaliser Claude.",
    example: "/skills",
    output: "Skills :\n  xlsx     ⓘ  ~1.2k tok\n  docx     ⓘ  ~0.9k tok\n  code-review …",
    difficulty: 1,
    notes: "Touche t = tri par tokens, Espace = masquer."
  },
  {
    id: "slash-theme", section: "slash", category: "Configuration", name: "/theme",
    oneLine: "Change le thème de couleurs de l'interface.",
    simple: "Choisit l'apparence : clair, sombre, contrasté, daltonien…",
    details: "Sélectionne un thème (auto / light / dark / colorblind / ANSI, plus les thèmes custom de ~/.claude/themes/). Le changement est immédiat.",
    pro: "Le thème colorblind et le mode contrasté améliorent la lisibilité des diffs ; vous pouvez aussi déposer un thème custom dans ~/.claude/themes/.",
    example: "/theme dark",
    difficulty: 1,
    notes: "Ne pas confondre avec /color (couleur de la barre de prompt) ni /tui (rendu)."
  },
  {
    id: "slash-color", section: "slash", category: "Configuration", name: "/color",
    oneLine: "Définit la couleur de la barre de prompt pour la session.",
    simple: "Colore la barre de saisie — pratique pour distinguer d'un coup d'œil plusieurs fenêtres Claude ouvertes.",
    details: "Fixe la couleur de la barre de prompt de la session (rouge, bleu, vert, jaune, violet, orange, rose, cyan ; aléatoire sans argument). Se synchronise avec le remote control.",
    pro: "Avec plusieurs sessions parallèles (worktrees), une couleur par session évite de se tromper de fenêtre : vert = feature, rouge = hotfix…",
    example: "/color green",
    difficulty: 1,
    notes: "Distinct de /theme (thème global)."
  },
  {
    id: "slash-ide", section: "slash", category: "Configuration", name: "/ide",
    oneLine: "Gère les intégrations IDE et affiche leur état.",
    simple: "Connecte Claude à votre éditeur (VS Code, JetBrains…) et montre si la liaison est active.",
    details: "Configure et diagnostique l'intégration avec l'IDE (VS Code, Cursor, JetBrains…) : connexion, diffs dans l'éditeur, contexte de sélection.",
    pro: "Une fois connecté, les diffs s'affichent dans l'IDE et la sélection courante devient du contexte : moins de copier-coller, plus de précision.",
    example: "/ide",
    difficulty: 1,
    notes: "Aussi : claude --ide au lancement (connexion auto si un seul IDE valide)."
  },
  {
    id: "slash-advisor", section: "slash", category: "Agents & MCP", name: "/advisor",
    oneLine: "Active un second modèle « conseiller » consulté aux moments clés.",
    simple: "Donne à Claude un binôme : un autre modèle qu'il consulte pour avoir un deuxième avis sur les décisions importantes.",
    details: "Active l'outil advisor avec un modèle donné (alias ou ID complet ; `off` pour désactiver). Le conseiller fournit un avis parallèle pendant les tâches. Disponible depuis v2.1.98.",
    pro: "Pattern utile : Sonnet aux commandes, Opus en advisor sur les décisions d'architecture — un deuxième regard ciblé sans payer Opus sur toute la session.",
    example: "/advisor opus   # ou /advisor off",
    difficulty: 2,
    notes: "v2.1.98+. Le conseiller juge ; il n'exécute pas d'outils."
  },
  {
    id: "slash-plugin", section: "slash", category: "Configuration", name: "/plugin",
    oneLine: "Gère les plugins Claude Code (lister, installer, activer, désactiver).",
    simple: "La logithèque de Claude Code : installez et gérez des extensions (plugins) qui ajoutent commandes, skills et agents.",
    details: "Sans argument, ouvre le menu ; sinon `list` / `install` / `enable` / `disable`. Les plugins regroupent commandes, skills, hooks et agents distribuables.",
    pro: "`/plugin` (détails) montre l'inventaire d'un plugin et son coût projeté en tokens : utile avant d'installer, car chaque plugin pèse en contexte.",
    example: "/plugin list",
    difficulty: 2,
    notes: "Gestion fine aussi en shell : claude plugin …"
  },
  {
    id: "slash-remote-control", section: "slash", category: "Session", name: "/remote-control",
    oneLine: "Rend la session pilotable à distance depuis claude.ai.",
    simple: "Permet de reprendre/piloter cette session de terminal depuis le web ou le mobile, et inversement.",
    details: "Active le Remote Control : la session devient accessible depuis claude.ai (pilotage cross-appareils). Alias `/rc`.",
    pro: "Couplé à /teleport (ramener une session web dans le terminal), vous passez de la machine au mobile sans perdre le fil — utile pour surveiller un /goal long en déplacement.",
    example: "/remote-control",
    difficulty: 2,
    notes: "Alias /rc. Voir aussi /teleport (web → terminal)."
  },
  {
    id: "slash-usage-credits", section: "slash", category: "Compte", name: "/usage-credits",
    oneLine: "Configure des crédits d'usage pour continuer au-delà des limites.",
    simple: "Permet de continuer à travailler même après avoir atteint la limite de votre forfait, via des crédits.",
    details: "Configure les crédits d'usage qui prennent le relais quand vous atteignez un plafond, pour ne pas être bloqué en pleine tâche. Anciennement `/extra-usage`.",
    pro: "Combinez avec /usage pour anticiper : si la fenêtre hebdo est presque pleine et qu'une grosse tâche arrive, les crédits évitent l'interruption.",
    example: "/usage-credits",
    difficulty: 1,
    notes: "Renommée depuis /extra-usage (fonctionnalité inchangée)."
  },
  {
    id: "slash-focus", section: "slash", category: "Affichage", name: "/focus",
    oneLine: "Vue épurée : uniquement votre prompt, le résumé d'outils et la réponse.",
    simple: "Masque le bruit (logs d'outils) pour ne garder que l'essentiel à l'écran : votre question et la réponse.",
    details: "Bascule la vue focus, qui ne montre que le dernier prompt, un résumé des outils et la réponse. Disponible en mode fullscreen ; la préférence est mémorisée.",
    pro: "Idéal pour relire/présenter une session sans la masse des appels d'outils ; Ctrl+O reste là quand vous voulez rouvrir les coulisses complètes.",
    example: "/focus",
    difficulty: 1,
    notes: "Mode fullscreen uniquement. Complémentaire de Ctrl+O (transcript détaillé)."
  },
  {
    id: "slash-code-review", section: "slash", category: "Code & Review", name: "/code-review",
    oneLine: "Revue du diff : bugs et nettoyages, avec niveaux d'effort.",
    simple: "Une revue de code à la demande sur vos changements : Claude liste bugs et améliorations possibles.",
    details: "Skill intégrée : examine le diff courant pour des bugs de correction et des nettoyages (réutilisation, simplification, efficacité). Niveaux low/medium/high/xhigh/max, plus `ultra` (revue cloud multi-agents). `--fix` applique, `--comment` poste en commentaires de PR.",
    pro: "`/code-review ultra` lance une revue cloud bien plus profonde (branche locale ou `<PR#>`). Demandez « report everything » puis filtrez : ça maximise le rappel.",
    example: "/code-review high --fix",
    difficulty: 3,
    notes: "Skill intégrée. ultra = facturée, nécessite un dépôt git."
  },
  {
    id: "slash-simplify", section: "slash", category: "Code & Review", name: "/simplify",
    oneLine: "Nettoie le code modifié (réutilisation, simplification, efficacité).",
    simple: "Passe vos changements au peigne fin pour les rendre plus simples et propres — sans chasser les bugs (c'est le rôle de /code-review).",
    details: "Skill intégrée : revoit le code modifié et applique des améliorations de qualité via plusieurs agents en parallèle (réutilisation, simplification, efficacité, altitude d'abstraction). Qualité uniquement, pas de chasse aux bugs.",
    pro: "Enchaînez /code-review (bugs) puis /simplify (propreté) : deux passes complémentaires, l'une pour la correction, l'autre pour la lisibilité.",
    example: "/simplify",
    difficulty: 2,
    notes: "Skill intégrée (v2.1.154+). Pour les bugs, utilisez /code-review."
  },
  {
    id: "slash-verify", section: "slash", category: "Code & Review", name: "/verify",
    oneLine: "Vérifie qu'un changement marche en lançant réellement l'app.",
    simple: "Au lieu de supposer que ça marche, Claude lance l'application et observe le comportement pour confirmer le correctif.",
    details: "Skill intégrée : confirme qu'un changement fait bien ce qu'il doit, en construisant/lançant l'app et en observant le résultat. Utile pour valider une PR ou un fix avant de pousser.",
    pro: "Couplé à /run : /verify s'appuie sur la façon de lancer le projet ; si elle est inconnue, le générateur associé apprend à build/lancer/piloter votre app.",
    example: "/verify le bouton d'export télécharge bien un CSV",
    difficulty: 3,
    notes: "Skill intégrée (v2.1.145+). Spécifique au projet."
  },
  {
    id: "slash-security-review", section: "slash", category: "Code & Review", name: "/security-review",
    oneLine: "Revue de sécurité des changements en attente sur la branche.",
    simple: "Claude inspecte vos changements à la recherche de failles de sécurité (injections, secrets exposés, contrôles manquants…).",
    details: "Skill intégrée : effectue une revue de sécurité ciblée du diff courant et remonte les vulnérabilités potentielles avec leur gravité.",
    pro: "À lancer avant toute PR touchant l'auth, les entrées utilisateur ou les secrets : la sécurité est exactement le genre de bug que la relecture humaine rate le plus souvent.",
    example: "/security-review",
    difficulty: 3,
    notes: "Skill intégrée. Complète /code-review côté sécurité."
  },
  {
    id: "slash-loop", section: "slash", category: "Maintenance", name: "/loop",
    oneLine: "Lance un prompt ou une commande à intervalle régulier.",
    simple: "Fait répéter une action automatiquement (« vérifie le déploiement toutes les 5 min ») jusqu'à ce que vous l'arrêtiez.",
    details: "Skill intégrée : exécute un prompt/commande sur un intervalle (`/loop 5m /foo`, défaut 10m) ; sans prompt, se rythme lui-même ou utilise .claude/loop.md. Pratique pour le polling ou les tâches récurrentes courtes.",
    pro: "Pour de la planification cloud durable (cron), préférez /schedule ; /loop vit dans la session courante et s'arrête avec elle.",
    example: "/loop 5m vérifie l'état du déploiement et préviens si échec",
    difficulty: 2,
    notes: "Skill intégrée. Pour du cron persistant côté cloud, voir /schedule."
  },
  {
    id: "slash-schedule", section: "slash", category: "Maintenance", name: "/schedule",
    oneLine: "Crée et gère des agents cloud planifiés (cron).",
    simple: "Programme Claude pour qu'il exécute une tâche tout seul, à heure fixe, sur l'infrastructure cloud — même quand votre machine est éteinte.",
    details: "Skill intégrée : crée/liste/met à jour/lance des routines — des agents Claude Code qui s'exécutent selon un planning sur l'infrastructure managée d'Anthropic. Alias `/routines`. Permet aussi un run unique programmé.",
    pro: "Idéal pour les rituels récurrents (revue de PR du matin, rapport hebdo) : contrairement à /loop, ça tourne côté cloud, indépendamment de votre terminal.",
    example: "/schedule chaque matin 9h : résume les PR ouvertes",
    difficulty: 3,
    notes: "Skill intégrée. Alias /routines. Tourne côté cloud (vs /loop local)."
  },
  {
    id: "slash-fewer-prompts", section: "slash", category: "Configuration", name: "/fewer-permission-prompts",
    oneLine: "Construit une allowlist de permissions à partir de votre usage réel.",
    simple: "Analyse ce que vous approuvez tout le temps et l'ajoute aux règles autorisées, pour que Claude arrête de vous redemander la permission sans cesse.",
    details: "Skill intégrée : scanne vos transcripts pour repérer les appels read-only/courants que vous approuvez systématiquement, et propose une allowlist priorisée dans .claude/settings.json.",
    pro: "Le bon dosage entre fluidité et sécurité : vous gardez les confirmations sur le risqué, mais éliminez la friction du quotidien (git status, lecture de fichiers…). Voir /permissions pour l'édition manuelle.",
    example: "/fewer-permission-prompts",
    difficulty: 2,
    notes: "Skill intégrée. Écrit dans .claude/settings.json. Voir /permissions."
  },

  /* ============================== CLI FLAGS ============================== */
  {
    id: "cli-print", section: "cli", category: "Mode headless", name: "claude -p / --print",
    oneLine: "Lance Claude en mode non-interactif (Agent SDK) : un agent complet qui répond puis s'arrête.",
    simple: "Pilote Claude depuis un script : il ne fait pas que « répondre une fois » — il peut lire des fichiers, utiliser des outils et enchaîner plusieurs tours, puis s'arrête. C'est la porte d'entrée de l'Agent SDK.",
    details: "Point d'entrée du mode headless / Agent SDK (ex-Claude Code SDK) : `claude -p \"…\"` exécute une requête VIA le SDK puis quitte. Ce n'est pas une simple complétion — c'est un agent qui peut enchaîner plusieurs tours agentiques avec outils. Saute le dialogue de confiance du workspace. `claude -c -p` continue la dernière session en headless.",
    pro: "Bornez la boucle agentique : `--max-turns N` (nombre de tours) et `--max-budget-usd` (coût). Pour une sortie exploitable : `--output-format json` (résultat + métadonnées), `--output-format stream-json` (flux temps réel), ou `--json-schema '{…}'` pour un JSON validé par schéma. Restreignez les outils (`--tools`) pour économiser et focaliser.",
    example: 'claude -p "résume ce fichier" < notes.md --output-format json',
    output: "$ claude -p \"corrige les types\" --max-turns 3 --output-format json\n{ \"result\": \"…\", \"num_turns\": 2, \"total_cost_usd\": 0.04, … }",
    difficulty: 2,
    notes: "Doc programmatique : Agent SDK (code.claude.com/docs → agent-sdk). Voir --max-turns, --json-schema, --output-format, --max-budget-usd, --no-session-persistence."
  },
  {
    id: "cli-max-turns", section: "cli", category: "Mode headless", name: "--max-turns",
    oneLine: "Limite le nombre de tours agentiques en mode --print.",
    simple: "Puisqu'en mode -p Claude peut enchaîner plusieurs tours tout seul, ce flag fixe un plafond : « pas plus de N étapes ».",
    details: "En mode headless, `claude -p` exécute une boucle agentique (plusieurs tours avec outils). `--max-turns N` plafonne ce nombre de tours et fait sortir en erreur si la limite est atteinte. Sans limite par défaut.",
    pro: "Garde-fou complémentaire de `--max-budget-usd` : l'un borne le coût, l'autre la longueur de la boucle. À mettre dans les crons/CI pour éviter qu'un agent ne s'emballe sur une tâche mal cadrée.",
    example: 'claude -p "corrige le lint" --max-turns 5',
    difficulty: 2,
    notes: "Print mode uniquement. Sortie en erreur si la limite est atteinte."
  },
  {
    id: "cli-continue", section: "cli", category: "Session", name: "claude -c / --continue",
    oneLine: "Reprend la conversation la plus récente du répertoire.",
    simple: "Rouvre la dernière conversation de ce dossier, comme si vous n'étiez jamais parti.",
    details: "Réutilise la dernière session du dossier courant en conservant tout le contexte. Le plus rapide pour reprendre là où vous vous étiez arrêté.",
    pro: "Le contexte est lié au dossier : `claude -c` dans projet-A et projet-B reprennent des sessions différentes.",
    example: "claude -c",
    difficulty: 1,
    notes: "Pour choisir une session précise, voir --resume."
  },
  {
    id: "cli-resume", section: "cli", category: "Session", name: "claude -r / --resume",
    oneLine: "Reprend une conversation par ID ou via un sélecteur.",
    simple: "Affiche la liste de vos anciennes conversations pour en rouvrir une au choix.",
    details: "Sans argument, ouvre un sélecteur de sessions récentes ; avec un ID/terme de recherche, reprend directement. Permet de retrouver une session ancienne.",
    pro: "Acceptez un terme de recherche : `claude -r auth` filtre directement le sélecteur sur les sessions parlant d'auth.",
    example: "claude --resume   # ou: claude -r 3f9a…",
    difficulty: 2,
    notes: "Combinable avec --fork-session pour brancher sans écraser l'original."
  },
  {
    id: "cli-fork", section: "cli", category: "Session", name: "--fork-session",
    oneLine: "Crée une nouvelle session en reprenant un contexte existant.",
    simple: "Duplique une conversation : vous explorez une nouvelle piste sans toucher à l'originale.",
    details: "Avec --resume/--continue, crée une branche indépendante au lieu de réutiliser la session d'origine. Parfait pour explorer plusieurs pistes depuis une même base.",
    pro: "Lancez deux forks de la même session avec deux approches différentes, puis gardez la meilleure : du A/B testing de prompts.",
    example: "claude -c --fork-session",
    difficulty: 3,
    notes: "Utile pour des explorations parallèles sans polluer l'historique initial."
  },
  {
    id: "cli-model", section: "cli", category: "Modèle", name: "--model",
    oneLine: "Sélectionne le modèle au lancement.",
    simple: "Choisit le « cerveau » dès le démarrage : opus, sonnet, haiku ou fable.",
    details: "Accepte un alias (opus, sonnet, haiku, fable) ou un ID complet (claude-opus-4-8…). Surcharge le modèle par défaut des settings pour cette session.",
    pro: "Préférez les alias aux IDs complets dans vos scripts : ils suivent automatiquement les dernières versions des modèles.",
    example: "claude --model opus",
    difficulty: 2,
    notes: "Modifiable en cours de session avec /model. Voir la section Modèles."
  },
  {
    id: "cli-effort", section: "cli", category: "Modèle", name: "--effort",
    oneLine: "Règle le budget de raisonnement (low → max).",
    simple: "Règle l'intensité de réflexion de Claude : faible pour aller vite, élevée pour les problèmes difficiles.",
    details: "Choix : low, medium, high, xhigh, max. Contrôle la profondeur de réflexion et donc le coût/latence. `max` autorise un extended thinking quasi illimité.",
    pro: "`xhigh` est le réglage de référence pour le code et l'agentique ; `high` est souvent le meilleur compromis qualité/coût ; réservez `max` aux cas où la justesse prime sur tout.",
    example: "claude --effort high",
    difficulty: 2,
    notes: "Monter l'effort pour le raisonnement complexe ; le baisser pour les tâches simples."
  },
  {
    id: "cli-permission-mode", section: "cli", category: "Permissions", name: "--permission-mode",
    oneLine: "Définit le mode de permission au démarrage.",
    simple: "Choisit dès le départ à quel point Claude doit demander la permission avant d'agir.",
    details: "Choix : default, acceptEdits, plan, auto, dontAsk, bypassPermissions. Détermine quand Claude demande confirmation. Modifiable ensuite via Shift+Tab.",
    pro: "`claude --permission-mode plan` est un excellent réflexe pour attaquer une tâche complexe : Claude propose d'abord un plan que vous validez.",
    example: "claude --permission-mode plan",
    difficulty: 2,
    notes: "Voir les fiches « Modes de permission » dans la section Raccourcis."
  },
  {
    id: "cli-skip-permissions", section: "cli", category: "Permissions", name: "--dangerously-skip-permissions",
    oneLine: "Désactive toutes les vérifications de permission.",
    simple: "Enlève TOUS les garde-fous : Claude fait ce qu'il veut sans jamais demander. À réserver aux environnements jetables.",
    details: "Équivaut au mode bypassPermissions : plus aucune confirmation. À n'utiliser QUE dans un environnement isolé (conteneur, VM) car il n'y a aucune protection contre une injection de prompt.",
    pro: "Préférez --allow-dangerously-skip-permissions : le mode bypass devient disponible dans le cycle Shift+Tab sans être actif par défaut — vous choisissez au moment voulu.",
    example: "claude --dangerously-skip-permissions",
    difficulty: 5,
    notes: "Refusé en root/sudo sur macOS/Linux. Jamais sur une machine de travail réelle."
  },
  {
    id: "cli-allowed-tools", section: "cli", category: "Permissions", name: "--allowedTools / --disallowedTools",
    oneLine: "Pré-autorise ou interdit des outils précis.",
    simple: "Liste blanche / liste noire : « git oui, rm non » — Claude n'a plus à demander pour ce qui est listé.",
    details: "Liste d'outils avec motifs (ex. `Bash(git *)`, `Edit`). Les règles allow réduisent les confirmations ; les règles deny s'appliquent dans tous les modes.",
    pro: "Les motifs sont puissants : `Bash(git *)` autorise tout git, `Bash(git push *)` en deny bloque uniquement les push — composez finement.",
    example: 'claude --allowedTools "Bash(git *)" "Edit"',
    difficulty: 3,
    notes: "Les deny s'appliquent même en mode bypass. Voir aussi /permissions."
  },
  {
    id: "cli-add-dir", section: "cli", category: "Contexte", name: "--add-dir",
    oneLine: "Autorise des répertoires supplémentaires.",
    simple: "Ouvre l'accès à d'autres dossiers que celui de lancement (multi-repo, données).",
    details: "Étend l'accès fichiers au-delà du répertoire de travail (multi-repo, données externes). Accepte plusieurs chemins.",
    pro: "En monorepo éclaté, lancez depuis le repo principal avec --add-dir vers les libs : Claude voit l'ensemble sans charger les configs des autres repos.",
    example: "claude --add-dir ../lib ../data",
    difficulty: 2,
    notes: "Équivalent en session : /add-dir."
  },
  {
    id: "cli-output-format", section: "cli", category: "Mode headless", name: "--output-format",
    oneLine: "Choisit le format de sortie en mode --print.",
    simple: "Choisit comment Claude répond à votre script : texte brut, JSON, ou flux temps réel.",
    details: "text (défaut), json (un objet JSON unique), stream-json (flux temps réel). Indispensable pour parser la sortie dans un script.",
    pro: "`json` renvoie aussi les métadonnées (coût, durée, session_id) : parfait pour journaliser et monitorer vos automatisations.",
    example: 'claude -p "liste 3 idées" --output-format json',
    difficulty: 2,
    notes: "Combiner avec --include-partial-messages pour le streaming fin."
  },
  {
    id: "cli-mcp-config", section: "cli", category: "MCP", name: "--mcp-config / --strict-mcp-config",
    oneLine: "Charge des serveurs MCP depuis un JSON pour la session.",
    simple: "Branche des outils externes (MCP) le temps d'une session, à partir d'un fichier de config.",
    details: "Passe des serveurs MCP via fichier ou chaîne JSON, surchargeant .mcp.json. Avec --strict-mcp-config, SEULS ces serveurs sont chargés (isolation/tests).",
    pro: "--strict-mcp-config est l'outil d'isolation : en CI ou pour déboguer un serveur, vous garantissez qu'aucune autre config MCP n'interfère.",
    example: "claude --mcp-config ./mcp.json --strict-mcp-config",
    difficulty: 4,
    notes: "Format JSON précis ; utile en CI et pour isoler un environnement."
  },
  {
    id: "cli-append-system", section: "cli", category: "Contexte", name: "--append-system-prompt",
    oneLine: "Ajoute des instructions au system prompt par défaut.",
    simple: "Glisse une consigne permanente à Claude pour la session (« réponds en français », « sois bref »…).",
    details: "Concatène votre texte à la fin du prompt système sans le remplacer. --system-prompt, lui, remplace tout. Pratique pour ajouter une contrainte globale.",
    pro: "--append- conserve tout le comportement par défaut ; --system-prompt (remplacement total) est réservé aux usages très avancés où vous assumez de tout redéfinir.",
    example: 'claude --append-system-prompt "Réponds toujours en français."',
    difficulty: 2,
    notes: "Préférer --append- pour conserver le comportement par défaut."
  },
  {
    id: "cli-max-budget", section: "cli", category: "Modèle", name: "--max-budget-usd",
    oneLine: "Plafonne la dépense d'une exécution headless.",
    simple: "Fixe un budget maximum en dollars : au-delà, Claude s'arrête. L'assurance anti-mauvaise-surprise.",
    details: "Fixe un budget maximal en dollars pour les appels API ; au-delà, l'exécution s'arrête. Garde-fou contre les coûts incontrôlés en automatisation.",
    pro: "Mettez-le systématiquement dans vos crons et CI : une boucle d'agent qui s'emballe sans plafond peut coûter très cher en une nuit.",
    example: 'claude -p "tâche longue" --max-budget-usd 2.00',
    difficulty: 2,
    notes: "Ne fonctionne qu'avec --print (utilisateurs API)."
  },
  {
    id: "cli-worktree", section: "cli", category: "Session", name: "-w / --worktree (+ --tmux)",
    oneLine: "Lance la session dans un git worktree isolé.",
    simple: "Donne à Claude sa propre copie de travail du projet : il peut tout modifier sans toucher à VOS fichiers en cours.",
    details: "Crée un worktree git dédié pour travailler sans toucher votre arbre courant ; avec --tmux, ouvre une session tmux (ou panneaux iTerm2). Idéal pour le travail parallèle sur branches.",
    pro: "Le combo `-w --tmux` permet de lancer plusieurs Claude en parallèle, chacun sur sa branche dans son panneau : un par feature.",
    example: "claude -w feature-x --tmux",
    difficulty: 4,
    notes: "Nécessite git ; --tmux requiert tmux ou iTerm2."
  },
  {
    id: "cli-update", section: "cli", category: "Maintenance", name: "claude update / doctor",
    oneLine: "Met à jour Claude Code et diagnostique l'installation.",
    simple: "Mettre à jour l'outil et vérifier que tout va bien — l'entretien de base.",
    details: "`claude update` installe la dernière version ; `claude doctor` vérifie l'auto-updater et l'environnement. À lancer régulièrement vu la cadence des évolutions.",
    pro: "Après chaque update, un coup de /release-notes : les nouveautés (commandes, raccourcis, modèles) arrivent chaque semaine.",
    example: "claude update && claude doctor",
    difficulty: 1,
    notes: "Voir aussi /status et /release-notes en session."
  },
  {
    id: "cli-mcp-add", section: "cli", category: "MCP", name: "claude mcp add / list / login",
    oneLine: "Gère et authentifie les serveurs MCP depuis le shell.",
    simple: "Installe, liste, retire ou authentifie les « branchements » de Claude vers vos services (GitHub, Slack…), depuis le terminal.",
    details: "Ajoute (stdio ou HTTP), liste l'état et supprime des serveurs MCP. `claude mcp add-from-claude-desktop` importe la config existante de Claude Desktop. Depuis v2.1.186, `claude mcp login <nom>` / `claude mcp logout <nom>` lancent ou effacent l'authentification OAuth d'un serveur sans ouvrir le panneau /mcp.",
    pro: "`claude mcp add-from-claude-desktop` évite la double configuration : vos connecteurs Desktop sont importés tels quels dans le CLI. En SSH, `claude mcp login <nom> --no-browser` imprime l'URL d'autorisation au lieu d'ouvrir un navigateur.",
    example: "claude mcp add github -- npx -y @modelcontextprotocol/server-github\nclaude mcp login sentry",
    difficulty: 3,
    notes: "Voir `claude mcp add --help` pour les transports et exemples. `mcp login/logout` requièrent v2.1.186+ (source : doc officielle cli-reference + binaire 2.1.191)."
  },
  {
    id: "cli-config-cmd", section: "cli", category: "Configuration", name: "claude config",
    oneLine: "Lit/écrit la configuration depuis le shell.",
    simple: "Consulter ou modifier les réglages sans ouvrir de session.",
    details: "Permet de consulter et modifier des réglages hors session. L'éditeur interactif /config reste plus simple pour la plupart des cas.",
    pro: "Utile en scripting/CI où l'éditeur interactif n'est pas disponible : on lit/écrit un réglage précis en une commande, sans ouvrir de session.",
    example: "claude config",
    difficulty: 2,
    notes: "Pour un réglage ponctuel, /config en session est souvent plus pratique."
  },
  {
    id: "cli-ultrareview", section: "cli", category: "Code & Review", name: "claude ultrareview",
    oneLine: "Lance une revue cloud multi-agents depuis le shell et imprime les résultats.",
    simple: "La version « grosse artillerie » de la revue de code, lancée depuis le terminal : plusieurs agents analysent votre branche (ou une PR) sur l'infrastructure cloud, et les conclusions s'affichent.",
    details: "Exécute la revue ultrareview de façon non interactive sur la branche courante, un numéro de PR ou une base de comparaison. Imprime les findings sur stdout (sortie 0 si OK, 1 sinon). `--json` renvoie le payload brut (bugs.json), `--timeout <minutes>` plafonne l'attente (30 min par défaut). C'est l'équivalent shell de `/code-review ultra`.",
    pro: "Idéal en CI ou en script de pré-merge : `claude ultrareview <PR#> --json` produit un payload exploitable. Comme c'est une revue cloud facturée, réservez-la aux branches importantes.",
    example: "claude ultrareview 1234 --json",
    difficulty: 3,
    notes: "Sous-commande confirmée binaire 2.1.191 + doc officielle cli-reference (2026-07-02). Nécessite un dépôt git ; facturée."
  },
  {
    id: "cli-project-purge", section: "cli", category: "Maintenance", name: "claude project purge",
    oneLine: "Supprime tout l'état local de Claude Code pour un projet.",
    simple: "Le grand ménage : efface tout ce que Claude Code a stocké en local pour un projet (transcripts, tâches, historique d'édition, config) — utile pour repartir propre ou faire de la place.",
    details: "Supprime transcripts, listes de tâches, logs de debug, historique des éditions de fichiers, lignes d'historique de prompt et l'entrée du projet dans ~/.claude.json. Sans chemin, ouvre une liste interactive. Flags : `--dry-run` (prévisualiser), `-y/--yes` (sans confirmation), `-i/--interactive` (confirmer chaque élément), `--all` (tous les projets).",
    pro: "Toujours commencer par `--dry-run` pour voir ce qui partirait : la suppression est définitive et inclut l'historique des conversations local du projet.",
    example: "claude project purge ~/work/repo --dry-run",
    difficulty: 2,
    notes: "Sous-commande confirmée binaire 2.1.191 (`claude project --help`) + doc officielle cli-reference (2026-07-02). Action destructive : préférer --dry-run d'abord."
  },
  {
    id: "cli-safe-mode", section: "cli", category: "Maintenance", name: "--safe-mode / --bare",
    oneLine: "Démarre sans personnalisations pour isoler un problème.",
    simple: "Le « mode sans échec » : démarre Claude sans aucune personnalisation pour vérifier si le problème vient de votre config.",
    details: "--safe-mode désactive CLAUDE.md, skills, plugins, hooks, MCP, agents, thèmes et keybindings (auth/outils/permissions restent normaux). --bare va plus loin (pas de LSP, mémoire auto, keychain…). Outils de diagnostic.",
    pro: "Le test décisif : si le comportement étrange disparaît en --safe-mode, le coupable est dans VOS hooks/plugins/CLAUDE.md — réactivez-les un par un.",
    example: "claude --safe-mode",
    difficulty: 3,
    notes: "Excellent réflexe quand un comportement vient d'une config personnalisée."
  },

  /* ============================== RACCOURCIS & MODES ============================== */
  {
    id: "mode-default", section: "shortcuts", category: "Modes de permission", name: "Mode default (Ask)",
    oneLine: "Auto-approuve la lecture, demande confirmation pour modifier/exécuter.",
    simple: "Le mode prudent par défaut : Claude peut lire librement, mais demande votre accord avant de modifier quoi que ce soit.",
    details: "Mode de départ, le plus sûr. Les opérations en lecture seule passent ; les éditions de fichiers, commandes shell et requêtes réseau demandent confirmation. À utiliser pour du travail sensible ou en début de tâche.",
    pro: "Restez en default sur un codebase inconnu ou critique : chaque confirmation est une occasion de comprendre ce que Claude s'apprête à faire.",
    example: "Shift+Tab pour passer au mode suivant",
    output: "⏵ Ask before edits",
    difficulty: 1,
    notes: "1er cran du cycle Shift+Tab."
  },
  {
    id: "mode-accept-edits", section: "shortcuts", category: "Modes de permission", name: "Mode acceptEdits",
    oneLine: "Auto-approuve les éditions de fichiers et commandes fs courantes.",
    simple: "Claude peut modifier les fichiers sans demander à chaque fois — vous relisez le résultat d'un bloc à la fin.",
    details: "Accepte automatiquement reads + éditions + mkdir/touch/mv/cp/rm/sed dans le périmètre. Demande toujours pour les autres commandes, le réseau, et les chemins protégés (.git/, .claude/…). À utiliser quand vous préférez relire via `git diff`.",
    pro: "Le bon rythme de travail : acceptEdits + relecture par `git diff` à la fin. Vous gagnez la fluidité sans perdre le contrôle, grâce à git.",
    example: "Shift+Tab (1 cran depuis default)",
    output: "⏵⏵ accept edits on",
    difficulty: 2,
    notes: "Bon compromis productivité/contrôle au quotidien."
  },
  {
    id: "mode-plan", section: "shortcuts", category: "Modes de permission", name: "Mode plan",
    oneLine: "Claude explore et propose un plan sans rien exécuter.",
    simple: "Claude réfléchit d'abord et vous présente son plan d'action — rien n'est modifié tant que vous n'avez pas validé.",
    details: "Lecture seule : Claude recherche et rédige un plan, puis vous l'approuvez en choisissant comment continuer (auto, acceptEdits, manuel). Idéal avant un gros changement pour valider l'approche.",
    pro: "À l'approbation du plan, choisissez aussi le mode d'exécution (auto / acceptEdits / manuel) : c'est le moment de calibrer le niveau d'autonomie.",
    example: "Shift+Tab jusqu'à « plan mode »",
    difficulty: 2,
    notes: "Réflexe recommandé pour toute tâche non triviale."
  },
  {
    id: "mode-auto", section: "shortcuts", category: "Modes de permission", name: "Mode auto",
    oneLine: "Auto-approuve presque tout, avec un classifieur de sécurité.",
    simple: "Claude travaille en autonomie, mais un « vigile » automatique bloque les actions dangereuses (suppressions massives, déploiements…).",
    details: "Réduit la friction sur les longues tâches : un classifieur bloque les patterns dangereux (curl | bash, déploiements prod, suppressions massives) et respecte les limites que vous énoncez (« ne pousse pas »). Se met en pause s'il bloque trop souvent.",
    pro: "Les limites énoncées en langage naturel sont contraignantes : dites « ne déploie pas avant ma relecture » et le classifieur bloquera tout déploiement. Depuis v2.1.183, le mode auto bloque aussi par défaut les commandes git destructrices (`git reset --hard`, `git checkout -- .`, `git clean -fd`, `git stash drop`), `git commit --amend` (si le commit n'est pas de l'agent) et `terraform/pulumi/cdk destroy` non explicitement demandés.",
    example: "Shift+Tab (apparaît si éligible)",
    output: "⏵⏵⏵ auto mode on",
    difficulty: 3,
    notes: "Requiert un modèle récent ; activation admin sur Teams/Enterprise. Garder une supervision malgré les garde-fous."
  },
  {
    id: "mode-bypass", section: "shortcuts", category: "Modes de permission", name: "Mode bypassPermissions",
    oneLine: "Aucune vérification — uniquement en environnement isolé.",
    simple: "Plus aucun garde-fou du tout. À réserver aux machines « jetables » (conteneurs, VM de test) — jamais sur votre poste.",
    details: "Tout est auto-approuvé, sans garde-fou (sauf règles ask explicites et circuit breaker sur la racine/home). Aucune protection contre l'injection de prompt : réservé aux conteneurs/VM sans accès sensible.",
    pro: "Le vrai risque est l'injection de prompt : un fichier ou une page web malveillante peut donner des ordres à Claude — sans permission, rien ne l'arrête.",
    example: "claude --dangerously-skip-permissions",
    difficulty: 5,
    notes: "Refusé en root. Désactivable par l'admin. À éviter sur une machine de travail réelle."
  },
  {
    id: "sc-shift-tab", section: "shortcuts", category: "Modes", name: "Shift+Tab — cycle des modes",
    oneLine: "Fait défiler les modes de permission.",
    simple: "LA touche à connaître : elle fait tourner les modes de permission (prudent → édition libre → plan…).",
    details: "Cycle default → acceptEdits → plan (→ auto si éligible → bypass si activé). La barre de statut indique le mode courant. Le raccourci le plus utile à mémoriser.",
    pro: "Changez de mode en cours de tâche sans rien perdre : plan pour cadrer, puis acceptEdits pour exécuter, puis default pour les retouches sensibles.",
    example: "Shift+Tab",
    difficulty: 1,
    notes: "Identique sur Mac et Windows. Alt+M sur certaines configurations."
  },
  {
    id: "sc-escape", section: "shortcuts", category: "Contrôle", name: "Échap — interrompre",
    oneLine: "Interrompt Claude en cours de réponse ou d'outil.",
    simple: "Le bouton « stop » : Claude s'arrête immédiatement mais garde le travail déjà fait.",
    details: "Arrête la génération ou l'appel d'outil en conservant le travail déjà fait. Permet de reprendre la main et de réorienter immédiatement.",
    pro: "Interrompre tôt et réorienter coûte bien moins cher que laisser finir une mauvaise piste puis corriger : Échap est un outil d'économie de tokens.",
    example: "Échap pendant une réponse",
    difficulty: 1,
    notes: "Identique sur Mac et Windows. Geste essentiel pour rediriger sans tout perdre."
  },
  {
    id: "sc-escape-escape", section: "shortcuts", category: "Contrôle", name: "Échap + Échap — rewind",
    oneLine: "Efface le brouillon ou ouvre le menu rewind.",
    simple: "Deux pressions sur Échap : efface ce que vous tapiez, ou (si la zone est vide) ouvre la « machine à remonter le temps ».",
    details: "Double appui : si le prompt contient du texte, l'efface (sauvé dans l'historique) ; si vide, ouvre le menu de rewind pour revenir à un état antérieur du code/conversation.",
    pro: "Le brouillon effacé n'est pas perdu : flèche ↑ pour le retrouver dans l'historique des prompts.",
    example: "Échap Échap (prompt vide) → rewind",
    difficulty: 2,
    notes: "Identique sur Mac et Windows. Équivaut à /rewind quand le prompt est vide."
  },
  {
    id: "sc-ctrl-c", section: "shortcuts", category: "Contrôle", name: "Ctrl+C — interrompre / quitter",
    oneLine: "Interrompt l'opération, efface l'entrée, puis quitte.",
    simple: "Le classique du terminal : un appui arrête/efface, deux appuis quittent Claude Code.",
    details: "Pendant une réponse, l'interrompt. Sinon, un premier appui efface le prompt, un second quitte Claude Code. Comportement Unix standard (SIGINT).",
    pro: "Ctrl+D (EOF) quitte plus proprement en un seul geste quand le prompt est vide.",
    example: "Ctrl+C (×2 pour quitter)",
    difficulty: 1,
    notes: "Identique sur Mac et Windows (Ctrl, pas Cmd, même sur Mac)."
  },
  {
    id: "sc-bang", section: "shortcuts", category: "Saisie", name: "! — mode shell",
    oneLine: "Exécute une commande shell directement, sans passer par Claude.",
    simple: "Commencez votre message par « ! » : la commande part directement dans le terminal, sans que Claude l'interprète.",
    details: "En commençant le prompt par !, la commande est lancée telle quelle et sa sortie est ajoutée à la session. Pratique pour un `! npm test` rapide. On sort avec Échap/Backspace. Depuis v2.1.186, la sortie d'une commande `!` déclenche automatiquement une réponse de Claude (plus besoin de l'inviter explicitement à la commenter).",
    pro: "La sortie de la commande entre dans le contexte ET fait réagir Claude : `! npm test` suffit désormais à ce qu'il propose de corriger les tests en échec, sans second message.",
    example: "! git status",
    output: "$ git status\nOn branch main\nnothing to commit, working tree clean",
    difficulty: 1,
    notes: "Identique sur Mac et Windows. Coller un texte commençant par ! bascule auto en mode shell. v2.1.186 : la sortie déclenche automatiquement une réponse de Claude (source : changelog Claude Code)."
  },
  {
    id: "sc-at", section: "shortcuts", category: "Saisie", name: "@ — mention de fichier",
    oneLine: "Insère une référence de fichier avec autocomplétion.",
    simple: "Tapez « @ » et commencez le nom d'un fichier : l'autocomplétion le retrouve et Claude saura exactement de quoi vous parlez.",
    details: "Taper @ ouvre l'autocomplétion de chemins pour référencer un fichier sans écrire le chemin complet. Claude le prend en compte dans sa réponse.",
    pro: "Mentionner explicitement les fichiers (@src/auth.ts) évite à Claude de chercher : réponse plus rapide, moins de tokens d'exploration.",
    example: "@src/app.ts explique cette fonction",
    difficulty: 1,
    notes: "Identique sur Mac et Windows."
  },
  {
    id: "sc-hash", section: "shortcuts", category: "Saisie", name: "# — mémoire rapide",
    oneLine: "Ajoute une note en mémoire (CLAUDE.md) en un geste.",
    simple: "Commencez par « # » pour dicter une note que Claude retiendra pour toujours (« # toujours utiliser pnpm ici »).",
    details: "Commencer une ligne par # propose d'enregistrer l'information en mémoire (projet ou globale). Moyen le plus rapide de capitaliser une préférence durable.",
    pro: "Capitalisez au fil de l'eau : chaque fois que vous corrigez Claude deux fois sur la même chose, faites-en une note #.",
    example: "# toujours utiliser pnpm dans ce repo",
    difficulty: 1,
    notes: "Identique sur Mac et Windows. Voir /memory pour éditer les fichiers mémoire."
  },
  {
    id: "sc-ctrl-o", section: "shortcuts", category: "Affichage", name: "Ctrl+O — transcript",
    oneLine: "Ouvre/ferme la vue détaillée des appels d'outils.",
    simple: "Ouvre les « coulisses » : tout ce que Claude a réellement fait (fichiers lus, commandes lancées) en détail.",
    details: "Affiche les logs d'exécution, appels d'outils et MCP (repliés par défaut). Excellent pour comprendre ce que Claude a réellement fait et déboguer.",
    pro: "Dans la vue : ? pour l'aide, { } pour sauter de prompt en prompt, v pour ouvrir la conversation dans votre éditeur.",
    example: "Ctrl+O",
    difficulty: 1,
    notes: "Identique sur Mac et Windows."
  },
  {
    id: "sc-ctrl-t", section: "shortcuts", category: "Affichage", name: "Ctrl+T — tâches",
    oneLine: "Affiche/masque la liste des tâches en cours.",
    simple: "Affiche la « to-do list » que Claude suit pour la tâche en cours.",
    details: "Montre jusqu'à 5 tâches du plan courant dans la zone de statut. Utile pour suivre une tâche multi-étapes.",
    pro: "Seules ~5 tâches s'affichent : demandez à Claude « montre toute la liste » pour la version complète, ou pour la vider quand elle est obsolète.",
    example: "Ctrl+T",
    difficulty: 1,
    notes: "Identique sur Mac et Windows. Demander à Claude pour voir toutes les tâches."
  },
  {
    id: "sc-ctrl-r", section: "shortcuts", category: "Navigation", name: "Ctrl+R — recherche historique",
    oneLine: "Recherche inversée dans l'historique des prompts.",
    simple: "Retrouvez un ancien message en tapant quelques lettres, comme la recherche d'historique du terminal.",
    details: "Tapez pour filtrer, Ctrl+R pour parcourir les correspondances, Tab/Échap pour éditer, Entrée pour exécuter. Ctrl+S change la portée (session/projet/tout).",
    pro: "Ctrl+S pendant la recherche change la portée : session courante → projet → tous les projets. Vos meilleurs prompts sont réutilisables partout.",
    example: "Ctrl+R puis « refactor »",
    difficulty: 2,
    notes: "Identique sur Mac et Windows."
  },
  {
    id: "sc-multiline", section: "shortcuts", category: "Saisie", name: "Saisie multiligne",
    oneLine: "Insère un saut de ligne dans le prompt.",
    simple: "Pour écrire un message sur plusieurs lignes sans l'envoyer : Shift+Entrée dans la plupart des terminaux.",
    details: "Sur Mac : Shift+Enter (terminaux modernes), Option+Entrée, \\+Entrée ou Ctrl+J (universels). Pour VS Code/Cursor/Alacritty/Zed, lancer /terminal-setup. Coller un bloc multiligne bascule automatiquement.",
    pro: "Ctrl+J fonctionne partout sans aucune configuration : le joker quand Shift+Enter ne répond pas.",
    example: "Shift+Enter ou Option+Entrée",
    win: {
      details: "Sur Windows : Shift+Enter (Windows Terminal et terminaux modernes), \\+Entrée ou Ctrl+J (universels). Pour VS Code/Cursor/Alacritty, lancer /terminal-setup. Coller un bloc multiligne bascule automatiquement.",
      example: "Shift+Enter ou Ctrl+J"
    },
    difficulty: 1,
    notes: "Ctrl+J marche partout sans configuration, Mac comme Windows."
  },
  {
    id: "sc-paste-image", section: "shortcuts", category: "Saisie", name: "Coller une image",
    oneLine: "Insère une capture/image depuis le presse-papiers.",
    simple: "Faites une capture d'écran et collez-la : Claude « voit » l'image (maquette, message d'erreur, schéma).",
    details: "Sur Mac : Ctrl+V (ou Cmd+V dans iTerm2) insère un chip [Image #N]. Claude peut alors analyser la capture (maquette, erreur, schéma).",
    pro: "Une capture d'une erreur visuelle vaut souvent mieux qu'une description : Claude lit le texte de l'image ET sa mise en page.",
    example: "Capture → Ctrl+V (ou Cmd+V sur iTerm2)",
    win: {
      details: "Sur Windows : Ctrl+V insère un chip [Image #N] ; sous WSL, utilisez Alt+V si le terminal intercepte Ctrl+V. Claude peut alors analyser la capture (maquette, erreur, schéma).",
      example: "Capture → Ctrl+V (ou Alt+V sous WSL)"
    },
    difficulty: 1,
    notes: "Idéal pour partager une erreur visuelle ou une maquette."
  },
  {
    id: "sc-model-shortcut", section: "shortcuts", category: "Modes", name: "Option+P — changer de modèle",
    oneLine: "Ouvre le sélecteur de modèle sans effacer votre brouillon.",
    simple: "Change de modèle d'un raccourci, sans perdre le message que vous étiez en train d'écrire.",
    details: "Ouvre le sélecteur de modèle (Opus, Sonnet, Haiku, Fable) en cours de session. Le contexte et le brouillon en cours sont conservés ; seul le modèle change.",
    pro: "Le réflexe « ascenseur » : Option+P vers Opus pour l'étape difficile, Option+P retour vers Sonnet ensuite — sans toucher au clavier plus de 2 secondes.",
    example: "Option+P",
    win: { name: "Alt+P — changer de modèle", example: "Alt+P" },
    difficulty: 1,
    notes: "Équivalent du sélecteur /model."
  },
  {
    id: "sc-thinking-toggle", section: "shortcuts", category: "Modes", name: "Option+T — extended thinking",
    oneLine: "Active/désactive le raisonnement étendu.",
    simple: "Donne (ou retire) à Claude un « temps de réflexion » supplémentaire avant de répondre.",
    details: "Bascule l'extended thinking (réflexion approfondie avant de répondre). Sans effet sur Fable 5 (toujours en thinking). Augmente la qualité sur les tâches complexes au prix de latence/tokens.",
    pro: "Activez pour le débogage difficile et l'architecture ; désactivez pour les questions simples — la sur-réflexion coûte sans rien apporter.",
    example: "Option+T",
    win: { name: "Alt+T — extended thinking", example: "Alt+T" },
    difficulty: 1,
    notes: "Sans effet sur Fable 5, qui raisonne toujours en profondeur."
  },
  {
    id: "sc-fast-mode", section: "shortcuts", category: "Modes", name: "Option+O — fast mode",
    oneLine: "Active/désactive le mode rapide.",
    simple: "Un accélérateur : les réponses arrivent plus vite, avec le même modèle.",
    details: "Bascule le fast mode, qui accélère la génération d'Opus sans changer de modèle (ce n'est pas un passage à un modèle plus petit). Disponible sur Opus 4.6 et plus récents.",
    pro: "Fast mode ≠ downgrade : c'est le même Opus, servi plus vite. À activer pour les sessions interactives où la latence vous freine.",
    example: "Option+O",
    win: { name: "Alt+O — fast mode", example: "Alt+O" },
    difficulty: 1,
    notes: "Aussi disponible via /fast."
  },
  {
    id: "sc-vim-mode", section: "shortcuts", category: "Édition Vim", name: "Mode Vim (prompt)",
    oneLine: "Édition du prompt avec mouvements et opérateurs Vim.",
    simple: "Pour les adeptes de Vim : éditez vos messages avec les commandes Vim complètes (navigation, suppression, copier-coller…).",
    details: "Une fois activé (via /config → Editor mode ; la commande dédiée /vim a été retirée), le prompt se pilote en NORMAL/INSERT/VISUAL : hjkl, w/b/e, dd, ciw, yy/p, text objects (iw, i\", i(), etc.). Pour les utilisateurs Vim aguerris.",
    pro: "Tout y est : f/t pour la recherche de caractère, les text objects, le point pour répéter. Si vous vivez dans Vim, activez-le sans hésiter.",
    example: "Échap puis ciw pour changer un mot",
    difficulty: 3,
    notes: "Identique sur Mac et Windows. Courbe d'apprentissage pour les non-vimistes."
  },

  /* ============================== APP CLAUDE — CHAT ============================== */
  {
    id: "app-projects", section: "app", sub: "chat", category: "Organisation", name: "Projects", mockup: "chat",
    oneLine: "Espaces de travail avec historique, base de connaissances et instructions dédiés.",
    simple: "Des « classeurs » thématiques : chaque projet garde ses documents, ses consignes et ses conversations — Claude n'oublie rien d'une fois sur l'autre.",
    details: "Chaque Projet regroupe des documents, des instructions et un ensemble de conversations pour que Claude garde le contexte d'un travail récurrent (un client, un livre, un codebase). Les plans payants ajoutent la recherche RAG pour étendre la capacité documentaire.",
    pro: "Soignez les instructions du projet comme un mini system prompt : ton, format attendu, vocabulaire métier. C'est elles qui font la différence de qualité.",
    example: "Projet « Marketing Q3 » : charte + rapports + instruction « écris dans notre voix de marque ».",
    difficulty: 2,
    notes: "Gratuit : jusqu'à 5 projets. RAG complet et partage org sur plans payants."
  },
  {
    id: "app-artifacts", section: "app", sub: "chat", category: "Sortie", name: "Artifacts", mockup: "chat",
    oneLine: "Fenêtre latérale où Claude génère contenus et mini-apps interactives.",
    simple: "Une fenêtre à côté du chat où Claude construit de « vrais objets » : documents, schémas, et même des petites applications qui fonctionnent.",
    details: "Les Artifacts contiennent des sorties substantielles (documents, code, diagrammes, apps) séparées du chat, éditables et prévisualisables en direct. Ils peuvent se connecter à des services via MCP et persister des données pour des apps avec état.",
    pro: "Les artifacts publiés tournent sur le compte Claude du LECTEUR : partagez un outil interactif à 1 000 personnes sans payer une seule requête API.",
    example: "« Construis une web-app de suivi d'habitudes avec vue calendrier », puis publie le lien.",
    difficulty: 2,
    notes: "Disponible sur tous les plans. Les apps « avec état » (données persistantes) sont le niveau avancé."
  },
  {
    id: "app-connectors", section: "app", sub: "chat", category: "Intégrations", name: "Connecteurs / MCP", mockup: "chat",
    oneLine: "Connecte Claude à des outils et données externes via MCP.",
    simple: "Branche Claude sur vos outils du quotidien (Gmail, Calendar, Notion, Slack…) pour qu'il lise vos vraies données et agisse dedans.",
    details: "Les connecteurs laissent Claude lire et agir sur des services (Google Workspace, Slack, Notion, GitHub…). Installation locale en un clic sur Desktop ; connecteurs distants pour les services hébergés.",
    pro: "Sur Enterprise, les admins gouvernent les connecteurs autorisés. Pour un serveur MCP custom, commencez en local (stdio) avant de passer au distant (auth OAuth).",
    example: "Connecte Calendar + Gmail : « Trouve un créneau d'1 h la semaine prochaine et rédige l'invitation ».",
    difficulty: 3,
    notes: "Connecteurs distants surtout sur plans payants. Les serveurs MCP custom demandent plus de configuration."
  },
  {
    id: "app-files", section: "app", sub: "chat", category: "Entrée", name: "Fichiers & imports", mockup: "chat",
    oneLine: "Importe documents, images, tableurs et PDF pour analyse.",
    simple: "Glissez-déposez n'importe quel document (PDF, Excel, image…) : Claude le lit et peut le résumer, l'analyser ou le transformer.",
    details: "Glissez des fichiers dans un chat ou dans la base d'un Projet ; Claude extrait, résume, analyse et transforme leur contenu. Couplé à l'exécution de code, il traite aussi des données programmatiquement.",
    pro: "Pour de grandes collections de documents, passez par la base de connaissances d'un Projet (RAG) plutôt que de tout coller dans un chat : seuls les passages pertinents sont chargés.",
    example: "Déposez un contrat PDF de 40 pages : « Liste chaque obligation de paiement et son échéance en tableau ».",
    difficulty: 1,
    notes: "Limites de taille/contexte plus élevées sur les plans payants."
  },
  {
    id: "app-extended-thinking", section: "app", sub: "chat", category: "Raisonnement", name: "Extended thinking", mockup: "chat",
    oneLine: "Laisse Claude planifier et raisonner avant de répondre.",
    simple: "Un interrupteur « réflexion approfondie » : Claude prend le temps de poser le problème avant de répondre — utile pour les questions difficiles.",
    details: "Activé, Claude décompose le problème et explore des approches, ce qui améliore les tâches de raisonnement, maths et débogage qui ne nécessitent pas de données web fraîches. Se règle via les contrôles du modèle.",
    pro: "La compétence est de savoir QUAND l'activer : raisonnement multi-étapes, maths, débogage = oui ; recherche d'info simple = non (latence pour rien).",
    example: "« Voici un test qui échoue et la fonction — raisonne sur la cause et propose un correctif ».",
    difficulty: 2,
    notes: "Consomme plus de tokens/temps. Inutile pour les recherches simples."
  },
  {
    id: "app-web-search", section: "app", sub: "chat", category: "Intégrations", name: "Recherche web", mockup: "chat",
    oneLine: "Claude effectue des recherches en direct pour des infos à jour.",
    simple: "Claude va chercher sur internet en direct quand votre question demande des infos récentes — avec les sources citées.",
    details: "Idéal pour des questions factuelles résolues en une ou deux recherches (actualité, météo, dernier détail d'une entreprise). Claude décide quoi chercher et cite ses sources. Prérequis de la fonction Research.",
    pro: "Une ou deux recherches suffisent pour un fait ; si la question demande de croiser de nombreuses sources, basculez sur Research, conçu pour ça.",
    example: "« Quelles ont été les annonces phares à la conférence Apple de cette semaine ? »",
    difficulty: 1,
    notes: "À activer dans le menu +. Pour les analyses multi-sources, préférer Research."
  },
  {
    id: "app-research", section: "app", sub: "chat", category: "Raisonnement", name: "Research / Deep research", mockup: "chat",
    oneLine: "Investigation agentique multi-sources produisant un rapport cité.",
    simple: "Claude devient enquêteur : il enchaîne des dizaines de recherches, croise les sources et vous remet un rapport complet avec citations.",
    details: "Claude lance de nombreuses recherches interconnectées (web + sources connectées) sur 1-3 min puis synthétise avec des citations vérifiables. Pour comparatifs, veilles de marché et briefs approfondis plutôt que des faits rapides.",
    pro: "La vraie compétence est le cadrage : précisez le périmètre, les critères de comparaison et le format attendu AVANT de lancer — un rapport mal cadré coûte cher en quota pour rien.",
    example: "« Analyse les 5 principaux concurrents du marché du vélo électrique en UE : prix, autonomie, garantie ».",
    difficulty: 3,
    notes: "Plans payants. Consomme davantage de quota (nombreuses requêtes)."
  },
  {
    id: "app-code-exec", section: "app", sub: "chat", category: "Raisonnement", name: "Exécution de code / Analyse", mockup: "chat",
    oneLine: "Claude écrit et exécute du code (Python) dans un bac à sable.",
    simple: "Pour les calculs et les données, Claude ne « devine » plus : il écrit un vrai programme, l'exécute, et vous donne le résultat exact.",
    details: "L'outil d'analyse exécute du code sur vos fichiers pour des calculs réels, du nettoyage de données et des graphiques, au lieu d'estimer. Il sous-tend aussi les Skills (création Excel/Word/PowerPoint/PDF).",
    pro: "C'est le prérequis technique des Skills (fichiers Office) : si la génération d'Excel/PPT ne marche pas, vérifiez d'abord que l'exécution de code est activée.",
    example: "Importez un CSV brouillon : « Nettoie, calcule le CA mensuel et trace la tendance ».",
    difficulty: 3,
    notes: "À activer ; prérequis des Skills. Vérifier les résultats produits."
  },
  {
    id: "app-memory", section: "app", sub: "chat", category: "Organisation", name: "Mémoire", mockup: "chat",
    oneLine: "Claude retient contexte et préférences au fil des conversations.",
    simple: "Claude se souvient de vous d'une conversation à l'autre : vos préférences, vos projets en cours, votre contexte.",
    details: "La mémoire reporte faits, préférences et contexte d'une session à l'autre pour éviter de tout réexpliquer ; recherche et import/export inclus. À relire/éditer pour l'exactitude et la confidentialité.",
    pro: "Auditez la mémoire régulièrement : supprimez les faits périmés (ancien job, ancien projet) — une mémoire fausse est pire qu'une absence de mémoire.",
    example: "Dites une fois « je suis végétarien et cuisine pour deux » ; plus tard « planifie mes dîners » en tient compte.",
    difficulty: 2,
    notes: "Gratuit pour tous depuis mars 2026. Contrôles admin en Enterprise."
  },
  {
    id: "app-styles", section: "app", sub: "chat", category: "Sortie", name: "Styles & instructions", mockup: "chat",
    oneLine: "Contrôle le ton, la voix et le format des réponses.",
    simple: "Apprenez à Claude à écrire « comme vous » : choisissez un ton prédéfini ou créez un style à partir de vos propres textes.",
    details: "Trois niveaux : instructions du compte, styles par chat (Normal, Concis, Explicatif, Formel… ou style custom créé depuis un échantillon), et instructions par Projet. Pour des sorties cohérentes avec votre voix.",
    pro: "Le style custom appris depuis 2-3 vrais échantillons (vos e-mails, vos posts) surpasse de loin n'importe quelle description de ton en toutes lettres.",
    example: "Créez un style à partir de 3 de vos e-mails pour que tous les brouillons sonnent comme vous.",
    difficulty: 2,
    notes: "Les Styles migrent progressivement vers la surface Skills."
  },
  {
    id: "app-skills", section: "app", sub: "chat", category: "Sortie", name: "Skills", mockup: "chat",
    oneLine: "Workflows et expertises réutilisables appliqués automatiquement.",
    simple: "Des « savoir-faire » empaquetés : demandez un PowerPoint et Claude applique automatiquement sa recette pour produire un deck propre.",
    details: "Une Skill empaquète instructions et savoir-faire pour bien réaliser une tâche ; les intégrées couvrent Excel, Word, PowerPoint et PDF. Claude l'invoque automatiquement ou sur demande ; vous pouvez en importer en ZIP.",
    pro: "Créez vos propres skills pour vos tâches récurrentes (rapport hebdo, format de compte rendu) : une skill bien écrite garantit un résultat constant là où un prompt varie.",
    example: "« Crée un PowerPoint résumant ce rapport » déclenche la skill PPTX et produit un deck formaté.",
    difficulty: 3,
    notes: "Nécessite l'exécution de code activée. Import de skills custom en ZIP."
  },
  {
    id: "app-voice", section: "app", sub: "chat", category: "Entrée", name: "Mode vocal", mockup: "chat",
    oneLine: "Conversations parlées à double sens dans le même fil.",
    simple: "Parlez à Claude et il vous répond à voix haute, mains libres — la conversation reste enregistrée par écrit.",
    details: "Mode mains libres (répond aux pauses) ou push-to-talk ; bascule voix/texte en cours de route, recherche web disponible pendant la voix. Transcriptions sauvegardées comme un chat normal.",
    pro: "Le push-to-talk est plus fiable en environnement bruyant ; le mode mains libres brille en cuisine, en voiture (passager !) ou en marchant.",
    example: "En cuisinant : « Explique-moi comment doubler cette recette et ajuste le temps de cuisson ».",
    difficulty: 1,
    notes: "Bêta, web et mobile. Voix préréglées (pas de clonage)."
  },
  {
    id: "app-chrome", section: "app", sub: "chat", category: "Intégrations", name: "Claude in Chrome", mockup: "chat",
    oneLine: "Agent d'extension navigateur qui lit, clique et navigue.",
    simple: "Claude pilote votre navigateur : il lit les pages, clique, remplit des formulaires et enchaîne les onglets pour automatiser vos tâches web.",
    details: "Dans un panneau latéral, Claude lit le texte des pages, prend des captures, clique, saisit et gère plusieurs onglets pour des workflows web multi-étapes. Enregistrement/répétition de workflows et tâches planifiées.",
    pro: "Le risque n°1 est l'injection de prompt : une page malveillante peut « parler » à Claude. Donnez des permissions granulaires par site et supervisez les actions sensibles.",
    example: "« Parcours mes onglets Jira ouverts et ajoute un commentaire de statut à chaque ticket qui m'est assigné ».",
    difficulty: 4,
    notes: "Bêta, plans payants. Se combine avec Cowork pour les workflows recherche + production."
  },
  {
    id: "app-slack", section: "app", sub: "chat", category: "Intégrations", name: "Claude dans Slack", mockup: "chat",
    oneLine: "Mentionnez Claude dans Slack pour lui déléguer une tâche sans changer d'outil.",
    simple: "Taguez @Claude directement dans une conversation Slack : il prend la demande en charge pendant que vous restez concentré sur autre chose.",
    details: "Dans Slack, mentionner Claude lui confie une tâche directement depuis le fil de discussion, sans quitter l'outil ni copier-coller le contexte. Claude répond et travaille la demande à partir de la conversation.",
    pro: "Idéal pour transformer une discussion d'équipe en action : au lieu de recopier une demande ailleurs, taguez Claude là où le contexte est déjà — le fil sert de brief.",
    example: "Dans un canal projet : « @Claude résume ce fil et propose les 3 prochaines actions ».",
    difficulty: 2,
    notes: "Team/Enterprise. Source : release notes app, 23 juin 2026."
  },
  {
    id: "app-interactive", section: "app", sub: "chat", category: "Sortie", name: "Graphiques & visualisations in-line", mockup: "chat",
    oneLine: "Claude génère charts et diagrammes interactifs directement dans ses réponses.",
    simple: "Quand c'est utile, Claude dessine un graphique ou un schéma interactif au fil de sa réponse — pas seulement du texte.",
    details: "Claude produit des graphiques, diagrammes et autres visualisations interactifs in-line dans ses réponses (et non uniquement dans le panneau Artifacts). Ces apps interactives s'affichent aussi dans les applications mobiles iOS et Android.",
    pro: "Pour une visualisation, demandez explicitement le type voulu (barres, ligne, flux) et les variables à comparer : un cadrage précis évite un graphique générique à retravailler.",
    example: "« Trace l'évolution de ces ventes par trimestre et compare les deux régions. »",
    difficulty: 1,
    notes: "Tous plans ; rendu mobile depuis mars 2026. Source : release notes app, 12 et 25 mars 2026. Distinct des Artifacts (in-line vs panneau)."
  },
  {
    id: "app-sharing", section: "app", sub: "chat", category: "Collaboration", name: "Partage & publication", mockup: "chat",
    oneLine: "Partage des chats et publie des artifacts.",
    simple: "Un lien suffit pour partager une conversation ou publier une mini-app créée avec Claude.",
    details: "Partagez une conversation ou publiez un artifact via un lien ; les artifacts IA publiés tournent sur le compte de chaque lecteur (pas de clé API ni coût par usage). Team/Enterprise étendent au partage org.",
    pro: "Un chat partagé expose TOUT son contenu, y compris les débuts de conversation oubliés : relisez avant de partager.",
    example: "Publiez un artifact « calculatrice de prêt » et envoyez le lien à votre équipe.",
    difficulty: 1,
    notes: "Org-wide (projets, skills) sur Team/Enterprise."
  },
  {
    id: "app-customize", section: "app", sub: "chat", category: "Organisation", name: "Section « Customize »", mockup: "chat",
    oneLine: "Un endroit unique pour gérer skills, plugins et connecteurs.",
    simple: "Le « panneau de configuration » de Claude Desktop : tout ce qui étend Claude (skills, plugins, connecteurs) regroupé au même endroit.",
    details: "Introduite en février 2026 dans Claude Desktop, la section Customize rassemble la gestion des skills, des plugins et des connecteurs MCP en un seul lieu, au lieu de réglages éparpillés.",
    pro: "Pratique pour faire le ménage : désactivez les skills/plugins inutilisés (ils pèsent en contexte) et vérifiez quels connecteurs ont accès à vos données.",
    example: "Claude Desktop → Customize",
    difficulty: 1,
    notes: "Claude Desktop. Regroupe Skills, Plugins et Connecteurs (fév. 2026)."
  },
  {
    id: "app-claude-design", section: "app", sub: "chat", category: "Sortie", name: "Claude Design (Anthropic Labs)", mockup: "chat",
    oneLine: "Collaborer avec Claude pour créer designs, prototypes et slides.",
    simple: "Un atelier visuel : décrivez ce que vous voulez et Claude produit des maquettes, prototypes, présentations ou one-pagers.",
    details: "Produit Anthropic Labs lancé en avril 2026, Claude Design permet de co-créer des sorties visuelles (designs, prototypes interactifs, slides, one-pagers) avec Claude — dans la lignée des Artifacts, mais orienté création visuelle.",
    pro: "Pour une présentation, partez d'un brief précis (audience, ton, structure) et d'un exemple de style : Claude Design itère bien plus vite à partir d'une direction claire.",
    example: "« Crée un prototype d'écran d'accueil + 3 slides de pitch. »",
    difficulty: 2,
    notes: "Anthropic Labs (avr. 2026). Proche des Artifacts, orienté visuel."
  },

  /* ============================== APP CLAUDE — COWORK ============================== */
  {
    id: "cowork-overview", section: "app", sub: "cowork", category: "Vue d'ensemble", name: "Cowork — vue d'ensemble", mockup: "cowork",
    oneLine: "L'espace agentique du Desktop : donnez un objectif, recevez un livrable fini.",
    simple: "Vous donnez une mission (« fais-moi un comparatif de nos 3 concurrents en Excel ») et Claude travaille en autonomie sur votre ordinateur jusqu'au résultat final.",
    details: "Cowork est l'espace « travail délégué » de Claude Desktop : vous décrivez un objectif, Claude planifie, utilise vos fichiers et applications, et produit des livrables finis (tableurs, présentations, rapports). Il travaille en arrière-plan pendant que vous faites autre chose.",
    pro: "La qualité du résultat dépend de la clarté du brief : objectif, critères de réussite, format attendu. Un brief flou = des allers-retours ; un brief précis = un livrable du premier coup.",
    example: "« Analyse nos 3 concurrents et produis un PowerPoint + un comparatif Excel » — Cowork collecte et fabrique les fichiers.",
    difficulty: 3,
    notes: "GA depuis avril 2026, via Claude Desktop (Mac/Windows) — lancé en research preview en janvier. Supervision recommandée sur les tâches sensibles."
  },
  {
    id: "cowork-folder", section: "app", sub: "cowork", category: "Fichiers", name: "Dossier de travail", mockup: "cowork",
    oneLine: "Donnez à Cowork l'accès à un dossier : il y lit, crée et organise vos fichiers.",
    simple: "Comme prêter un tiroir de votre bureau à un assistant : il travaille dedans (lire, créer, ranger) — et pas ailleurs.",
    details: "Au lancement d'une tâche, vous choisissez le dossier auquel Cowork a accès. Il y lit les documents existants, y dépose ses livrables et peut y réorganiser les fichiers. Le périmètre d'accès est défini par vous, tâche par tâche.",
    pro: "Limitez le dossier au strict nécessaire : le périmètre d'accès est votre première barrière de sécurité. Un dossier dédié par mission est une bonne hygiène.",
    example: "Pointez Cowork sur ~/Documents/Compta-2026 : « Classe ces factures par mois et fais-moi une synthèse Excel ».",
    difficulty: 2,
    notes: "L'accès se donne explicitement ; Cowork ne voit pas le reste de votre disque."
  },
  {
    id: "cowork-deliverables", section: "app", sub: "cowork", category: "Livrables", name: "Livrables bureautiques", mockup: "cowork",
    oneLine: "Excel, Word, PowerPoint et PDF produits prêts à l'emploi.",
    simple: "Le résultat n'est pas un texte dans un chat : c'est un vrai fichier Excel, Word, PowerPoint ou PDF, mis en forme et prêt à envoyer.",
    details: "Grâce aux skills intégrées, Cowork produit des fichiers Office professionnels : classeurs Excel avec formules, présentations avec mise en page, documents Word structurés, PDF. Les fichiers atterrissent dans votre dossier de travail.",
    pro: "Donnez un fichier modèle (« respecte la mise en forme de ce deck ») : Cowork imite la structure et le style existants bien mieux qu'il n'invente les vôtres.",
    example: "« Transforme ces notes de réunion en compte rendu Word + plan d'action Excel avec responsables et échéances ».",
    difficulty: 2,
    notes: "S'appuie sur les skills Office (xlsx, docx, pptx, pdf)."
  },
  {
    id: "cowork-steering", section: "app", sub: "cowork", category: "Pilotage", name: "Suivi & pilotage de tâche", mockup: "cowork",
    oneLine: "Suivez la progression, intervenez, réorientez en cours de route.",
    simple: "Pendant que Claude travaille, vous voyez où il en est, et vous pouvez l'interrompre ou préciser la demande à tout moment — comme avec un collègue.",
    details: "Cowork affiche sa progression (étapes, fichiers produits) en temps réel. Vous pouvez intervenir à tout moment : préciser un critère, corriger une direction, mettre en pause. Pour les recherches web, il peut se mettre en binôme avec Claude in Chrome.",
    pro: "Intervenez tôt : une réorientation à 20 % de la tâche coûte peu ; à 90 %, c'est souvent tout refaire. Jetez un œil aux premières étapes avant de vaquer.",
    example: "Lancez la mission, vérifiez le plan annoncé, ajustez (« concentre-toi sur le marché FR »), laissez finir.",
    difficulty: 3,
    notes: "Le binôme Cowork + Claude in Chrome couvre recherche web + production de fichiers."
  },
  {
    id: "app-cowork-scheduled", section: "app", sub: "cowork", category: "Pilotage", name: "Tâches planifiées & récurrentes", mockup: "cowork",
    oneLine: "Programmer des tâches Cowork à la demande ou de façon récurrente.",
    simple: "Demandez à Cowork de faire quelque chose à heure fixe ou en répétition (ex. un rapport chaque lundi) — il s'exécute tout seul au moment voulu.",
    details: "Introduit en février 2026 : Cowork peut créer et planifier des tâches récurrentes ou ponctuelles qui se déclenchent automatiquement. Idéal pour les rituels (veille, rapports, vérifications périodiques).",
    pro: "Couplé à un dossier de travail dédié et un brief précis, c'est un assistant qui produit un livrable régulier sans intervention. Vérifiez les premiers résultats avant de laisser tourner en autonomie.",
    example: "« Chaque lundi 9h : compile l'activité de la semaine en un rapport. »",
    difficulty: 3,
    notes: "Cowork (fév. 2026). Équivalent app de /schedule côté Claude Code."
  },
  {
    id: "app-computer-use", section: "app", sub: "cowork", category: "Intégrations", name: "Computer Use", mockup: "cowork",
    oneLine: "Claude ouvre des fichiers, clique et navigue sur votre écran.",
    simple: "Vous donnez à Claude l'accès à votre ordinateur : il peut ouvrir des fichiers, lancer des outils, pointer, cliquer et naviguer comme vous le feriez.",
    details: "Research preview lancée en mars 2026 (Pro/Max) : Claude agit sur l'écran (ouvrir des fichiers, lancer des dev tools, cliquer, naviguer) pour accomplir des tâches multi-applications — au-delà du seul navigateur (Claude in Chrome).",
    pro: "Comme pour Claude in Chrome, le risque d'injection de prompt existe : supervisez les actions sensibles et accordez l'accès tâche par tâche. Se combine avec Cowork pour des workflows complets.",
    example: "« Ouvre ce CSV dans Excel, trie par date et exporte en PDF. »",
    difficulty: 4,
    notes: "Research preview, Pro/Max (mars 2026). Plus large que Claude in Chrome (tout l'écran)."
  },
  {
    id: "app-cowork-mobile", section: "app", sub: "cowork", category: "Pilotage", name: "Pilotage mobile (fil persistant)", mockup: "cowork",
    oneLine: "Suivez et orientez vos tâches Cowork depuis votre téléphone via un fil d'agent persistant.",
    simple: "Lancez une tâche Cowork sur votre Mac, puis suivez-la et donnez des consignes depuis l'app mobile : un fil de discussion persistant garde le lien avec l'agent.",
    details: "Un fil d'agent persistant, accessible depuis Claude Desktop ou les apps iOS/Android, permet de gérer ses tâches Cowork à distance : consulter l'avancement, répondre, réorienter sans rester devant l'ordinateur.",
    pro: "Pratique pour les tâches longues : laissez Cowork tourner sur le poste, gardez l'œil depuis le mobile et débloquez-le d'une réponse rapide quand il demande une précision.",
    example: "En déplacement : recevez « j'ai besoin du périmètre marché » et répondez « FR uniquement » depuis le téléphone.",
    difficulty: 3,
    notes: "Research preview, Pro/Max. Source : release notes app, 17 mars 2026."
  },

  /* ============================== APP CLAUDE — CODE ============================== */
  {
    id: "code-desktop", section: "app", sub: "code", category: "Vue d'ensemble", name: "Claude Code dans l'app", mockup: "code",
    oneLine: "Tout Claude Code, en interface graphique, sans terminal.",
    simple: "Le même moteur que le Claude Code du terminal, mais en fenêtre cliquable : diffs visuels, boutons de permission, historique — idéal pour débuter.",
    details: "L'onglet Code de Claude Desktop pilote des sessions Claude Code avec une interface graphique : sélection du projet, diffs colorés, validation des permissions au clic, suivi des fichiers modifiés. Le moteur est identique au CLI.",
    pro: "Les sessions desktop et terminal partagent le même historique : commencez dans l'app, reprenez dans le terminal avec `claude -r` (et inversement).",
    example: "Ouvrez un dossier projet → décrivez la modification → validez le plan → suivez les diffs en direct.",
    difficulty: 2,
    notes: "Le chemin le plus doux pour découvrir Claude Code avant de passer au terminal."
  },
  {
    id: "code-parallel", section: "app", sub: "code", category: "Sessions", name: "Sessions parallèles & worktrees", mockup: "code",
    oneLine: "Plusieurs chantiers en même temps, chacun isolé dans sa copie du projet.",
    simple: "Lancez plusieurs Claude en parallèle — un sur le bug, un sur la nouvelle feature — chacun travaille dans sa propre copie, sans se marcher dessus.",
    details: "Chaque session peut travailler dans un worktree git isolé : les modifications d'une session n'affectent ni vos fichiers ni les autres sessions. L'app facilite le lancement et le suivi de plusieurs sessions simultanées.",
    pro: "Pensez « un worktree = une branche = une PR » : à la fin, chaque session propose sa branche propre, facile à relire et merger indépendamment.",
    example: "Session A : corrige le bug d'auth. Session B : ajoute l'export CSV. Les deux avancent en parallèle.",
    difficulty: 3,
    notes: "Équivalent CLI : `claude -w` (+ --tmux). Nécessite un dépôt git."
  },
  {
    id: "code-follow", section: "app", sub: "code", category: "Sessions", name: "Suivi, reprise & historique", mockup: "code",
    oneLine: "Retrouvez, nommez et reprenez vos sessions de code.",
    simple: "Toutes vos sessions de travail sont listées : reprenez celle d'hier exactement où elle en était, avec toute sa mémoire.",
    details: "L'app liste vos sessions (par projet, par date), permet de les nommer, de les reprendre avec leur contexte complet, et de consulter ce qui a été modifié. Une session interrompue se poursuit sans perte.",
    pro: "Nommez vos sessions dès le départ (« fix-auth-token ») : dans trois semaines, retrouver « la session du refactor » parmi 40 sessions anonymes est pénible.",
    example: "Reprenez « fix-auth-bug » de mardi : Claude se souvient du diagnostic et continue le correctif.",
    difficulty: 2,
    notes: "Équivalents CLI : /resume, claude -c, claude -r, claude -n <nom>."
  },
  {
    id: "app-office-addins", section: "app", sub: "code", category: "Bureautique", name: "Add-ins Excel & PowerPoint", mockup: "code",
    oneLine: "Claude intégré dans Excel et PowerPoint, partageant le contexte d'une appli à l'autre.",
    simple: "Claude s'installe comme module dans Excel et PowerPoint et travaille directement dans vos fichiers ; il garde le fil entre les deux applications.",
    details: "Les add-ins Claude pour Excel et PowerPoint partagent le contexte complet de la conversation : une action menée dans une application tient compte de l'activité dans l'autre. L'add-in Excel gère les opérations natives (tableaux croisés, mise en forme conditionnelle) et le support des skills est inclus.",
    pro: "Le partage de contexte entre Excel et PowerPoint évite de tout réexpliquer : préparez les chiffres dans Excel puis demandez le deck PowerPoint, Claude réutilise l'analyse déjà faite.",
    example: "Dans Excel : « Construis un tableau croisé du CA par région », puis dans PowerPoint : « Fais-en 3 slides ».",
    difficulty: 3,
    notes: "Option LLM gateway pour Enterprise. Source : release notes app, 11 mars 2026 (Excel & PowerPoint, partage de contexte)."
  },

  /* ============================== MODÈLES ============================== */
  {
    id: "mdl-opus", section: "models", sub: "modeles", category: "Modèles", name: "Opus 4.8",
    oneLine: "Le modèle le plus capable, pour le raisonnement et le code complexes.",
    simple: "Le « grand cerveau » : le plus intelligent de la gamme, à réserver aux problèmes vraiment difficiles.",
    details: "À réserver aux tâches difficiles : architecture, débogage ardu, raisonnement multi-étapes, refactors délicats, travail agentique long. Plus coûteux et plus lent ; n'apporte pas grand-chose sur les tâches simples.",
    pro: "Opus 4.8 excelle sur les tâches longues autonomes : donnez la spécification complète dès le premier message et laissez-le dérouler — c'est là qu'il creuse l'écart.",
    example: "claude --model opus   # ou /model opus",
    difficulty: 2,
    notes: "Alias : opus. ID : claude-opus-4-8. 5 $ / 25 $ par million de tokens (entrée/sortie). Contexte 1M."
  },
  {
    id: "mdl-sonnet", section: "models", sub: "modeles", category: "Modèles", name: "Sonnet 4.6",
    oneLine: "Le bon équilibre vitesse/qualité pour le quotidien.",
    simple: "Le « couteau suisse » : rapide, malin et économique — le bon choix par défaut pour presque tout.",
    details: "Excellent par défaut pour la majorité des tâches de développement : édition, lecture de code, petites features. Sensiblement moins cher et plus rapide qu'Opus, qualité très solide.",
    pro: "Sonnet 4.6 d'aujourd'hui dépasse l'Opus d'il y a un an : ne sur-payez pas Opus par habitude — testez Sonnet d'abord, montez seulement si ça coince.",
    example: "/model sonnet",
    difficulty: 1,
    notes: "Alias : sonnet. ID : claude-sonnet-4-6. 3 $ / 15 $ par MTok. Contexte 1M."
  },
  {
    id: "mdl-haiku", section: "models", sub: "modeles", category: "Modèles", name: "Haiku 4.5",
    oneLine: "Le plus rapide et le plus économe, pour les tâches simples.",
    simple: "Le « sprinter » : réponses quasi instantanées et coût mini, parfait pour les petites tâches en grande quantité.",
    details: "Idéal pour la classification, l'extraction, des reformulations, des sous-tâches d'agents à fort volume. Réponses quasi instantanées et coût minimal ; à éviter pour le raisonnement difficile.",
    pro: "Le pattern gagnant : un orchestrateur Sonnet/Opus qui délègue les sous-tâches répétitives (lire 50 fichiers, classifier 200 items) à des agents Haiku.",
    example: "/model haiku",
    difficulty: 1,
    notes: "Alias : haiku. ID : claude-haiku-4-5. 1 $ / 5 $ par MTok. Contexte 200K."
  },
  {
    id: "mdl-fable", section: "models", sub: "modeles", category: "Modèles", name: "Fable 5",
    oneLine: "Le modèle le plus puissant, thinking adaptatif toujours actif.",
    simple: "Le nouveau sommet de la gamme, au-dessus d'Opus : il réfléchit toujours en profondeur avant de répondre.",
    details: "Niveau au-dessus d'Opus. Le thinking adaptatif est toujours actif (le modèle ajuste lui-même sa profondeur de réflexion) ; le toggle Option+T n'a pas d'effet et l'ancien mode extended thinking à budget fixe est rejeté. À considérer quand la réflexion approfondie est souhaitée par défaut et que le budget le permet.",
    pro: "Deux fois le prix d'Opus (10 $/50 $ par MTok) : réservez-le aux problèmes où Opus plafonne — recherche, raisonnement très long, architecture critique.",
    example: "/model fable",
    difficulty: 2,
    notes: "Alias : fable. ID : claude-fable-5. 10 $ / 50 $ par MTok. Contexte 1M."
  },
  {
    id: "mdl-pricing", section: "models", sub: "modeles", category: "Modèles", name: "Prix & contexte en un coup d'œil",
    oneLine: "Le comparatif tarifaire des modèles, par million de tokens.",
    simple: "Combien coûte chaque modèle : le prix se compte « au million de tokens » lus (entrée) et écrits (sortie) — la sortie coûte ~5× plus cher.",
    details: "Fable 5 : 10 $/50 $ (contexte 1M). Opus 4.8 : 5 $/25 $ (1M). Sonnet 4.6 : 3 $/15 $ (1M). Haiku 4.5 : 1 $/5 $ (200K). Les prix s'entendent par million de tokens, entrée/sortie. La lecture depuis le cache coûte ~10 % du prix d'entrée.",
    pro: "La sortie coûtant ~5× l'entrée, faire écrire MOINS (réponses concises, diffs ciblés plutôt que fichiers entiers) économise souvent plus qu'un changement de modèle.",
    example: "/cost   # pour voir votre consommation réelle",
    output: "Modèle       Entrée   Sortie   Contexte\nFable 5      $10      $50      1M\nOpus 4.8     $5       $25      1M\nSonnet 4.6   $3       $15      1M\nHaiku 4.5    $1       $5       200K",
    difficulty: 2,
    notes: "Prix par million de tokens (MTok), vérifiés mi-2026. Cache : lecture ~0,1×, écriture ~1,25×."
  },

  /* ============================== BONNES PRATIQUES ============================== */
  {
    id: "bp-right-model", section: "models", sub: "pratiques", category: "Bonnes pratiques", name: "Choisir le bon modèle",
    oneLine: "Adapter le modèle à la difficulté réelle de la tâche.",
    simple: "N'utilisez pas un bulldozer pour planter une fleur : le modèle le plus puissant n'est pas toujours le bon choix.",
    details: "Réservez Opus au raisonnement vraiment complexe ; faites tourner Sonnet par défaut ; déléguez le volume et le simple à Haiku. Vous pouvez changer en cours de session (/model) : monter pour une étape dure, redescendre ensuite.",
    pro: "L'« ascenseur de modèles » en cours de session est sous-utilisé : Sonnet par défaut, /model opus pour LE problème dur, /model sonnet ensuite — le contexte suit.",
    example: "Sonnet pour coder, /model opus le temps d'un débogage épineux, puis /model sonnet.",
    difficulty: 2,
    notes: "Le sur-dimensionnement du modèle est la première source de surcoût inutile."
  },
  {
    id: "bp-context-hygiene", section: "models", sub: "pratiques", category: "Bonnes pratiques", name: "Hygiène de contexte",
    oneLine: "Garder une fenêtre de contexte propre et pertinente.",
    simple: "La « mémoire de travail » de Claude est limitée : moins on y met de choses inutiles, mieux il réfléchit (et moins ça coûte).",
    details: "Utilisez /clear entre deux tâches sans rapport, /compact pour résumer une session longue, et /context pour voir ce qui consomme. Moins de contexte inutile = réponses plus rapides, moins chères et souvent meilleures.",
    pro: "Le contexte pollué est insidieux : Claude reste poli et répond, mais la qualité baisse silencieusement. /context régulièrement, /clear sans état d'âme.",
    example: "/context → /compact garde les décisions clés",
    difficulty: 2,
    notes: "Un long historique non pertinent dégrade qualité ET coût."
  },
  {
    id: "bp-plan-first", section: "models", sub: "pratiques", category: "Bonnes pratiques", name: "Planifier avant d'agir",
    oneLine: "Valider l'approche en mode plan avant de laisser Claude modifier.",
    simple: "Pour toute tâche un peu sérieuse : demandez d'abord le plan, validez-le, puis laissez faire. Dix secondes de relecture évitent une heure de corrections.",
    details: "Le mode plan (Shift+Tab) fait travailler Claude en lecture seule : il explore, comprend et propose une démarche que vous validez avant toute modification. C'est le meilleur garde-fou contre les fausses pistes coûteuses.",
    pro: "À l'approbation, choisissez le mode d'exécution adapté au risque : auto pour le mécanique, acceptEdits pour le standard, manuel pour le critique.",
    example: "Shift+Tab → plan mode → « migre ce module vers TypeScript » → validation → exécution",
    difficulty: 2,
    notes: "Réflexe recommandé dès que la tâche touche plus de 2-3 fichiers."
  },
  {
    id: "bp-clear-asks", section: "models", sub: "pratiques", category: "Bonnes pratiques", name: "Des demandes complètes et précises",
    oneLine: "Donner la spécification entière dès le premier message.",
    simple: "Plus votre demande est précise et complète dès le départ, meilleur (et moins cher) est le résultat — comme avec un prestataire humain.",
    details: "Les modèles récents excellent quand l'objectif, les contraintes et les critères de réussite sont posés d'emblée. Une demande distillée au compte-goutte sur dix messages coûte plus de tokens et produit un résultat moins cohérent.",
    pro: "Structurez les grosses demandes : objectif, contexte, contraintes, critères de « fini », exemples. Sur le travail agentique long, cette spec initiale est LE facteur de réussite.",
    example: "« Ajoute l'export CSV : bouton dans la toolbar, colonnes visibles uniquement, encodage UTF-8 BOM, test e2e inclus. »",
    difficulty: 2,
    notes: "Mentionner les fichiers avec @ et coller les messages d'erreur complets aide énormément."
  },
  {
    id: "bp-prompt-caching", section: "models", sub: "pratiques", category: "Bonnes pratiques", name: "Tirer parti du cache de prompt",
    oneLine: "Réutiliser le contexte stable pour payer moins cher.",
    simple: "Ce que Claude relit à chaque fois sans que ça change (les consignes, la doc projet) peut être servi depuis un « cache » à ~10 % du prix.",
    details: "Le contenu stable et répété (system prompt, CLAUDE.md, gros fichiers) peut être servi depuis le cache à coût réduit. Gardez les éléments invariants en tête de contexte et évitez de tout reconstruire à chaque tour. /cost montre la part lue en cache.",
    pro: "Le cache est un match de préfixe : un seul octet changé au début invalide tout ce qui suit. Bannissez dates du jour et IDs aléatoires du haut de vos prompts système.",
    example: "CLAUDE.md concis et stable → réutilisé en cache à chaque tour.",
    difficulty: 3,
    notes: "--exclude-dynamic-system-prompt-sections améliore la réutilisation entre exécutions."
  },
  {
    id: "bp-claude-md", section: "models", sub: "pratiques", category: "Bonnes pratiques", name: "Un CLAUDE.md concis et utile",
    oneLine: "Documenter le strict nécessaire, pas un roman.",
    simple: "La « notice » du projet que Claude relit à chaque session : courte et dense, elle guide ; longue et bavarde, elle coûte et noie l'important.",
    details: "Un bon CLAUDE.md donne commandes de build/test, conventions et pièges — de façon brève. Chaque ligne est chargée à chaque session : privilégiez la densité d'information. Générez-le via /init puis élaguez.",
    pro: "Test utile : si une ligne du CLAUDE.md n'a jamais changé le comportement de Claude, supprimez-la. Visez la liste de contraintes, pas la documentation exhaustive.",
    example: "/init puis retirer le superflu, garder build/test/conventions.",
    difficulty: 2,
    notes: "Trop long = coût permanent + dilution. Concision = signal fort."
  },
  {
    id: "bp-effort", section: "models", sub: "pratiques", category: "Bonnes pratiques", name: "Doser l'effort / le thinking",
    oneLine: "Mettre de la réflexion là où elle paie, pas ailleurs.",
    simple: "La réflexion approfondie, c'est comme les heures sup : très rentable sur les problèmes durs, du gâchis sur les tâches mécaniques.",
    details: "Montez --effort ou activez extended thinking (Option+T / Alt+T) pour le raisonnement difficile ; laissez-les bas pour les tâches mécaniques. La sur-réflexion coûte des tokens et de la latence sans gain sur le simple.",
    pro: "Repères : `low` pour renommer/reformater, `high` pour le quotidien exigeant, `xhigh` pour le code et l'agentique, `max` quand l'erreur coûte plus cher que les tokens.",
    example: "claude --effort high pour un design ; effort low pour du renommage.",
    difficulty: 2,
    notes: "Fable 5 est toujours en thinking ; le toggle n'y change rien."
  },
  {
    id: "bp-subagents", section: "models", sub: "pratiques", category: "Bonnes pratiques", name: "Déléguer à des subagents",
    oneLine: "Isoler le contexte et paralléliser via des agents.",
    simple: "Plutôt que de tout faire lire à Claude, envoyez des « éclaireurs » : ils fouillent et ne rapportent que la conclusion, sans encombrer la mémoire principale.",
    details: "Confier la recherche/lecture à des subagents (/agents) garde votre contexte principal propre : l'agent renvoie une conclusion, pas des centaines de lignes de fichiers. Pour le travail indépendant, lancez plusieurs agents en parallèle.",
    pro: "Doublé gagnant : contexte principal préservé + parallélisme. Trois agents Haiku qui explorent trois sous-systèmes en même temps battent une lecture séquentielle.",
    example: "Un agent « Explore » cherche dans le repo et renvoie seulement la synthèse.",
    difficulty: 4,
    notes: "Bien cadrer le périmètre et les outils de chaque agent. Lié à /agents."
  },
  {
    id: "bp-tools-scope", section: "models", sub: "pratiques", category: "Bonnes pratiques", name: "Réduire les outils chargés",
    oneLine: "Moins d'outils = moins de tokens de contexte.",
    simple: "Chaque outil branché « pèse » dans la mémoire de Claude, même inutilisé : ne gardez que ceux dont la tâche a besoin.",
    details: "Chaque outil/serveur MCP ajoute des définitions au contexte. Limitez aux outils utiles (--tools, --strict-mcp-config) pour économiser des tokens et réduire le bruit, surtout en automatisation.",
    pro: "En headless/CI, l'économie est double : moins de tokens par requête ET moins de chances que Claude se disperse sur un outil hors-sujet.",
    example: 'claude --tools "Read,Edit,Bash"',
    difficulty: 3,
    notes: "Particulièrement rentable en automatisation où chaque token compte."
  },
  {
    id: "bp-verify-evidence", section: "models", sub: "pratiques", category: "Bonnes pratiques", name: "Exiger des preuves, pas des affirmations",
    oneLine: "Faire prouver qu'un changement marche (test, sortie, capture) plutôt que l'affirmer.",
    simple: "« Ça marche » ne suffit pas : demandez à Claude de MONTRER la preuve — la sortie des tests, la commande lancée, une capture — avant de considérer une tâche terminée.",
    details: "Un agent qui affirme le succès sans le vérifier se trompe parfois en silence. Exigez une preuve observable (tests verts, sortie de commande, capture) : la relecture est plus rapide et ça fiabilise les exécutions autonomes. Pour l'UI, donnez un visuel cible (mock, capture) et demandez à Claude de capturer le résultat, de le comparer à l'original, lister les écarts et corriger.",
    pro: "C'est le garde-fou des longues tâches en /goal ou en mode auto : la condition de réussite doit être observable. Couplez avec /verify (qui lance réellement l'app) plutôt que de croire l'auto-évaluation de Claude. Pour gater le stop, montez d'un cran : condition /goal ré-évaluée à chaque tour, ou Stop hook qui bloque la fin tant que le check ne passe pas.",
    example: "« Lance les tests et colle la sortie avant de dire que c'est corrigé. »",
    difficulty: 2,
    notes: "Source : Claude Code best practices (code.claude.com/docs/en/best-practices), vérifié 2026-07-02 — « Give Claude a way to verify its work », vérification visuelle UI, /goal et Stop hook. S'aligne sur /verify."
  },
  {
    id: "bp-course-correct", section: "models", sub: "pratiques", category: "Bonnes pratiques", name: "Corriger la trajectoire tôt",
    oneLine: "Reprendre la main dès que Claude dévie, plutôt que le laisser dériver.",
    simple: "N'attendez pas la fin pour découvrir que Claude a pris la mauvaise route : recadrez-le dès que vous voyez l'écart — même une hypothèse mineure ou une mauvaise pondération « pas grave ». Laissée filer, elle s'aggrave, car Claude construit tout le reste dessus. Les meilleurs résultats viennent de boucles de feedback courtes.",
    details: "Échap interrompt Claude en cours d'action sans perdre le contexte : vous redirigez aussitôt. Double-Échap ou /rewind restaure un état antérieur (conversation et/ou code). « Annule ça » lui fait défaire ses modifications. Corriger tôt est aussi une économie de tokens directe : deux lignes de recadrage maintenant évitent de régénérer un gros bloc bâti sur une fausse hypothèse.",
    pro: "Règle empirique : si vous avez corrigé deux fois le même point dans une session, le contexte est pollué de tentatives ratées. /clear et repartez d'un prompt plus précis intégrant ce que vous avez appris — une session propre bat presque toujours une longue session truffée de corrections.",
    example: "Échap pour stopper → « non, garde l'API existante » → reprise ; sinon /clear et meilleur prompt.",
    difficulty: 2,
    notes: "Source : Claude Code best practices (code.claude.com/docs/en/best-practices), vérifié 2026-07-02 — « Course-correct early and often » et « Correcting over and over → /clear after two failed corrections ». Levier d'économie : recoupe l'onglet « Optimiser les tokens » (éviter les régénérations)."
  },
  {
    id: "bp-parallel-sessions", section: "models", sub: "pratiques", category: "Bonnes pratiques", name: "Paralléliser avec des worktrees",
    oneLine: "Lancer plusieurs sessions isolées plutôt que tout sérialiser.",
    simple: "Une seule session traite une chose à la fois. Pour avancer sur plusieurs fronts — ou faire relire par un regard neuf — ouvrez des sessions séparées dans des copies isolées du dépôt (git worktrees), sans que les modifications se télescopent.",
    details: "Un worktree = un checkout du dépôt sur sa propre branche : chaque session Claude y travaille sans collision. L'app Desktop et Claude Code on the web gèrent aussi des sessions parallèles isolées.",
    pro: "Un contexte neuf améliore la revue : un second Claude qui n'a pas écrit le code n'est pas biaisé en sa faveur. Patron Writer/Reviewer (une session code, une autre relit la diff) ou tests d'abord par une session, implémentation par une autre. Pour les gros chantiers, fan-out en headless : boucle de claude -p par fichier avec --allowedTools restreints.",
    example: "git worktree pour la feature A pendant qu'une 2e session corrige un bug ; une 3e relit la diff.",
    difficulty: 4,
    notes: "Source : Claude Code best practices (code.claude.com/docs/en/best-practices), vérifié 2026-07-02 — « Run multiple Claude sessions », worktrees, Writer/Reviewer, fan-out."
  },
  {
    id: "bp-skills-vs-md", section: "models", sub: "pratiques", category: "Bonnes pratiques", name: "Savoir occasionnel → skill, pas CLAUDE.md",
    oneLine: "Sortir du CLAUDE.md ce qui ne sert que parfois et en faire une skill.",
    simple: "CLAUDE.md est relu à chaque session : tout y mettre l'alourdit et noie l'important. Le savoir spécialisé qui ne sert que pour certaines tâches a sa place dans une skill, chargée à la demande sans gonfler chaque conversation.",
    details: "Gardez dans CLAUDE.md uniquement ce qui s'applique largement (build/test, conventions, pièges). Pour une procédure ou un domaine ponctuel, créez une skill (.claude/skills/<nom>/SKILL.md) : Claude l'applique quand elle est pertinente, ou vous l'invoquez via /<nom>.",
    pro: "Hiérarchie d'extension : CLAUDE.md (contexte permanent), skills (savoir/workflow à la demande), hooks (action déterministe à chaque fois), subagents (contexte isolé). Si Claude ignore une règle malgré tout, le CLAUDE.md est sans doute trop long — élaguez ou convertissez la règle en hook.",
    example: "Conventions d'API rares → .claude/skills/api-conventions/SKILL.md au lieu d'une section CLAUDE.md.",
    difficulty: 3,
    notes: "Source : Claude Code best practices (code.claude.com/docs/en/best-practices), vérifié 2026-07-02 — « CLAUDE.md is loaded every session… for domain knowledge only relevant sometimes, use skills instead »."
  },

  /* ============================== OPTIMISER LES TOKENS ============================== */

  /* ----- Modèles & routage ----- */
  {
    id: "opt-router", section: "optim", sub: "routage", category: "Routage", name: "Router selon la difficulté réelle",
    oneLine: "Le bon modèle pour la bonne tâche : c'est le levier d'économie n°1.",
    simple: "On ne prend pas un taxi pour traverser la rue : utiliser le modèle le plus puissant pour tout est la première source de gaspillage.",
    details: "Sonnet par défaut (≈3 $/15 $ par MTok), Opus pour le raisonnement vraiment dur (≈5 $/25 $), Haiku pour le volume et le simple (≈1 $/5 $). Opus coûte ~1,7× Sonnet et ~5× Haiku en entrée : ne le sortez que quand il change le résultat.",
    pro: "Mesurez avant de monter en gamme : le Sonnet d'aujourd'hui dépasse l'Opus d'il y a un an. Beaucoup de tâches « réservées à Opus » par habitude passent très bien en Sonnet — testez, puis montez seulement si ça coince.",
    example: "/model sonnet   # défaut · /model opus pour l'étape dure",
    output: "Coût entrée/sortie par MTok :\n  Haiku 4.5    1 $ / 5 $\n  Sonnet 4.6   3 $ / 15 $\n  Opus 4.8     5 $ / 25 $\n  Fable 5      10 $ / 50 $",
    difficulty: 2,
    notes: "Le sur-dimensionnement du modèle est la première cause de surcoût inutile."
  },
  {
    id: "opt-ascenseur", section: "optim", sub: "routage", category: "Routage", name: "L'ascenseur de modèles en session",
    oneLine: "Monter en puissance le temps d'une étape, puis redescendre — sans perdre le contexte.",
    simple: "Vous pouvez changer de « cerveau » en cours de route : un coup de turbo pour le passage difficile, puis retour au modèle économique.",
    details: "/model (ou Option+P / Alt+P) bascule de modèle en conservant tout le contexte. Le schéma gagnant : Sonnet aux commandes, Opus juste pour le débogage épineux ou l'architecture, puis Sonnet de nouveau.",
    pro: "Le geste prend 2 secondes et la mémoire suit intégralement : il n'y a aucune raison de rester sur Opus « au cas où » pendant toute une session.",
    example: "/model opus   …étape dure…   /model sonnet",
    difficulty: 2,
    notes: "Raccourci : Option+P (macOS) / Alt+P (Windows)."
  },
  {
    id: "opt-haiku-fleet", section: "optim", sub: "routage", category: "Routage", name: "Déléguer le volume à Haiku",
    oneLine: "Un orchestrateur puissant + des subagents Haiku pour les tâches répétitives.",
    simple: "Le chef d'orchestre réfléchit (Sonnet/Opus) ; les petites mains qui lisent 50 fichiers ou classent 200 éléments, c'est Haiku — 5× moins cher et quasi instantané.",
    details: "Confiez aux subagents Haiku le travail à fort volume et faible complexité (lecture, extraction, classification). Ils renvoient une conclusion compacte ; votre contexte principal et votre budget restent préservés.",
    pro: "Dans /agents, fixez explicitement le modèle de l'agent sur Haiku. Trois agents Haiku qui explorent trois sous-systèmes en parallèle battent une lecture séquentielle, pour une fraction du coût d'Opus.",
    example: "/agents → agent « Explore » sur Haiku, lecture seule",
    difficulty: 4,
    notes: "Combine économie ET parallélisme. Voir « Isoler le contexte via subagents »."
  },
  {
    id: "opt-advisor", section: "optim", sub: "routage", category: "Routage", name: "Un second avis sans payer le gros modèle partout",
    oneLine: "Garder Sonnet aux commandes, consulter Opus uniquement sur les décisions clés.",
    simple: "Plutôt que de faire tourner Opus en permanence, on le garde « en conseil » : il n'intervient que sur les moments importants.",
    details: "/advisor active un second modèle consulté ponctuellement (ex. Opus en advisor sur une session Sonnet). Vous obtenez un regard plus fort sur les choix d'architecture sans payer le tarif Opus sur chaque tour.",
    pro: "Idéal sur les longues sessions de code : 90 % du travail à prix Sonnet, et l'intelligence d'Opus injectée seulement là où elle compte.",
    example: "/advisor opus",
    difficulty: 2,
    notes: "v2.1.98+. Le conseiller juge sur la conversation ; il n'exécute pas d'outils."
  },
  {
    id: "opt-effort", section: "optim", sub: "routage", category: "Routage", name: "Doser l'effort de raisonnement",
    oneLine: "Acheter de la réflexion seulement là où elle paie.",
    simple: "La réflexion approfondie, c'est des heures sup : rentable sur les problèmes durs, du gâchis sur le mécanique.",
    details: "--effort / /effort dose la profondeur de raisonnement (low/medium/high/xhigh/max). Plus haut = plus de tokens de réflexion et d'allers-retours d'outils. Pour les tâches simples, low suffit et coûte une fraction. Sur Fable 5 et Opus 4.8/4.7, le thinking est adaptatif (le modèle décide quand et combien réfléchir) : on ne passe PAS de budget_tokens fixe (rejet 400), on règle l'effort à la place.",
    pro: "Repères : low pour renommer/reformater, high pour le quotidien exigeant, xhigh pour le code/agentique, max quand l'erreur coûte plus cher que les tokens. Désactivez l'extended thinking (Option+T) sur les questions simples.",
    example: "claude --effort low   # tâche mécanique",
    difficulty: 2,
    notes: "Source : platform.claude.com/.../extended-thinking + /effort, vérifié 2026-07-02. Thinking adaptatif sur Fable 5/Opus 4.8/4.7 ; budget_tokens → erreur 400, utiliser effort (low→max)."
  },
  {
    id: "opt-fast", section: "optim", sub: "routage", category: "Routage", name: "Fast mode : vitesse sans perte de qualité",
    oneLine: "Le même modèle, servi plus vite — pas un downgrade, mais tarif premium en API.",
    simple: "Un accélérateur sans baisse de qualité : les réponses arrivent plus vite sans rétrograder vers un modèle plus faible. Sur abonnement, c'est un gain de latence ; en API, ça se paie plus cher au token.",
    details: "/fast (ou Option+O / Alt+O) accélère la génération d'Opus sans changer de modèle. Ne réduit PAS le nombre de tokens — au contraire, en API le fast mode est facturé à un tarif premium (Opus 4.8 : ~10 $/50 $ par MTok). Le bénéfice est la latence, pas le coût brut.",
    pro: "Sur les sessions interactives (abonnement), la latence pousse à abandonner ou reformuler (= tokens gaspillés) : fast mode fluidifie sans sacrifier l'intelligence. En API en revanche, ne l'activez que si la vitesse vaut le surcoût, car ce n'est pas un levier d'économie.",
    example: "/fast",
    difficulty: 1,
    notes: "Source : platform.claude.com/.../pricing (Fast mode), vérifié 2026-07-02 — research preview, Opus 4.8/4.7/4.6, tarif premium ($10/50 par MTok sur Opus 4.8), indisponible avec le Batch API."
  },
  {
    id: "opt-fable-cost", section: "optim", sub: "routage", category: "Routage", name: "Réserver Fable au plafond d'Opus",
    oneLine: "Fable 5 coûte 2× Opus : à ne sortir que quand Opus ne suffit plus.",
    simple: "Le modèle au sommet de la gamme est aussi le plus cher : on ne le prend que pour les problèmes où le modèle juste en dessous plafonne vraiment.",
    details: "Fable 5 (10 $/50 $ par MTok) est le plus puissant mais le plus coûteux. Comme Opus 4.8/4.7, il raisonne en mode adaptatif (réglable via effort). Pour la quasi-totalité du travail, Opus ou Sonnet suffisent largement à moindre coût.",
    pro: "Avant de monter sur Fable, demandez-vous si Opus a réellement échoué sur CE problème précis. Si oui, montez le temps de l'étape, puis redescendez.",
    example: "/model fable   # recherche/raisonnement très long uniquement",
    difficulty: 2,
    notes: "Source : platform.claude.com/.../pricing, vérifié 2026-07-02. Prix 10 $/50 $ par MTok (2× Opus)."
  },

  /* ----- Contexte ----- */
  {
    id: "opt-clear", section: "optim", sub: "contexte", category: "Contexte", name: "/clear entre deux tâches sans rapport",
    oneLine: "Repartir d'un contexte vierge dès qu'on change de sujet.",
    simple: "Garder une vieille conversation hors-sujet, c'est la faire relire (et repayer) à chaque message. Effacez-la quand vous changez de sujet.",
    details: "Le contexte est ré-envoyé à chaque tour : un historique non pertinent gonfle l'entrée en continu ET dilue l'attention du modèle. /clear remet à zéro ; à privilégier sur /compact entre tâches vraiment distinctes.",
    pro: "Le contexte pollué baisse la qualité en silence : Claude reste poli et répond, mais moins bien. Faites /clear sans état d'âme entre deux sujets.",
    example: "/clear",
    difficulty: 1,
    notes: "Coupure nette = /clear ; même tâche mais session longue = /compact."
  },
  {
    id: "opt-compact", section: "optim", sub: "contexte", category: "Contexte", name: "/compact guidé sur les sessions longues",
    oneLine: "Résumer pour libérer du contexte tout en gardant le fil.",
    simple: "Quand une longue session devient lourde, demandez à Claude de se faire un résumé : il garde l'essentiel et relâche le reste.",
    details: "/compact remplace l'historique par un résumé condensé. Donnez une instruction ciblée pour contrôler ce qui survit (« garde le TODO et les décisions d'archi ») — vous gardez la continuité sans traîner tous les tokens.",
    pro: "Compactez VOUS-MÊME avant que l'auto-compactage ne le fasse à votre place près de la limite : vous choisissez ce qui reste.",
    example: "/compact garde les décisions d'architecture et le TODO",
    difficulty: 2,
    notes: "Voir /context pour décider du bon moment."
  },
  {
    id: "opt-autocompact", section: "optim", sub: "contexte", category: "Contexte", name: "Régler la fenêtre d'auto-compactage",
    oneLine: "Choisir à quel niveau de remplissage Claude résume automatiquement.",
    simple: "Claude résume tout seul quand le contexte se remplit ; vous pouvez régler le seuil pour que ça arrive plus tôt (plus économe) ou plus tard.",
    details: "Le réglage « Configure the auto-compact window size » (/config) détermine à quel niveau la session se compacte automatiquement. Un seuil plus bas garde le contexte plus léger ; un seuil plus haut conserve plus d'historique brut.",
    pro: "Sur les très longues sessions agentiques, un seuil un peu plus bas réduit la facture moyenne par tour. Mais gardez la main avec /compact guidé pour ne pas perdre d'info clé.",
    example: "/config → Auto-compact window size",
    difficulty: 3,
    notes: "Réglage avancé. À combiner avec /context pour calibrer."
  },
  {
    id: "opt-claudemd", section: "optim", sub: "contexte", category: "Contexte", name: "CLAUDE.md concis = économie permanente",
    oneLine: "Chaque ligne du CLAUDE.md est rechargée à chaque session.",
    simple: "La « notice » du projet est relue à chaque fois : courte et dense, elle guide ; longue et bavarde, elle coûte en permanence et noie l'important.",
    details: "Visez la liste de contraintes (build/test, conventions, pièges), pas la documentation exhaustive. Générez via /init puis élaguez agressivement. Bonus : un CLAUDE.md stable se sert depuis le cache (≈10 % du prix).",
    pro: "Test utile : si une ligne n'a jamais changé le comportement de Claude, supprimez-la. La concision est un signal fort, pas seulement une économie.",
    example: "/init  puis  /memory  pour élaguer",
    difficulty: 2,
    notes: "Stable + concis = double gain (cache + densité)."
  },
  {
    id: "opt-mentions", section: "optim", sub: "contexte", category: "Contexte", name: "Cibler avec @ plutôt que laisser explorer",
    oneLine: "Mentionner les fichiers précis évite des tours de recherche coûteux.",
    simple: "Dites exactement de quel fichier vous parlez (@chemin) : Claude n'a plus à fouiller le projet pour le trouver.",
    details: "Sans cible, Claude explore (lecture de nombreux fichiers, grep) — autant de tokens d'entrée. Avec @src/auth.ts, il va droit au but : réponse plus rapide, moins de contexte consommé.",
    pro: "Pour un bug, collez aussi le message d'erreur complet : ça remplace plusieurs tours d'investigation par un seul, mieux ciblé.",
    example: "@src/auth/token.ts corrige le refresh qui échoue",
    difficulty: 1,
    notes: "Une demande précise et complète d'emblée coûte moins qu'une distillée sur 10 messages."
  },
  {
    id: "opt-subagents", section: "optim", sub: "contexte", category: "Contexte", name: "Isoler le contexte via des subagents",
    oneLine: "L'agent renvoie une conclusion, pas des centaines de lignes de fichiers.",
    simple: "Envoyez des éclaireurs : ils fouillent dans leur coin et ne rapportent que la synthèse, sans encombrer votre conversation principale.",
    details: "Déléguer la recherche/lecture à des subagents (/agents) garde le contexte principal propre : seul un résumé remonte, pas le contenu brut exploré. C'est à la fois moins de tokens et une meilleure attention.",
    pro: "Affectez Haiku aux agents d'exploration : économie maximale. Lancez-en plusieurs en parallèle pour des sous-systèmes indépendants.",
    example: "/agents → « Explore » (Haiku) renvoie la synthèse",
    difficulty: 4,
    notes: "Voir « Déléguer le volume à Haiku »."
  },
  {
    id: "opt-rewind", section: "optim", sub: "contexte", category: "Contexte", name: "/rewind plutôt que tout réexpliquer",
    oneLine: "Revenir à un état sain coûte moins que corriger une mauvaise piste.",
    simple: "Si Claude part dans la mauvaise direction, remontez le temps à un bon point plutôt que d'empiler des messages de correction.",
    details: "Échap interrompt tôt (on garde le travail fait) ; /rewind (ou Échap+Échap) restaure un état antérieur du code/conversation. Reprendre proprement évite d'accumuler des tours de rattrapage coûteux.",
    pro: "Interrompre dès qu'une réponse dérape est un vrai levier d'économie : laisser finir une longue mauvaise piste puis corriger consomme bien plus de tokens.",
    example: "Échap (stop) · Échap Échap (rewind)",
    difficulty: 2,
    notes: "Distinguer rewind du code vs de la conversation."
  },

  /* ----- Cache ----- */
  {
    id: "opt-cache-prefix", section: "optim", sub: "cache", category: "Cache de prompt", name: "Mettre le stable en tête (préfixe cacheable)",
    oneLine: "Le contenu invariant servi depuis le cache coûte ~10 % du plein tarif.",
    simple: "Ce que Claude relit à l'identique à chaque fois (consignes, doc, gros fichiers) peut être « mémorisé » et refacturé à un dixième du prix.",
    details: "Le cache est un match de préfixe : placez le contenu stable (system prompt, CLAUDE.md, gros fichiers de référence) AVANT le contenu variable. Tout ce qui est stable en tête est réutilisé à coût réduit aux tours suivants. Un préfixe sous le minimum cacheable n'est PAS mis en cache (silencieusement) : Opus 4.8 / Sonnet 4.6 = 1024 tokens, Haiku 4.5 = 4096, Fable 5 = 512.",
    pro: "Ordre de rendu : outils → system → messages. Gardez la liste d'outils déterministe et le system figé ; mettez la question variable tout à la fin. Sur Opus 4.8, ajoutez un message {role:\"system\"} en cours de conversation plutôt que d'éditer le champ system de tête, pour préserver le préfixe caché.",
    example: "CLAUDE.md + gros fichier en tête → réutilisés en cache",
    difficulty: 3,
    notes: "Source : platform.claude.com/.../prompt-caching, vérifié 2026-07-02. Lecture 0,1× · écriture 1,25× (5 min) / 2× (1 h). Min. cacheable : Opus 4.8/Sonnet 4.6 = 1024 tok, Haiku 4.5 = 4096, Fable 5 = 512."
  },
  {
    id: "opt-cache-invalidators", section: "optim", sub: "cache", category: "Cache de prompt", name: "Éviter les invalidateurs silencieux",
    oneLine: "Un seul octet changé en tête de prompt casse tout le cache derrière.",
    simple: "Une date du jour ou un identifiant aléatoire glissé au début suffit à annuler la « mémoire » de cache et à tout repayer plein tarif.",
    details: "Bannissez du préfixe : date/heure courante, UUID, IDs de session, JSON non trié, sections conditionnelles, jeu d'outils variable par utilisateur. Chacun rend le préfixe unique à chaque requête → cache jamais lu.",
    pro: "Diagnostic : si la part « cache read » (/cost) reste à zéro malgré un préfixe censé être stable, un invalidateur se cache au début — traquez-le.",
    example: "/cost → vérifier « Cache read » > 0",
    difficulty: 3,
    notes: "Symptôme : cache_read_input_tokens = 0 sur des requêtes au préfixe identique."
  },
  {
    id: "opt-cache-econ", section: "optim", sub: "cache", category: "Cache de prompt", name: "L'économie du cache (quand ça paie)",
    oneLine: "Écrire le cache coûte un peu plus ; le lire coûte presque rien.",
    simple: "Mémoriser un gros contexte a un petit surcoût la première fois, puis chaque réutilisation est quasi gratuite — rentable dès la 2ᵉ utilisation.",
    details: "Écriture 1,25× (TTL 5 min) ou 2× (TTL 1 h) ; lecture 0,1×. La 1ʳᵉ requête écrit le cache (surcoût 0,25×) ; chaque réutilisation ne paie que 0,1×. Break-even : rentable dès 1 lecture après l'écriture en 5 min, dès 2 lectures en 1 h. Au-delà, l'économie sur un gros préfixe stable approche ~90 %.",
    pro: "Le TTL 1 h vaut le coup uniquement pour du trafic en rafales avec de longues pauses (> 5 min entre requêtes) ; sinon le 5 min (moins cher à écrire) suffit, alimenté par l'usage continu — chaque hit rafraîchit le TTL gratuitement.",
    example: "/cost → « Cache read: 920k (saved ~73%) »",
    difficulty: 3,
    notes: "Source : platform.claude.com/.../prompt-caching (multiplicateurs), vérifié 2026-07-02. Sur abonnement, le bénéfice est surtout en vitesse ; en API, directement en coût."
  },
  {
    id: "opt-cache-flag", section: "optim", sub: "cache", category: "Cache de prompt", name: "--exclude-dynamic-system-prompt-sections",
    oneLine: "Sortir les sections par-machine du prompt système pour mieux cacher.",
    simple: "Déplace les bouts qui changent d'une machine à l'autre (dossier courant, env, git) hors du prompt système, pour que le reste reste « mémorisable ».",
    details: "Ces sections dynamiques (cwd, variables d'env, statut git, chemins mémoire) cassent la réutilisation du cache entre exécutions. Le flag les déplace dans le premier message utilisateur, gardant le prompt système stable et cacheable.",
    pro: "Surtout utile en automatisation/CI et pour le cache partagé entre plusieurs runs : le préfixe système devient identique d'une exécution à l'autre.",
    example: "claude --exclude-dynamic-system-prompt-sections",
    difficulty: 4,
    notes: "Ne s'applique qu'avec le prompt système par défaut."
  },

  /* ----- Outils & sortie ----- */
  {
    id: "opt-tools", section: "optim", sub: "outils", category: "Outils & sortie", name: "Limiter les outils chargés",
    oneLine: "Chaque outil pèse en contexte, même s'il n'est jamais utilisé.",
    simple: "Les définitions de tous les outils branchés sont envoyées à chaque requête : n'activez que ceux dont la tâche a besoin.",
    details: "--tools restreint la palette (\"\" = aucun, \"default\" = tous, ou une liste). Moins d'outils = moins de tokens d'entrée ET moins de risque que Claude se disperse sur un outil hors-sujet.",
    pro: "En headless/CI, l'économie est double : facture par requête réduite et comportement plus focalisé. Couplez avec --strict-mcp-config.",
    example: 'claude --tools "Read,Edit,Bash"',
    difficulty: 3,
    notes: "Particulièrement rentable en automatisation."
  },
  {
    id: "opt-strict-mcp", section: "optim", sub: "outils", category: "Outils & sortie", name: "Isoler les serveurs MCP",
    oneLine: "Ne charger que les serveurs MCP réellement nécessaires.",
    simple: "Chaque connecteur MCP ajoute ses outils (et leur description) au contexte : limitez-vous à ceux dont la session a besoin.",
    details: "--strict-mcp-config ne charge QUE les serveurs fournis via --mcp-config, en ignorant le reste (.mcp.json, settings…). Moins de définitions d'outils MCP = contexte plus léger et plus sûr.",
    pro: "En plus de l'économie, c'est un excellent outil de test/débogage : vous garantissez qu'aucun serveur parasite n'interfère.",
    example: "claude --mcp-config ./mcp.json --strict-mcp-config",
    difficulty: 3,
    notes: "Voir /mcp pour l'état des serveurs."
  },
  {
    id: "opt-skills-cost", section: "optim", sub: "outils", category: "Outils & sortie", name: "Masquer / trier les skills par tokens",
    oneLine: "Une skill volumineuse pèse en contexte à chaque session.",
    simple: "Vos « savoir-faire » coûtent de la place même inutilisés : repérez les plus lourds et masquez ceux dont vous ne vous servez pas.",
    details: "/skills liste les skills avec leur coût ; touche t pour trier par tokens, Espace pour masquer une skill à Claude. Un plugin chargé inutilement, c'est du contexte payé pour rien.",
    pro: "Avant d'installer un plugin, regardez son coût projeté en tokens (claude plugin details) : certains ajoutent beaucoup au contexte permanent.",
    example: "/skills   (t = tri tokens, Espace = masquer)",
    difficulty: 1,
    notes: "Voir aussi /plugin et claude plugin details."
  },
  {
    id: "opt-output", section: "optim", sub: "outils", category: "Outils & sortie", name: "Réduire la SORTIE (≈5× plus chère)",
    oneLine: "Faire écrire moins économise souvent plus qu'un changement de modèle.",
    simple: "Ce que Claude écrit coûte ~5 fois ce qu'il lit. Demander des réponses concises et des diffs ciblés (pas des fichiers entiers) pèse directement sur la facture.",
    details: "La sortie est le poste le plus cher (Opus 25 $ vs 5 $ en entrée). Demandez la concision, des patchs/diffs plutôt que la réécriture complète de fichiers, et évitez les ré-explications verbeuses.",
    pro: "Un style « concis » (output style / instructions) et « ne réécris que les lignes nécessaires » réduisent la sortie sans perte d'information utile. Sur Opus récent, dosez l'effort : plus bas = moins de préambule.",
    example: "« Modifie uniquement les lignes nécessaires, réponds en patch. »",
    difficulty: 2,
    notes: "Rapport sortie/entrée ≈ 5× sur tous les modèles."
  },
  {
    id: "opt-images", section: "optim", sub: "outils", category: "Outils & sortie", name: "Maîtriser le coût des images (vision)",
    oneLine: "Une image en pleine résolution peut coûter des milliers de tokens.",
    simple: "Coller une capture est puissant, mais une image très grande consomme beaucoup de tokens : réduisez-la si le détail fin n'est pas nécessaire.",
    details: "Claude lit les images par patches de 28×28 px : coût = ⌈largeur/28⌉ × ⌈hauteur/28⌉ tokens visuels. Plafond : 1568 tokens en tier standard, 4784 en haute résolution (Fable 5, Opus 4.8/4.7). Repères : 1000×1000 ≈ 1296 tokens ; 1920×1080 ≈ 2691 (high-res) ; 4K ≈ 4784. Pour un simple message d'erreur, une capture modérée suffit.",
    pro: "Pour les workflows vision répétés (computer use, lots de captures), downsamplez côté client : un 4K downsamplé en 1080p passe de ~4784 à ~2691 tokens en high-res tier, performance quasi identique. Comptez avec count_tokens sur un échantillon représentatif.",
    example: "Capture recadrée/réduite plutôt que plein écran 4K",
    difficulty: 2,
    notes: "Source : platform.claude.com/.../vision, vérifié 2026-07-02. Formule ⌈w/28⌉×⌈h/28⌉ ; max 4784 tok (high-res), 1568 (standard). Le détail haute résolution sert aux maquettes/diagrammes denses, pas à un log."
  },
  {
    id: "opt-ptc", section: "optim", sub: "outils", category: "Outils & sortie", name: "Programmatic tool calling (API)",
    oneLine: "Faire enchaîner les appels d'outils par du code, pour garder les résultats intermédiaires hors du contexte.",
    simple: "Au lieu de renvoyer chaque résultat d'outil à Claude (qui le relit et le repaie), Claude écrit un petit script qui appelle les outils et ne remonte que le résultat final.",
    details: "Avec le programmatic tool calling (API + exécution de code), Claude écrit un script exécuté dans un conteneur d'exécution de code qui appelle vos outils ; les résultats intermédiaires sont filtrés/agrégés dans le code et seul le résultat utile entre dans le contexte du modèle. Le coût en tokens suit la sortie utile, pas les données intermédiaires brutes.",
    pro: "Gain mesuré par Anthropic sur les benchmarks de recherche agentique (BrowseComp, DeepSearchQA) : ~24 % de tokens d'entrée en moins ET +11 % de performance moyenne. À réserver aux enchaînements de nombreux appels d'outils ou aux gros résultats intermédiaires.",
    example: "Outil code_execution + tools exposés comme fonctions (API)",
    difficulty: 5,
    notes: "Source : platform.claude.com/.../programmatic-tool-calling, vérifié 2026-07-02. Fonctionnalité API (pas le CLI) ; nécessite l'outil d'exécution de code. Même esprit que « Déléguer à des subagents » côté Claude Code."
  },

  /* ----- Mesure & budget ----- */
  {
    id: "opt-cost", section: "optim", sub: "mesure", category: "Mesure & budget", name: "/cost : suivre la consommation (et le cache)",
    oneLine: "Le compteur de la session : tokens entrée/sortie/cache et coût estimé.",
    simple: "Le tableau de bord de dépense : combien vous avez consommé, et surtout quelle part profite du cache.",
    details: "/cost affiche les tokens consommés et, en API, le coût estimé. La ligne « cache read » est le signal clé : une part élevée = votre contexte stable est bien réutilisé à ~10 % du prix.",
    pro: "Prenez l'habitude d'un /cost en milieu de grosse session : si la part cache est faible alors qu'elle devrait être haute, un invalidateur traîne en tête de prompt.",
    example: "/cost",
    output: "Session: 1.2M in / 84k out\n  Cache read: 920k (saved ~73%)\n  Est. cost: $2.14",
    difficulty: 1,
    notes: "Voir « Éviter les invalidateurs silencieux »."
  },
  {
    id: "opt-context-cmd", section: "optim", sub: "mesure", category: "Mesure & budget", name: "/context : voir ce qui remplit la fenêtre",
    oneLine: "La radio du contexte : qui consomme quoi.",
    simple: "Une jauge qui montre ce qui occupe la mémoire de travail de Claude — pour savoir quoi nettoyer.",
    details: "/context ventile les tokens : system prompt, CLAUDE.md, fichiers lus, outils, historique. C'est l'outil de décision pour choisir entre /compact, /clear, ou élaguer le CLAUDE.md.",
    pro: "Au-delà de ~70 % d'historique, agissez avant l'auto-compactage. Si « Tools » est élevé, pensez à --tools / --strict-mcp-config.",
    example: "/context",
    output: "Context: 62 400 / 200 000 (31%)\n  System 8% · CLAUDE.md 3%\n  History 78% · Tools 11%",
    difficulty: 2,
    notes: "Premier réflexe avant /compact ou /clear."
  },
  {
    id: "opt-usage", section: "optim", sub: "mesure", category: "Mesure & budget", name: "/usage : suivre ses quotas d'abonnement",
    oneLine: "Où vous en êtes de vos limites horaires/hebdomadaires.",
    simple: "Le compteur de forfait : il vous dit s'il vous reste de la marge avant de toucher un plafond.",
    details: "/usage montre votre consommation par rapport aux limites du plan (Pro/Max). Utile pour anticiper et répartir l'effort dans le temps.",
    pro: "Si la fenêtre hebdo approche du plein : déléguez le simple à Haiku, planifiez le gros après le reset, ou activez /usage-credits pour ne pas être bloqué.",
    example: "/usage",
    difficulty: 1,
    notes: "Voir /usage-credits pour continuer au-delà des limites."
  },
  {
    id: "opt-counttokens", section: "optim", sub: "mesure", category: "Mesure & budget", name: "Compter avant d'envoyer (sans tiktoken)",
    oneLine: "Estimer le coût d'un gros input AVANT de le payer.",
    simple: "Avant d'injecter un énorme fichier, mesurez sa taille en tokens — et n'utilisez pas les compteurs d'OpenAI, qui se trompent pour Claude.",
    details: "L'endpoint count_tokens (API / SDK) donne le compte exact, spécifique au modèle. tiktoken et autres tokenizers OpenAI sous-estiment de ~15-20 % sur Claude (bien plus sur du code).",
    pro: "Pratique pour décider d'une stratégie (tout envoyer vs chunker vs RAG) et pour estimer le coût d'un prompt système avant de le figer. En CLI : `ant messages count-tokens`.",
    example: "client.messages.count_tokens(model=…, messages=…)",
    difficulty: 3,
    notes: "Ne jamais estimer les tokens Claude avec tiktoken."
  },
  {
    id: "opt-budget", section: "optim", sub: "mesure", category: "Mesure & budget", name: "Plafonner la dépense en headless",
    oneLine: "Un garde-fou anti-mauvaise-surprise pour l'automatisation.",
    simple: "Fixez un budget maximum en dollars : au-delà, Claude s'arrête — indispensable pour les scripts qui tournent seuls.",
    details: "--max-budget-usd (avec --print) stoppe l'exécution une fois le montant atteint. À mettre systématiquement dans les crons et la CI : une boucle d'agent sans plafond peut coûter très cher en une nuit.",
    pro: "Combinez avec --effort low et --tools restreints pour les jobs automatisés simples : budget plafonné + faible coût par tour = automatisation sereine.",
    example: 'claude -p "tâche" --max-budget-usd 2.00',
    difficulty: 2,
    notes: "Fonctionne avec --print (utilisateurs API)."
  },
  {
    id: "opt-batch", section: "optim", sub: "mesure", category: "Mesure & budget", name: "Batch API : -50 % pour le non-temps-réel",
    oneLine: "Traiter en lot ce qui ne presse pas, à moitié prix.",
    simple: "Pour les tâches qui peuvent attendre (classer 1 000 éléments, résumer un corpus), le traitement par lot coûte deux fois moins cher.",
    details: "L'API Batches traite les requêtes de façon asynchrone à 50 % du tarif standard (sur l'entrée ET la sortie). La plupart des lots finissent en moins d'1 h ; un lot peut contenir jusqu'à 100 000 requêtes ou 256 MB et expire s'il n'a pas abouti sous 24 h. Idéal pour le volume non interactif : classification, extraction, résumés de masse.",
    pro: "Couplez batch + Haiku + prompt caching du contexte partagé : les trois leviers se cumulent (les remises s'empilent). Ex. Haiku 4.5 en batch : 0,50 $/2,50 $ par MTok au lieu de 1 $/5 $.",
    example: "client.messages.batches.create(requests=[…])",
    difficulty: 3,
    notes: "Source : platform.claude.com/.../batch-processing, vérifié 2026-07-02 — −50 % entrée+sortie, < 1 h en général, expiration 24 h, 100k req./256 MB max. Réservé à l'API, non temps réel."
  },
  {
    id: "opt-headless", section: "optim", sub: "mesure", category: "Mesure & budget", name: "Headless ciblé pour l'automatisation",
    oneLine: "Une requête, une réponse, zéro contexte interactif superflu.",
    simple: "Pour une tâche scriptée, lancez Claude en « une question / une réponse » au lieu d'une session complète : moins de contexte, moins de tokens.",
    details: "claude -p exécute une requête et s'arrête, sans charger l'interactif. Combiné à --output-format json, --tools restreints, --effort adapté et --max-budget-usd, c'est la base d'une automatisation économe et prévisible.",
    pro: "--no-session-persistence pour des runs jetables (rien à stocker), et --output-format json pour récupérer aussi les métadonnées de coût et journaliser la dépense.",
    example: 'claude -p "résume" --output-format json --tools "Read"',
    difficulty: 2,
    notes: "Brique de toute automatisation économe. Voir aussi Batch API."
  }
];
