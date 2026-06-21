const boss = {
    x: 1100,
    y: 1800,
    width: 100,
    height: 100,
    color: 'black',
    hp: 500,
    attackCooldown: 0,
    specialAttackCooldown: 0,
    attackRange: 250
};

function drawBoss() {
    context.fillStyle = boss.color;
    context.fillRect(boss.x - camera.x, boss.y - camera.y, boss.width, boss.height);
}

function updateBoss() {
    const bossHpBar = document.getElementById('bossHpBar');
    const bossHpBarInner = document.getElementById('bossHpBarInner');

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
        bossHpBar.style.display = 'block';
        bossHpBarInner.style.width = (boss.hp / 500) * 100 + '%';

        if (boss.attackCooldown <= 0) {
            performBossAttack();
            boss.attackCooldown = 2000;
        } else {
            boss.attackCooldown -= 16;
        }

        if (boss.hp <= 2500 && boss.specialAttackCooldown <= 0) {
            performSpecialAttack();
            boss.specialAttackCooldown = 5000;
        } else if (boss.hp <= 2500) {
            boss.specialAttackCooldown -= 16;
        }

    } else {
        bossHpBar.style.display = 'none';
    }
}

function performBossAttack() {
    const angle = Math.atan2(player.y - boss.y, player.x - boss.x);
    projectiles.push({
        x: boss.x + boss.width / 2,
        y: boss.y + boss.height / 2,
        width: 10,
        height: 10,
        color: 'purple',
        speedX: Math.cos(angle) * 7,
        speedY: Math.sin(angle) * 7
    });

    for (let i = -1; i <= 1; i++) {
        const spreadAngle = angle + i * 0.5;
        projectiles.push({
            x: boss.x + boss.width / 2,
            y: boss.y + boss.height / 2,
            width: 10,
            height: 10,
            color: 'orange',
            speedX: Math.cos(spreadAngle) * 5,
            speedY: Math.sin(spreadAngle) * 5
        });
    }
}

function performSpecialAttack() {
    const AoE = {
        x: player.x - 50,
        y: player.y - 50,
        width: 100,
        height: 100,
        color: 'blue',
        duration: 1000
    };
    projectiles.push(AoE);

    setTimeout(() => {
        const index = projectiles.indexOf(AoE);
        if (index > -1) {
            projectiles.splice(index, 1);
        }
    }, AoE.duration);
}