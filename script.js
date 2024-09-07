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
    
    // Ustawienie stałej wartości żetonu
    const creditPrice = 1; // Stała wartość żetonu wynosi 1 PLN

    let balance = 100;

    function updateMoneyCounter() {
        moneyCounter.textContent = (balance * creditPrice).toFixed(2); // Zawsze 1 PLN
    }

    function updateTotalBet() {
        const totalBet = betSelect.value * linesSelect.value * creditPrice; // Zawsze 1 PLN za żeton
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
        let winningSymbols = [];

        winLines.forEach(line => {
            const [a, b, c] = line;
            if (results[a].icon === results[b].icon && results[b].icon === results[c].icon) {
                winAmount += results[a].points * betSelect.value;
                winningSymbols.push(reels[a], reels[b], reels[c]);
            }
        });

        return { winAmount, winningSymbols };
    }

    function animateReels() {
        const tl = gsap.timeline();
        reels.forEach((reel, index) => {
            tl.to(reel, {
                y: -500, // Przesuwamy symbol w górę
                duration: 0.1, 
                repeat: 10, // Obraca 10 razy
                ease: "none", // Bez płynnych przejść, równa prędkość
                onRepeat: () => {
                    reel.textContent = symbols[Math.floor(Math.random() * symbols.length)].icon; // Zmienia symbol przy każdym obrocie
                },
                onComplete: () => {
                    reel.textContent = symbols[Math.floor(Math.random() * symbols.length)].icon; // Ustawienie ostatecznego symbolu
                    gsap.set(reel, { y: 0 }); // Resetuje pozycję
                }
            }, index * 0.1); // Dodaje opóźnienie między bębnami, aby obróciły się jeden po drugim
        });
        return tl;
    }

    function animateWinningSymbols(winningSymbols) {
        winningSymbols.forEach(symbol => {
            gsap.to(symbol, { 
                scale: 1.5, 
                repeat: 3, 
                yoyo: true, 
                duration: 0.3,
                backgroundColor: "#ff4500"
            });
        });
    }

    spinButton.addEventListener('click', () => {
        const bet = parseInt(betSelect.value);
        const lines = parseInt(linesSelect.value);
        const totalBet = bet * lines * creditPrice; // Zawsze 1 PLN za żeton

        // Resetujemy animację zwycięskich symboli
        reels.forEach(reel => gsap.set(reel, { scale: 1, backgroundColor: "#333" }));

        if (balance >= totalBet) {
            balance -= totalBet;
            updateMoneyCounter();

            animateReels().then(() => {
                const results = spinReels();
                const { winAmount, winningSymbols } = checkWin(results);

                if (winAmount > 0) {
                    balance += winAmount;
                    resultMessage.textContent = `Wygrałeś ${winAmount.toFixed(2)} PLN!`;
                    animateWinningSymbols(winningSymbols);
                } else {
                    resultMessage.textContent = "Brak wygranej, spróbuj ponownie!";
                }

                updateMoneyCounter();
                updateTotalBet();
            });
        } else {
            resultMessage.textContent = "Brak wystarczających środków!";
        }
    });

    addMoneyButton.addEventListener('click', () => {
        balance += 10;
        updateMoneyCounter();
    });

    linesSelect.addEventListener('change', updateTotalBet);
    betSelect.addEventListener('change', updateTotalBet);

    updateMoneyCounter();
    updateTotalBet();
});
