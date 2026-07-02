# 04 — App Claude (claude.ai & Desktop)

L'application Claude (web claude.ai + Desktop Mac/Windows + mobile) s'organise en **trois espaces** complémentaires :

| Espace | En une phrase | Pour qui |
|--------|---------------|----------|
| **💬 Chat** | La conversation : poser des questions, analyser des documents, créer du contenu. | Tout le monde, du premier jour. |
| **🤝 Cowork** | Le travail délégué : donner un objectif, recevoir un livrable fini (Excel, deck, rapport). | Quiconque a des tâches de bureau à déléguer. |
| **⌨ Code** | Claude Code en interface graphique : modifier du code sans terminal. | Développeurs, et curieux qui veulent débuter en douceur. |

> État indicatif mi-2026 ; disponibilités par plan susceptibles d'évoluer. Maintenance : skill `/maj-app-claude`.

---

## 💬 Chat

L'espace conversationnel classique. Contrairement à Claude Code, pas de système global de slash commands : les fonctions passent par le menu **+** (recherche web, Research, fichiers, styles, skills…).

### Organisation

#### Projects — difficulté 2
**En clair :** des « classeurs » thématiques — chaque projet garde ses documents, ses consignes et ses conversations.
Chaque Projet regroupe documents + instructions + conversations pour un travail récurrent (un client, un livre, un codebase). Les plans payants ajoutent la recherche **RAG** pour étendre la capacité documentaire.
> 🚀 Soignez les instructions du projet comme un mini system prompt : ton, format attendu, vocabulaire métier — c'est elles qui font la différence de qualité. — *Gratuit : 5 projets max ; RAG et partage org sur plans payants.*

#### Mémoire — difficulté 2
**En clair :** Claude se souvient de vous d'une conversation à l'autre : préférences, projets en cours, contexte.
Reporte faits et préférences d'une session à l'autre (recherche, import/export inclus). Gratuit pour tous depuis mars 2026 ; contrôles admin en Enterprise.
> 🚀 Auditez la mémoire régulièrement : une mémoire fausse (ancien job, projet terminé) est pire qu'une absence de mémoire.

#### Section « Customize » — difficulté 1
**En clair :** le « panneau de configuration » de Claude Desktop — skills, plugins et connecteurs regroupés au même endroit (introduit février 2026).
> 🚀 Pratique pour faire le ménage : désactivez les skills/plugins inutilisés (ils pèsent en contexte) et vérifiez quels connecteurs ont accès à vos données.

### Entrée

#### Fichiers & imports — difficulté 1
**En clair :** glissez-déposez n'importe quel document (PDF, Excel, image…) : Claude le lit, le résume, l'analyse, le transforme.
> 🚀 Pour de grandes collections, passez par la base de connaissances d'un Projet (RAG) plutôt que de tout coller en chat : seuls les passages pertinents sont chargés.

#### Mode vocal — difficulté 1
**En clair :** parlez à Claude, il répond à voix haute ; la conversation reste enregistrée par écrit.
Mains libres (répond aux pauses) ou push-to-talk ; bascule voix/texte ; recherche web disponible pendant la voix. Bêta, web et mobile.
> 🚀 Push-to-talk en environnement bruyant ; mains libres en cuisine ou en marchant.

### Raisonnement

#### Extended thinking — difficulté 2
**En clair :** un interrupteur « réflexion approfondie » pour les questions difficiles.
Améliore raisonnement, maths, débogage — au prix de latence et de tokens.
> 🚀 La compétence est de savoir QUAND : raisonnement multi-étapes = oui ; recherche d'info simple = non.

#### Research / Deep research — difficulté 3
**En clair :** Claude enquêteur : des dizaines de recherches croisées, un rapport complet avec citations.
1 à 3 minutes d'investigation multi-sources (web + sources connectées). Plans payants ; consomme du quota.
> 🚀 La vraie compétence est le cadrage : périmètre, critères, format attendu AVANT de lancer.

#### Exécution de code / Analyse — difficulté 3
**En clair :** pour les calculs et les données, Claude écrit un vrai programme, l'exécute, et donne le résultat exact (plus de « devinettes »).
Sous-tend les Skills (génération Excel/Word/PowerPoint/PDF). À activer.
> 🚀 Si la génération de fichiers Office ne marche pas, vérifiez d'abord que l'exécution de code est activée — c'est le prérequis.

### Intégrations

#### Connecteurs / MCP — difficulté 3
**En clair :** branche Claude sur vos outils (Gmail, Calendar, Notion, Slack…) pour qu'il lise vos vraies données et agisse dedans.
Installation un clic sur Desktop ; connecteurs distants pour les services hébergés.
> 🚀 Pour un serveur MCP custom, commencez en local (stdio) avant le distant (OAuth). Admins Enterprise : gouvernance des connecteurs autorisés.

