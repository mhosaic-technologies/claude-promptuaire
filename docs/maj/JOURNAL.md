# Journal des mises à jour (skills /maj-*)

Suivi chronologique des exécutions des skills de maintenance. **Chaque exécution d'une skill `/maj-*` ajoute une entrée ici** (les runs `/maj-tout` regroupent leurs 5 étapes sous une seule entrée). Entrées les plus récentes en premier.

Format d'une entrée : date · déclencheur · périmètre · résumé (ajouté / modifié / retiré / non confirmé) · fichiers touchés.

---

## 2026-07-02 · Repasse qualité des skills + correction de dérive

**Déclencheur** : demande utilisateur (repasse sur chaque skill avec Fable 5).

- **Skills durcies (7 fichiers)** : hiérarchie des sources en cas de conflit (page officielle live > caches/bundles > mémoire), statut des modèles vérifiable uniquement sur `models/overview.md` live, bruit `strings` du runtime JS embarqué, flux « retour terrain » formalisé, orchestration par sous-agents séquentiels, grep des compteurs codés en dur, journalisation (cette page).
- **Dérive de contenu corrigée** : Fable 5 décrit « toujours en *extended thinking* » → « **thinking adaptatif toujours actif** » (4 emplacements : `CLAUDE_META.models`, fiche `mdl-fable`, tableau docs/05). Source : `models/overview.md` live (*Extended thinking: No / Adaptive: always on*) — l'extended thinking à budget fixe est précisément rejeté (400) par Fable.
- **Fichiers** : `.claude/skills/*` (7), `web/data.js`, `docs/05`.

## 2026-07-02 · Enrichissement hors-cycle — `bp-course-correct`

**Déclencheur** : retour terrain (collègue de l'utilisateur).

- **Modifié** : fiche `bp-course-correct` enrichie sur 2 angles — corriger même les hypothèses mineures « pas graves » (elles s'aggravent, Claude construit dessus) ; l'économie de tokens explicite (2 lignes de recadrage évitent de régénérer un gros bloc). Renvoi croisé vers l'onglet « Optimiser les tokens ».
- **Fichiers** : `web/data.js`, `docs/05`.

## 2026-07-02 · /maj-tout — run complet

**Contexte** : Claude Code **2.1.183 → 2.1.191** · catalogue **168 → 177 fiches** · date doc → 2026-07-02. Exécution par sous-agents séquentiels.

| Étape | Skill | Résultat |
|---|---|---|
| 1 | `/maj-modeles` | ✅ Déjà à jour (0 changement) — IDs/prix/contextes confirmés contre `claude-api` + page modèles live. Statut Fable 5 vérifié **GA** (depuis le 9 juin 2026). |
| 2 | `/maj-claude-code` | ➕ `claude ultrareview`, `claude project purge` · 🔄 comportements recadrés : `/rewind` (reprise avant `/clear`), `/review` (moteur `/code-review medium`), `/tasks` (arrêt définitif), mode `!` (réponse auto) · ⚠️ bruit `strings` écarté (flags du runtime JS). |
| 3 | `/maj-app-claude` | ➕ 4 fiches : Claude dans Slack (23 juin), visualisations in-line (mars), pilotage mobile Cowork (17 mars), add-ins Excel/PowerPoint (11 mars) · ⚠️ « suspension Fable 5 » lue dans les release notes app → **non appliquée**, infirmée par la page modèles. |
| 4 | `/maj-bonnes-pratiques` | ➕ 3 fiches : `bp-course-correct`, `bp-parallel-sessions`, `bp-skills-vs-md` · 🔄 `bp-verify-evidence` enrichie (vérif UI, Stop hook). |
| 5 | `/maj-optimisation` | 🔄 8 fiches recadrées : PTC (~24 % / +11 %, remplace 37 % périmé), Fast mode (tarif premium), minimums de cache par modèle (page live prime sur le bundle `claude-api`), Batch (−50 % entrée+sortie, 100k req/256 MB), thinking adaptatif Fable. |
| — | Passe de cohérence | 🔧 compteur README « 168 entrées » → 177 · versions/dates alignées (META ↔ README ↔ docs/README) · `node --check` OK · 0 doublon d'id · 0 champ manquant. |

**Conflits de sources tranchés** (doc live prime) : minimums de cache (le sous-agent avait raison contre le bundle) ; statut Fable 5 (GA, la « suspension » était fausse).

**Fichiers** : `web/data.js`, `docs/01` à `06`, `README.md`, `docs/README.md`.
