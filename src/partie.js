import { Cow } from "./cow.js";
import { Pipe } from "./pipe.js";



let partie_en_cours = false;
let elt_score = document.createElement("div");
elt_score.id = "score";
let vache = new Cow();
let liste_pipe = [];
let score = 0;
let boucle_active = false;




let son_deception = new Audio("audio/deception_sound.mp3");
let hurt_sound = new Audio("audio/hurt_sound.mp3");
let music_game = new Audio("audio/game_music.mp3");
music_game.loop = true;
let music_lancer = false;



function afficher_game_over() {
    let elt_game_over = document.createElement("img");
    elt_game_over.setAttribute("src", "image/logo_game_over.png");
    elt_game_over.setAttribute("id", "img_game_over");
    elt_game_over.setAttribute("alt", "logo game over");
    elt_game_over.classList.add("game_over");

    document.querySelector("body").appendChild(elt_game_over);
}

function supprimer_game_over() {
    let elt_game_over = document.querySelector("#img_game_over");

    if (elt_game_over) {
        elt_game_over.remove();
    }
}

function augmenter_score() {
    score += 10;
    document.querySelector("#score").textContent = score;
}

function calculer_vitesse_pipe() {
    return 3 + Math.floor(score / 50);
}



function ajout_pipe_file(liste_pipe) {
    let ecart_pipe = 200;
    let hauteur_pipe_haut = Math.floor(Math.random() * 200) + 100;
    let hauteur_pipe_bas = window.innerHeight - hauteur_pipe_haut - ecart_pipe;

    let pipeH = new Pipe("haut", hauteur_pipe_haut);
    let pipeB = new Pipe("bas", hauteur_pipe_bas);

    pipeH.afficher();
    pipeB.afficher();

    //liste_pipe.push([pipeH, pipeB]);
    liste_pipe.push({ haut: pipeH, bas: pipeB, score_compte: false });
};

function reset_liste_pipe(liste_pipe) {
    liste_pipe.forEach((duo) => {
        duo.haut.supprimer_pipe();
        duo.bas.supprimer_pipe();
    });

    liste_pipe.length = 0;
}

//saut
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !event.repeat && vache.getPos_y() < window.innerHeight && partie_en_cours) {
        //Lancement de la musique lors du premier saut (clique sur espace)
        if (!music_lancer) {
            music_game.play();
            music_lancer = true;
        };
        
        let son = vache.getJump_sound();
        son.currentTime = 0;
        son.play();

        vache.sauter();
    }
});


document.addEventListener("keydown", function(event) {
    if (event.code === "Enter" && !event.repeat && !partie_en_cours) {
        recommencer_partie();
    };
})



let dernier_pipe = 0;
let intervalle_pipe = 2000; // 2secondes
/*
intervalle pipe doit etre diminuer au fur et a mesure de la partie
(pr linstant seulement la vitesse des pipes varie)
sappuyer sur calculer_vitesse_pipe() definit plus haut
*/


function boucle_jeu(liste_pipe) {
    vache.mise_a_jour();

    let elt_vache = document.querySelector("#cow_sprite");
    elt_vache.style.bottom = vache.getPos_y() + "px";

    //apparition des tuyaux
    let maintenant = performance.now();

    if (maintenant - dernier_pipe >= intervalle_pipe) {
        ajout_pipe_file(liste_pipe);
        dernier_pipe = maintenant;
    }

    for (let i = liste_pipe.length - 1; i >= 0; i--) {
        let duo = liste_pipe[i];
    
        let vitesse = calculer_vitesse_pipe();
        duo.haut.avancer(vitesse);
        duo.bas.avancer(vitesse);

        if (!duo.score_compte && duo.haut.pipe_valider()) {
            augmenter_score();
            duo.score_compte = true;
        }

        if (duo.haut.sortie_ecran()) {
            duo.haut.supprimer_pipe();
            duo.bas.supprimer_pipe();
            liste_pipe.splice(i, 1);
            continue;
        }

        if (vache.collision(duo.haut) || vache.collision(duo.bas)) {
            hurt_sound.play();
            son_deception.play();
            partie_en_cours = false;
            boucle_active = false;
            afficher_game_over();
            return;
        }
    }
    requestAnimationFrame(() => boucle_jeu(liste_pipe));
}


function recommencer_partie() {
    reset_liste_pipe(liste_pipe);

    // Supprimer l'ancienne image de la vache
    let ancienne_vache = document.querySelector("#cow_sprite");
    if (ancienne_vache) {
        ancienne_vache.remove();
    }

    vache.reset_cow();

    dernier_pipe = performance.now();
    supprimer_game_over();
    partie_en_cours = true;
    score = -10;
    augmenter_score();
    lancement_partie();
}

export function lancement_partie() {
    if (boucle_active) return;

    partie_en_cours = true;
    boucle_active = true;

    document.body.classList.add("background_game");
    document.body.appendChild(elt_score);

    vache.afficher_cow();

    dernier_pipe = performance.now();

    requestAnimationFrame(() => boucle_jeu(liste_pipe));
}

