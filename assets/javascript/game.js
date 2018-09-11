var wordsToGuessId = document.getElementById("wordsToGuess");
var lettersGuessedId = document.getElementById("lettersGuessed");
var winsId = document.getElementById("wins");
var lossesId = document.getElementById("losses");
var triesLeftId = document.getElementById("triesLeft");
var startButtonId = document.getElementById("startButton");
var pleasework = document.getElementById("pleasework")

var wins = 0;
var losses = 0;
var incorrectGuesses = [];
var correctGuesses = [];
var triesLeft = 15;
var randomWord = " ";
var randomWordUnderscores = " ";
var wordArray = ["Costa Rica", "Honduras", "England", "Ireland", "Italy", "Greece", "Puerto Rico", "Bahamas", "Jamaica", "Hawaii", "France", "Wales", "India", "Morocco", "Spain", "New Zealand", "Canada", "Switzerland", "Australia"];
var gameRunning = false;


function newGame() {
    gameRunning = true;
    triesLeft = 15;
    correctGuesses = [];
    incorrectGuesses = [];
    randomWordUnderscores = [];

    randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];

    for (var i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === ' ') {
            randomWordUnderscores.push(' ');
        } else {
            randomWordUnderscores.push('_');
        }
    }

    triesLeftId.textContent = triesLeft;
    wordsToGuessId.textContent = randomWordUnderscores.join('');
    lettersGuessedId.textContent = incorrectGuesses;
}

function letterGuess(letter) {
    console.log(letter);

    if (gameRunning === true && correctGuesses.indexOf(letter) === -1) {

        correctGuesses.push(letter);

        for (var i = 0; i < randomWord.length; i++) {

            if (randomWord[i].toLowerCase() === letter.toLowerCase()) {

                randomWordUnderscores[i] = randomWord[i];
            }
        }

        wordsToGuessId.textContent = randomWordUnderscores.join('');

        confirmLetter(letter);
    }

}



function confirmLetter(letter) {

    if (randomWordUnderscores.indexOf(letter.toLowerCase()) === -1 && randomWordUnderscores.indexOf(letter.toUpperCase()) === -1) {

        triesLeft--;

        incorrectGuesses.push(letter);

        lettersGuessedId.textContent = incorrectGuesses.join(' ');

        triesLeftId.textContent = triesLeft;
    }
    loseGame();
}

function loseGame() {
    if (triesLeft === 0) {
        losses++;
        gameRunning = false;
        lossesId.textContent = losses;
        wordsToGuessId.textContent = randomWord;
    }
    winGame();
}

function checkGame() {
    if (randomWord.toLowerCase() === randomWordUnderscores.join('').toLowerCase()) {
        wins++;
        gameRunning = false;
        winsId.textContent = wins;
    }
}

pleasework.addEventListener("click", newGame);

document.onkeyup = function (event) {
    console.dir(event);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
}