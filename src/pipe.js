


export class Pipe {
    #pos_x;
    #taille;  //taille vertical du tuyaux
    #largeur;
    #type   //pour soit pipe haut soit pipe bas
    #numero_pipe;  //de la forme : nb2   nb3    nb4 etc...
    static nbre_pipe = 0;

    constructor (type_saisie, taille_saisie) {
        this.#pos_x = -30;
        this.#taille = taille_saisie;
        this.#largeur = 50;
        this.#type = type_saisie;
        Pipe.nbre_pipe += 1;
        this.#numero_pipe = Pipe.nbre_pipe;
    }

    getPos_x() {
        return this.#pos_x;
    }

    setPos_x(ecart) {
        this.#pos_x += ecart;
    }

    getType() {
        return this.#type;
    }

    getTaille() {
        return this.#taille;
    }

    getLargeur() {
        return this.#largeur;
    }

    getNumero_pipe() {
        return this.#numero_pipe;
    }



    afficher() {
        let nouv_pipe = document.createElement("img");
        if (this.getType() == "haut") {
            nouv_pipe.setAttribute("src", "image/sprite_pipe_haut.png");
            nouv_pipe.classList.add("pipe_haut");
        }
        else if (this.getType() == "bas") {
            nouv_pipe.setAttribute("src", "image/sprite_pipe_bas.png");
            nouv_pipe.classList.add("pipe_bas");
        };
        nouv_pipe.setAttribute("id", "nb" + String(this.getNumero_pipe()));
        
        nouv_pipe.style.right = this.getPos_x() + "px";

        nouv_pipe.style.height = this.getTaille() + "px";
        document.querySelector("body").appendChild(nouv_pipe);
    }

    supprimer_pipe() {
        //recupere le pipe qui appel la méthode
        document.querySelector("#nb" + String(this.getNumero_pipe())).remove();
    }


    avancer(vitesse = 3) {  //fonction qui fait avancer le sprite au fur et a mesure de la partie
        this.setPos_x(vitesse);

        let elt_pipe = document.querySelector("#nb" + String(this.getNumero_pipe()));    
        elt_pipe.style.right = this.getPos_x() + "px";
    }



    sortie_ecran() {
        //return (document.querySelector("#nb" + String(this.getNumero_pipe())).style.right > window.innerWidth);
        return (this.getPos_x() > window.innerWidth);

    }


    pipe_valider() {
    return this.getPos_x() + this.getLargeur() > window.innerWidth * 0.8;
    }
}