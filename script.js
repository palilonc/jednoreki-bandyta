// Funkcja do wczytywania produktów z kodu funkcji
function loadProducts() {
    fetch('process_message_code.txt')
        .then(response => response.text())
        .then(text => {
            const regex = /- \*\*(.*?)\*\*: (.*?)\. Cena (.*?) zł\./g;
            let match;
            const tableBody = document.getElementById('productsBody');
            tableBody.innerHTML = ''; // Wyczyść istniejącą zawartość tabeli

            while ((match = regex.exec(text)) !== null) {
                const [fullMatch, name, description, price] = match;
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><input type="text" value="${name}"></td>
                    <td><input type="text" value="${description}"></td>
                    <td><input type="text" value="${price}"></td>
                    <td><button onclick="removeProduct(this)">Usuń</button></td>
                `;
                tableBody.appendChild(row);
            }
        });
}

// Funkcja do dodawania nowego produktu
function addProduct() {
    const tableBody = document.getElementById('productsBody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" value=""></td>
        <td><input type="text" value=""></td>
        <td><input type="text" value=""></td>
        <td><button onclick="removeProduct(this)">Usuń</button></td>
    `;
    tableBody.appendChild(row);
}

// Funkcja do usuwania produktu
function removeProduct(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}

// Funkcja do zapisywania zmian w pliku
function saveChanges() {
    const tableBody = document.getElementById('productsBody');
    const rows = tableBody.getElementsByTagName('tr');
    let products = '';

    for (const row of rows) {
        const inputs = row.getElementsByTagName('input');
        if (inputs.length === 3) {
            const name = inputs[0].value;
            const description = inputs[1].value;
            const price = inputs[2].value;
            if (name && description && price) {
                products += `- **${name}**: ${description}. Cena ${price} zł.\n`;
            }
        }
    }

    const newContent = `### Dostępne produkty i ceny: ###\n${products}\n### Dodatkowe informacje ###`;

    fetch('update_file.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newContent })
    })
    .then(response => response.text())
    .then(text => {
        alert(text);
    });
}

// Wczytaj produkty przy starcie
window.onload = loadProducts;
