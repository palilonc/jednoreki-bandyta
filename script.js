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
        reels.forEach((reel, index) => {
            const symbol = symbols[Math.floor(Math.random() * symbols.length)];
            // Dodajemy animację dla każdego obrotu
            gsap.to(reel, {
                rotationX: '+=360',  // Obrót o 360 stopni
                duration: 0.5 + (index * 0.1),  // Różny czas dla każdego bębna
                ease: 'power1.inOut',
                onComplete: () => {
                    reel.textContent = symbol;
                }
            });
            results.push(symbol);
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
