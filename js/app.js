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
  if (clicked.classList.contains('card') &&
      /*!clicked.classList.contains('open') &&
      !clicked.classList.contains('show') &&
      !clicked.classList.contains('match') &&*/
      openCards.length < 2) {
    console.log('card clicked');
    flip(clicked);
    addOpen(clicked);
    if (openCards.length === 2) {
      console.log('going to match function');
      matchCards(clicked);
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
var moveCount = 0;
document.querySelector('.moves').textContent = moveCount;

function moves(moveCount) {
    moveCount++;
    var moveText = document.querySelector('.moves');
    moveText.innerHTML = moveCount;
    return moveCount
}
moves(moveCount);

function starRating(moveCount) {
  if (moveCount === 24) {
    //hide the third star after 24 moves
    $('#thirdStar').hide();
    //hide second star after 12 moves
  } else if (moveCount === 12) {
    $('#secondStar').hide();
  }
}
starRating(moveCount);

var totalSeconds = 0; //sets initial timer to 00:00

function startTimer() {
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
}
startTimer();

//match cards
var matched = 0;

function matchCards(clicked, closed) {
  console.log('Match Function');
  if (
    openCards[0].firstElementChild.className ===
    openCards[1].firstElementChild.className
  ) {
    console.log('match cards true');
    setMatch(openCards);
  } else {
    console.log('match cards false');
    setTimeout(function() {
      closeCard(openCards);
    }, 1000);//delays calling closeCard so you can see the flipped card
  }
  console.log('clearing open array');
  setTimeout(function() {
    openCards = [];
  }, 1002);//resets 2 milliseconds after the closeCard function is called
}

function setMatch(openCards) {
  console.log('set match');
  openCards[1].classList.toggle('match');
  openCards[0].classList.toggle('match');
    matched += 2;
    if (matched === 16) {
      console.log('end game');
      endGame();
    }
}

function closeCard(openCards) {
  console.log('close card');
  openCards[1].classList.toggle('open');
  openCards[1].classList.toggle('show');
  openCards[0].classList.toggle('open');
  openCards[0].classList.toggle('show');
}

//restart
$(".fa-repeat").click(function refresh() {
  console.log('refreshing');
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
