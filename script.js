document.addEventListener('DOMContentLoaded', () => {
    const reels = [
        document.getElementById('reel1'),
        document.getElementById('reel2'),
        document.getElementById('reel3'),
        document.getElementById('reel4'),
        document.getElementById('reel5'),
        document.getElementById('reel6'),
        document.getElementById('reel7'),
        document.getElementById('reel8'),
        document.getElementById('reel9')
    ];

    const spinButton = document.getElementById('spin-button');
    const addMoneyButton = document.getElementById('add-money-button');
    const resultMessage = document.getElementById('result-message');
    const moneyCounter = document.getElementById('money-counter');
    const betSelect = document.getElementById('bet');

    const symbols = ['🍒', '🍉', '🍋', '🍇', '🍓', '🍊'];

    let balance = 10;

    function updateMoneyCounter() {
        moneyCounter.textContent = balance;
    }

    function spinReels() {
        const results = [];
        reels.forEach((reel, index) => {
            const symbol = symbols[Math.floor(Math.random() * symbols.length)];
            reel.textContent = symbol;
            results.push(symbol);
        });
        return results;
    }

    function checkWin(results) {
        const winLines = [
            [0, 1, 2],  // Top row
            [3, 4, 5],  // Middle row
            [6, 7, 8],  // Bottom row
            [0, 4, 8],  // Diagonal \
            [2, 4, 6]   // Diagonal /
        ];

        for (let line of winLines) {
            const [a, b, c] = line;
            if (results[a] === results[b] && results[b] === results[c]) {
                return results[a]; // Zwraca symbol, jeśli jest wygrana
            }
        }
        return null;
    }

    spinButton.addEventListener('click', () => {
        const bet = parseInt(betSelect.value);

        if (balance >= bet) {
            balance -= bet;
            updateMoneyCounter();

            const results = spinReels();
            const winSymbol = checkWin(results);

            if (winSymbol) {
                const winAmount = bet * 5; // Można zmienić stawkę wygranej
                balance += winAmount;
                resultMessage.textContent = `Wygrałeś ${winAmount} PLN za ${winSymbol}!`;
            } else {
                resultMessage.textContent = "Brak wygranej, spróbuj ponownie!";
            }

            updateMoneyCounter();
        } else {
            resultMessage.textContent = "Brak wystarczających środków!";
        }
    });

    addMoneyButton.addEventListener('click', () => {
        balance += 10; // Dodajemy 10 PLN
        updateMoneyCounter();
    });

    updateMoneyCounter();
});
