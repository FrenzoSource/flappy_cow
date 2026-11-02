#🐄 Flappy Cow
Flappy cow est un jeu inspiré de 'Flappy Bird' ou l'on incarne une vache qui doit sauter entre des tuyaux. Ce jeu est développé en JavaScript, HTML et CSS.


##🎮 Comment lancer le jeu ?

###Prérequis :
  - Avoir installé Python sur son ordinateur
  - Télécharger ou cloner ce dépot GitHub

###Installation :

1. Télécharger le projet ou le cloner avec Git :
    git clone URL_DE_TON_DEPOT

2. Ouvrir le dossier du projet.

3. Lancer le fichier Python lancer_jeu.py avec la commande:
     python3 lancer_jeu.py


###Pourquoi faut il utiliser Python?
Certains fichiers JS du jeu contiennent des modules JavaScript (export, import).
Lorsque l'on ouvre directement le fichier HTML depuis son ordinateur ('file://'), le navigateur peut bloquer le chargement de ces modules pour des raisons de sécurité (CORS).
Le fichier Python lance donc un petit serveur web local qui permet au navigateur de charger correctement les fichiers du jeu.

Ce serveur utilise l'adresse 127.0.0.1 : adresse qui est accessible uniquement depuis l'ordinateur sur lequel le fichier python est lancé.

## Arrêter le jeu

Une fois la partie terminée :
1. Fermer l'onglet du jeu dans le navigateur.
2. Retourner dans le terminal dans lequel python a été lancé
3. Appuyer sur Entrée pour arrêter le serveur

##😉 Amusez-vous et essayer de vous surpasser 💪🐄


