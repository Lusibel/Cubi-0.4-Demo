const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

function setupCanvas() {
    canvas.width = window.innerWidth - 120;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', setupCanvas);
setupCanvas();

const map = { width: 2500, height: 2500 };

const camera = { x: 0, y: 0 };
cameraTarget = player;


let grabbing = false;
let hasKey = false;
let hasMasterKey = false;
let hasSword = false;
let startTime;
let endTime;
let gameState = "GAME";
let audioDesbloqueado = false;

let flashAlpha = 0;
let cameraShake = 0;

function startTimer() {
    startTime = new Date().getTime();
}

function stopTimer() {
    endTime = new Date().getTime();
    const timeTaken = (endTime - startTime) / 1000;
    localStorage.setItem('endTime', timeTaken);
    window.location.href = 'leaderboard.html';
}
startTimer();
const platforms = [
    { x: 0, y: 250, width: 270, height: 20, color: 'green' },
        { x: 250, y: 0, width: 20, height: 190, color: 'green' },

];

   const objects = [
    { x: 110, y: 180, width: 30, height: 30, color: 'yellow', type: 'key' },
    { x: 700, y: 900, width: 30, height: 30, color: 'yellow', type: 'key' },
    { x: 250, y: 200, width: 20, height: 50, color: 'brown', type: 'door' },
    { x: 1100, y: 1600, width: 120, height: 20, color: 'brown', type: 'door' },
    { x: 1600, y: 820, width: 20, height: 80, color: 'purple', type: 'masterDoor' },
    { x: 1100, y: 1800, width: 30, height: 30, color: 'orange', type: 'masterKey' },
    { x: 20, y: 1300, width: 30, height: 30, color: '#7AE1FF', type: 'sword' }
];

const boxes = [
    { x: 20, y: 1300, width: 50, height: 50, color: 'blue', grabRange: 20 }
];

const projectiles = [];

function drawEntity(entity) {
    context.fillStyle = entity.color;
    context.fillRect(entity.x - camera.x, entity.y - camera.y, entity.width, entity.height);
}

function drawPlatforms() {
    platforms.forEach(platform => {
        context.fillStyle = platform.color;
        context.fillRect(platform.x - camera.x, platform.y - camera.y, platform.width, platform.height);
    });
}
function drawProjectiles() {
    projectiles.forEach(projectile => {
        context.fillStyle = projectile.color;
        context.fillRect(projectile.x - camera.x, projectile.y - camera.y, projectile.width, projectile.height);
    });
}

function drawObjects() {
    objects.forEach(object => {
        if (object.type !== 'door' || (object.type === 'door' && !object.opened)) {
            drawEntity(object);
        }
    });
}

function drawBoxes() {
    boxes.forEach(box => {
        drawEntity(box);
    });
}

function update() {

    if (gameState === "CUTSCENE") {
    updateCamera();
    return;
}
    const prevX = player.x;
    player.x += joystickState.x * player.speed;

    platforms.forEach(platform => {
        if (checkCollision(player, platform)) {
            player.x = prevX;
        }
    });

    boxes.forEach(box => {
        if (checkCollision(player, box)) {
            player.x = prevX;
        }
    });
    
bosses.forEach(boss => {

    if (checkCollision(player, boss)) {
        player.x = prevX;
    }

});

    objects.forEach(object => {
        if ((object.type === "door" || object.type === "masterDoor") &&
            checkCollision(player, object)) {

            if ((object.type === "door" && !hasKey) ||
                (object.type === "masterDoor" && !hasMasterKey)) {

                player.x = prevX;
            }
        }
    });

    const prevY = player.y;
player.y += joystickState.y * player.speed;

    platforms.forEach(platform => {
        if (checkCollision(player, platform)) {
            player.y = prevY;
        }
    });

    boxes.forEach(box => {
        if (checkCollision(player, box)) {
            player.y = prevY;
        }
    });

    objects.forEach(object => {
        if ((object.type === "door" || object.type === "masterDoor") &&
            checkCollision(player, object)) {

            if ((object.type === "door" && !hasKey) ||
                (object.type === "masterDoor" && !hasMasterKey)) {

                player.y = prevY;
            }
        }
     });
     
     bosses.forEach(boss => {

    if (checkCollision(player, boss)) {
        player.y = prevY;
    }

});

    if (grabbing) {
        boxes.forEach(box => {
            const prevBoxX = box.x;
            const prevBoxY = box.y;

            if (isNear(player, box)) {
box.x += joystickState.x * player.speed;
box.y += joystickState.y * player.speed;

                platforms.forEach(platform => {
                    if (checkCollision(box, platform)) {
                        box.x = prevBoxX;
                        box.y = prevBoxY;
                    }
                });

                boxes.forEach(otherBox => {
                    if (box !== otherBox && checkCollision(box, otherBox)) {
                        box.x = prevBoxX;
                        box.y = prevBoxY;
                    }
                });

                if (checkCollision(box, player)) {
                    box.x = prevBoxX;
                    box.y = prevBoxY;
                }
            }
        });
    }
  
  enemies.forEach(enemy => {

    if (
        gameState === "GAME" &&
        !enemy.dialogShown &&
        isNear(player, enemy, 300)
    ) {

        enemy.dialogShown = true;
        cameraTarget = enemy;
        mostrarDialogo(enemy);

    }

});  

  bosses.forEach(boss => {
if (
    gameState === "GAME" &&
    !boss.dialogShown &&
    isNear(player, boss, 200)
) {
    boss.dialogShown = true;
        cameraTarget = boss;
    mostrarDialogo(boss);
}
});


enemies.forEach(enemy => {
    updateEnemy(enemy);
});

    checkObjectCollisions();
    updateCamera();
    updateBoss();
    updateProjectiles();

const masterDoor = objects.find(o => o.type === 'masterDoor');
const nearMasterDoor = masterDoor && isNear(player, masterDoor);

const warningMessage = document.getElementById('warningMessage');
warningMessage.style.display = nearMasterDoor ? 'block' : 'none';

    const box = boxes.find(b => isNear(player, b));
    const warningMessage2 = document.getElementById('warningMessage2');
    warningMessage2.style.display = box ? 'block' : 'none';
}
function checkCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

function checkObjectCollisions() {
    objects.forEach(object => {
        if (checkCollision(player, object)) {
            if (object.type === 'key') {
                hasKey = true;
                document.getElementById('inventoryKey').style.opacity = 1;
                objects.splice(objects.indexOf(object), 1);
            } else if (object.type === 'masterKey') {
                hasMasterKey = true;
                document.getElementById('inventoryMasterKey').style.opacity = 1;
                objects.splice(objects.indexOf(object), 1);
            } else if (object.type === 'door' && hasKey) {
                object.opened = true;
                hasKey = false;
                document.getElementById('inventoryKey').style.opacity = 0;
                objects.splice(objects.indexOf(object), 1);
            } else if (object.type === 'masterDoor' && hasMasterKey) {
                stopTimer();
            } else if (object.type === 'sword') {
                hasSword = true;
                document.getElementById('attackButton').style.display = 'block';
                objects.splice(objects.indexOf(object), 1);
            }
        }
    });
}



function updateProjectiles() {
    projectiles.forEach((projectile, index) => {
        projectile.x += projectile.speedX || 0;
        projectile.y += projectile.speedY || 0;

        if (projectile.x < player.x + player.width &&
            projectile.x + projectile.width > player.x &&
            projectile.y < player.y + player.height &&
            projectile.y + projectile.height > player.y) {
            projectiles.splice(index, 1);
            player.lives -= 1;
            drawLives();

            if (player.lives <= 0) {
                resetGame();
            }
        }

        if (projectile.x < 0 || projectile.x > map.width || projectile.y < 0 || projectile.y > map.height) {
            projectiles.splice(index, 1);
        }
    });
}

function attackWithSword() {

    bosses.forEach(boss => {

        if (!hasSword) return;

        if (!isNear(player, boss, 100)) return;

        if (boss.pushReady) {

            pushWave(boss, 300, 220);
            return;

        }

        if (!canDamageBoss(boss)) return;

        boss.hp -= 1000;

        playBossHit();

        updateBossBar(boss);

        boss.fightStarted = true;

        boss.hitCounter++;

        if (boss.hitCounter >= 5) {

            boss.pushReady = true;
            boss.glow = true;

        }

        if (boss.hp <= 0) {

            boss.hp = 0;
            boss.invulnerable = true;

            shakeCamera(60);
            flashScreen();

            setTimeout(() => {

                boss.x = -9999;
                boss.y = -9999;
                boss.attackCooldown = Infinity;

                hideBossBar();
                showVictoryText();

            }, 250);

        }

    });

}

function resetGame() {
    window.location.reload();
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function updateCamera() {

    const targetX = cameraTarget.x - canvas.width / 2 + cameraTarget.width / 2;
    const targetY = cameraTarget.y - canvas.height / 2 + cameraTarget.height / 2;

    camera.x += (targetX - camera.x) * 0.08;
    camera.y += (targetY - camera.y) * 0.08;

    camera.x = Math.max(0, Math.min(map.width - canvas.width, camera.x));
    camera.y = Math.max(0, Math.min(map.height - canvas.height, camera.y));
    
    if (cameraShake > 0) {

    camera.x += (Math.random() - 0.5) * cameraShake;
    camera.y += (Math.random() - 0.5) * cameraShake;

    cameraShake *= 0.95;

    if (cameraShake < 0.5) {

        cameraShake = 0;

    }

}
}
function flashScreen() {

    flashAlpha = 1;

}
function shakeCamera(intensidad = 12) {

    cameraShake = intensidad;

}

function isNear(entity1, entity2, range = 150) {
    const dx = entity1.x + entity1.width / 2 - (entity2.x + entity2.width / 2);
    const dy = entity1.y + entity1.height / 2 - (entity2.y + entity2.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < range;
}

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPlatforms();
    drawObjects();
    drawBoxes();
    drawPlayer();
    
    enemies.forEach(enemy => {
    drawEnemy(enemy);
});

    drawBoss();

    drawProjectiles();
    update();
    if (flashAlpha > 0) {

    context.fillStyle = "rgba(255,255,255," + flashAlpha + ")";
    context.fillRect(0, 0, canvas.width, canvas.height);

    flashAlpha -= 0.03;

    if (flashAlpha < 0) {
        flashAlpha = 0;
    }

}
    requestAnimationFrame(gameLoop);
}
gameLoop();


document.getElementById('grabButton').addEventListener('touchstart', () => grabbing = true);
document.getElementById('grabButton').addEventListener('touchend', () => grabbing = false);
document.getElementById('attackButton').addEventListener('touchstart', () => {
    attackWithSword();
});
