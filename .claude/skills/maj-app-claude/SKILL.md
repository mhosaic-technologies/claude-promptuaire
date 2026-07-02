---
name: maj-app-claude
description: Met à jour la documentation des fonctionnalités de l'app Claude (claude.ai / Desktop) dans ses trois espaces Chat, Cowork et Code (docs/04 + web/data.js). Utiliser quand l'utilisateur demande de rafraîchir la doc de l'app Claude, ou quand de nouvelles fonctionnalités app sont annoncées.
---

# Mise à jour — App Claude (Chat · Cowork · Code)

Met à jour la documentation des fonctionnalités de l'application Claude (web claude.ai + Desktop), organisée en trois sous-sections : **Chat**, **Cowork**, **Code**. **Vérifier chaque fonctionnalité contre une source officielle — jamais de mémoire.**

> ⚠️ **Avant de commencer, lis [`_principes-verification.md`](../_principes-verification.md)** — règles transverses : vérifier les changements de **comportement/usage** (pas seulement add/remove/rename), croiser les sources, **re-vérifier chaque affirmation** avant application (ex. « Fable 5 suspendu » était faux), tracer source + date.

## Sources de vérité

1. **Docs officielles** : support.claude.com (release notes app), claude.com, anthropic.com/news (WebSearch + WebFetch)
2. **Vérification in-app** si possible (captures, computer-use sur Claude Desktop)
3. Pour chaque fonctionnalité : noter la **disponibilité par plan** (Free/Pro/Max/Team/Enterprise) et le statut (GA/bêta)

> 🚨 **Hors périmètre : le statut des MODÈLES.** Si les release notes app semblent annoncer qu'un modèle est suspendu/retiré/lancé, ne rien appliquer ici : c'est le périmètre de `/maj-modeles`, et seule la page officielle `models/overview.md` fait foi. Incident réel 2026-07-02 : « suspension de Fable 5 » lue dans les release notes app alors que la page modèles le donnait **GA** — signaler l'anomalie dans le rapport, ne pas la propager.

## Fichiers à mettre à jour

| Fichier | Contenu |
|---------|---------|
| `web/data.js` | Entrées `section: "app"` avec `sub: "chat"` \| `"cowork"` \| `"code"` + `CLAUDE_META.updated` |
| `docs/04-app-claude.md` | Trois grandes parties : Chat, Cowork, Code |

## Procédure

1. Rechercher les annonces/changements depuis `CLAUDE_META.updated` (data.js) : nouvelles fonctionnalités, changements de plan, passages bêta→GA, retraits.
2. Classer chaque fonctionnalité dans la bonne sous-section :
   - `sub: "chat"` — conversation, Projects, Artifacts, connecteurs, recherche, fichiers, mémoire, styles, skills, voix…
   - `sub: "cowork"` — travail délégué autonome : dossier de travail, livrables, pilotage…
   - `sub: "code"` — Claude Code dans l'app : sessions GUI, parallélisme, suivi…
3. Créer/amender les entrées dans `web/data.js` au format existant :
   - `simple` (vulgarisation débutant) et `pro` (astuce avancée) **obligatoires**
   - `mockup` : `"chat"`, `"cowork"` ou `"code"` selon la sous-section
   - `notes` : disponibilité par plan + statut bêta + risques éventuels
4. Reporter dans `docs/04-app-claude.md` (respecter la structure en trois parties).
5. Mettre à jour `CLAUDE_META.updated`.

## Vérification (obligatoire avant de conclure)

- `node --check web/data.js` : aucune erreur de syntaxe.
- Contrôle visuel : serveur de preview `web` (`.claude/launch.json`, port 4321) ou ouvrir `web/index.html` → section App Claude : les trois chips (Chat/Cowork/Code) affichent les bons compteurs et les nouvelles fiches s'ouvrent avec leur mockup.
- Marquer clairement dans `notes` tout élément incertain ou non vérifié.
