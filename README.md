# 🐉 Dragon 3D Contrôleur

Un jeu de dragon 3D interactif créé avec Next.js et Three.js où vous pouvez contrôler un dragon qui vole et crache du feu !

## 🎮 Contrôles

- **Mouvement** : `Z`, `Q`, `S`, `D` ou flèches directionnelles `←` `↑` `↓` `→`
- **Saut** : `Espace`
- **Cracher du feu** : `E`

## 🚀 Installation et Lancement

1. **Installer les dépendances :**
   ```bash
   npm install
   ```

2. **Lancer en développement :**
   ```bash
   npm run dev
   ```

3. **Ouvrir le navigateur :**
   Allez sur [http://localhost:3000](http://localhost:3000)

## 📦 Déploiement sur Vercel

1. **Push sur GitHub :**
   ```bash
   git add .
   git commit -m "Initial dragon 3D project"
   git push origin main
   ```

2. **Connecter à Vercel :**
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez votre repository GitHub
   - Le déploiement se fera automatiquement !

## 🛠️ Technologies Utilisées

- **Next.js 14** - Framework React
- **Three.js** - Moteur 3D
- **React Three Fiber** - Integration React pour Three.js
- **React Three Drei** - Utilitaires 3D
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles

## 🎨 Fonctionnalités

- ✅ Dragon 3D entièrement modélisé
- ✅ Contrôles fluides (ZQSD + flèches)
- ✅ Système de saut avec gravité
- ✅ Effets de particules de feu
- ✅ Environnement 3D avec arbres et rochers
- ✅ Ombres et éclairage réaliste
- ✅ Animation de vol du dragon
- ✅ Interface utilisateur avec instructions

## 🔧 Structure du Projet

```
src/
├── app/
│   └── page.tsx          # Page principale
└── components/
    ├── Dragon3D.tsx      # Scène 3D principale
    ├── Dragon.tsx        # Modèle et contrôles du dragon
    ├── FireParticles.tsx # Système de particules de feu
    └── Ground.tsx        # Environnement (sol, arbres, rochers)
```

## 🎯 Améliorations Possibles

- Ajouter des sons d'effets
- Créer plus d'animations pour le dragon
- Ajouter des objectifs/missions
- Implémenter un système de score
- Ajouter d'autres créatures ou obstacles

Amusez-vous bien avec votre dragon ! 🐲🔥
