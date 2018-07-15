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

//Add event listener for card clicks
deck.addEventListener('click', evt => {
  var clicked = evt.target;
  if (clicked.classList.contains('card') && openCards.length < 2) {
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
  console.log('card pushed');
  openCards.push(clicked);
}

//Toggle 'open' and 'show' class on click
function flip(clicked) {
  console.log('flip function');
  clicked.classList.toggle('open');
  clicked.classList.toggle('show');
}

//Set initial moves to zero and adjust move count
let moveCount = 0;

function moves() {
  moveCount++;
  const moveText = document.querySelector('.moves');
  moveText.innerHTML = moveCount;
}

function starRating(moveCount) {
  if (moveCount === 24) {
    //hide the third star after 24 moves
    $('#thirdStar').hide();
    //hide second star after 12 moves
  } else if (moveCount === 12) {
    $('#secondStar').hide();
  }
}

var totalSeconds = 0; //sets initial timer to 00:00

$('.deck').one('click', function startTimer() {
  setInterval(function gameTimer() {
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

//Click event listener on restart button resets deck to 'card' class only
$(".fa-repeat").click(function refresh() {
  const matchedCards = document.querySelectorAll('.deck li');
  for (let match of matchedCards) {
    match.className = 'card';
  }
});

// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//game over
function endGame() {
//display modal
  modal.style.display = "block";
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



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
