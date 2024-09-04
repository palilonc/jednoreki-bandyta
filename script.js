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

    // Funkcja losująca i obracająca bębny za pomocą GSAP
    spinButton.addEventListener('click', () => {
        reels.forEach((reel, index) => {
            const stopPosition = Math.random() * 300 + 500; // Losowe przesunięcie
            gsap.to(reel, {
                y: `-=${stopPosition}`, // Przesunięcie pionowe
                duration: 2 + index * 0.5, // Czas animacji
                ease: "power1.inOut", // Typ animacji
                onComplete: () => {
                    // Tu możesz dodać kod do obsługi wyników po zatrzymaniu się bębnów
                }
            });
        });
    });

    // Pozostała część kodu obsługująca inne funkcje...
});
