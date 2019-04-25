var ct = 0;
do {
    console.log("Escolha sua jogada")
    console.log("1 - Papel")
    console.log("2 - Pedra")
    console.log("3 - Tesoura")
    var x = parseInt(prompt())
    var y = Math.floor(Math.random() * 3) + 1;
    
    console.log(y);
    if (y == 1) {
        console.log("O Computador jogou papel")
        if (x == 1)
            console.log("A rodada empatou!")
        else if (x == 2) {
            console.log("Você perdeu! A sua ponduação foi de " + ct)
            break;
        }
        else if (x == 3) {
            console.log("Você ganhou!")
            ct++;
        }
    } 
    else if (y == 2)
    {
        console.log("O Computador jogou pedra")
        if (x == 2)
            console.log("A rodada empatou!")
        else if (x == 3) {
            console.log("Você perdeu! A sua ponduação foi de " + ct)
            break;
        }
        else if (x == 1) {
            console.log("Você ganhou!")
            ct++;
        }
    }
    else if (y == 3)
    {
        console.log("O Computador jogou tesoura")
        if (x == 3)
            console.log("A rodada empatou!")
        else if (x == 1) {
            console.log("Você perdeu! A sua ponduação foi de " + ct)
            break;
        }
        else if (x == 2) {
            console.log("Você ganhou!")
            ct++;
        }
    }
} while(x <= 3)