const words = ["javascript", "programacao", "ezequiel", "celular","computador"];
let selectedWord = ""; // Palavra selecionada
let guessedLetters = []; // letras adivinhadas
let mistakes = 0; //erros
const maxMistakes = 6;

// Diplay de palavras, botões de letras e botão reset
const wordDisplay = document.getElementById("word-display");
const letterButtons = document.getElementById("letter-buttons");
const resetButton = document.getElementById("reset-button");

// Chamando canvas e definindo contexto em ctx

/*
const canvas = document.getElementById("hangman-drawing");
const ctx = canvas.getContext("2d");

canvas.width = 200px;
canvas.height = 300px; */



// Iniciar Jogo

function initGame(){
    selectedWord = words[Math.floor(Math.random()* words.length)];
    guessedLetters = [];
    mistakes = 0;

    wordDisplay.innerHTML = "_".repeat(selectedWord.length);
    createLetterButtons();


}

initGame();

// Criar botões de letras

function createLetterButtons(){
    letterButtons.innerHTML = "";

    for (let i = 65; i <=90; i++){

        const button = document.createElement("button");
        button.textContent = String.fromCharCode(i);
        button.onclick = handleGuess;
        letterButtons.appendChild(button);
    }
}

// Lidar com as adivinhações

function handleGuess(event){
    const letter = event.target.textContent.toLowerCase(); // Obtendo letra clicada

    if(!guessedLetters.includes(letter)){
        guessedLetters.push(letter); // Adicionando a letra escolhida
        if(selectedWord.includes(letter)){ // Se houver a letra na palavra
            updateWordDisplay(); // Atualizando display se acertar letra
        }else{ // Se não houver + erro
            mistakes++;
            let displayMistakes = document.getElementById('display-mistakes');
            displayMistakes.innerHTML= ` Erros: ${mistakes}`;
            
        }
    }
    checkGameOver();
}

// Atualizando a palavra exibida

function updateWordDisplay(){

    let displayWord = "";

    for(let letter of selectedWord){ // iterando sobre cada letra de selectedWord
        if (guessedLetters.includes(letter)){
            displayWord += letter + " ";
        } else {
            displayWord += "_ ";
        }

    }
    wordDisplay.textContent = displayWord.trim(); // Limpar espaço em branco no inicio e fim de WordDisply
}

// Verificando fim de jogo

function checkGameOver(){
    if(mistakes >= maxMistakes){
        wordDisplay.textContent= `Você Perdeu! A palavra era ${selectedWord}`;
        disableButtons();
    }else if(!wordDisplay.textContent.includes("_")){
        wordDisplay.textContent = "Você ganhou!";
        disableButtons();
    }
}

// Desativar botões de letras

function disableButtons(){
    const buttons = letterButtons.getElementsByTagName("button");
    for(let button of buttons){
        button.disabled = true;
    }
}

//reiniciar Jogo
resetButton.onclick = initGame;

//iniciar Jogo ao carregar a página
window.onload = initGame;