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
    
    // Ustawienie stałej wartości żetonu
    const creditPrice = 1; // Stała wartość żetonu wynosi 1 PLN

    // Ustawienie stałej liczby linii na 5
    const lines = 5; // Zawsze 5 linii

    const symbols = [
        { icon: '🍒', points: 3.20 },
        { icon: '🍋', points: 3.20 },
        { icon: '🍇', points: 3.20 },
        { icon: '⭐', points: 16.00 },
        { icon: '7️⃣', points: 60.00 },
        { icon: '🍊', points: 3.20 },
        { icon: '❌', points: 0.40 },
        { icon: '🍉', points: 4.80 }
    ];

    let balance = 100;

    function updateMoneyCounter() {
        moneyCounter.textContent = balance.toFixed(2); // Ustawione na stałe 1 PLN za żeton
    }

    function updateTotalBet() {
        const totalBet = betSelect.value * lines * creditPrice; // Stała liczba linii 5
        totalBetDisplay.textContent = totalBet.toFixed(2);
    }

    function spinReels() {
        const results = [];
        reels.forEach((reel) => {
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            reel.textContent = randomSymbol.icon; // Wyświetlamy odpowiednie ikony
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
        const tl = gsap.timeline(); // Używamy GSAP do animacji
        reels.forEach((reel, index) => {
            tl.to(reel, {
                y: -100, // Przesuwamy symbol w górę
                duration: 0.1, 
                repeat: 10, // Obraca się 10 razy
                ease: "none", // Bez płynnych przejść, równa prędkość
                onRepeat: () => {
                    // Losujemy i przypisujemy nowy symbol do każdego obrotu
                    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
                    reel.textContent = randomSymbol.icon;
                },
                onComplete: () => {
                    // Ostatecznie ustawiamy symbol po zakończeniu obrotu
                    const finalSymbol = symbols[Math.floor(Math.random() * symbols.length)];
                    reel.textContent = finalSymbol.icon;
                    gsap.set(reel, { y: 0 }); // Resetujemy pozycję do początkowej
                }
            }, index * 0.1); // Dodajemy opóźnienie między obrotami kolejnych bębnów
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
        const totalBet = bet * lines * creditPrice; // Stała wartość żetonu 1 PLN

        // Resetujemy animację zwycięskich symboli
        reels.forEach(reel => gsap.set(reel, { scale: 1, backgroundColor: "#333" }));

        if (balance >= totalBet) {
            balance -= totalBet;
            updateMoneyCounter();

            // Obracamy bębny
            animateReels().then(() => {
                // Po zakończeniu animacji obrotu, sprawdzamy wynik
                const results = spinReels();
                const { winAmount, winningSymbols } = checkWin(results);

                // Jeśli jest wygrana, dodajemy kwotę i animujemy zwycięskie symbole
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

    betSelect.addEventListener('change', updateTotalBet);

    updateMoneyCounter();
    updateTotalBet();
});
