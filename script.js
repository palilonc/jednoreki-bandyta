document.addEventListener('DOMContentLoaded', () => {
    // Blackjack elements
    const blackjackBalanceDisplay = document.getElementById('blackjack-balance');
    const blackjackHandDisplay = document.getElementById('blackjack-hand');
    const dealerHandDisplay = document.getElementById('dealer-hand');
    const blackjackResultMessage = document.getElementById('blackjack-result-message');
    const hitButton = document.getElementById('hit-button');
    const standButton = document.getElementById('stand-button');

    let blackjackBalance = 100;
    let playerHand = [];
    let dealerHand = [];
    let blackjackStand = false;

    function updateBlackjackBalance() {
        blackjackBalanceDisplay.textContent = blackjackBalance.toFixed(2);
    }

    function getRandomCard() {
        const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11]; // Jack, Queen, King are 10, Ace is 11
        return cards[Math.floor(Math.random() * cards.length)];
    }

    function calculateHandValue(hand) {
        let total = 0;
        let aces = 0;

        hand.forEach(card => {
            total += card;
            if (card === 11) {
                aces += 1;
            }
        });

        // If we bust, count aces as 1
        while (total > 21 && aces > 0) {
            total -= 10;
            aces -= 1;
        }

        return total;
    }

    function updateBlackjackHand() {
        blackjackHandDisplay.textContent = `Your cards: ${playerHand.join(', ')}`;
    }

    function updateDealerHand(showHiddenCard = false) {
        if (showHiddenCard) {
            dealerHandDisplay.textContent = `Dealer's cards: ${dealerHand.join(', ')}`;
        } else {
            dealerHandDisplay.textContent = `Dealer's cards: ${dealerHand[0]}, Hidden`;
        }
    }

    function checkBlackjackResult() {
        const playerHandValue = calculateHandValue(playerHand);
        const dealerHandValue = calculateHandValue(dealerHand);

        if (playerHandValue > 21) {
            blackjackBalance -= 10;
            blackjackResultMessage.textContent = 'You busted! You lose 10 PLN.';
        } else if (dealerHandValue > 21) {
            blackjackBalance += 10;
            blackjackResultMessage.textContent = 'Dealer busted! You win 10 PLN.';
        } else if (blackjackStand) {
            if (playerHandValue > dealerHandValue) {
                blackjackBalance += 10;
                blackjackResultMessage.textContent = `You win with ${playerHandValue} vs ${dealerHandValue}. You win 10 PLN!`;
            } else if (playerHandValue < dealerHandValue) {
                blackjackBalance -= 10;
                blackjackResultMessage.textContent = `You lose with ${playerHandValue} vs ${dealerHandValue}. You lose 10 PLN.`;
            } else {
                blackjackResultMessage.textContent = `Push with ${playerHandValue}.`;
            }
        }

        updateBlackjackBalance();
    }

    function dealerTurn() {
        let dealerHandValue = calculateHandValue(dealerHand);

        while (dealerHandValue < 17) {
            const newCard = getRandomCard();
            dealerHand.push(newCard);
            dealerHandValue = calculateHandValue(dealerHand);
        }

        updateDealerHand(true); // Show the hidden card
        checkBlackjackResult();
    }

    function startNewGame() {
        playerHand = [getRandomCard(), getRandomCard()];
        dealerHand = [getRandomCard(), getRandomCard()];
        blackjackStand = false;
        blackjackResultMessage.textContent = '';

        updateBlackjackHand();
        updateDealerHand();
        checkBlackjackResult(); // Check for natural blackjack
    }

    hitButton.addEventListener('click', () => {
        if (!blackjackStand) {
            const newCard = getRandomCard();
            playerHand.push(newCard);
            updateBlackjackHand();
            checkBlackjackResult();
        }
    });

    standButton.addEventListener('click', () => {
        if (!blackjackStand) {
            blackjackStand = true;
            dealerTurn();
        }
    });

    // Start the initial game
    startNewGame();
});
