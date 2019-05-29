(function () {

    var FPS = 60;
    const dinoCorreFPS = 10;
    const dinoPulaFPS = 50;
    const PROB_NUVEM = 1;
    var gameLoop;
    var dinoCorreLoop;
    var dinoPulaLoop;
    var anoitecer
    var deserto;
    var dino;
    var body = document.getElementsByTagName("body")[0];
    var nuvens = [];
    var passaros = [];
    function init() {
        deserto = new Deserto();
        dino = new Dino();
        gameLoop = setInterval(run, 1000 / FPS);
        dinoCorreLoop = setInterval(dinoCorreAnimation, 1000 / dinoCorreFPS);
        dinoPulaLoop = setInterval(dinoPulaAnimation, 1000 / dinoPulaFPS);
        anoitecer = setInterval(mudaTempo, 60000);

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
        this.chao.style.backgroundPositionX = (parseInt(this.chao.style.backgroundPositionX) - 4) + "px";

        if (this.chao.style.backgroundPositionX == "-1000px") {
            this.chao.style.backgroundPositionX = "0px";
            FPS = FPS + 2;
            clearInterval(gameLoop);
            gameLoop = setInterval(run, 1000 / FPS);
            console.log("FPS " + FPS);
        }
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
        this.alturaMaxima = "88px";
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
        this.element.style.top = Math.floor(Math.random() * 150 - 50) + "px";
        deserto.element.appendChild(this.element);
    }

    Nuvem.prototype.mover = function () {
        this.element.style.right = (parseFloat(this.element.style.right) + 2) + "px";
    }

    Nuvem.prototype.deletar = function () {
        this.element.remove();
    }

    class Passaro {
        constructor() {
            this.sprites = {
                'voa1': '-134.8px',
                'voa2': '-180.8px',
            };

            this.element = document.createElement("div");
            this.element.className = "passaro";
            this.element.style.right = "0px";
            var aux = Math.random();
            if (aux <= 0.33)
                this.element.style.top = "75px";
            else if (aux >= 0.66)
                this.element.style.top = "100px";
            else
                this.element.style.top = "50px";

            deserto.element.appendChild(this.element);
        }

        mover() {
            this.element.style.right = (parseFloat(this.element.style.right) + 4) + "px";
        }

        voa() {
            this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.voa1) ? this.sprites.voa2 : this.sprites.voa1;
        }

        deletar() {
            this.element.remove();
        }

        getPositionx() {
            return parseInt(this.element.style.right);
        }
    }


    function run() {
        deserto.mover();
        if (Math.floor(Math.random() * 1000) <= PROB_NUVEM) {
            nuvens.push(new Nuvem());
            if (nuvens.length > 10) {
                n = nuvens.shift();
                n.deletar();
            }
        }
        nuvens.forEach(function (n) {
            n.mover();

        });
        if (passaros.length == 0) {
            passaros.push(new Passaro());
        }
        else if (passaros[passaros.length - 1].getPositionx() > 250) {
            var aux = passaros[passaros.length - 1].getPositionx();
            if (Math.random() < (aux - 250) / 10000) {
                passaros.push(new Passaro());
                if (passaros.length > 10) {
                    p = passaros.shift();
                    p.deletar();
                }
            }


        }
        passaros.forEach(function (p) {
            p.mover();

        });

        //Em caso de game over
        //clearInterval(gameLoop);
    }

    function dinoCorreAnimation() {
        dino.correr();
        dino.correrAbaixado();
        passaros.forEach(function (p) {
            p.voa();
        });
    }

    function dinoPulaAnimation() {

        dino.pular();
    }

    function mudaTempo() {
        console.log(body.style.backgroundColor);
        if (body.style.backgroundColor == "black") {
            body.style.backgroundColor = "white";
            body.style.filter = "";
        }
        else {
            body.style.backgroundColor = "black";
            body.style.filter = "invert(100%)";
        }
    }


    init();
})();