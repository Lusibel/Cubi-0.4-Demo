let npcActual = null;
document.getElementById("nextDialog").addEventListener("click", siguienteDialogo);
const FRECUENCIA_BEEP = 30;


let dialogoActual = 0;
let textoActual = "";
let indiceTexto = 0;
let escribiendo = false;
let timersBeep = [];

function mostrarDialogo(npc) {

    npcActual = npc;
    dialogosActuales = npc.dialogos;
    
    gameState = "CUTSCENE";


    joystickState.x = 0;
    joystickState.y = 0;

    document.getElementById("dialogBox").style.display = "block";
    document.getElementById("dialogName").textContent =
        dialogosActuales[dialogoActual].nombre;
        document.getElementById("dialogNameEnemy").textContent =
        dialogosActuales[dialogoActual].nombreEnemy;
    document.getElementById("dialogPortrait").src =
        dialogosActuales[dialogoActual].retrato;

    textoActual = dialogosActuales[dialogoActual].texto;
    indiceTexto = 0;
    escribiendo = true;

    document.getElementById("dialogText").textContent = "";

reproducirVozDialogo();

setTimeout(() => {
    escribirTexto();
}, 40);
}

function escribirTexto() {
    if (!escribiendo) return;

    if (indiceTexto < textoActual.length) {
    
        const letra = textoActual.charAt(indiceTexto);

        document.getElementById("dialogText").textContent += letra;

        indiceTexto++;
        setTimeout(escribirTexto, 90);
        } else {
        escribiendo = false;
        
        detenerSonidosDialogo();
    }
}

function detenerSonidosDialogo() {

    vozActiva = false;

    beep.pause();
    beep.currentTime = 0;

    beep.onended = null;
}

function siguienteDialogo() {
    
    detenerSonidosDialogo();
    
    if (escribiendo) {
    document.getElementById("dialogText").textContent = textoActual;
    
    escribiendo = false;
    return;
}

dialogoActual++;

if (dialogoActual >= dialogosActuales.length) {
    document.getElementById("dialogBox").style.display = "none";
    dialogoActual = 0;
    gameState = "GAME";
    if (npcActual.esJefe) {
    animateBossBar(npcActual);
}
    cameraTarget = player;
    return;
}

mostrarDialogo(npcActual);
}

let vozActiva = false;

function reproducirVozDialogo() {

    vozActiva = true;

    reproducirBeep();
}

function reproducirBeep() {

    if (!vozActiva || !escribiendo) return;

    beep.currentTime = 0;

    beep.play().catch(() => {});

    beep.onended = () => {

        if (vozActiva && escribiendo) {
            reproducirBeep();
        }

    };
}

const beep = document.getElementById("dialogBeep");
