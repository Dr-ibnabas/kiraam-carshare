# Assets

Ce dossier contient les ressources visuelles de l'application.

## Structure

```
assets/
├── images/    # icon.png, splash.png, adaptive-icon.png, favicon.png
├── fonts/     # Inter Regular/Medium/SemiBold/Bold (.ttf)
└── icons/     # Icônes spécifiques
```

## Note importante

Pour la **démo immédiate**, l'application fonctionne **sans assets locaux** :
- Les images sont chargées depuis Unsplash (voir mockData.ts)
- Les icônes proviennent de `lucide-react-native`
- Le splash est généré dynamiquement (fond bleu KIRAAM)

## Production

Pour la production, remplacer / ajouter :
- `images/icon.png` (1024×1024)
- `images/splash.png` (1284×2778 recommandé)
- `images/adaptive-icon.png` (1024×1024, Android)
- `images/favicon.png` (48×48, Web)
- `fonts/Inter-*.ttf`

Puis remettre les références dans `app.json`.
