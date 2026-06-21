let sonidosActivos = [];
document.getElementById("nextDialog").addEventListener("click", siguienteDialogo);
const FRECUENCIA_BEEP = 29;

const dialogos = [
    {
        nombre: "Guardián",
        retrato: "img/boss.png",
        texto: "Has llegado demasiado lejos..."
    },
    {
        nombre: "Guardián",
        retrato: "img/boss.png",
        texto: "Nadie ha logrado derrotarme."
    },
    {
        nombre: "Guardián",
        retrato: "img/boss.png",
        texto: "¡Prepárate para luchar!"
    }
];

let dialogoActual = 0;
let textoActual = "";
let indiceTexto = 0;
let escribiendo = false;

function mostrarDialogo() {

    gameState = "CUTSCENE";
    cameraTarget = boss;
    
    joystickState.x = 0;
    joystickState.y = 0;

    document.getElementById("dialogBox").style.display = "block";
    document.getElementById("dialogName").textContent =
        dialogos[dialogoActual].nombre;
    document.getElementById("dialogPortrait").src =
        dialogos[dialogoActual].retrato;

    textoActual = dialogos[dialogoActual].texto;
    indiceTexto = 0;
    escribiendo = true;

    document.getElementById("dialogText").textContent = "";

setTimeout(() => {
    escribirTexto();
}, 40);
}

function escribirTexto() {
    if (!escribiendo) return;

    if (indiceTexto < textoActual.length) {
        
        const letra = textoActual.charAt(indiceTexto);

        if (letra !== " " && indiceTexto % FRECUENCIA_BEEP === 20) {
            const sonido = beep.cloneNode();

sonido.onplaying = () => {
    document.getElementById("dialogText").textContent += letra;
};

sonido.play().catch(() => {});
        } else {
            document.getElementById("dialogText").textContent += letra;
        }

        indiceTexto++;
        setTimeout(escribirTexto, 30);

    } else {
        escribiendo = false;
    }
}

function detenerSonidosDialogo() {
    sonidosActivos.forEach(sonido => {
        sonido.pause();
        sonido.currentTime = 0;
    });

    sonidosActivos = [];
}

function siguienteDialogo() {
    detenerSonidosDialogo();
    if (escribiendo) {
    document.getElementById("dialogText").textContent = textoActual;
    
    escribiendo = false;
    return;
}

    dialogoActual++;
    if (dialogoActual >= dialogos.length) {

        document.getElementById("dialogBox").style.display = "none";

        dialogoActual = 0;
        gameState = "GAME";
        cameraTarget = player;
        return;
    }

    mostrarDialogo();
}

const beep = document.getElementById("dialogBeep");