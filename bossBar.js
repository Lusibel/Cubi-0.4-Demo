const bossHpBar = document.getElementById("bossHpBar");
const bossHpBarInner = document.getElementById("bossHpBarInner");
const bossName = document.getElementById("bossName");

let currentBoss = null;
let bossMusic = null;
let victoryMusic = null;
let bossHitSound = null;

// Mostrar la barra del jefe
function showBossBar(boss) {

    currentBoss = boss;

    bossName.textContent = boss.nombre;
    bossHpBar.style.display = "block";

    updateBossBar(boss);
}

// Actualizar la vida
function updateBossBar(boss) {

    const porcentaje = (boss.hp / boss.hpMax) * 100;

    bossHpBarInner.style.width = porcentaje + "%";
}

// Ocultar la barra
function hideBossBar() {

    bossHpBar.style.display = "none";

    currentBoss = null;
}

// Animación de entrada
function animateBossBar(boss) {
if (bossMusic) {

    bossMusic.pause();
    bossMusic.currentTime = 0;

}
    bossMusic = new Audio(boss.music);
    bossMusic.loop = true;
bossMusic.volume = 0.5;
bossMusic.play();
victoryMusic = new Audio(boss.victoryMusic);
bossHitSound = new Audio(boss.hitSound);

boss.invulnerable = true;
    currentBoss = boss;

    bossName.textContent = boss.nombre;
    bossHpBar.style.display = "block";

    bossHpBarInner.style.transition = "none";
    bossHpBarInner.style.width = "0%";

    setTimeout(() => {

        bossHpBarInner.style.transition = "width 2s linear";
        bossHpBarInner.style.width = "100%";
        setTimeout(() => {
boss.invulnerable = false;
            bossHpBarInner.style.transition = "width .3s";

            updateBossBar(boss);

        }, 2000);

    }, 50);
}

// Mensaje de victoria
function showVictoryText() {

    if (bossMusic) {

        bossMusic.pause();
        bossMusic.currentTime = 0;

    }

    if (victoryMusic) {

        victoryMusic.play();

    }

    const texto = document.getElementById("victoryText");

    setTimeout(() => {

        texto.style.display = "block";

    },300);

    setTimeout(() => {

        texto.style.display = "none";

    },6300);

}

function canDamageBoss(boss) {
    return !boss.invulnerable && boss.hp > 0;
}

function playBossHit() {

    if (!bossHitSound) return;

    bossHitSound.currentTime = 0;
    bossHitSound.play();

}
function flashScreen() {

    const flash = document.getElementById("flashScreen");

    flash.style.transition = "none";
    flash.style.opacity = "1";

    setTimeout(() => {

        flash.style.transition = "opacity .8s";
        flash.style.opacity = "0";

    }, 30);

}