#### Recherche web — difficulté 1
**En clair :** Claude va chercher sur internet en direct, sources citées.
Pour les faits ponctuels (1-2 recherches). Prérequis de Research.

#### Claude in Chrome — difficulté 4
**En clair :** Claude pilote votre navigateur : il lit les pages, clique, remplit, enchaîne les onglets.
Workflows multi-étapes, enregistrement/répétition, tâches planifiées. Bêta, plans payants.
> 🚀 Risque n°1 : l'injection de prompt (une page malveillante peut « parler » à Claude). Permissions granulaires par site + supervision des actions sensibles.

#### Claude dans Slack — difficulté 2
**En clair :** taguez @Claude directement dans une conversation Slack pour lui déléguer une tâche, sans changer d'outil ni recopier le contexte. Team/Enterprise.
> 🚀 Le fil Slack sert de brief : taguez Claude là où le contexte est déjà. — *Source : release notes app, 23 juin 2026.*

### Sortie & collaboration

#### Artifacts — difficulté 2
**En clair :** une fenêtre à côté du chat où Claude construit de « vrais objets » : documents, schémas, mini-applications qui fonctionnent.
Éditables, prévisualisables, connectables via MCP, avec données persistantes pour les apps avec état.
> 🚀 Les artifacts publiés tournent sur le compte du LECTEUR : partagez un outil interactif à 1 000 personnes sans payer une requête.

#### Graphiques & visualisations in-line — difficulté 1
**En clair :** quand c'est utile, Claude génère un graphique ou un diagramme interactif au fil de sa réponse (pas seulement dans le panneau Artifacts) ; ces apps interactives s'affichent aussi sur mobile iOS/Android. Tous plans.
> 🚀 Précisez le type de graphique (barres, ligne, flux) et les variables à comparer : un cadrage précis évite un visuel générique. — *Source : release notes app, 12 et 25 mars 2026.*

#### Claude Design (Anthropic Labs) — difficulté 2
**En clair :** un atelier visuel — décrivez ce que vous voulez et Claude produit maquettes, prototypes, slides ou one-pagers. Produit Anthropic Labs lancé en avril 2026, dans la lignée des Artifacts mais orienté visuel.
> 🚀 Partez d'un brief précis (audience, ton, structure) + un exemple de style : l'itération est bien plus rapide à partir d'une direction claire.

#### Styles & instructions — difficulté 2
**En clair :** apprenez à Claude à écrire « comme vous » : ton prédéfini ou style appris depuis vos propres textes.
Trois niveaux : instructions de compte, styles par chat, instructions par Projet.
> 🚀 Un style custom appris depuis 2-3 vrais échantillons surpasse n'importe quelle description de ton en toutes lettres.

#### Skills — difficulté 3
**En clair :** des « savoir-faire » empaquetés — demandez un PowerPoint, Claude applique sa recette et produit un deck propre.
Intégrées : Excel, Word, PowerPoint, PDF. Import de skills custom en ZIP. Nécessite l'exécution de code.
> 🚀 Créez vos skills pour vos tâches récurrentes : une skill bien écrite garantit un résultat constant là où un prompt varie.

#### Partage & publication — difficulté 1
**En clair :** un lien suffit pour partager une conversation ou publier une mini-app.
> 🚀 Un chat partagé expose TOUT son contenu, y compris les débuts oubliés : relisez avant de partager.

---

## 🤝 Cowork

L'espace « travail délégué » de Claude Desktop : vous décrivez un **objectif**, Claude travaille en autonomie sur votre ordinateur et produit des **livrables finis**.

### Vue d'ensemble — difficulté 3
**En clair :** vous donnez une mission (« fais-moi un comparatif de nos 3 concurrents en Excel ») et Claude travaille seul jusqu'au résultat, pendant que vous faites autre chose.
Claude planifie, utilise vos fichiers et applications, produit tableurs/présentations/rapports.
> 🚀 La qualité dépend du brief : objectif + critères de réussite + format attendu. Brief flou = allers-retours ; brief précis = livrable du premier coup.
> *GA depuis avril 2026, via Claude Desktop (Mac/Windows) — lancé en research preview en janvier. Supervision recommandée sur les tâches sensibles.*

### Dossier de travail — difficulté 2
**En clair :** comme prêter un tiroir de votre bureau à un assistant : il travaille dedans (lire, créer, ranger) — et pas ailleurs.
Au lancement, vous choisissez le dossier auquel Cowork a accès : il y lit les documents, y dépose ses livrables, peut y réorganiser les fichiers.
> 🚀 Limitez le dossier au strict nécessaire : le périmètre d'accès est votre première barrière de sécurité. Un dossier dédié par mission est une bonne hygiène.

