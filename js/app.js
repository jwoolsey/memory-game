window.onload = function() {
  init();
}

//initialize game
function init() {
  //Call shuffle to reorder the array of cards
  shuffle(cards);
  //call the gameboard function to show the cards
  gameboard();
  //initialize timer
  startClock();
}

/*
* Global Variables
*/

//create array of card values
var cards = [
              'fa-diamond', 'fa-diamond',
              'fa-paper-plane-o', 'fa-paper-plane-o',
              'fa-anchor', 'fa-anchor',
              'fa-bolt', 'fa-bolt',
              'fa-cube', 'fa-cube',
              'fa-leaf', 'fa-leaf',
              'fa-bicycle', 'fa-bicycle',
              'fa-bomb', 'fa-bomb',
            ];

var deck = document.querySelector('.deck');
var openCards = []; //initialize open card array
var moveCount = 0; //Initial move count
var starCount = 3; //initial star rating
var totalSeconds = 0; //sets initial timer to 00:00
var gameTimer;
var matched = 0; //match cards

/*
* Functions for Game Play
*/

//create card from array values
function cardList(card) {
  return `<li class="card"><i class="fa ${card}"></i></li>`;
}

//function to create gameboard
function gameboard() {
  var cardHTML = cards.map(function(card) {
    return cardList(card);
  });
  deck.innerHTML = cardHTML.join('');
  return deck;
}

//Add event listener for card clicks to initiate showing symbol and add to open card list
deck.addEventListener('click', evt => {
  var clicked = evt.target;
  if (clicked.classList.contains('card') && !clicked.classList.contains('match') && openCards.length < 2) {
    flip(clicked);
    addOpen(clicked);
    if (openCards.length === 2) {
      matchCards(clicked);
      moves();
      starRating(moveCount);
    }
  }
});

//add clicked 'open' card to array
function addOpen(clicked) {
  openCards.push(clicked);
}

//Toggle 'open' and 'show' class on click
function flip(clicked) {
  clicked.classList.toggle('open');
  clicked.classList.toggle('show');
}

//Increment moves and update display
function moves() {
  moveCount++;
  const moveText = document.querySelector('.moves');
  moveText.innerHTML = moveCount;
  return moveCount;
}

//Update star display based on number of moves
function starRating(moveCount) {
  if (moveCount === 21) {
    //hide the third star after 21 moves
    $('#thirdStar').hide();
    starCount = 1;
    //hide second star after 14 moves
  } else if (moveCount === 14) {
    $('#secondStar').hide();
    starCount = 2;
  }
}

//timer function to give minutes and seconds
function startTimer() {
  gameTimer = setInterval(() => {
    totalSeconds++;
    //calculate minutes from seconds
    var minute = Math.floor(totalSeconds/60);
    if (minute < 10) {
      minute = '0' + minute; //add leading '0' if less than 10 minutes
    }
    var seconds = totalSeconds - (minute*60);
    if (seconds < 10) {
      seconds = '0' + seconds; //add leading '0' if less than 10 seconds
    }
    document.getElementById('timer').innerHTML = minute + ":" + seconds;
  }, 1000);//interval = 1 second, timer appears after one second at count 00:01
}

//function to initialize timer on first click of deck
function startClock() {
  $('.deck').one('click', function() {
    startTimer()
  });
}

//function to stop the timer
function stopClock() {
  clearInterval(gameTimer);
}

//check for matching cards
function matchCards(clicked) {
  if (
    openCards[0].firstElementChild.className ===
    openCards[1].firstElementChild.className
  ) {
    setMatch(openCards);
  } else {
    setTimeout(function() {
      closeCard(openCards);
    }, 500);//delays calling closeCard so you can see the flipped card
  }
  setTimeout(function() {
    openCards = [];
  }, 501);//resets 1 milliseconds after the closeCard function is called
}

//Adds 'match' class to open cards
function setMatch(openCards) {
  openCards[1].classList.toggle('match');
  openCards[0].classList.toggle('match');
  matched += 2;
  if (matched === 16) {
    setTimeout(function() {
      endGame();
    }, 500);
  }
}

//loop through open cards and remove 'open' & 'show' class
function closeCard(openCards) {
  for (let open of openCards) {
    open.classList.toggle('open');
    open.classList.toggle('show');
  }
}

//Click event listener on restart button calls refresh
$(".fa-repeat").click(function() {
  refresh();
});

//resets game
function refresh() {
  //reset timer
  totalSeconds = 0;
  document.getElementById('timer').innerHTML = '00:00';

  //reset move counter
  moveCount = 0;
  document.querySelector('.moves').innerHTML = moveCount;

  //reset stars
  starCount = 3;
  $('#secondStar').show();
  $('#thirdStar').show();

  //reset card classList
  const matchedCards = document.querySelectorAll('.deck li');
  for (let match of matchedCards) {
    match.className = 'card';
  }
  matched = 0;

  init();
}

// Get the modal
const modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

//Add event listener for modal button to call refresh and close modal
document.querySelector('.modalReplay').addEventListener('click', () => {
  modal.style.display = 'none';
  refresh();
});

//Add stats to the Modal
function writeStats() {
  const timeStat = document.querySelector('.modalTime');
  const timerClock = document.getElementById('timer').innerHTML;
  const moveStat = document.querySelector('.modalMoves');
  const starStat = document.querySelector('.modalStars');

  timeStat.innerHTML = `Time = ${timerClock}`;
  moveStat.innerHTML = `Moves = ${moveCount}`;
  starStat.innerHTML = `Stars = ${starCount}`;
}

//game over
function endGame() {
  stopClock();
  writeStats();
  //display modal
  modal.style.display = 'block';
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
