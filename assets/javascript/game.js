// script for hangman game 

// define global variables 

// create object 
var game = {
    gameCount: 0,
    wins: 0,
    wordBank: ["baseball", "hockey", "football", "soccer", "basketball", "rowing", "softball", "volleyball", "golf", "swimming", "tennis", "lacrosse", "gymnastics", "badminton","cricket", "kickball", "skateboarding", "surfing", "snowboarding", "skiing", "wakeboarding", "dodgeball", "quidditch", "frisbee", "cycling", "wrestling", "boxing", "karate", "taekwondo", "billiards", "snooker", "foosball", "rugby", "curling", "triathlon", "polo", "diving", "bandy", "bowling", "darts", "handball", "running", "archery", "equestrian", "sailing", "weightlifting", "luge", "skeleton", "bobsleigh", "judo", "fencing"],
    word: 'string',
    numGuesses: 0,
    userGuesses: [],
    endCount: 0,
    isPlaying: true,
    letterBank: ['a', 'o', 'e', 'u', 'i', 'd', 'h', 't', 'n', 's', 'p', 'y', 'f', 'g', 'c', 'r', 'l', 'q', 'j', 'k', 'x', 'b', 'm', 'w', 'v', 'z'], 
    winMessages: ["Legendary status", "You're too good at this game!", "You're incredible at this game!", "You're on a roll!", "Hangman master", "Hangman jedi", "You sure know your sports", "Here's a cookie for being a great speller", "I guess you like this game", "Keep piling up those wins", "Winner! You know the drill", "Winner winner chicken dinner!", "I can play all day, can you?", "You didn't lose! Congrats", "How many wins can you string together?"],   

    // passed test 
    wordGenerator() {
        // get random index number
        var randomNum = Math.floor(Math.random() * this.wordBank.length);

        // return random word from word bank 
        return this.wordBank[randomNum];
    },

    //passed test
    winMessageGenerator() {
        // get random index number
        var randomNum = Math.floor(Math.random() * this.winMessages.length);

        // return random word from word bank 
        return this.winMessages[randomNum];
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

        // grab p tag that contains word blanks 
        // need to loop through the word and create a span tag for each word and render a blank on the page 
        // use addText method
        for (var i = 0; i < this.word.length; i ++) {
            this.addText('span', '_', '#word-p', 'span-' + i);
        }

        // want to return number of guesses inside this method so that the word generator is only run one time 
        this.numGuesses = Math.round(this.word.length + 1);

        // max guesses is 10
        if (this.numGuesses > 10) {
            this.numGuesses = 10;
        }

        // number of blankspaces to track user progress
        this.blankSpaces = this.word.length;
    },

    endMessage(message) {
        this.render('#message-p', '');
        this.addText('span', message, '#message-p', 'p-message');
    },

    // add background image to .image div 
    endImage(displayValue, displayImageBoolean) {
        var image = this.getDomElement(".image")
        image.style.display = displayValue;

        if (displayImageBoolean) {
            image.style.backgroundImage = `url(./assets/images/${this.word}.jpg)`;
        }
    }
};

game.wordBlankGenerator();
game.render('#guess-span', game.numGuesses);

// key event logic
document.onkeyup = function(event) {
    var userLetter = event.key.toLowerCase();

    // reset correctAnswer to always start false
    var correctAnswer = false;

    // check if user input is a letter 
    // also check if user already guessed that letter
    // otherwise, do nothing
    if (game.letterBank.indexOf(userLetter) > -1 && game.isPlaying) {

        var userRender = userLetter.toUpperCase();

        // need a way to track how many letters have been guessed correctly 
        // placed this logic in word blank generator 
        
        // check if userLetter is in the word 
        var userLetterIndex = game.word.indexOf(userLetter);
        var userGuessIndex = game.userGuesses.indexOf(userLetter);

        while (userLetterIndex > -1) {
            game.render('.span-' + userLetterIndex, userRender);
            userLetterIndex = game.word.indexOf(userLetter, userLetterIndex + 1);
            
            // flip correct answer switch to deactivate if statement below
            correctAnswer = true;
        } 
        
        if (userGuessIndex === -1 && !correctAnswer) {
            game.addText('span', userRender + ' ', '#letters-p', 'user-span');
            game.userGuesses.push(userLetter);

            //decrease number of guesses after user inputs a letter and if user hasn't guessed that letter
            game.numGuesses--;
            game.render('#guess-span', game.numGuesses);
        }
        
        // need if statement for user winning 
        // this happens when there are no more blank spaces 
        // increase game total by one 
        if (game.getDomElement('#word-p').textContent.toLowerCase() === game.word) {
            game.isPlaying = false;
            game.wins++;
            game.render('#wins-span', game.wins);

            game.gameCount++;
            game.render('#games-span', game.gameCount);

            // randomly pull from end messages array if user wins more than 3 times
            if (game.wins > 3) {
                const message = game.winMessageGenerator();
                game.endMessage(message);
            } else {
                game.endMessage("You win! Thanks for playing! Press any key to play again");
            }

            game.endImage('block', true);
        }

        // need an if statement for when guesses remaining = 0
        // increase game total by one 
        // show correct word
        // show message that user lost
        // flip isPlaying var to false 
        if (game.numGuesses === 0) {
            game.isPlaying = false;

            // fill-in blanks with correct word 
            // loop through correct word, select span, and fill span with letter
            // passed test
            for (i = 0; i < game.word.length; i++) {
                game.render('.span-' + i, game.word[i].toUpperCase());
            }

            game.gameCount++;
            game.render('#games-span', game.gameCount);

            game.endMessage("Game over! Thanks for playing! Press any key to play again");
            game.endImage("block", true);
        }
    }

    if (!game.isPlaying) {
        game.endCount++;
        // reset the game second time enter this if statement
        if (game.endCount > 1) {
            game.render('#word-p', '');
            game.render('#message-p', '');
            game.render('#letters-p', 'Letters already guessed: ');
            game.wordBlankGenerator();
            game.render('#guess-span', game.numGuesses);
            game.endImage('none', false);
            game.endCount = 0;
            game.isPlaying = true;
            game.userGuesses = [];
        }
    }
};