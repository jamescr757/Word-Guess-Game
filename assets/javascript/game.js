// script for hangman game 

// define global variables 

// create object 
var game = {
    gameCount: 0,
    wins: 0,
    wordBank: ["baseball", "hockey", "football", "soccer", "basketball", "rowing", "softball", "volleyball", "golf", "swimming", "tennis", "lacrosse", "gymnastics", "badminton","cricket", "kickball", "skateboarding", "surfing", "snowboarding", "skiing", "wakeboarding", "dodgeball", "quidditch", "frisbee", "cycling", "wrestling", "boxing", "karate", "taekwondo", "billiards", "snooker", "foosball", "rugby", "curling", "triathlon", "polo", "diving"],
    word: 'string',
    numGuesses: 0,
    userGuesses: [],
    endCount: 0,
    isPlaying: true,
    letterBank: ['a', 'o', 'e', 'u', 'i', 'd', 'h', 't', 'n', 's', 'p', 'y', 'f', 'g', 'c', 'r', 'l', 'q', 'j', 'k', 'x', 'b', 'm', 'w', 'v', 'z'],    

    // passed test 
    wordGenerator() {
        // get random index number

        var randomNum = Math.floor(Math.random() * this.wordBank.length);

        // console.log(randomNum);
        // return random word from word bank 

        return this.wordBank[randomNum];
    },

    // method to grab element from html doc to manipulate
    //passed test
    getDomElement(selector) {
        return document.querySelector(selector);
    },

    // method to render text onto page 
    // passed test 
    render(selector, text) {
        // use object method to grab element 
        // modify inner html of that element 
        var element = this.getDomElement(selector);
        element.innerHTML = text;
    },

    // method to create an element and append it 
    // passed test
    addText(newTag, newText, parentId, className) {
        // create element 
        var newElement = document.createElement(newTag);

        // add inner html 
        newElement.innerHTML = newText;

        // add class name 
        newElement.setAttribute("class", className);

        // grab parent element 
        var parentElement = this.getDomElement(parentId);

        // append new element
        parentElement.appendChild(newElement);
    },

    // method to create number of guesses and blanks
    // guesses should be 1.5x the number of letters
    // blanks also need to be rendered onto the page 
    // passed test
    wordBlankGenerator() {
        this.word = this.wordGenerator();
        // console.log(this.word);
        
        // grab p tag that contains word blanks 
        // need to loop through the word and create a span tag for each word and render a blank on the page 
        // use addText method

        for (var i = 0; i < this.word.length; i ++) {
            this.addText('span', '_', '#word-p', 'span-' + i);
        }

        // want to return number of guesses inside this method so that the word generator is only run one time 
        this.numGuesses = Math.round(this.word.length + 1);

        // number of blankspaces to track user progress
        this.blankSpaces = this.word.length;
    },

    endMessage(message) {
        this.render('#word-p', '');
        this.addText('span', message, '#word-p', 'p-message');
    }
};

// console.log(game.letterBank.length);
// game.render('wins-span', 10);
game.wordBlankGenerator();
game.render('#guess-span', game.numGuesses);
// console.log(game.userGuesses);


// console.log(game.blankSpaces);
// console.log(game.wordGenerator());
// key event logic
document.onkeyup = function(event) {
    var userLetter = event.key.toLowerCase();
    // console.log(userLetter);
    

    // reset game.correctAnswer to always start false
    var correctAnswer = false;
    // check if user input is a letter 
    // also checked if user already guessed that letter
    // otherwise, do nothing
    if (game.letterBank.indexOf(userLetter) > -1 && game.isPlaying) {

        var userRender = userLetter.toUpperCase();

        // need a way to track how many letters have been guessed correctly 
        // placed this logic in word blank generator 
        
        // console.log(game.word);
        // check if userLetter is in the word 
        var userLetterIndex = game.word.indexOf(userLetter);
        // console.log(userLetterIndex);
        var userGuessIndex = game.userGuesses.indexOf(userLetter);
        // console.log(userGuessIndex);
        // console.log("blank spaces", game.blankSpaces);
        while (userLetterIndex > -1) {
            // console.log("i made it into the while loop");
            
            game.render('.span-' + userLetterIndex, userRender);
            userLetterIndex = game.word.indexOf(userLetter, userLetterIndex + 1);
            // console.log(userLetterIndex);
            

            // flip correct answer switch to deactivate if statement below
            correctAnswer = true;
            // console.log("correct answer is", correctAnswer);
            
            // break;
            
        } 

        // console.log("correct answer before if statement", correctAnswer);
        
        // console.log("userLetter is", userLetter);
        if (userGuessIndex === -1 && !correctAnswer) {
            game.addText('span', userRender + ' ', '#letters-p', 'user-span');
            game.userGuesses.push(userLetter);

            //decrease number of guesses after user inputs a letter and if user hasn't guessed that letter
            game.numGuesses--;
            game.render('#guess-span', game.numGuesses);
        }
        
        // console.log(game.getDomElement('#word-p').textContent.toLowerCase());
        
        // need if statement for user winning 
        // this happens when there are no more blank spaces 
        if (game.getDomElement('#word-p').textContent.toLowerCase() === game.word) {
            // console.log("reached winning if statement");
            game.isPlaying = false;
            game.wins++;
            game.render('#wins-span', game.wins);

            game.gameCount++;
            game.render('#games-span', game.gameCount);

            // empty p#word-p and replace with message

            game.endMessage("You win! Thanks for playing! Press any key to play again");

            if (game.wins > 5) {
                game.endMessage("You're incredible at this game!");
            }

            if (game.wins > 6) {
                game.endMessage("You're too good at this game!");
            }

            if (game.wins > 7) {
                game.endMessage("Legendary status");
            }
        }

        // need an if statement for when guesses remaining = 0
        // show message that user lost
        // flip isPlaying var to false 
        if (game.numGuesses === 0) {
            game.isPlaying = false;

            game.gameCount++;
            game.render('#games-span', game.gameCount);

            game.endMessage("Game over! Thanks for playing! Press any key to play again")
        }
    }

    if (!game.isPlaying) {
        game.endCount++;
        // reset the game second time enter this if statement
        if (game.endCount > 1) {
            game.render('#word-p', '');
            game.render('#letters-p', 'Letters already guessed: ');
            game.wordBlankGenerator();
            game.render('#guess-span', game.numGuesses);
            game.endCount = 0;
            game.isPlaying = true;
            game.userGuesses = [];
        }
    }
};