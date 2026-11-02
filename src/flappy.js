import { afficher_menu } from "./menu.js";

afficher_menu();

//permet d'empecher le zoom de la page
document.addEventListener("wheel", function(event) {
    if (event.ctrlKey) {
        event.preventDefault();
    }
}, { passive: false });