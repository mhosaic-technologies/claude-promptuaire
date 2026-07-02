# 06 — Optimiser les tokens

Le **playbook complet** pour économiser la consommation de tokens et obtenir un compute de qualité au moindre coût — dans Claude Code, l'app ou via l'API. Cinq leviers : **Modèles & routage**, **Contexte**, **Cache**, **Outils & sortie**, **Mesure & budget**.

> Maintenance : skill `/maj-optimisation`. Prix et ratios vérifiés le 2026-07-02 sur la doc officielle (platform.claude.com), par million de tokens (« MTok ») ; à revérifier via la doc ou `client.models.list()`.

## Le coût en 30 secondes

| Modèle | Entrée | Sortie | Contexte |
|--------|:-----:|:-----:|:-------:|
| Haiku 4.5 | 1 $ | 5 $ | 200K |
| Sonnet 4.6 | 3 $ | 15 $ | 1M |
| Opus 4.8 | 5 $ | 25 $ | 1M |
| Fable 5 | 10 $ | 50 $ | 1M |

Trois faits qui guident tout le reste :
1. **La sortie coûte ~5× l'entrée** → faire écrire moins est un levier majeur.
2. **Le contexte est ré-envoyé à chaque tour** → un historique inutile se repaie sans cesse.
3. **Le cache lit à ~0,1×** → le contenu stable réutilisé est quasi gratuit.

---

## 1. Modèles & routage

### Router selon la difficulté réelle — le levier n°1
Sonnet par défaut, Opus pour le raisonnement vraiment dur, Haiku pour le volume. Opus coûte ~1,7× Sonnet et ~5× Haiku en entrée : ne le sortez que quand il **change le résultat**.
> 🚀 Mesurez avant de monter en gamme : le Sonnet d'aujourd'hui dépasse l'Opus d'il y a un an. Le sur-dimensionnement du modèle est la première cause de surcoût.

### L'ascenseur de modèles
`/model` (ou Option+P / Alt+P) change de modèle **sans perdre le contexte**. Schéma gagnant : Sonnet → `/model opus` le temps de l'étape dure → `/model sonnet`. Aucune raison de rester sur Opus « au cas où ».

### Déléguer le volume à Haiku
Orchestrateur (Sonnet/Opus) + subagents **Haiku** pour le répétitif (lire 50 fichiers, classer 200 items). 5× moins cher, quasi instantané, et le contexte principal reste propre. Fixez le modèle de l'agent sur Haiku dans `/agents`.

### Un second avis sans payer le gros modèle partout
`/advisor opus` sur une session Sonnet : un regard plus fort **uniquement sur les décisions clés**, sans le tarif Opus à chaque tour.

### Doser l'effort
`--effort` / `/effort` : `low` pour le mécanique, `high` pour le quotidien exigeant, `xhigh` pour le code/agentique, `max` quand l'erreur coûte plus que les tokens. Désactivez l'extended thinking (Option+T) sur les questions simples. Sur Fable 5 et Opus 4.8/4.7, le thinking est **adaptatif** : pas de `budget_tokens` fixe (rejet 400) — c'est l'`effort` qui dose la profondeur.

### Fast mode
`/fast` (Option+O / Alt+O) : le même Opus, **plus vite** — pas un downgrade de qualité. N'économise **pas** de tokens ; en API c'est même un **tarif premium** (research preview, Opus 4.8/4.7/4.6 ; Opus 4.8 = 10 $/50 $ par MTok, indisponible avec le Batch API). Le bénéfice est la latence (donc moins d'abandons/reformulations coûteux côté abonnement), pas le coût brut.

### Réserver Fable au plafond d'Opus
Fable 5 = **2× le prix d'Opus**. À ne sortir que quand Opus a réellement échoué sur le problème précis.

---

## 2. Contexte

### `/clear` entre tâches sans rapport
Un historique hors-sujet est relu (et repayé) à chaque message **et** dilue l'attention. Coupure nette = `/clear` (sans état d'âme) ; même tâche mais session longue = `/compact`.

