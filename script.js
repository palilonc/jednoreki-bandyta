const ball = document.getElementById('ball');
const leftFlipper = document.getElementById('left-flipper');
const rightFlipper = document.getElementById('right-flipper');
const scoreDisplay = document.getElementById('score');

let ballSpeedX = 2;
let ballSpeedY = -2;
let score = 0;

ball.style.left = '190px';
ball.style.top = '580px';

function updateBallPosition() {
    let ballRect = ball.getBoundingClientRect();
    let gameRect = document.getElementById('game').getBoundingClientRect();

    // Collision with walls
    if (ballRect.left <= gameRect.left || ballRect.right >= gameRect.right) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballRect.top <= gameRect.top) {
        ballSpeedY = -ballSpeedY;
    }

    // Collision with flippers
    if (ballRect.bottom >= gameRect.bottom) {
        if (ballRect.left < leftFlipper.getBoundingClientRect().right && 
            ballRect.right > leftFlipper.getBoundingClientRect().left) {
            ballSpeedY = -ballSpeedY;
            score++;
        }
        if (ballRect.left < rightFlipper.getBoundingClientRect().right && 
            ballRect.right > rightFlipper.getBoundingClientRect().left) {
            ballSpeedY = -ballSpeedY;
            score++;
        }
        resetBall();
    }

    ball.style.left = ball.offsetLeft + ballSpeedX + 'px';
    ball.style.top = ball.offsetTop + ballSpeedY + 'px';
}

function resetBall() {
    ball.style.left = '190px';
    ball.style.top = '580px';
    ballSpeedX = 2;
    ballSpeedY = -2;
}

function updateScore() {
    scoreDisplay.textContent = 'Score: ' + score;
}

setInterval(() => {
    updateBallPosition();
    updateScore();
}, 20);

document.addEventListener('keydown', (e) => {
    if (e.key === 'a') {
        leftFlipper.style.transform = 'rotate(0deg)';
    }
    if (e.key === 'd') {
        rightFlipper.style.transform = 'rotate(0deg)';
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'a') {
        leftFlipper.style.transform = 'rotate(45deg)';
    }
    if (e.key === 'd') {
        rightFlipper.style.transform = 'rotate(-45deg)';
    }
});
