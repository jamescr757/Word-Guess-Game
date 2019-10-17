// script for hangman game 

// define global variables 
var wins = 0;
var wordBank = []

// create object 
var game = {
    wins: 0,
    wordBank: ["baseball", "hockey", "football", "soccer", "basketball", "rowing", "softball", "volleyball", "golf", "swimming",],

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
    getDomElement(id) {
        return document.getElementById(id);
    },

    // method to render text onto page 
    // passed test 
    render(id, text) {
        // use object method to grab element 
        // modify inner html of that element 
        var element = this.getDomElement(id);
        element.innerHTML = text;
    },

    // method to create an element and append it 
    // passed test
    addText(newTag, newText, parentId) {
        // create element 
        var newElement = document.createElement(newTag);

        // add inner html 
        newElement.innerHTML = newText;

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
        var word = this.wordGenerator();
        console.log(word);
        
        // grab p tag that contains word blanks 
        // need to loop through the word and create a span tag for each word and render a blank on the page 
        // use addText method

        for (var i = 0; i < word.length; i ++) {
            this.addText('span', '__ ', 'word-p');
        }

        // want to return number of guesses inside this method so that the word generator is only run one time 
        return Math.round(word.length * 1.5);
    }
};

// game.render('wins-span', 10);
// var numGuesses = game.wordBlankGenerator();
// game.render('guess-span', numGuesses);

// console.log(game.wordGenerator());
// key event logic
document.onkeyup = function(event) {
    var userLetter = event.key.toLowerCase();
    var userRender = userLetter.toUpperCase();
};