### `/compact` guidé
Remplace l'historique par un résumé. Guidez-le (« garde le TODO et les décisions d'archi ») et compactez **vous-même** avant l'auto-compactage pour choisir ce qui survit.

### Régler la fenêtre d'auto-compactage
`/config` → *Auto-compact window size* : un seuil plus bas garde le contexte plus léger sur les longues sessions agentiques.

### CLAUDE.md concis = économie permanente
Chaque ligne est rechargée à chaque session. Visez la liste de contraintes, pas la doc exhaustive. `/init` puis élaguez : si une ligne n'a jamais changé le comportement de Claude, supprimez-la. Bonus : stable + concis = servi depuis le cache.

### Cibler avec `@` plutôt que laisser explorer
`@src/auth.ts` évite à Claude de fouiller le projet (autant de tokens d'entrée). Collez aussi les messages d'erreur complets : une demande précise d'emblée coûte moins que distillée sur 10 messages.

### Isoler le contexte via des subagents
L'agent renvoie une **conclusion**, pas le contenu brut exploré. Moins de tokens + meilleure attention. Affectez Haiku aux agents d'exploration et lancez-les en parallèle.

### `/rewind` plutôt que tout réexpliquer
Interrompre tôt (Échap) et restaurer un état sain (`/rewind`) coûte moins que laisser finir une mauvaise piste puis empiler des corrections.

---

## 3. Cache de prompt

### Mettre le stable en tête
Le cache est un **match de préfixe** : placez le contenu invariant (system prompt, CLAUDE.md, gros fichiers) **avant** le variable. Ordre de rendu : outils → system → messages. Question variable tout à la fin. Attention au **minimum cacheable** (sinon pas de cache, silencieusement) : Opus 4.8 / Sonnet 4.6 = 1 024 tokens, Haiku 4.5 = 4 096, Fable 5 = 512.

### Éviter les invalidateurs silencieux
Un seul octet changé en tête casse tout le cache derrière. Bannissez du préfixe : date/heure, UUID, IDs de session, JSON non trié, sections conditionnelles, jeu d'outils variable. Diagnostic : si « cache read » (`/cost`) reste à zéro sur un préfixe censé stable, un invalidateur traîne.

### L'économie du cache (quand ça paie)
Écriture 1,25× (TTL 5 min) ou 2× (1 h) ; lecture 0,1×. La 1ʳᵉ requête écrit (surcoût 0,25×), les suivantes lisent à 0,1×. **Break-even : rentable dès 1 lecture après l'écriture en 5 min, dès 2 lectures en 1 h.** Au-delà, jusqu'à ~90 % d'économie sur un gros préfixe stable. Les remises **cache + batch** s'empilent.

### `--exclude-dynamic-system-prompt-sections`
Déplace les sections par-machine (cwd, env, git) hors du prompt système pour le rendre identique d'une exécution à l'autre — précieux en CI et pour le cache partagé entre runs.

---

## 4. Outils & sortie

### Limiter les outils chargés
`--tools "Read,Edit,Bash"` : chaque outil pèse en contexte même inutilisé. Moins d'outils = moins de tokens **et** moins de dispersion. Doublement rentable en headless/CI.

### Isoler les serveurs MCP
`--strict-mcp-config` ne charge que les serveurs fournis : contexte plus léger et environnement sans parasite.

### Masquer / trier les skills par tokens
`/skills` : `t` trie par coût, `Espace` masque une skill. Avant d'installer un plugin, regardez son coût projeté (`claude plugin details`).

### Réduire la SORTIE (≈5× plus chère)
Demandez la **concision** et des **diffs/patchs** plutôt que la réécriture de fichiers entiers. Faire écrire moins économise souvent plus qu'un changement de modèle.
> *« Modifie uniquement les lignes nécessaires, réponds en patch. »*

### Maîtriser le coût des images
Claude lit les images par patches de 28×28 px : coût = ⌈largeur/28⌉ × ⌈hauteur/28⌉ tokens. Plafond **4 784 tokens** en haute résolution (Fable 5, Opus 4.8/4.7), **1 568** en tier standard. Repères : 1000×1000 ≈ 1 296 ; 1920×1080 ≈ 2 691 (high-res) ; 4K plafonne à 4 784. Downsamplez (ex. 4K → 1080p) quand le détail fin n'est pas nécessaire ; gardez la haute résolution pour les maquettes/diagrammes denses.

### Programmatic tool calling (API, avancé)
Au lieu de renvoyer chaque résultat d'outil à Claude (qui le relit et le repaie), Claude écrit un **script** exécuté dans un conteneur d'exécution de code ; les résultats intermédiaires sont filtrés/agrégés dans le code et **seul le résultat utile** entre dans le contexte. Gain mesuré par Anthropic sur les benchmarks de recherche agentique (BrowseComp, DeepSearchQA) : **~24 % de tokens d'entrée en moins et +11 % de performance** moyenne. Réservé à l'**API** (nécessite l'outil d'exécution de code) ; même esprit que la délégation à des subagents côté Claude Code.

---

## 5. Mesure & budget

### `/cost` — suivre la consommation et le cache
Tokens entrée/sortie/cache + coût estimé. La ligne **« cache read »** est le signal clé : élevée = contexte stable bien réutilisé à ~10 %.

### `/context` — voir ce qui remplit la fenêtre
Ventile system / CLAUDE.md / fichiers / outils / historique. Au-delà de ~70 % d'historique, agissez ; si « Tools » est élevé, pensez `--tools`.

### `/usage` — suivre ses quotas
Consommation vs limites du plan. Près du plafond hebdo : déléguez à Haiku, planifiez, ou activez `/usage-credits`.

### Compter avant d'envoyer (sans tiktoken)
`count_tokens` (API/SDK) donne le compte exact, spécifique au modèle. **N'utilisez pas tiktoken** : il sous-estime Claude de ~15-20 % (plus sur du code). CLI : `ant messages count-tokens`.

### Plafonner la dépense en headless
`--max-budget-usd 2.00` (avec `--print`) stoppe au-delà du montant. À mettre **systématiquement** dans les crons/CI : une boucle d'agent sans plafond peut coûter très cher en une nuit.

### Batch API : −50 % pour le non-temps-réel
Traitement asynchrone à **50 % du tarif** (entrée ET sortie), la plupart des lots < 1 h. Limite : 100 000 requêtes ou 256 MB par lot ; expiration à 24 h. Idéal pour le volume non interactif. Cumulez **batch + Haiku + cache** du contexte partagé (remises empilables) — ex. Haiku 4.5 en batch : 0,50 $/2,50 $ par MTok.

### Headless ciblé
`claude -p "…" --output-format json --tools "Read" --effort low --max-budget-usd 1` : une requête, une réponse, contexte minimal. `--no-session-persistence` pour des runs jetables ; `--output-format json` pour journaliser la dépense.

---

## Checklist « token-efficient »

- [ ] **Modèle** routé : Sonnet défaut · Opus ponctuel (ascenseur) · Haiku pour le volume.
- [ ] **Contexte** propre : `/clear` entre tâches, `/compact` guidé, `/context` pour vérifier.
- [ ] **CLAUDE.md** concis et stable (généré via `/init` puis élagué).
- [ ] **Cache** préservé : stable en tête, aucun invalidateur (date/UUID) au début, préfixe ≥ minimum cacheable (1 024 tok Opus 4.8/Sonnet 4.6, 4 096 Haiku 4.5).
- [ ] **Effort** dosé ; extended thinking off sur le simple.
- [ ] **Sortie** réduite : concision + diffs ciblés (×5 le prix).
- [ ] **Outils** restreints : `--tools`, `--strict-mcp-config`, skills masquées.
- [ ] **Avancé (API)** : programmatic tool calling pour garder les résultats intermédiaires hors contexte (~−24 % d'input, +11 % de perf).
- [ ] **Mesure** : `/cost` et `/context` régulièrement ; `count_tokens` avant un gros input.
- [ ] **Automatisation** : `--max-budget-usd`, Batch API (−50 %), headless ciblé.
