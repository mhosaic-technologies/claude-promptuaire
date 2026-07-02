# 05 — Modèles & bonnes pratiques

Comment choisir un modèle Claude et **optimiser la consommation de tokens** pour un compute de qualité, que ce soit dans Claude Code, l'app, ou via l'API.

Document en **deux parties**, chacune maintenue par sa skill dédiée (les modèles évoluent vite, les bonnes pratiques s'enrichissent) :

| Partie | Skill de mise à jour |
|--------|----------------------|
| Partie 1 — Les modèles | `/maj-modeles` |
| Partie 2 — Les bonnes pratiques | `/maj-bonnes-pratiques` |

> Références vérifiées (mi-2026). Les modèles évoluent : pour les valeurs à jour, voir la doc officielle ou `client.models.list()`.

---

# Partie 1 — Les modèles

## La gamme en un coup d'œil

| Modèle | Alias | ID | Contexte | Prix entrée / sortie (par 1M tokens) | Pour quoi |
|--------|-------|----|---------|---------|-----------|
| **Fable 5** | `fable` | `claude-fable-5` | 1M | 10 $ / 50 $ | Le plus puissant ; thinking adaptatif toujours actif |
| **Opus 4.8** | `opus` | `claude-opus-4-8` | 1M | 5 $ / 25 $ | Le plus capable ; raisonnement et code complexes |
| **Sonnet 4.6** | `sonnet` | `claude-sonnet-4-6` | 1M | 3 $ / 15 $ | Le meilleur équilibre vitesse/qualité |
| **Haiku 4.5** | `haiku` | `claude-haiku-4-5` | 200K | 1 $ / 5 $ | Le plus rapide et économe |

**En clair, qui fait quoi :**
- **Fable 5** — le « sommet de gamme », au-dessus d'Opus : réfléchit toujours en profondeur. Pour les problèmes où Opus plafonne.
- **Opus 4.8** — le « grand cerveau » : architecture, débogage ardu, travail agentique long. Excelle quand on lui donne la spécification complète d'emblée.
- **Sonnet 4.6** — le « couteau suisse » : rapide, malin, économique. Le bon défaut pour presque tout. *Le Sonnet d'aujourd'hui dépasse l'Opus d'il y a un an : ne sur-payez pas par habitude.*
- **Haiku 4.5** — le « sprinter » : réponses quasi instantanées, coût mini. Classification, extraction, sous-tâches d'agents en volume.

Changer de modèle en session : `/model <alias>` ou `Option+P` / `Alt+P`. Au lancement : `claude --model opus`.

---

## Comprendre le coût en tokens

Le coût dépend de **trois flux** :

1. **Entrée (input)** — tout ce qui est envoyé : system prompt, CLAUDE.md, fichiers lus, historique, outils. Payé à chaque tour.
2. **Sortie (output)** — ce que Claude génère. ~5× plus cher que l'entrée.
3. **Cache** — du contenu d'entrée stable peut être servi depuis le cache : **lecture cache ~0,1×**, écriture cache ~1,25×.

> Conséquence clé : un **long historique** ou un **gros contexte rechargé à chaque tour** coûte cher ET dilue l'attention du modèle. La concision n'est pas qu'une économie, c'est un gain de qualité.

Dans Claude Code : `/context` montre la répartition, `/cost` le total consommé (dont la part en cache).

---

# Partie 2 — Les bonnes pratiques

> Cette partie est destinée à **grandir** au fil des usages : la skill `/maj-bonnes-pratiques` permet d'y ajouter de nouvelles pratiques au même format.

## Choisir le bon modèle : la première optimisation

Le sur-dimensionnement du modèle est la **première source de surcoût inutile**.

- Faites tourner **Sonnet** par défaut.
- Passez à **Opus** ponctuellement pour une étape difficile (débogage épineux, architecture), puis redescendez.
- Déléguez le **volume et le simple** à **Haiku** (idéal comme « cheval de trait » des subagents).

```text
Sonnet pour coder → /model opus le temps d'un bug coriace → /model sonnet
```

---

## Hygiène de contexte (Claude Code & app)

Un contexte propre = réponses plus rapides, moins chères, souvent meilleures.

| Geste | Quand |
|-------|-------|
| **`/clear`** | Entre deux tâches **sans rapport** : repart à zéro, ne paie plus l'ancien contexte. |
| **`/compact`** | Session longue, **même** tâche : résume en gardant les décisions clés. |
| **`/context`** | Avant de décider : voir ce qui occupe la fenêtre. |
| Subagents (`/agents`) | Confier la recherche/lecture : l'agent renvoie une **conclusion**, pas des centaines de lignes. |

> Règle simple : ne gardez en contexte que ce qui sert la tâche en cours. Le contexte pollué est insidieux : Claude reste poli et répond, mais la qualité baisse silencieusement.

---

## Planifier avant d'agir

**En clair :** pour toute tâche un peu sérieuse, demandez d'abord le plan, validez-le, puis laissez faire. Dix secondes de relecture évitent une heure de corrections.

Le mode plan (`Shift+Tab`) fait travailler Claude en lecture seule : il explore, comprend et propose une démarche que vous validez avant toute modification. C'est le meilleur garde-fou contre les fausses pistes coûteuses.

> 🚀 À l'approbation du plan, choisissez le mode d'exécution adapté au risque : auto pour le mécanique, acceptEdits pour le standard, manuel pour le critique. Réflexe recommandé dès que la tâche touche plus de 2-3 fichiers.

---

## Des demandes complètes et précises

**En clair :** plus votre demande est précise et complète dès le départ, meilleur (et moins cher) est le résultat — comme avec un prestataire humain.

Les modèles récents excellent quand l'objectif, les contraintes et les critères de réussite sont posés d'emblée. Une demande distillée au compte-goutte sur dix messages coûte plus de tokens et produit un résultat moins cohérent.

```text
« Ajoute l'export CSV : bouton dans la toolbar, colonnes visibles uniquement,
  encodage UTF-8 BOM, test e2e inclus. »
```

> 🚀 Structurez les grosses demandes : objectif, contexte, contraintes, critères de « fini », exemples. Sur le travail agentique long, cette spec initiale est LE facteur de réussite. Mentionner les fichiers avec `@` et coller les messages d'erreur complets aide énormément.

---

## Doser l'effort et le « thinking »

La réflexion approfondie améliore les tâches **difficiles** mais coûte des tokens et de la latence sur le **simple**.

- **Extended thinking** : activez (`Option+T`) pour le raisonnement complexe ; laissez off pour les requêtes mécaniques. *(Fable 5 est toujours en thinking.)*
- **Effort** (`--effort low|medium|high|xhigh|max`, ou réglage par modèle) : montez pour les tâches exigeantes, baissez pour la rapidité/coût.
  - `high` est souvent le bon compromis ; `xhigh` excelle en code/agentique ; `max` quand la justesse prime sur le coût ; `low` pour les sous-tâches et la latence.

---

## Tirer parti du cache de prompt

Le cache est un **match de préfixe** : tout octet qui change dans le préfixe invalide la suite. Pour en profiter :

1. **Gardez le contenu stable en tête** (system prompt, CLAUDE.md, gros fichiers de référence) et le contenu variable à la fin.
2. **Ne réinjectez pas de variables volatiles** tôt (date du jour, UUID, ID de session) : elles cassent le cache à chaque tour.
3. **Un CLAUDE.md stable** est réutilisé en cache à chaque tour — d'où l'importance de le garder figé et concis.

Vérification (API) : `usage.cache_read_input_tokens`. S'il reste à zéro malgré un préfixe identique, un « invalidateur silencieux » est à l'œuvre.

> En CLI : `--exclude-dynamic-system-prompt-sections` déplace les sections par-machine (cwd, env, git) hors du prompt système pour améliorer la réutilisation du cache entre exécutions.

---

## Un CLAUDE.md concis et utile

Chaque ligne de `CLAUDE.md` est chargée **à chaque session**. Un bon CLAUDE.md :

- donne les **commandes de build/test**, les **conventions**, les **pièges** ;
- reste **bref et dense** (pas un roman) ;
- se génère via **`/init`** puis s'**élague**.

> Trop long = coût permanent + dilution du signal. La concision est un signal fort.

---

## Réduire les outils chargés

Chaque outil et chaque serveur MCP ajoute des définitions au contexte.

- Limitez aux outils utiles : `claude --tools "Read,Edit,Bash"`.
- Isolez les serveurs MCP : `--strict-mcp-config` (n'en charge que ceux fournis).
- Particulièrement utile en **headless/CI**, où chaque token compte.

---

## Exiger des preuves, pas des affirmations

**En clair :** « ça marche » ne suffit pas. Demandez à Claude de **montrer la preuve** — la sortie des tests, la commande lancée, une capture — avant de considérer une tâche terminée.

Un agent qui affirme le succès sans le vérifier se trompe parfois en silence. Une preuve observable accélère la relecture et fiabilise les exécutions autonomes.

Pour l'**UI**, donnez une cible visuelle (mock, capture) et demandez à Claude de **capturer le résultat, le comparer à l'original, lister les écarts et corriger** — l'itération se ferme alors d'elle-même.

> 🚀 C'est le garde-fou des longues tâches en `/goal` ou en mode auto : la condition de réussite doit être observable. Pour **gater le stop**, montez d'un cran : condition `/goal` ré-évaluée à chaque tour, ou **Stop hook** qui bloque la fin tant que le check ne passe pas. Couplez avec `/verify` (qui lance réellement l'app) plutôt que de croire l'auto-évaluation de Claude.

---

## Corriger la trajectoire tôt

**En clair :** n'attendez pas la fin pour découvrir que Claude a pris la mauvaise route. Les meilleurs résultats viennent de **boucles de feedback courtes** : recadrez dès que vous voyez l'écart, repartez. Et recadrez **même quand « ce n'est pas grave »** — une hypothèse mineure ou une mauvaise pondération laissée filer s'aggrave, parce que Claude construit tout le reste dessus.

- **`Échap`** : stoppe Claude en cours d'action **sans perdre le contexte** — vous redirigez aussitôt.
- **Double-`Échap` / `/rewind`** : restaure un état antérieur (conversation et/ou code).
- **« Annule ça »** : lui fait défaire ses modifications.

> 💰 **Économie de tokens :** corriger tôt évite les régénérations. Deux lignes de recadrage maintenant coûtent bien moins que de laisser Claude bâtir un gros bloc sur une fausse hypothèse, puis devoir tout régénérer. (Voir aussi l'onglet **Optimiser les tokens**.)

> 🚀 Si vous avez corrigé **deux fois** le même point dans une session, le contexte est pollué de tentatives ratées. `/clear` et repartez d'un prompt plus précis intégrant ce que vous avez appris : une session propre bat presque toujours une longue session truffée de corrections.

---

## Paralléliser avec des worktrees

Une seule session traite une chose à la fois. Pour avancer sur plusieurs fronts — ou faire relire par un regard neuf — ouvrez des **sessions séparées dans des copies isolées du dépôt** (git worktrees), sans que les modifications se télescopent.

- Un **worktree** = un checkout du dépôt sur sa propre branche ; chaque session Claude y travaille sans collision.
- L'**app Desktop** et **Claude Code on the web** gèrent aussi des sessions parallèles isolées.

> 🚀 Un contexte neuf améliore la **revue** : un second Claude qui n'a pas écrit le code n'est pas biaisé en sa faveur. Patron **Writer/Reviewer** (une session code, une autre relit la diff), ou tests d'abord par une session et implémentation par une autre. Pour les gros chantiers, **fan-out** en headless : boucle de `claude -p` par fichier avec `--allowedTools` restreints.

---

## Savoir occasionnel → skill, pas CLAUDE.md

`CLAUDE.md` est relu **à chaque session** : y entasser le savoir spécialisé l'alourdit et noie l'important. Ce qui ne sert que **pour certaines tâches** a sa place dans une **skill**, chargée à la demande sans gonfler chaque conversation.

- Dans `CLAUDE.md` : ce qui s'applique **largement** (build/test, conventions, pièges).
- En **skill** (`.claude/skills/<nom>/SKILL.md`) : une procédure ou un domaine **ponctuel** ; Claude l'applique quand elle est pertinente, ou vous l'invoquez via `/<nom>`.

> 🚀 Hiérarchie d'extension : **CLAUDE.md** (contexte permanent) · **skills** (savoir/workflow à la demande) · **hooks** (action déterministe à chaque fois) · **subagents** (contexte isolé). Si Claude ignore une règle malgré tout, le `CLAUDE.md` est sans doute trop long — élaguez ou convertissez la règle en hook.

---

## Récapitulatif — checklist « compute de qualité, moins de tokens »

- [ ] **Bon modèle** : Sonnet par défaut, Opus ponctuel, Haiku pour le volume.
- [ ] **Contexte propre** : `/clear` entre tâches, `/compact` sur les longues, `/context` pour vérifier.
- [ ] **Plan d'abord** : mode plan validé avant toute tâche touchant plus de 2-3 fichiers.
- [ ] **Demandes complètes** : objectif + contraintes + critères de « fini » dès le premier message.
- [ ] **Effort dosé** : thinking et `--effort` montés seulement quand ça paie.
- [ ] **Cache préservé** : contenu stable en tête, rien de volatile tôt dans le prompt.
- [ ] **CLAUDE.md concis** : `/init` puis élagage.
- [ ] **Outils restreints** : `--tools`, `--strict-mcp-config` en automatisation.
- [ ] **Subagents** pour isoler le contexte et paralléliser le travail indépendant.
- [ ] **Preuves exigées** : faire montrer tests/sortie/capture plutôt que croire « ça marche » (voir `/verify`) ; pour l'UI, comparer à un visuel cible.
- [ ] **Trajectoire corrigée tôt** : `Échap` pour stopper, `/clear` après deux corrections ratées.
- [ ] **Sessions parallèles** : worktrees pour avancer sur plusieurs fronts et faire relire à contexte neuf.
- [ ] **Savoir occasionnel en skill**, pas dans `CLAUDE.md` (chargé à la demande).
