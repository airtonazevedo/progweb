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
    var obstaculos = [];
    function init() {
        deserto = new Deserto();
        dino = new Dino();
        jogo = new Jogo();
    }

    window.addEventListener("keydown", function (e) {

        if (jogo.getStatus() == "start") {
            if (e.key == "ArrowUp") jogo.inicia();
        }
        else {
            if (e.key == "ArrowUp" && dino.status == 0) dino.status = 1;
            else if (e.key == "ArrowDown" && dino.status == 0) dino.status = 3;
            else if (e.key == "p") jogo.pause();
        }
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

        if (this.chao.style.backgroundPositionX == "-4000px") {
            this.chao.style.backgroundPositionX = "0px";
            FPS = FPS + 5;
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
            this.element.style.width = "44px";
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

    class Obstaculo {
        constructor(tipo) {
            this.tipo = tipo;
            this.element = document.createElement("div");
            this.element.style.right = "0px";
            deserto.element.appendChild(this.element);
        }

        mover() {
            this.element.style.right = (parseFloat(this.element.style.right) + 4) + "px";
        }

        deletar() {
            this.element.remove();
        }

        getPositionx() {
            return parseInt(this.element.style.right);
        }

        getTipo() {
            return this.tipo;
        }
    }

    class Cacto extends Obstaculo {
        constructor() {
            super("cacto");

            this.element.className = "cacto";
            this.element.style.top = "110px";
            var aux = Math.random();
            if (aux > 0.9) {
                //4 cactos misturados
                this.element.style.backgroundPositionX = "-407px"
                this.element.style.width = '75px';
                this.element.style.top = "97px";
            }
            else if (aux > 0.8) {
                //3 cactos misturados
                this.element.style.backgroundPositionX = "-431px"
                this.element.style.width = '51px';
                this.element.style.top = "97px";
            }
            else if (aux > 0.7) {
                //2 cactos grandes
                this.element.style.backgroundPositionX = "-332px"
                this.element.style.width = '50px';
                this.element.style.top = "97px";
            }
            else if (aux > 0.6) {
                //Quatro cactos pequenos
                this.element.style.backgroundPositionX = "-228px"
                this.element.style.width = '68px';
            }
            else if (aux > 0.5) {
                //3 cactos pequenos
                this.element.style.backgroundPositionX = "-228px"
                this.element.style.width = '51px';
            }
            else if (aux > 0.35) {
                //1 cacto grande
                this.element.style.backgroundPositionX = "-332px"
                this.element.style.width = '25px';
                this.element.style.top = "97px";
            }
            else if (aux > 0.2) {
                //2 cactos pequenos
                this.element.style.backgroundPositionX = "-228px"
                this.element.style.width = '34px';
            }
            else {
                //1 cacto pequeno
                this.element.style.backgroundPositionX = "-228px"
                this.element.style.width = '17px';
            }
        }
    }

    class Passaro extends Obstaculo {
        constructor() {
            super("passaro");
            this.sprites = {
                'voa1': '-134.8px',
                'voa2': '-180.8px',
            };

            this.element.className = "passaro";
            var aux = Math.random();
            if (aux <= 0.33)
                this.element.style.top = "84px";
            else if (aux >= 0.66)
                this.element.style.top = "100px";
            else
                this.element.style.top = "54px";

        }

        voa() {
            this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.voa1) ? this.sprites.voa2 : this.sprites.voa1;
        }
    }

    class Jogo {
        constructor() {
            this.status = "start";
            this.pontuacao1 = document.createElement("div");
            this.pontuacao1.className = "pontos";
            this.pontuacao2 = document.createElement("div");
            this.pontuacao2.className = "pontos";
            this.pontuacao3 = document.createElement("div");
            this.pontuacao3.className = "pontos";
            this.pontuacao4 = document.createElement("div");
            this.pontuacao4.className = "pontos";
            this.pontuacao5 = document.createElement("div");
            this.pontuacao5.className = "pontos";
            deserto.element.appendChild(this.pontuacao1);
            deserto.element.appendChild(this.pontuacao2);
            deserto.element.appendChild(this.pontuacao3);
            deserto.element.appendChild(this.pontuacao4);
            deserto.element.appendChild(this.pontuacao5);
            this.pontuacao1.style.right = "0px";
            this.pontuacao2.style.right = "10px";
            this.pontuacao3.style.right = "20px";
            this.pontuacao4.style.right = "30px";
            this.pontuacao5.style.right = "40px";
            this.pontos = 0;
            this.frames = 0;

        }

        pontua() {
            this.pontos++;
            if (this.pontos < 10) {
                this.pontuacao1.style.backgroundPositionX = (-484 - parseInt(this.pontos.toString()[0]) * 10).toString() + "px";
            }
            else if (this.pontos < 100) {
                this.pontuacao1.style.backgroundPositionX = (-484 - parseInt(this.pontos.toString()[1]) * 10).toString() + "px";
                this.pontuacao2.style.backgroundPositionX = (-484 - parseInt(this.pontos.toString()[0]) * 10).toString() + "px";
            }
            else if (this.pontos < 1000) {
                this.pontuacao1.style.backgroundPositionX = (-484 - parseInt(this.pontos.toString()[2]) * 10).toString() + "px";
                this.pontuacao2.style.backgroundPositionX = (-484 - parseInt(this.pontos.toString()[1]) * 10).toString() + "px";
                this.pontuacao3.style.backgroundPositionX = (-484 - parseInt(this.pontos.toString()[0]) * 10).toString() + "px";
            }
            else if (this.pontos < 10000) {
                this.pontuacao1.style.backgroundPositionX = (-484 - parseInt(this.pontos.toString()[3]) * 10).toString() + "px";
                this.pontuacao2.style.backgroundPositionX = (-484 - parseInt(this.pontos.toString()[2]) * 10).toString() + "px";
                this.pontuacao3.style.backgroundPositionX = (-484 - parseInt(this.pontos.toString()[1]) * 10).toString() + "px";
                this.pontuacao4.style.backgroundPositionX = (-484 - parseInt(this.pontos.toString()[0]) * 10).toString() + "px";
            }
            else if (this.pontos < 100000) {
                this.pontuacao1.style.backgroundPositionX = (-484 - parseInt(this.pontos.toString()[4]) * 10).toString() + "px";
                this.pontuacao2.style.backgroundPositionX = (-484 - parseInt(this.pontos.toString()[3]) * 10).toString() + "px";
                this.pontuacao3.style.backgroundPositionX = (-484 - parseInt(this.pontos.toString()[2]) * 10).toString() + "px";
                this.pontuacao4.style.backgroundPositionX = (-484 - parseInt(this.pontos.toString()[1]) * 10).toString() + "px";
                this.pontuacao5.style.backgroundPositionX = (-484 - parseInt(this.pontos.toString()[0]) * 10).toString() + "px";
            }
        }

        contaFrames() {
            this.frames++;
            if (this.frames == 30) {
                this.frames = 0;
                this.pontua();
            }
        }

        getStatus() {
            return this.status;
        }

        inicia() {
            this.status = "run";
            gameLoop = setInterval(run, 1000 / FPS);
            dinoCorreLoop = setInterval(dinoCorreAnimation, 1000 / dinoCorreFPS);
            dinoPulaLoop = setInterval(dinoPulaAnimation, 1000 / dinoPulaFPS);
            anoitecer = setInterval(mudaTempo, 60000);
        }

        pause() {
            if (this.status == "pause") {
                this.status = "run";
                gameLoop = setInterval(run, 1000 / FPS);
                dinoCorreLoop = setInterval(dinoCorreAnimation, 1000 / dinoCorreFPS);
                dinoPulaLoop = setInterval(dinoPulaAnimation, 1000 / dinoPulaFPS);
                anoitecer = setInterval(mudaTempo, 60000);
            }
            else if (this.status == "run") {
                this.status = "pause";
                clearInterval(gameLoop);
                clearInterval(dinoCorreLoop);
                clearInterval(dinoPulaLoop);
                clearInterval(anoitecer);
            }
        }
    }

    function run() {
        jogo.contaFrames();
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
        if (obstaculos.length == 0) {
            if (Math.random() > 0.33) {
                obstaculos.push(new Cacto());
            }
            else {
                obstaculos.push(new Passaro());
            }
        }
        else if (obstaculos[obstaculos.length - 1].getPositionx() > 250) {
            var aux = obstaculos[obstaculos.length - 1].getPositionx();
            if (Math.random() < (aux - 250) / 10000) {
                if (Math.random() > 0.33) {
                    obstaculos.push(new Cacto());
                }
                else {
                    obstaculos.push(new Passaro());
                }
                if (obstaculos.length > 10) {
                    p = obstaculos.shift();
                    p.deletar();
                }
            }


        }
        obstaculos.forEach(function (p) {
            p.mover();

        });

        //Em caso de game over
        //clearInterval(gameLoop);
    }

    function dinoCorreAnimation() {
        dino.correr();
        dino.correrAbaixado();
        obstaculos.forEach(function (p) {
            if (p.getTipo() == "passaro") {
                p.voa();
            }
        });
    }

    function dinoPulaAnimation() {

        dino.pular();
    }

    function mudaTempo() {
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