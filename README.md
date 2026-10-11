# 🚗 KIRAAM CARSHARE

> **Louez. Roulez. Partagez.** — La location de voitures entre particuliers à Djibouti 🇩🇯

KIRAAM CARSHARE est une application mobile moderne, **production-ready**, permettant aux Djiboutiens de louer et mettre en location des véhicules entre particuliers. Construite avec **React Native + Expo SDK 51**.

---

## 🌍 Pays cible

- **République de Djibouti** 🇩🇯
- **Devise** : Franc Djiboutien (Fdj)
- **Langues** : Français (principal), Arabe, Anglais
- **Paiement mobile** : D-Money, Waafi, Cash

---

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Un téléphone avec Expo Go OU émulateur (Android Studio / Xcode)

### Installation

```bash
# 1. Cloner le repo
git clone <url-du-repo>
cd kiraam-carshare

# 2. Installer les dépendances
npm install

# 3. (Optionnel) Configurer l'environnement
cp .env.example .env
# Éditez .env avec vos clés API

# 4. Lancer l'application
npx expo start
```

### Scripts

| Commande | Description |
|----------|-------------|
| `npm start` | Démarre Metro Bundler |
| `npm run android` | Lance sur Android |
| `npm run ios` | Lance sur iOS |
| `npm run web` | Lance la version Web |
| `npm run type-check` | Vérifie les types TypeScript |

---

## 📱 Fonctionnalités

- 🔐 **Authentification** (email, OTP +253, Google)
- 🆔 **Vérification d'identité** (CNI djiboutienne, permis)
- 🚙 **Recherche & filtres** avancés (climatisation, 4x4, etc.)
- 🗺️ **Carte interactive** avec géolocalisation
- 💰 **Paiement multi-canal** : D-Money, Waafi, Carte, Cash
- 💬 **Messagerie temps réel**
- ⭐ **Avis & notations** bidirectionnels
- 🏆 **KIRAAM REWARDS** — programme de fidélité
- 🎁 **Parrainage** (2 000 Fdj offerts)
- 🌐 **Multi-langue** (FR / AR / EN)
- 🌓 **Mode sombre** complet
- 🚐 **Excursions** : Lac Assal, Lac Abbé, Forêt du Day

---

## 🏗️ Architecture

```
kiraam-carshare/
├── App.tsx                  # Entrée principale
├── src/
│   ├── api/                 # Firebase + endpoints
│   ├── components/          # Composants réutilisables
│   ├── constants/           # Couleurs, thème, données Djibouti
│   ├── hooks/               # React hooks personnalisés
│   ├── i18n/                # Internationalisation (FR/AR/EN)
│   ├── navigation/          # Navigateurs React Navigation
│   ├── screens/             # Écrans regroupés par feature
│   ├── services/            # D-Money, Waafi, notifications
│   ├── store/               # Stores Zustand
│   ├── types/               # Types TypeScript
│   └── utils/               # Helpers, formatters, validators
└── assets/                  # Images, fonts, icônes
```

---

## 🎨 Design System

- **Primaire** : `#6AB2E7` (bleu djiboutien)
- **Secondaire** : `#12AD2B` (vert djiboutien)
- **Accent** : `#D7141A` (rouge étoile)
- **Premium** : `#F5A623`
- **Police** : Inter (Regular, Medium, SemiBold, Bold)

---

## 🛠️ Stack Technique

| Couche | Technologie |
|--------|-------------|
| Framework | React Native + Expo SDK 51 |
| Langage | TypeScript strict |
| Navigation | React Navigation v6 |
| State | Zustand + React Query v5 |
| Style | NativeWind v4 (Tailwind) |
| Backend | Firebase (Auth + Firestore + Storage) |
| Cartes | react-native-maps |
| Formulaires | react-hook-form + zod |
| Animations | Reanimated v3 + Moti |
| Images | expo-image |
| Icônes | lucide-react-native |
| i18n | i18next + react-i18next |

---

## 🇩🇯 Spécificités Djibouti

- Numéros de téléphone : format **+253 XX XX XX XX**
- Plaques d'immatriculation : format **XX-XXXX-XX**
- Quartiers : Plateau du Serpent, Héron, Haramous, Balbala, Gabode, PK12
- Villes : Djibouti-ville, Ali Sabieh, Tadjourah, Obock, Dikhil, Arta
- Prix en **Fdj** (3 000 à 50 000 Fdj/jour)
- Filtre **climatisation** prioritaire (climat chaud)
- **4x4** disponibles pour excursions Lac Assal, Lac Abbé

---

## 📞 Support

- **Email** : support@kiraam.dj
- **Urgence 24/7** : +253 77 00 00 00
- **Site** : https://kiraam.dj

---

## 📄 Licence

© 2026 KIRAAM CARSHARE. Tous droits réservés.
