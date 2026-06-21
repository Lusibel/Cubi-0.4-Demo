const player = {
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    color: 'red',
    speed: 5,
    lives: 3
};

function drawPlayer() {
    context.fillStyle = player.color;
    context.fillRect(player.x - camera.x, player.y - camera.y, player.width, player.height);
}

function drawLives() {
    const livesContainer = document.getElementById('playerLives');
    livesContainer.innerHTML = '';
    for (let i = 0; i < player.lives; i++) {
        const life = document.createElement('div');
        life.classList.add('life');
        livesContainer.appendChild(life);
    }
}

function attackWithSword() {
    if (hasSword && isNear(player, boss, 100)) {
        boss.hp -= 100;
        if (boss.hp <= 0) {
            boss.hp = 0;
            boss.x = -9999;
            boss.y = -9999;
            boss.attackCooldown = Infinity;
            boss.specialAttackCooldown = Infinity;
            document.getElementById('bossHpBar').style.display = 'none';
        }
    }
}