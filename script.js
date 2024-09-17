document.addEventListener('DOMContentLoaded', () => {
    // Blackjack elements
    const blackjackBalanceDisplay = document.getElementById('blackjack-balance');
    const blackjackHandDisplay = document.getElementById('blackjack-hand');
    const blackjackResultMessage = document.getElementById('blackjack-result-message');
    const hitButton = document.getElementById('hit-button');
    const standButton = document.getElementById('stand-button');

    let blackjackBalance = 100;
    let blackjackHand = [];
    let blackjackStand = false;

    function updateBlackjackBalance() {
        blackjackBalanceDisplay.textContent = blackjackBalance.toFixed(2);
    }

    function getRandomCard() {
        const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // 11 to as
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

        // Jeśli przekroczymy 21, liczymy asy jako 1
        while (total > 21 && aces > 0) {
            total -= 10;
            aces -= 1;
        }

        return total;
    }

    function updateBlackjackHand() {
        blackjackHandDisplay.textContent = `Twoje karty: ${blackjackHand.join(', ')}`;
    }

    function checkBlackjackResult() {
        const handValue = calculateHandValue(blackjackHand);

        if (handValue === 21) {
            blackjackBalance += 20;
            blackjackResultMessage.textContent = 'Masz 21! Wygrałeś 20 PLN!';
        } else if (handValue > 21) {
            blackjackBalance -= 10;
            blackjackResultMessage.textContent = 'Przekroczyłeś 21! Przegrywasz 10 PLN.';
        } else if (blackjackStand && handValue < 21) {
            blackjackResultMessage.textContent = `Zakończono z wynikiem ${handValue}.`;
        }

        updateBlackjackBalance();
    }

    hitButton.addEventListener('click', () => {
        const newCard = getRandomCard();
        blackjackHand.push(newCard);
        updateBlackjackHand();
        checkBlackjackResult();
    });

    standButton.addEventListener('click', () => {
        blackjackStand = true;
        checkBlackjackResult();
    });

    updateBlackjackBalance();
});
