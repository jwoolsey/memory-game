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

//Call shuffle to reorder the array
shuffle(cards);

//create card from array values
function cardList(card) {
  return `<li class="card"><i class="fa ${card}"></i></li>`;
}

var deck = document.querySelector('.deck');

//function to create gameboard
function gameboard() {
  var cardHTML = cards.map(function(card) {
    return cardList(card);
  });
  deck.innerHTML = cardHTML.join('');
  return deck;
}
//call the gameboard function to show the cards
gameboard();

//initialize open card array
var openCards = [];

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

//Set initial moves to zero and adjust move count
let moveCount = 0;

function moves() {
  moveCount++;
  const moveText = document.querySelector('.moves');
  moveText.innerHTML = moveCount;
  return moveCount;
}

let starCount = 3;

function starRating(moveCount) {
  if (moveCount === 24) {
    //hide the third star after 24 moves
    $('#thirdStar').hide();
    starCount = 1;
    //hide second star after 12 moves
  } else if (moveCount === 12) {
    $('#secondStar').hide();
    starCount = 2;
  }
}

let totalSeconds = 0; //sets initial timer to 00:00
let gameTimer;

$('.deck').one('click', function startTimer() {
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
});
// TODO: add clock stop function on endGame & reset timer on refresh

function stopClock() {
  clearInterval(gameTimer);
}

//match cards
var matched = 0;

function matchCards(clicked) {
  if (
    openCards[0].firstElementChild.className ===
    openCards[1].firstElementChild.className
  ) {
    setMatch(openCards);
  } else {
    setTimeout(function() {
      closeCard(openCards);
    }, 1000);//delays calling closeCard so you can see the flipped card
  }
  setTimeout(function() {
    openCards = [];
  }, 1001);//resets 1 milliseconds after the closeCard function is called
}

//Adds 'match' class to open cards
function setMatch(openCards) {
  openCards[1].classList.toggle('match');
  openCards[0].classList.toggle('match');
  matched += 2;
  if (matched === 16) {
    endGame();
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

//resets deck to 'card' class only
function refresh() {
  totalSeconds = 0;
  moveCount = 0;
  const matchedCards = document.querySelectorAll('.deck li');
  for (let match of matchedCards) {
    match.className = 'card';
  }
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
  refresh();
  modal.style.display = 'none';
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
  //display modal
  stopClock();
  writeStats();
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
