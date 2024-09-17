document.addEventListener('DOMContentLoaded', () => {
    // Blackjack elements (połączone z HTML)
    const blackjackBalanceDisplay = document.getElementById('blackjack-balance');
    const blackjackHandDisplay = document.getElementById('blackjack-hand');
    const dealerHandDisplay = document.getElementById('dealer-hand');
    const blackjackResultMessage = document.getElementById('blackjack-result-message');
    const hitButton = document.getElementById('hit-button');
    const standButton = document.getElementById('stand-button');
    const newGameButton = document.getElementById('new-game-button'); // Dodany przycisk nowej gry

    let blackjackBalance = 100;
    let playerHand = [];
    let dealerHand = [];
    let blackjackStand = false;

    // ... (reszta funkcji pozostaje bez zmian)

    function dealerTurn() {
        let dealerHandValue = calculateHandValue(dealerHand);

        // Krupier dobiera karty, dopóki jego wynik nie będzie wynosił co najmniej 17
        while (dealerHandValue < 17) {
            const newCard = getRandomCard();
            dealerHand.push(newCard);
            dealerHandValue = calculateHandValue(dealerHand);
        }

        updateDealerHand(true); // Pokaż ukrytą kartę
        checkBlackjackResult();
    }

    function startNewGame() {
        // ... (logika rozpoczynania nowej gry bez zmian)
    }

    // Event listener dla przycisku "Nowa Gra"
    newGameButton.addEventListener('click', () => {
        startNewGame();
    });

    // Rozpocznij pierwszą grę
    startNewGame();
});
