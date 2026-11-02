



export class Cow {
    #pos_x;   //X ne bougera pas, il sera fixé
    #pos_y;  //champs qui va varier lors de nos saut
    #sprite = {};
    #son_saut = new Audio("audio/jump_sound.mp3");
    #vitesse_y = 0;
    #gravite = 0.5;

    constructor () {
        this.#pos_y = 80;
        this.#pos_x = 28;  //part de left
        this.#sprite["sprite_haut"] = "image/sprite_vache.png";
    }

    getPos_x() {
        return this.#pos_x;
    }

    getPos_y() {
        return this.#pos_y;
    }

    getSprite() {
        return this.#sprite["sprite_haut"];
    }

    getJump_sound() {
        return this.#son_saut;
    }
    setPos_y(ecart) {
        this.#pos_y += ecart;
    }

    setPos_x(ecart) {
        this.#pos_x += ecart;
    }


    afficher_cow() {
        let nouv_cow = document.createElement("img");
        nouv_cow.setAttribute("src", this.getSprite());
        nouv_cow.setAttribute("id", "cow_sprite");
        nouv_cow.classList.add("cow_dimension");

        nouv_cow.style.position = "absolute";
        nouv_cow.style.left = this.getPos_x() + "%";
        nouv_cow.style.bottom = this.getPos_y() + "px";  //permet de convertir number en string (utilisé par le css)
        
        
        document.querySelector("body").appendChild(nouv_cow);
    }

    supprimer_cow() {
        document.querySelector("#cow_sprite").remove();
    }

    sauter() {
        this.#vitesse_y = 10;
    }

    mise_a_jour() {
        this.#vitesse_y -= this.#gravite;
        this.#pos_y += this.#vitesse_y;
        if (this.#pos_y < 0) {
            this.#pos_y = 0;
            this.#vitesse_y = 0;
        };
    };


    collision(pipe) {
        let elt_vache = document.querySelector("#cow_sprite");
        let elt_pipe = document.querySelector(
            "#nb" + pipe.getNumero_pipe()
        );

        if (!elt_vache || !elt_pipe) return false;

        let vache = elt_vache.getBoundingClientRect();
        let tuyau = elt_pipe.getBoundingClientRect();

        if (
            vache.right > tuyau.left &&
            vache.left < tuyau.right &&
            vache.bottom > tuyau.top &&
            vache.top < tuyau.bottom
        ) {
            console.log("Collision détectée !");
            return true; }

        return false;
    }

    reset_cow() {
        this.#vitesse_y = 0;
        this.#pos_y = 80;
    }

    //Faire fonction reset cow

}



