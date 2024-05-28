document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton') as HTMLButtonElement;
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const resultsContainer = document.querySelector('.results') as HTMLDivElement;
    const searchForm = document.querySelector('.search-container form') as HTMLFormElement;
    const criarTimelineButton = document.getElementById('criarTimeline') as HTMLButtonElement;
    const closePopupButton = document.getElementById('closePopup') as HTMLSpanElement;
    const popupForm = document.getElementById('popupForm') as HTMLDivElement;
    const createTimelineForm = document.getElementById('createTimelineForm') as HTMLFormElement;

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o comportamento padrão de envio do formulário
    
        const queryInput = document.getElementById('query') as HTMLInputElement;
        const query = queryInput.value;
    
        try {
            const response = await fetch(`/search?q=${query}`); // Envia uma solicitação para o servidor
            const results = await response.json(); // Converte a resposta em JSON
    
            displayResults(results); // Exibe os resultados na página
        } catch (error) {
            console.error('Erro ao buscar resultados:', error);
        }
    });

    function displayResults(results: string[]) {
        // Limpar resultados anteriores
        if (resultsContainer) {
            resultsContainer.innerHTML = '';
    
            if (results.length === 0) {
                // Caso não haja resultados, exibir uma mensagem indicando isso
                resultsContainer.innerHTML = `
                    <div class="no-results">
                        <img src="ghost.png" alt="No Results">
                        <p>Nenhum resultado encontrado.</p>
                    </div>
                `;
            } else {
                // Caso haja resultados, exibir cada um deles como um item da lista
                results.forEach(result => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'result-item';
                    resultItem.textContent = result; // Exibir o resultado como texto
                    resultsContainer.appendChild(resultItem); // Adicionar cada item de resultado ao contêiner de resultados
                });
            }
        } else {
            console.error('Contêiner de resultados não encontrado.');
        }
    }

    criarTimelineButton.addEventListener('click', () => {
        popupForm.style.display = 'flex';
    });

    closePopupButton.addEventListener('click', () => {
        popupForm.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === popupForm) {
            popupForm.style.display = 'none';
        }
    });

    createTimelineForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o comportamento padrão de envio do formulário

        const formData = new FormData(createTimelineForm);
        const nome = formData.get('nome'); // 'nome' deve corresponder ao campo esperado pelo backend

        const response = await fetch('/timeline', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome }) // Certifique-se de enviar o nome da timeline corretamente
        });

        if (response.ok) {
            alert('Timeline criada com sucesso!');
            popupForm.style.display = 'none';
            createTimelineForm.reset();
        } else {
            const errorData = await response.json();
            alert(`Erro ao criar timeline: ${errorData.error}`);
        }
    });
});