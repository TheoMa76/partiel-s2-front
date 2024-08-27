# Installation du projet
Installer node js

Sur linux :
sudo apt install nodejs

Sur windows : se rendre sur le lien et télécharger 
https://nodejs.org/en

Après avoir cloné le projet

npm install

J'ai laissé le .env car il ne contient pas grand chose de sensible a par le token bearer 
mais c'est une api publique sans donnée sensible donc pour la simplicité j'ai décidé de le laisser dans le projet

Si vous voulez mettre votre api_key, aller sur le site de l'api https://www.themoviedb.org/settings/api connecter vous et 
récupérez le jeton d'accès en lecture à l'API.

Copier coller ce jeton sur le champ REACT_APP_BEARER_TOKEN du .env

Ensuite npm run start pour executer le projet.

