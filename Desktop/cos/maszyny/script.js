// script.js
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

  let money = 10;
  let spinning = false;

  function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  function startSpinAnimation(reel) {
    reel.style.animation = 'spin 1s infinite linear';
  }

  function stopSpinAnimation(reel, symbol) {
    reel.style.animation = 'none'; // Zatrzymujemy animację
    reel.textContent = symbol; // Wstawiamy ostateczny symbol
  }

  function spinReels() {
    if (spinning) return; // Nie pozwalamy na wielokrotne zakręcenie naraz
    const bet = parseInt(betSelect.value);
    if (money >= bet) {
      spinning = true;
      money -= bet;
      updateMoneyDisplay();

      const results = [];
      reels.forEach(reel => {
        startSpinAnimation(reel);
      });

      setTimeout(() => {
        reels.forEach(reel => {
          const symbol = getRandomSymbol();
          stopSpinAnimation(reel, symbol);
          results.push(symbol);
        });
        spinning = false;
        checkWin(results, bet);
      }, 2000); // Po 2 sekundach zatrzymujemy bębny
    } else {
      resultMessage.textContent = 'Brak środków! Dodaj pieniądze, aby grać.';
      resultMessage.style.color = 'red';
    }
  }

  function checkWin(results, bet) {
    const winningLines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rzędy
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Kolumny
      [0, 4, 8], [2, 4, 6] // Przekątne
    ];

    let payout = 0;
    const payouts = {
      '🍒': 5,
      '🍋': 3,
      '🍉': 10,
      '🍇': 7,
      '🍓': 4,
      '🍊': 2
    };

    winningLines.forEach(line => {
      const [a, b, c] = line;
      if (results[a] === results[b] && results[b] === results[c]) {
        payout += payouts[results[a]] * bet;
      }
    });

    if (payout > 0) {
      resultMessage.textContent = `Wygrałeś ${payout} PLN!`;
      resultMessage.style.color = 'green';
      money += payout;
      updateMoneyDisplay();
    } else {
      resultMessage.textContent = 'Spróbuj ponownie!';
      resultMessage.style.color = 'red';
    }
  }

  function updateMoneyDisplay() {
    moneyCounter.textContent = `Środki: ${money} PLN`;
  }

  spinButton.addEventListener('click', spinReels);
  addMoneyButton.addEventListener('click', () => {
    money += 5;
    updateMoneyDisplay();
  });

  updateMoneyDisplay();
});
