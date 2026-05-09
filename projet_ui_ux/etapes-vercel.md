# Étapes de déploiement sur Vercel

## Prérequis
- Compte GitHub configuré avec le dépôt `projet-ui-ux`
- Compte Vercel (gratuit)
- Tous les fichiers sources poussés sur GitHub (déjà fait)

## Étape 1 : Se connecter à Vercel
1. Allez sur https://vercel.com
2. Cliquez sur "Sign Up" ou "Log In"
3. Choisissez "Continue with GitHub" pour autoriser Vercel d'accéder à vos repos
4. Autorisez Vercel à accéder à votre compte GitHub

## Étape 2 : Importer le projet
1. Une fois connecté, cliquez sur "Add New Project" ou "Import Project"
2. Sélectionnez "Import Git Repository"
3. Trouvez et sélectionnez le dépôt `FEDI-HASSINE/projet-ui-ux`
4. Cliquez sur "Import"

## Étape 3 : Configurer le build
1. Vercel détecte automatiquement Vite et pré-remplit les paramètres
2. Vérifiez les paramètres suivants :
   - **Framework Preset** : Vite (déjà sélectionné)
   - **Root Directory** : `projet_ui_ux`
   - **Build Command** : `npm run build` ou `pnpm build`
   - **Output Directory** : `dist`
3. Les variables d'environnement ne sont pas nécessaires pour ce projet
4. Cliquez sur "Deploy"

## Étape 4 : Attendre le déploiement
1. Vercel va télécharger les dépendances et compiler le projet
2. Vous verrez une barre de progression avec les logs
3. Une fois terminé, vous recevrez une URL unique du type `https://your-project.vercel.app`

## Étape 5 : Accéder au site en direct
1. Cliquez sur l'URL générée pour visiter le site
2. Vérifiez que tous les accents français s'affichent correctement
3. Testez les différentes étapes de la réservation
4. Testez le changement de langue FR/EN

## Étape 6 : Configuration optionnelle
Pour personnaliser le domaine :
1. Dans Vercel, allez à "Settings" > "Domains"
2. Ajoutez un domaine personnalisé (ex. `booking-attt.com`)
3. Configurez les enregistrements DNS chez votre registraire

## Étape 7 : Mise en place du CI/CD automatique
Une fois le déploiement initial réussi :
- À chaque push sur `main`, Vercel redéploiera automatiquement
- Vous pouvez configurer des "Preview Deployments" pour les branches
- Allez à "Settings" > "Git" pour activer ces fonctionnalités

## Résolution des problèmes courants

### Le build échoue
- Vérifiez que `pnpm-lock.yaml` est inclus dans le dépôt
- Vérifiez que le dossier racine dans Vercel est bien `projet_ui_ux`
- Regardez les logs du build pour identifier l'erreur

### Les accents s'affichent mal
- Assurez-vous que tous les fichiers source utilisent l'encodage UTF-8
- Vérifiez que `vercel.json` est au bon endroit

### La page affiche un écran blanc
- Vérifiez que `vite.config.ts` est correct
- Consultez la console du navigateur (F12) pour les erreurs JavaScript

## Vérification après déploiement
Une fois le site en ligne :
✓ Test de réservation complet (7 étapes)
✓ Vérification des accents français
✓ Test du changement de langue
✓ Test sur mobile
✓ Test de la persistence localStorage (reprendre une réservation)
✓ Message de confirmation avec numéro de réservation

Voilà, le projet est maintenant en direct sur Vercel!
