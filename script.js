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
    const resultMessage = document.getElementById('result-message');
    const chatMessage = document.getElementById('chat-message');
    const responseElement = document.getElementById('response');
    const apiKey = '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'; // Wstaw swój klucz API OpenAI tutaj

    // Funkcja do wysyłania wiadomości do ChatGPT
    document.getElementById('send-message').addEventListener('click', async () => {
        const message = chatMessage.value;

        if (!message) {
            alert('Wprowadź wiadomość.');
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
                    prompt: message,
                    max_tokens: 150
                })
            });

            const data = await response.json();
            responseElement.textContent = data.choices[0].text;
        } catch (error) {
            console.error('Błąd:', error);
            alert('Wystąpił problem z wysyłaniem wiadomości.');
        }
    });

    // Funkcja do losowania symboli w maszynie slotowej
    function spinReels() {
        const symbols = ['🍒', '🍋', '🍇', '🍊', 'BAR', '⭐', '7️⃣', 'X'];
        reels.forEach((reel) => {
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            reel.textContent = randomSymbol;
        });
    }

    // Obsługa przycisku Spin
    spinButton.addEventListener('click', () => {
        spinReels();
    });
});
