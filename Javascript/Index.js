
const cardsArray = [ {
    name: 'cardinals',
    img: './memory/img/cardinals.gif',
  },
  {
    name: 'broncos',
    img: './memory/img/broncos.gif',
  },
  {
    name: 'chiefs',
    img: './memory/img/chiefs.gif',
  },
  {
    name: 'dolphins',
    img: './memory/img/dolphins.gif',
  },
  {
    name: 'packers',
    img: './memory/img/packers.gif',
  },
  {
    name: 'chargers',
    img: './memory/img/chargers.gif',
  },
  {
    name: 'raiders',
    img: './memory/img/raiders.gif',
  },
  {
    name: 'rams',
    img: './memory/img/rams.gif',
  },
  {
    name: 'saints',
    img: './memory/img/saints.gif',
  },
  {
    name: 'seahawks',
    img: './memory/img/seahawks.gif',
  },
  {
    name: 'texans',
    img: './memory/img/texans.gif',
  },
  {
    name: 'titans',
    img: './memory/img/titans.gif',
  },];
  
  
//variables
let moves = 0;
const movesCount = document.querySelector('.moves-count');
const modalTimer = document.querySelector('.modalTimerDisplay');
const modal = document.querySelector('#simpleModal');
const game = document.getElementById('game');
const stars = document.querySelectorAll('.fa-star');
const modalMoves = document.querySelector('.modal-body .moves-count');
const replayButton = document.getElementById('replayButton');
const modalRating = document.querySelector('.modal-body .rating');
const restartGame = document.querySelector('.fa-repeat');
const modalCloseBtn = document.querySelector('.modal-close-btn');
let rating = 3;
let matches = 0;
//selection variables
let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget= null;
let delay = 1200;
var timeInterval = null;
//timer variables
var sec = 0;
var min = 0;
// Create a section with a class of grid
const grid = document.createElement('section');

grid.setAttribute('class', 'grid');
// Append the grid section to the game div
game.appendChild(grid);
//created 2 cards of each type
let gameGrid = cardsArray.concat(cardsArray);
//random sort
sortBoard();
//create cards for gameGrid and add classes
gameGrid.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = item.name;
    const front = document.createElement('div');
    front.classList.add('front');
    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${item.img})`;
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);

})

function sortBoard(){
    gameGrid.sort(() => 0.5 - Math.random());
}
//count moves method
function incrementMove() {
  moves++;
  movesCount.textContent = moves;
  determineRating();
}
//reset score method
function resetScore() {
  // Reset rating
  rating = 3;
  stars.forEach(star => star.classList.add('fa-star'));
  moves = 0;
  movesCount.textContent = moves;
  // Reset matches
  matches = 0;
}
//click events for reset buttons
replayButton.addEventListener('click', function(){
  resetScore();
  location.reload();
});

restartGame.addEventListener('click', function(){
  resetScore();
  location.reload();
});
modalCloseBtn.addEventListener('click', closeModal);
//click event for clicking on cards in grid
grid.addEventListener('click', function(event) {
    // The event target is our clicked item
    let clicked = event.target;
    if (
        clicked.nodeName === 'SECTION' ||
        clicked === previousTarget ||
        clicked.parentNode.classList.contains('selected') ||
        clicked.parentNode.classList.contains('match')
      ) {
        return;
      }
    if(count < 2){
        count++;
        if(count === 1 ){
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }
        else{
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }
        if(firstGuess && secondGuess){
            //called when cards match
            if(firstGuess === secondGuess){ 
                incrementMatches();
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
            }
            else{
                setTimeout(resetGuesses, delay);
            }
            incrementMove();
        } 
        previousTarget = clicked         
    }   
   
  });
//reset guesses lamda method
const resetGuesses = () => {
  firstGuess = ''
  secondGuess = ''
  count = 0
  
  var selected = document.querySelectorAll('.selected')
  selected.forEach(card => {
    card.classList.remove('selected')
  })
}
function closeModal() {
  resetScore();
  //location.reload();
  modal.style.display = 'none';
}
//once 12 matches are found, open modal and end game
function checkGameWin() {
  if (matches === 12) {
    moves++;
    clearInterval(timeInterval);
    setTimeout(openModal(),500);
  }
}
//timer that starts onload
window.onload = () => {
  timer();
}

//timer method
function timer(){
  timeInterval = setInterval(function(){
      document.getElementById('safeTimerDisplay').innerHTML=  `Timer | ${min}:${sec}`;
      sec++;
      if(sec == 60){
        min++;
        sec = 0;
      }   
  }, 1000);
}

function determineRating() {
  if (moves === 5) {
      rating--;
      stars[2].classList.add('fa-star-o');
  } else if (moves === 26) {
      rating--;
      stars[1].classList.add('fa-star-o');
  } else if (moves === 34) {
      rating--;
      stars[0].classList.add('fa-star-o');
  }
}
//open modal method
function openModal() {
  modalMoves.textContent = ` ${moves} moves.`;
  modalTimer.textContent = ` ${min} minute(s) and ${sec} seconds.`
  modalRating.textContent = `${rating} stars`;
  modal.style.display = "block";
}

const match = () => {
  var selected = document.querySelectorAll('.selected')
  selected.forEach(card => {
    card.classList.add('match')
  })
}

const incrementMatches = () => {
  matches++;
  checkGameWin();
}

