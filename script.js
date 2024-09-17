const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatHistory = document.getElementById('chat-history');

// **Pamiętaj, aby zastąpić 'YOUR_API_KEY' swoim rzeczywistym kluczem API** 
const API_KEY = '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'; 

sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value;
    userInput.value = ''; // Wyczyść pole tekstowe

    // Dodaj wiadomość użytkownika do historii czatu
    appendMessage('Ty', userMessage);

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo', // Możesz zmienić na inny model, jeśli chcesz
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' }, // Instrukcja systemowa
                    { role: 'user', content: userMessage }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                }
            }
        );

        const assistantMessage = response.data.choices[0].message.content;

        // Dodaj odpowiedź asystenta do historii czatu
        appendMessage('Asystent', assistantMessage);
    } catch (error) {
        console.error('Błąd podczas komunikacji z OpenAI API:', error);
        appendMessage('Błąd', 'Wystąpił błąd podczas przetwarzania Twojego zapytania.');
    }
});

function appendMessage(sender, message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = `${sender}: ${message}`;
    chatHistory.appendChild(messageElement);
}
