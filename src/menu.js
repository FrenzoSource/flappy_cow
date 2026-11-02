import { lancement_partie } from "./partie.js";

let elt_body = document.querySelector("body");
elt_body.classList.add("menu-background");

var play_button = document.createElement("img");
play_button.setAttribute("src", "image/play_button.png");
play_button.setAttribute("alt", "Bouton jouer");
play_button.classList.add("boutton_play");
play_button.id = "bouton_jouer";


//son start
let son_start = new Audio("audio/start_sound.mp3");









export function afficher_menu() {
    elt_body.appendChild(play_button);
    play_button.addEventListener('click', enlever_menu);
    play_button.addEventListener('mouseover', gros_boutton_play);
    play_button.addEventListener('mouseout', normal_boutton_play);
};

/*
function enlever_menu() {
    son_start.play();
    elt_body.removeChild(play_button); //boutton play
    elt_body.classList.remove("menu-background");
};
*/

function enlever_menu() {
    son_start.play();

    elt_body.removeChild(play_button);
    elt_body.classList.remove("menu-background");

    lancement_partie();
}



//Partie animation du boutton jouer
function gros_boutton_play() {
    play_button.style.width = "20%";
    play_button.style.right = "40%";
    play_button.style.bottom = "2%";
};

function normal_boutton_play() {
    play_button.style.width = "14%";
    play_button.style.right = "44%";
    play_button.style.bottom = "5%";
};

