var wordsToGuessId = document.getElementById("wordsToGuess");
var lettersGuessedId = document.getElementById("lettersGuessed");

var lossesId = document.getElementById("losses");
var triesLeftId = document.getElementById("triesLeft");
var startButtonId = document.getElementById("startButton");

var wins = 0;
var losses = 0;
var incorrectGuesses = [];
var correctGuesses = [];
var randomWord = ".";
var triesLeft = 15;
var randomWordUnderscores = [];
var wordArray = ["Costa Rica", "Honduras", "England", "Ireland", "Italy", "Greece", "Puerto Rico", "Bahamas", "Jamaica", "Hawaii", "France", "Wales", "India", "Morocco", "Spain", "New Zealand", "Canada", "Switzerland", "Australia"];
var gameRunning = false;
var gameOver = false;

document.getElementById("wins").innerHTML = wins;


function newGame() {
    gameRunning = true;
    triesLeft = 15;
    correctGuesses = [];
    incorrectGuesses = [];
    randomWordUnderscores = [];
    randomWord = "";

    randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    for (var i = 0; i < randomWord.length; i++) {
        
        console.log(gameOver);
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

    if ((gameRunning === true) && (correctGuesses.indexOf(letter) === -1)) {

        if (randomWord.indexOf(letter) > -1) {
            correctGuesses.push(letter);
        }

        console.log(correctGuesses);

        for (var i = 0; i < randomWord.length; i++) {

            if (randomWord[i].toLowerCase() === letter.toLowerCase()) {

                randomWordUnderscores[i] = randomWord[i];
            }
        }

        wordsToGuessId.textContent = randomWordUnderscores.join('');
        if (randomWordUnderscores.indexOf("_") === -1) {
            gameOver = true;
            console.log("We just won")
        }
        confirmLetter(letter);

    }
}



function confirmLetter(letter) {

    if (randomWord.indexOf(letter.toLowerCase()) === -1 && randomWordUnderscores.indexOf(letter.toUpperCase()) === -1) {

        triesLeft--;

        if (randomWord.indexOf(letter) > -1) {
            incorrectGuesses.push(letter);
        }

        incorrectGuesses.push(letter);

        lettersGuessedId.textContent = incorrectGuesses.join(' ');

        triesLeftId.textContent = triesLeft;
        
    }
    
}
//if correct guesses = word the win


function gameScore() {
    if (triesLeft < 1) {
        losses++;
        gameRunning = false;
        lossesId.textContent = losses;
        wordsToGuessId.textContent = randomWord;
    } else if (gameOver) {
    //} else if (randomWord.toLowerCase() === (correctGuesses.toString()).toLowerCase()) {
        
        wins++;
        gameRunning = false;
        document.getElementById("wins").innerHTML = "Wins: " + wins;
    }
    
 
}



startButton.addEventListener("click", newGame);

document.onkeyup = function (event) {
    console.dir(event);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
    
}
