# Principes de vérification (transverses aux skills /maj-*)

À lire **avant** toute mise à jour. Ces règles s'appliquent à *toutes* les skills de maintenance ; chaque skill y renvoie.

## 1. Vérifier les changements de COMPORTEMENT, pas seulement add / remove / rename

Une commande, un flag ou une fonctionnalité peut **rester** tout en voyant son **sens, sa portée ou l'usage recommandé** évoluer.

> Exemple réel : `claude -p` est passé de « imprime une réponse et quitte » à « **point d'entrée de l'Agent SDK** qui lance une boucle agentique multi-tours ». Le nom n'a pas changé, l'usage si.

→ Ne vous contentez pas de détecter les nouveautés. **Relisez la `oneLine`, `simple`, `details`, `example`, `pro` et `notes` de CHAQUE entrée existante** et comparez-les à la source. Si le cadrage a dérivé, corrigez la fiche (et la doc Markdown).

## 2. Croiser le binaire ET la doc officielle

- **Binaire installé** = source pour l'**existence** et les libellés exacts : `~/.local/share/claude/versions/<v>`, `claude --help` / `claude <sous-cmd> --help`, `strings <binaire>` (table des commandes retirées, présence d'une commande/flag, version installée).
- **Doc officielle** = source pour le **comportement** et les nuances :
  - CLI reference : `https://code.claude.com/docs/en/cli-reference`
  - Agent SDK / mode headless : `https://code.claude.com/docs/en/agent-sdk/overview` et `/headless`
  - Modèles & pricing : `https://platform.claude.com/docs/en/about-claude/models/overview.md` et `/about-claude/pricing.md`
  - Release notes : `https://support.claude.com/en/articles/12138966-release-notes` (app) et changelog Claude Code

→ Pour une commande/flag : confirmer l'**existence** dans le binaire **et** relire son **comportement** dans la doc.

**Hiérarchie en cas de conflit entre sources** : page officielle **live** (WebFetch au moment de la mise à jour) > caches/bundles (skill `claude-api`, tables embarquées, résultats d'agents) > mémoire. Deux cas réels du 2026-07-02 : le bundle `claude-api` donnait des minimums de cache périmés (la page live avait raison) ; une source secondaire annonçait « Fable 5 suspendu » (la page modèles live le donnait GA). **Le statut d'un modèle (GA/suspendu/retiré) ne se vérifie QUE sur `models/overview.md` live.**

## 3. Re-vérifier CHAQUE affirmation avant de l'appliquer

Agents, recherches web et mémoire **hallucinent parfois**.

> Exemples rencontrés et écartés : « Fable 5 suspendu » (faux — Fable 5 est **actif**), `.claudeignore` (n'existe **pas** dans le binaire).

→ Avant d'**ajouter** ou de **retirer** quoi que ce soit : confirmer contre une source autoritative (binaire, ou page officielle citée). Si non confirmable → **classer « non confirmé » et ne pas appliquer**. **Jamais de mémoire.**

## 4. Tracer source + date des infos sensibles

Prix, statut (GA / bêta / research preview / retiré), version d'introduction, disponibilité par plan : indiquer la source et la **date absolue** dans `notes` (ex. « v2.1.181 », « research preview, Pro/Max, mars 2026 »). Convertir toute date relative en date absolue.

## 5. Vérification finale systématique

- `web/data.js` se charge sans erreur (parse / navigateur) — aucun doublon d'`id`, aucun champ obligatoire manquant.
- **Compteurs cohérents** : data.js ↔ chips de l'interface ↔ `README.md` ↔ `docs/` — **y compris les compteurs chiffrés codés en dur** (`grep -rnE '[0-9]+ (entrées|fiches|commandes)' README.md docs/`) ; incident réel : « 168 entrées » figé dans README.md après passage à 177.
- Rendu OK dans `web/index.html` (la section concernée, et un détail par type de mockup si pertinent).
- `CLAUDE_META.version` / `CLAUDE_META.updated` à jour et **reportés** dans `README.md` et `docs/README.md`.

## 6. Journaliser chaque exécution

Toute exécution d'une skill `/maj-*` **ajoute une entrée en tête de [`docs/maj/JOURNAL.md`](../../docs/maj/JOURNAL.md)** : date · déclencheur (run `/maj-tout`, demande utilisateur, retour terrain…) · résumé ajouté/modifié/retiré/non confirmé · fichiers touchés. Un run `/maj-tout` regroupe ses 5 étapes sous une seule entrée (tableau). C'est la mémoire du projet : les conflits de sources tranchés et les fausses alertes écartées y sont consignés pour les runs suivants.
