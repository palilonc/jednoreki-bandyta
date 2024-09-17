document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Ustawienia gry
    const squareSize = 30;
    const squares = [
        { x: 50, y: 50, dx: 2, dy: 2, color: 'red' },
        { x: 200, y: 100, dx: -3, dy: 2, color: 'blue' },
        { x: 400, y: 200, dx: 2, dy: -3, color: 'green' }
    ];

    function drawSquare(square) {
        ctx.fillStyle = square.color;
        ctx.fillRect(square.x, square.y, squareSize, squareSize);
    }

    function updateSquares() {
        squares.forEach(square => {
            square.x += square.dx;
            square.y += square.dy;

            // Odbicie od krawędzi
            if (square.x + squareSize > canvas.width || square.x < 0) {
                square.dx *= -1;
            }
            if (square.y + squareSize > canvas.height || square.y < 0) {
                square.dy *= -1;
            }
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        squares.forEach(drawSquare);

        updateSquares();

        requestAnimationFrame(draw); // Kontynuuj animację
    }

    draw(); // Rozpocznij animację
});
