let x;
let y;

let velocidadX = 1;
let velocidadY = 1;

const player1 = document.getElementById("p1");
const player2 = document.getElementById("p2");
const btnReset = document.getElementById("reset");


window.onload = () => {
    // Pintar ralla al cargar el jueugo
    pintarRalla();

    // Seteamos las puntauaciones iniciales
    localStorage.setItem("player1", 0)
    localStorage.setItem("player2", 0)

    // Activamos el movimiento de los jugadores
    document.addEventListener("keydown", (event => {
        if (event.key === "w" || event.key === "s") movePlayer(event, player1)
        if (event.key === "ArrowUp" || event.key === "ArrowDown") movePlayer(event, player2)
    }));

    // activar boton para reiniciar el juego
    document.addEventListener("click", () => {
        window.location.reload();

    });

    // Comenzar juego
    moveBola(player1, player2);

    requestAnimationFrame(moveBola);
}

function moveBola() {

    const bola = document.querySelector("#bola");

    // Obtener la posición actual de la bola
    const x = parseInt(bola.getAttribute("cx"));
    const y = parseInt(bola.getAttribute("cy"));

    // Actualizar la posición de la bola
    const nuevoX = x + velocidadX;
    const nuevoY = y + velocidadY;

    // Colisiones pared
    if (nuevoX >= 700 || nuevoX <= 0) {
        velocidadX = -velocidadX;
    }
    if (nuevoY >= 500 || nuevoY <= 0) {
        velocidadY = -velocidadY;
    }

    const game = checkCollision(x, y);
    if (game === true) {
        resetBall();
        return
    }


    // Seteamos la nueva posición de la bola
    bola.setAttribute("cx", nuevoX);
    bola.setAttribute("cy", nuevoY);

    requestAnimationFrame(moveBola);
}

function movePlayer(event, player) {
    const key = event.key;
    const player1Speed = 5;

    if ((key === "w" || key === 'ArrowUp') && parseInt(player.getAttribute("y")) > 10) {
        player.setAttribute("y", parseInt(player.getAttribute("y")) - player1Speed);
    } else if ((key === "s" || key === 'ArrowDown') && parseInt(player.getAttribute("y")) < 420) {
        player.setAttribute("y", parseInt(player.getAttribute("y")) + player1Speed);
    }
}

function checkCollision(x, y) {
    const radio = parseInt(document.getElementById("bola").getAttribute("r"));
    let finishRound;

    // Colisión con jugador 1
    if (x - radio <= 30 && y >= parseInt(player1.getAttribute("y")) && y <= parseInt(player1.getAttribute("y")) + 100) {
        velocidadX = -velocidadX;
    }

    // Colisión con jugador 2
    if (x + radio >= 670 && y >= parseInt(player2.getAttribute("y")) && y <= parseInt(player2.getAttribute("y")) + 100) {
        velocidadX = -velocidadX;
    }

    puntuar(x, radio);

    // Colisión con la pared
    if (x + radio >= 700 || x - radio <= 0) {
        finishRound = true;
    } else {
        finishRound = false;
    }
    return finishRound;
}

function puntuar(x, radio) {

    if (x - radio == 0) {
        const puntosJug2 = document.querySelector('#puntos2')
        const puntos = parseInt(localStorage.getItem("player2")) + 1

        // Guardar puntuación
        localStorage.setItem("player2", puntos)
        puntosJug2.textContent = puntos
    }
    if (x + radio == 700) {
        const puntosJug1 = document.querySelector('#puntos1')
        const puntos = parseInt(localStorage.getItem("player1")) + 1

        // Guardar puntuación
        localStorage.setItem("player1", puntos)
        puntosJug1.textContent = puntos
    }
}

function resetBall() {
    // Poner la bola al centro otra vez
    const bola = document.getElementById("bola");
    bola.setAttribute("cx", 350);
    bola.setAttribute("cy", 250);
}





function pintarRalla() {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", "350");
    rect.setAttribute("y", "0");
    rect.setAttribute("width", "1");
    rect.setAttribute("height", "500");
    rect.style = "fill:#fff;stroke-width:3;stroke:#fff"

    const svg = document.querySelector("svg");
    svg.appendChild(rect);
}
