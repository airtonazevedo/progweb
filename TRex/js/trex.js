(function () {

    const FPS = 300;
    const dinoCorreFPS = 10;
    const dinoPulaFPS = 60;
    const PROB_NUVEM = 5;
    var gameLoop;
    var dinoCorreLoop;
    var dinoPulaLoop;
    var deserto;
    var dino;
    var nuvens = [];

    function init() {
        deserto = new Deserto();
        dino = new Dino();
        gameLoop = setInterval(run, 1000 / FPS);
        dinoCorreLoop = setInterval(dinoCorreAnimation, 1000 / dinoCorreFPS);
        dinoPulaLoop = setInterval(dinoPulaAnimation, 1000 / dinoPulaFPS);
    }

    window.addEventListener("keydown", function (e) {
        if (e.key == "ArrowUp" && dino.status == 0) dino.status = 1;
        else if (e.key == "ArrowDown" && dino.status == 0) dino.status = 3;
    });

    window.addEventListener("keyup", function (e) {
        if (e.key == "ArrowDown" && dino.status == 3) dino.status = 0; 
    });

    function Deserto() {
        this.element = document.createElement("div");
        this.element.className = "deserto";
        document.body.appendChild(this.element);

        this.chao = document.createElement("div");
        this.chao.className = "chao";
        this.chao.style.backgroundPositionX = "0px";
        this.element.appendChild(this.chao);
    }

    Deserto.prototype.mover = function () {
        this.chao.style.backgroundPositionX = (parseInt(this.chao.style.backgroundPositionX) - 1) + "px";
    }

    function Dino() {
        this.sprites = {
            'correr1': '-764.8px',
            'correr2': '-808.8px',
            'pulando': '-678px',
            'correrAbaixado1': '-942px',
            'correrAbaixado2': '-1001px',
        };
        this.status = 0; // 0:correndo; 1:subindo; 2: descendo; 3: agachado
        this.alturaMaxima = "80px";
        this.element = document.createElement("div");
        this.element.className = "dino";
        this.element.style.backgroundPositionX = this.sprites.correr1;
        this.element.style.bottom = "0px";
        deserto.element.appendChild(this.element);
    }

    Dino.prototype.correr = function () {
        if (this.status == 0) {
            this.element.style.width = "44px";
            this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.correr1) ? this.sprites.correr2 : this.sprites.correr1;
        }
    }

    Dino.prototype.correrAbaixado = function () {
        if (this.status == 3) {
            this.element.style.width = "58px";
            this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.correrAbaixado1) ? this.sprites.correrAbaixado2 : this.sprites.correrAbaixado1;
        }
    }

    Dino.prototype.pular = function () {
        if (this.status == 1) {
            this.element.style.backgroundPositionX = this.sprites.pulando;
            this.element.style.bottom = (parseInt(this.element.style.bottom) + 4) + "px";
            if (this.element.style.bottom == this.alturaMaxima) {
                this.status = 2;
            }

        }
        else if (this.status == 2) {
            this.element.style.bottom = (parseInt(this.element.style.bottom) - 4) + "px";
            if (this.element.style.bottom == "0px") this.status = 0;
        }
    }

    function Nuvem() {
        this.element = document.createElement("div");
        this.element.className = "nuvem";
        this.element.style.right = "0px";
        this.element.style.top = Math.floor(Math.random() * 120) + "px";
        deserto.element.appendChild(this.element);
    }

    Nuvem.prototype.mover = function () {
        this.element.style.right = (parseInt(this.element.style.right) + 1) + "px";
    }

    function run() {
        //dino.correr();
        deserto.mover();
        if (Math.floor(Math.random() * 1000) <= PROB_NUVEM) {
            nuvens.push(new Nuvem());
        }
        nuvens.forEach(function (n) {
            n.mover();
        });
        //Em caso de game over
        //clearInterval(gameLoop);
    }

    function dinoCorreAnimation() {
        dino.correr();
        dino.correrAbaixado();
    }

    function dinoPulaAnimation() {
        dino.pular();
    }


    init();
})();