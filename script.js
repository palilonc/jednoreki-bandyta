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

    const symbols = ['🍒', '🍋', '🍉', '🍇', '🍓', '🍊'];
    let balance = 10;

    // Funkcja do resetowania bębnów przed spinem
    const resetReels = () => {
        reels.forEach(reel => {
            reel.innerHTML = ''; // Czyszczenie zawartości
            for (let i = 0; i < 20; i++) { // Tworzenie symboli na bębnach
                const symbol = document.createElement('div');
                symbol.innerText = symbols[Math.floor(Math.random() * symbols.length)];
                reel.appendChild(symbol);
            }
        });
    };

    // Funkcja animująca bębny za pomocą GSAP
    const spinReels = () => {
        resetReels(); // Resetowanie bębnów
        reels.forEach((reel, index) => {
            const stopPosition = Math.random() * 300 + 500; // Losowe przesunięcie
            gsap.to(reel, {
                y: `-=${stopPosition}`, // Przesunięcie pionowe
                duration: 2 + index * 0.5, // Czas animacji
                ease: "elastic.inOut(1, 0.5)", // Typ animacji (dynamiczne zatrzymanie)
                onStart: () => {
                    gsap.fromTo(reel, { scaleY: 1.2 }, { scaleY: 1, duration: 0.2 });
                },
                onComplete: () => {
                    if (index === reels.length - 1) {
                        checkResult(); // Sprawdzanie wyniku po zakończeniu animacji wszystkich bębnów
                    }
                }
            });
        });
    };

    // Sprawdzenie wyniku gry
    const checkResult = () => {
        const selectedSymbols = reels.map(reel => reel.children[1].innerText);
        const uniqueSymbols = [...new Set(selectedSymbols)];
        
        if (uniqueSymbols.length === 1) {
            gsap.to(reels, { scale: 1.1, duration: 0.5, yoyo: true, repeat: 3 });
            resultMessage.innerText = 'Wygrałeś!';
            balance += parseInt(betSelect.value) * 10; // Wygrana mnożona przez stawkę
        } else {
            resultMessage.innerText = 'Spróbuj ponownie!';
        }

        moneyCounter.innerText = balance;
    };

    // Kliknięcie przycisku spin
    spinButton.addEventListener('click', () => {
        const bet = parseInt(betSelect.value);

        if (balance >= bet) {
            balance -= bet;
            spinReels(); // Animacja spinu
        } else {
            resultMessage.innerText = 'Nie masz wystarczających środków!';
        }

        moneyCounter.innerText = balance;
    });

    // Dodanie pieniędzy
    addMoneyButton.addEventListener('click', () => {
        balance += 10;
        moneyCounter.innerText = balance;
    });
});
