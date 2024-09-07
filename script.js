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
    const linesSelect = document.getElementById('lines');
    const betSelect = document.getElementById('bet');
    const creditPriceSelect = document.getElementById('credit-price');
    const totalBetDisplay = document.getElementById('total-bet');

    // Zaktualizowane symbole z punktami
    const symbols = [
        { icon: '🍒', points: 3.20 }, // Wiśnie
        { icon: '🍋', points: 3.20 }, // Cytryny
        { icon: '🍇', points: 3.20 }, // Winogrona
        { icon: '⭐', points: 16.00 }, // Gwiazdki
        { icon: '7️⃣', points: 60.00 }, // Siódemki
        { icon: '🍊', points: 3.20 }, // Pomarańcze
        { icon: '❌', points: 0.40 },  // X
        { icon: '🍉', points: 4.80 }   // BAR (Arbuz)
    ];

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
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            reel.textContent = randomSymbol.icon;
            results.push(randomSymbol);
        });
        return results;
    }

    function checkWin(results) {
        const winLines = [
            [0, 1, 2], // Pierwszy rząd
            [3, 4, 5], // Drugi rząd
            [6, 7, 8], // Trzeci rząd
            [0, 4, 8], // Diagonalne od lewej do prawej
            [2, 4, 6]  // Diagonalne od prawej do lewej
        ];

        let winAmount = 0;
        winLines.forEach(line => {
            const [a, b, c] = line;
            if (results[a].icon === results[b].icon && results[b].icon === results[c].icon) {
                winAmount += results[a].points * betSelect.value; // Wygrana na podstawie punktów za 3 identyczne symbole
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
                resultMessage.textContent = `Wygrałeś ${winAmount.toFixed(2)} PLN!`;
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
