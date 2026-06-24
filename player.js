let damageCooldown = false;

const player = {
    x: 100,
    y: 100,
    width: 40,
    height: 40,
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




