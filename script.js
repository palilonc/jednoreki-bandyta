document.addEventListener('DOMContentLoaded', () => {
    const reels = [
        document.getElementById('reel1'),
        document.getElementById('reel2'),
        document.getElementById('reel3')
    ];

    const spinButton = document.getElementById('spin-button');
    const addMoneyButton = document.getElementById('add-money-button');
    const resultMessage = document.getElementById('result-message');
    const moneyCounter = document.getElementById('money-counter');
    const linesSelect = document.getElementById('lines');
    const betSelect = document.getElementById('bet');
    const creditPriceSelect = document.getElementById('credit-price');
    const totalBetDisplay = document.getElementById('total-bet');

    const symbols = ['🍒', '🍉', '🍋', '🍇', '🍓', '🍊'];

    let balance = 100;

    function updateMoneyCounter() {
        moneyCounter.textContent = (balance * parseFloat(creditPriceSelect.value)).toFixed(2);
    }

    function updateTotalBet() {
        const totalBet = betSelect.value * linesSelect.value * creditPriceSelect.value;
        totalBetDisplay.textContent = totalBet.toFixed(2);
    }

    function spinReels() {
        const results = [];
        reels.forEach((reel) => {
            const symbol = symbols[Math.floor(Math.random() * symbols.length)];
            reel.textContent = symbol;
            results.push(symbol);
        });
        return results;
    }

    function checkWin(results) {
        const winLines = [
            [0, 1, 2]  // Jedyna linia wygrywająca w wersji podstawowej
        ];

        let winAmount = 0;
        winLines.forEach(line => {
            const [a, b, c] = line;
            if (results[a] === results[b] && results[b] === results[c]) {
                winAmount += betSelect.value * 5; // Wygrana za 3 identyczne symbole
            }
        });

        return winAmount;
    }

    spinButton.addEventListener('click', () => {
        const bet = parseInt(betSelect.value);
        const lines = parseInt(linesSelect.value);
        const totalBet = bet * lines;

        if (balance >= totalBet) {
            balance -= totalBet;
            updateMoneyCounter();

            const results = spinReels();
            const winAmount = checkWin(results);

            if (winAmount > 0) {
                balance += winAmount;
                resultMessage.textContent = `Wygrałeś ${winAmount} PLN!`;
            } else {
                resultMessage.textContent = "Brak wygranej, spróbuj ponownie!";
            }

            updateMoneyCounter();
            updateTotalBet();
        } else {
            resultMessage.textContent = "Brak wystarczających środków!";
        }
    });

    addMoneyButton.addEventListener('click', () => {
        balance += 10; // Dodajemy 10 PLN
        updateMoneyCounter();
    });

    linesSelect.addEventListener('change', updateTotalBet);
    betSelect.addEventListener('change', updateTotalBet);
    creditPriceSelect.addEventListener('change', updateTotalBet);

    updateMoneyCounter();
    updateTotalBet();
});
