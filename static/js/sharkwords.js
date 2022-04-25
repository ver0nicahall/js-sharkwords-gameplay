const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;
let correctGuesses = 0;

// Loop over the chars in `word` and create divs.
//

const createDivsForChars = (word) => {
  const wordContainer = document.querySelector('#word-container');
  for (const letter of word) {
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  const letterButtonContainer = document.querySelector('#letter-buttons');
  for (const char of ALPHABET) {
    letterButtonContainer.insertAdjacentHTML('beforeend', `<button>${char}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  buttonEl.disabled = true;
};

//helper function to disable all letter buttons 
const disableAllLetterButtons = () => {
  const buttons = document.querySelectorAll('button');
  for (const button of buttons) {
    button.disabled = true;
  }
}

// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => document.querySelector(`div.${letter}`) !== null;

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter, word) => {
  // select all html elements with letter class
  correctLetters = document.querySelectorAll(`.${letter}`);

  //loop over each html element
  for (let correctLetter of correctLetters) {
    //update the blank to fill with the letter
    correctLetter.innerHTML = letter;
    //increase # of correct letters guessed
    correctGuesses += 1;
  }
  //if user has guessed the word correctly
  if (correctGuesses === word.length) {
    disableAllLetterButtons();
    //show congrats message
    document.querySelector('#win').style.display = 'block'; 
  }



};

//
// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.

const handleWrongGuess = () => {
  numWrong += 1;
  const sharkPhoto = document.querySelector('img');
  // if user gets to 5 wrong guesses
  if (numWrong === 5) {
    disableAllLetterButtons();
    //unhide hidden play again message
    document.querySelector('#play-again').style.display = ''; //'' unhides element
  //otherwise  
  }
  //update image
  sharkPhoto.setAttribute('src', `/static/images/guess${numWrong}.png`);
    
};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // choose a random word using random
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];

  createDivsForChars(word);
  generateLetterButtons();

  for (const button of document.querySelectorAll('button')) {
    // add an event handler to handle clicking on a letter button
    button.addEventListener('click', () => {
      //disable the letter button 
      disableLetterButton(button);
      let letter = button.innerHTML;
      //if guess was correct 
      if (isLetterInWord(letter)) {
        //handleCorrectGuess
        handleCorrectGuess(letter, word);
      //otherwise   
      } else {
        //handleWrongGuess
        handleWrongGuess(letter);
      }
    })
  }

  // add an event handler to handle clicking on the Play Again button
  const playAgain = document.querySelector('#play-again');
  playAgain.addEventListener('click', () => {
    resetGame();
  });

  const winButton = document.querySelector('#win');
  winButton.addEventListener('click', () => {
    resetGame();
  });
})();
