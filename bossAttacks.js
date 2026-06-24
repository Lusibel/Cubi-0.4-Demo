// bossAttacks.js

function shootAtPlayer(boss, speed, color) {

    const angle = Math.atan2(
        player.y - boss.y,
        player.x - boss.x
    );

    projectiles.push({

        x: boss.x + boss.width / 2,
        y: boss.y + boss.height / 2,

        width: 10,
        height: 10,

        color: color,

        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed

    });

}

function shootSpread(boss, amount, spread, speed, color) {

    const angle = Math.atan2(
        player.y - boss.y,
        player.x - boss.x
    );

    const mitad = Math.floor(amount / 2);

    for (let i = -mitad; i <= mitad; i++) {

        const a = angle + i * spread;

        projectiles.push({

            x: boss.x + boss.width / 2,
            y: boss.y + boss.height / 2,

            width: 10,
            height: 10,

            color: color,

            speedX: Math.cos(a) * speed,
            speedY: Math.sin(a) * speed

        });

    }

}

function pushWave(boss, range, force) {

    const dx = player.x - boss.x;
    const dy = player.y - boss.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < range) {

        player.x += dx / distance * force;
        player.y += dy / distance * force;

    }
    boss.hitCounter = 0;
boss.pushReady = false;
boss.glow = false;

if (boss.phase === 1) {
    boss.phase = 2;
}
else if (boss.phase === 2) {
    boss.phase = 3;
}
boss.attackCooldown = 0;
}
