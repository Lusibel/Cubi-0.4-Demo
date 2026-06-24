
const bosses =[

{
    esJefe: true,
    nombre: "El Gran Jefe",
    
    x: 1100,
    y: 1800,
    
    music: "boss1.mp3",
victoryMusic: "victory.mp3",
hitSound: "bossHit.mp3",

    width: 100,
    height: 100,

    color: "black",

    hp: 2000,
    hpMax: 2000,

    attackCooldown: 0,
    attackRange: 500,

    fightStarted: false,
    phase: 1,
    hitCounter: 0,
    shotCounter: 0,
    resting: false,
    pushReady: false,
    glow: false,
    barReady: false,
    invulnerable: false,

    dialogShown: false,

    dialogos: [
        {
            nombre: "Guardián",
            retrato: "img/boss.png",
            texto: "..."
        },
        {
            nombre: "Guardián",
            retrato: "img/boss.png",
            texto: "Has llegado demasiado lejos..."
        },
        {
            nombre: "Guardián",
            retrato: "img/boss.png",
            texto: "¡Prepárate para luchar!"
        }
    ]
},
{
    esJefe: true,
    nombre: "El Gran Jefe",
    
    x: 1500,
    y: 1800,
    
    music: "boss1.mp3",
victoryMusic: "victory.mp3",
hitSound: "bossHit.mp3",

    width: 100,
    height: 100,

    color: "black",

    hp: 2000,
    hpMax: 2000,

    attackCooldown: 0,
    attackRange: 500,

    fightStarted: false,
    phase: 1,
    hitCounter: 0,
    shotCounter: 0,
    resting: false,
    pushReady: false,
    glow: false,
    barReady: false,
    invulnerable: false,

    dialogShown: false,

    dialogos: [
        {
            nombre: "Guardián",
            retrato: "img/boss.png",
            texto: "..."
        },
        {
            nombre: "Guardián",
            retrato: "img/boss.png",
            texto: "Has llegado demasiado lejos..."
        },
        {
            nombre: "Guardián",
            retrato: "img/boss.png",
            texto: "¡Prepárate para luchar!"
        }
    ]
}
];


function drawBoss() {

    bosses.forEach(boss => {

        context.fillStyle = boss.glow ? "yellow" : boss.color;

        context.fillRect(
            boss.x - camera.x,
            boss.y - camera.y,
            boss.width,
            boss.height
        );

    });

}

function updateBoss() {

    bosses.forEach(boss => {
    if (boss.fightStarted) {
    updateBossBar(boss);
}
const distX = player.x - boss.x;  
const distY = player.y - boss.y;  
const distance = Math.sqrt(distX * distX + distY * distY);  

let playerInSight = true;  

platforms.forEach(platform => {  
    const intersectX = player.x > platform.x && player.x < platform.x + platform.width;  
    const intersectY = player.y > platform.y && player.y < platform.y + platform.height;  
    if (intersectX && intersectY) {  
        playerInSight = false;  
    }  
});

if (distance <= boss.attackRange && playerInSight) {

if (!boss.fightStarted) {  
return;

}

// Reducir los cooldowns  
if (boss.attackCooldown > 0) boss.attackCooldown -= 16;  
  
if (boss.resting) {  

if (boss.attackCooldown <= 0) {  

    boss.resting = false;  
    boss.shotCounter = 0;  

}  

return;

}

// FASE 1  
if (boss.phase === 1) {  

    if (boss.attackCooldown <= 0) {  
        shootAtPlayer(boss, 7, "purple");
          
        boss.shotCounter++;

if (boss.shotCounter >= 3) {

boss.resting = true;  
boss.attackCooldown = 5000;

}
else {

boss.attackCooldown = 1000;  

  }  
 }  
}  

// FASE 2  
else if (boss.phase === 2) {  

    if (boss.attackCooldown <= 0) {  
        shootSpread(boss, 3, 0.4, 6, "orange");
        boss.shotCounter++;

if (boss.shotCounter >= 5) {

boss.resting = true;  
boss.attackCooldown = 5000;

}
else {

boss.attackCooldown = 1500;

}
}

}  

// FASE 3  
else {  

    if (boss.attackCooldown <= 0) {  
        shootSpread(boss, 5, 0.25, 4, "red");
                    boss.shotCounter++;

if (boss.shotCounter >= 2) {

boss.resting = true;  
boss.attackCooldown = 5000;

}
else {

boss.attackCooldown = 1500;

}
}

}

        }
 });
}

