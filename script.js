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
    let apiKey = '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'; // Zmienna na klucz API
    let balance = 100;

    // Wprowadzenie klucza API OpenAI
    document.getElementById('save-api-key').addEventListener('click', () => {
        apiKey = document.getElementById('api-key').value;
        alert('Klucz API zapisany!');
    });

    // Wysyłanie zapytania do OpenAI
    document.getElementById('send-query').addEventListener('click', async () => {
        const query = document.getElementById('query').value;

        if (!apiKey) {
            alert('Wprowadź klucz API.');
            return;
        }

        if (!query) {
            alert('Wprowadź zapytanie.');
            return;
        }

        try {
            const response = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    prompt: query,
                    max_tokens: 100
                })
            });

            const data = await response.json();
            document.getElementById('response').textContent = data.choices[0].text;
        } catch (error) {
            console.error('Błąd:', error);
            alert('Wystąpił problem z wysyłaniem zapytania.');
        }
    });

    // Obsługa maszyny slotowej
    function updateMoneyCounter() {
        moneyCounter.textContent = balance.toFixed(2);
    }

    function spinReels() {
        const symbols = ['🍒', '🍋', '🍇', '🍊', 'BAR', '⭐', '7️⃣', 'X'];
        reels.forEach((reel) => {
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            reel.textContent = randomSymbol;
        });
    }

    spinButton.addEventListener('click', () => {
        const bet = parseInt(betSelect.value);
        if (balance >= bet) {
            balance -= bet;
            updateMoneyCounter();
            spinReels();
            resultMessage.textContent = "Spróbuj ponownie!";
        } else {
            resultMessage.textContent = "Brak wystarczających środków!";
        }
    });

    addMoneyButton.addEventListener('click', () => {
        balance += 10;
        updateMoneyCounter();
    });

    updateMoneyCounter();
});
