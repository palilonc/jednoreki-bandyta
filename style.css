const reels = document.querySelectorAll('.reel');
const spinButton = document.getElementById('spinButton');
const resultDisplay = document.getElementById('result');

const symbols = [
    '🍒', '🍋', '🍊', '🔔', '❼', '⭐' // Dodaj więcej symboli lub użyj obrazków
];

spinButton.addEventListener('click', () => {
    reels.forEach(reel => {
        reel.innerHTML = ''; // Wyczyść poprzednie symbole

        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * symbols.length);
            const symbol = document.createElement('div');
            symbol.classList.add('symbol');
            symbol.textContent = symbols[randomIndex];
            reel.appendChild(symbol);
        }
    });

    // Tutaj dodaj logikę sprawdzania wygranej i wyświetlania wyniku
    checkWin();
});

function checkWin() {
    // Prosta logika sprawdzania wygranej (możesz ją rozbudować)
    const reel1Symbols = Array.from(reels[0].children).map(symbol => symbol.textContent);
    const reel2Symbols = Array.from(reels[1].children).map(symbol => symbol.textContent);
    const reel3Symbols = Array.from(reels[2].children).map(symbol => symbol.textContent);

    if (reel1Symbols[1] === reel2Symbols[1] && reel2Symbols[1] === reel3Symbols[1]) {
        resultDisplay.textContent = 'Wygrana!';
    } else {
        resultDisplay.textContent = 'Spróbuj ponownie';
    }
}
