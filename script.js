document.addEventListener('DOMContentLoaded', () => {
    const buildButton = document.getElementById('build-button');
    const tower = document.getElementById('tower');
    const score = document.getElementById('score');
    
    let height = 0;

    buildButton.addEventListener('click', () => {
        // Zwiększ wysokość wieży o 20px
        height += 20;
        // Ustaw nową wysokość wieży
        tower.style.height = `${height}px`;
        // Zaktualizuj wynik
        score.textContent = `Wysokość wieży: ${height}`;
    });
});
