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
    
    // Tabela płatności przy zakładzie 15 zł (za cały obrót)
    const basePayouts = {
        'X': 15,
        '🍒🍋🍇🍊': 120, // Cytryny / Wiśnie / Śliwki / Pomarańcze
        'BAR': 180,
        '⭐': 600, // Gwiazdy
        '7️⃣': 2250 // Siódemki
    };

    const symbols = [
        { icon: '🍒', points: basePayouts['🍒🍋🍇🍊'] },
        { icon: '🍋', points: basePayouts['🍒🍋🍇🍊'] },
        { icon: '🍇', points: basePayouts['🍒🍋🍇🍊'] },
        { icon: '🍊', points: basePayouts['🍒🍋🍇🍊'] },
        { icon: 'BAR', points: basePayouts['BAR'] },
        { icon: '⭐', points: basePayouts['⭐'] },
        { icon: '7️⃣', points: basePayouts['7️⃣'] },
        { icon: 'X', points: basePayouts['X'] }
    ];

    let balance = 100;

    function updateMoneyCounter() {
        moneyCounter.textContent = balance.toFixed(2); // Wyświetla saldo w złotówkach
    }

    function updateTotalBet() {
        const bet = parseInt(betSelect.value); // Aktualny zakład za cały obrót
        totalBetDisplay.textContent = bet.toFixed(2);
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

    function calculatePayout(bet, basePayout) {
        // Proporcjonalna wygrana na podstawie zakładu (cały obrót)
        return (basePayout / 15) * bet; // Tabela odnosi się do zakładu 15 zł
    }

    function checkWin(results) {
        const winLines = [
            [0, 1, 2], // Pierwszy rząd
            [3, 4, 5], // Drugi rząd
            [6, 7, 8], // Trzeci rząd
            [0, 4, 8], // Diagonalne od lewej do prawej
            [2, 4, 6]  // Diagonalne od prawej do lewej
        ];

        const bet = parseInt(betSelect.value); // Pobieramy aktualny zakład za obrót
        let winAmount = 0;
        let winningSymbols = [];

        winLines.forEach(line => {
            const [a, b, c] = line;
            if (results[a].icon === results[b].icon && results[b].icon === results[c].icon) {
                // Obliczamy wygraną na podstawie symbolu i zakładu
                const payout = calculatePayout(bet, results[a].points);
                winAmount += payout;
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
        const bet = parseInt(betSelect.value); // Zakład za obrót
        const totalBet = bet; // Całkowity zakład = zakład za obrót

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
