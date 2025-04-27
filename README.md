# Dream Whisper - Journal de Rêves Mobile

## Technologies Utilisées

- **Frontend**: React + TypeScript + Vite
- **UI/UX**: 
  - Tailwind CSS pour le styling
  - shadcn/ui pour les composants
- **Mobile**: Capacitor pour la conversion en application native Android
- **État de l'Application**: État local React (useState, useContext)

## Structure du Projet

```
├── src/
│   ├── components/     # Composants React réutilisables
│   ├── hooks/         # Hooks React personnalisés
│   ├── utils/         # Fonctions utilitaires
│   └── types/         # Types TypeScript
├── android/           # Code natif Android généré par Capacitor
└── public/           # Assets statiques
```

## Prérequis de Développement

- Node.js et npm
- Android Studio
- JDK (Java Development Kit)
- Android SDK

## Installation

```bash
# Installation des dépendances
npm install

# Lancement en mode développement
npm run dev

# Build du projet
npm run build
```

## Déploiement Android

```bash
# Build du projet web
npm run build

# Ajout de la plateforme Android
npx cap add android

# Synchronisation des fichiers
npx cap sync

# Ouverture dans Android Studio
npx cap open android
```

## Fonctionnalités Techniques Implémentées

- Interface de chat responsive
- Gestion d'état local pour les messages
- Adaptation mobile native via Capacitor
- Support du mode sombre
- Composants UI réutilisables
- Hooks personnalisés pour la gestion du responsive design

## Notes Techniques

- L'application est entièrement frontend, sans backend
- Les données sont stockées localement
- Les réponses sont générées à partir d'un tableau statique de réponses prédéfinies
- L'interface imite un chat mais n'utilise pas d'IA réelle

## Configuration Capacitor

Le fichier `capacitor.config.ts` contient les configurations essentielles pour le build mobile :

```typescript
{
  appId: 'com.lovable.dreamwhisper',
  appName: 'dream-whisper-chat-journal',
  webDir: 'dist',
  android: {
    backgroundColor: '#121212'
  }
}
```
