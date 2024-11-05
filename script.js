let correctCountry;
let options = [];
let pontuacao = 0;

function getCountryNameInPortuguese(country) {
// Verifica se há tradução para português
return country.translations && country.translations.por ?
country.translations.por.common : country.name.common;
}

function getRandomCountries() {
fetch('https://restcountries.com/v3.1/all')
.then(response => response.json())
.then(data => {
// Seleciona um país aleatório como o correto
const randomIndex = Math.floor(Math.random() * data.length);
correctCountry = data[randomIndex];
options = [correctCountry];

// Adiciona mais 3 opções aleatórias de países
while (options.length < 4) {
const randomOption = data[Math.floor(Math.random() * data.length)];
if (!options.includes(randomOption)) {
options.push(randomOption);
}
}

// Embaralha as opções
options.sort(() => Math.random() - 0.5);

displayQuestion();
})
.catch(error => console.error('Erro:', error));
}

function displayQuestion() {
    // Exibe a bandeira do país correto
    document.getElementById('flagImage').src = correctCountry.flags.png;
    document.getElementById('flagImage').style.display = 'block';
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = ''; // Limpa as opções anteriores
    
    // Cria botões para as opções de países
    options.forEach(option => {
    const button = document.createElement('button');
    button.innerText = getCountryNameInPortuguese(option);
    button.onclick = () => checkAnswer(option);
    optionsDiv.appendChild(button);
    });
    }

    function checkAnswer(selected) {
        const resultDiv = document.getElementById('result');
      
        if (selected.name.common === correctCountry.name.common) {

            document.getElementById('options').style.display="none"; 
          resultDiv.innerHTML = '<p>Correto!</p>';
          pontuacao++; // Incrementa o número de acertos
        } else {
            document.getElementById('options').style.display="none"; 
          resultDiv.innerHTML = `<p>Incorreto! O país correto era: ${getCountryNameInPortuguese(correctCountry)}</p>`;
          pontuacao--;
        }
      
        // Atualiza a contagem de acertos
        document.getElementById('pontuacao').innerText = `Acertos: ${pontuacao}`;
      
        document.getElementById('nextButton').style.display = 'block'; // Exibe o botão
      }



        document.getElementById('nextButton').onclick = () => {
            document.getElementById('result').innerHTML = ''; // Limpa o resultado anterior
            document.getElementById('options').style.display="block"; 
            document.getElementById('nextButton').style.display = 'none'; // Esconde o botão="Próximo"
            getRandomCountries(); // Carrega uma nova bandeira
            };

getRandomCountries()