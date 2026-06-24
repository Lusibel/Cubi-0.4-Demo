const enemies = [
{
    x: 1100,
    y: 300,
    
    dialogShown: false,

    dialogos: [
        {
            nombreEnemy: "Soldado",
            retrato: "img/enemy.png",
            texto: "¡Alto!"
        },
        {
            nombreEnemy: "Soldado",
            retrato: "img/enemy.png",
            texto: "No puedes pasar."
        }
    ],
    
    width: 30,
    height: 30,
    color: 'purple',
    speed: 2,
    visionRange: 350,
    patrolPoints: [
        { x: 1100, y: 300 },
        { x: 1100, y: 550 },
        { x: 1300, y: 550 },
        { x: 1300, y: 250 },
        { x: 1500, y: 250 },
        { x: 1500, y: 650 },
        { x: 350, y: 650 },
        { x: 350, y: 1650 },
        { x: 350, y: 650 },
        { x: 1500, y: 650 },
        { x: 1500, y: 250 },
        { x: 1300, y: 250 },
        { x: 1300, y: 550 },
        { x: 1100, y: 550 },
    ],
    currentPatrolIndex: 0,
    chasing: false
   },
   { 
    x: 1500,
    y: 250,
    
    dialogShown: false,

    dialogos: [
        {
            nombreEnemy: "Soldado",
            retrato: "img/enemy.png",
            texto: "¡Alto!"
        },
        {
            nombreEnemy: "Soldado",
            retrato: "img/enemy.png",
            texto: "No puedes pasar."
        }
    ],
    
    width: 30,
    height: 30,
    color: 'purple',
    speed: 2,
    visionRange: 350,
    patrolPoints: [

        { x: 1500, y: 650 },
        { x: 350, y: 650 },
    ],
    currentPatrolIndex: 0,
    chasing: false
   },
      { 
    x: 1300,
    y: 550,
    
    dialogShown: false,

    dialogos: [
        {
            nombreEnemy: "Soldado",
            retrato: "img/enemy.png",
            texto: "¡Alto!"
        },
        {
            nombreEnemy: "Soldado",
            retrato: "img/enemy.png",
            texto: "No puedes pasar."
        }
    ],
    
    width: 30,
    height: 30,
    color: 'purple',
    speed: 2,
    visionRange: 350,
    patrolPoints: [

        { x: 1300, y: 550 },
        { x: 1100, y: 550 },
    ],
    currentPatrolIndex: 0,
    chasing: false
   }
];

function drawEnemy(enemy) {
    drawEntity(enemy);
}

function updateEnemy(enemy) {
    const target = enemy.patrolPoints[enemy.currentPatrolIndex];
    const prevX = enemy.x;
    const prevY = enemy.y;

    const distX = player.x - enemy.x;
    const distY = player.y - enemy.y;
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < enemy.visionRange && canSeePlayer(enemy)) {
        enemy.chasing = true;
    } else {
        enemy.chasing = false;
    }

if (!checkCollision(enemy, player)) {

    if (enemy.chasing) {
        moveTowardsPlayer(enemy);
    } else {
        patrol(enemy);
    }

}

    // Colisión con cajas
    boxes.forEach(box => {
        if (checkCollision(enemy, box)) {
            enemy.x = prevX;
            enemy.y = prevY;
        }
    });

    // Colisión con el jugador
if (checkCollision(enemy, player) && !damageCooldown) {

    enemy.x = prevX;
    enemy.y = prevY;

    player.lives--;
    drawLives();

    damageCooldown = true;

    setTimeout(() => {
        damageCooldown = false;
    }, 1000);

    if (player.lives <= 0) {
        resetGame();
    }
}
}

function moveTowardsPlayer(enemy) {
    const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
    enemy.x += Math.cos(angle) * enemy.speed;
    enemy.y += Math.sin(angle) * enemy.speed;
}

function patrol(enemy) {
    const target = enemy.patrolPoints[enemy.currentPatrolIndex];
    const angle = Math.atan2(target.y - enemy.y, target.x - enemy.x);

    enemy.x += Math.cos(angle) * enemy.speed;
    enemy.y += Math.sin(angle) * enemy.speed;

    if (
        Math.abs(enemy.x - target.x) < 5 &&
        Math.abs(enemy.y - target.y) < 5
    ) {
        enemy.currentPatrolIndex =
            (enemy.currentPatrolIndex + 1) % enemy.patrolPoints.length;
    }
}

function canSeePlayer(enemy) {
    for (let i = 0; i < platforms.length; i++) {
        if (lineIntersects(player, enemy, platforms[i])) {
            return false;
        }
    }
    return true;
}

function lineIntersects(player, enemy, platform) {
    const left = platform.x;
    const right = platform.x + platform.width;
    const top = platform.y;
    const bottom = platform.y + platform.height;

    const x1 = enemy.x + enemy.width / 2;
    const y1 = enemy.y + enemy.height / 2;
    const x2 = player.x + player.width / 2;
    const y2 = player.y + player.height / 2;

    if ((x1 < left && x2 < left) || (x1 > right && x2 > right) || (y1 < top && y2 < top) || (y1 > bottom && y2 > bottom)) {
        return false;
    }

    const m = (y2 - y1) / (x2 - x1);
    const yIntercept = y1 - m * x1;

    const intersectionY1 = m * left + yIntercept;
    const intersectionY2 = m * right + yIntercept;
    const intersectionX1 = (top - yIntercept) / m;
    const intersectionX2 = (bottom - yIntercept) / m;

    return (intersectionY1 > top && intersectionY1 < bottom) || (intersectionY2 > top && intersectionY2 < bottom) ||
           (intersectionX1 > left && intersectionX1 < right) || (intersectionX2 > left && intersectionX2 < right);
}