### Livrables bureautiques — difficulté 2
**En clair :** le résultat n'est pas un texte dans un chat : c'est un vrai fichier Excel, Word, PowerPoint ou PDF, mis en forme, prêt à envoyer.
Classeurs avec formules, présentations mises en page, documents structurés — déposés dans le dossier de travail.
> 🚀 Donnez un fichier modèle (« respecte la mise en forme de ce deck ») : Cowork imite la structure existante bien mieux qu'il n'invente la vôtre.

### Suivi & pilotage de tâche — difficulté 3
**En clair :** pendant que Claude travaille, vous voyez où il en est, et vous pouvez l'interrompre ou préciser à tout moment — comme avec un collègue.
Progression en temps réel (étapes, fichiers produits) ; binôme possible avec Claude in Chrome pour la partie web.
> 🚀 Intervenez tôt : une réorientation à 20 % de la tâche coûte peu ; à 90 %, c'est souvent tout refaire.

### Tâches planifiées & récurrentes — difficulté 3
**En clair :** demandez à Cowork de faire quelque chose à heure fixe ou en répétition (ex. un rapport chaque lundi) — il s'exécute tout seul au moment voulu. Introduit en février 2026.
> 🚀 Couplé à un dossier dédié + un brief précis : un livrable régulier sans intervention. Équivalent app de `/schedule` côté Claude Code.

### Computer Use — difficulté 4
**En clair :** vous donnez à Claude l'accès à votre ordinateur : il ouvre des fichiers, lance des outils, clique et navigue comme vous. Research preview (mars 2026, Pro/Max), plus large que Claude in Chrome (tout l'écran).
> 🚀 Même risque d'injection de prompt que Claude in Chrome : supervisez les actions sensibles, accordez l'accès tâche par tâche. Se combine avec Cowork.

### Pilotage mobile (fil persistant) — difficulté 3
**En clair :** lancez une tâche Cowork sur votre Mac, puis suivez-la et donnez des consignes depuis l'app mobile — un fil d'agent persistant (Desktop ou iOS/Android) garde le lien. Research preview, Pro/Max.
> 🚀 Pour les tâches longues : laissez Cowork tourner sur le poste, gardez l'œil depuis le mobile, débloquez-le d'une réponse rapide. — *Source : release notes app, 17 mars 2026.*

---

## ⌨ Code

Claude Code **dans l'application** : le même moteur que le CLI, en interface graphique. Le chemin le plus doux pour découvrir Claude Code avant (ou sans) le terminal.

### Claude Code dans l'app — difficulté 2
**En clair :** tout Claude Code, mais en fenêtre cliquable : diffs colorés, boutons de permission, historique — sans terminal.
Sélection du projet, validation des permissions au clic, suivi des fichiers modifiés.
> 🚀 Sessions desktop et terminal partagent le même historique : commencez dans l'app, reprenez dans le terminal avec `claude -r` (et inversement).

### Sessions parallèles & worktrees — difficulté 3
**En clair :** plusieurs Claude en parallèle — un sur le bug, un sur la feature — chacun dans sa propre copie du projet, sans se marcher dessus.
Chaque session peut travailler dans un worktree git isolé : ni vos fichiers ni les autres sessions ne sont affectés.
> 🚀 Pensez « un worktree = une branche = une PR » : chaque session livre sa branche propre, facile à relire et merger. — *Équivalent CLI : `claude -w` (+ `--tmux`).*

### Suivi, reprise & historique — difficulté 2
**En clair :** toutes vos sessions sont listées : reprenez celle d'hier exactement où elle en était, avec toute sa mémoire.
Sessions par projet/date, nommables, reprenables avec contexte complet.
> 🚀 Nommez vos sessions dès le départ (« fix-auth-token ») : dans trois semaines, retrouver « la session du refactor » parmi 40 sessions anonymes est pénible. — *Équivalents CLI : `/resume`, `claude -c`, `claude -r`, `claude -n <nom>`.*

### Add-ins Excel & PowerPoint — difficulté 3
**En clair :** Claude s'installe comme module dans Excel et PowerPoint et travaille directement dans vos fichiers ; il garde le fil entre les deux applications (partage du contexte de conversation). Excel : opérations natives (tableaux croisés, mise en forme conditionnelle) ; support des skills inclus.
> 🚀 Préparez les chiffres dans Excel puis demandez le deck PowerPoint : Claude réutilise l'analyse déjà faite. Option LLM gateway pour Enterprise. — *Source : release notes app, 11 mars 2026.*
