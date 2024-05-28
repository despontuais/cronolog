document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton') as HTMLButtonElement;
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const resultsContainer = document.querySelector('.results') as HTMLDivElement;
    const searchForm = document.querySelector('.search-container form') as HTMLFormElement; // Importação do fomrulário localizado no search.html

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
        const resultsContainer = document.querySelector('.results');
    
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
    
                    // Exibir o resultado como texto
                    resultItem.textContent = result;
    
                    // Adicionar cada item de resultado ao contêiner de resultados
                    resultsContainer.appendChild(resultItem);
                });
            }
        } else {
            console.error('Contêiner de resultados não encontrado.');
        }
    }
    
    
});
