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

//function to create gameboard
function gameboard() {
  var deck = document.querySelector('.deck');
  var cardHTML = cards.map(function(card) {
    return cardList(card);
  });
  deck.innerHTML = cardHTML.join('');
  return deck;
}
//call the gameboard function to show the cards
gameboard();

//Flip cards
var allCards = document.querySelectorAll('.card');
var openCards = [];

allCards.forEach(function flip(card) {
  card.addEventListener('click', function(evt) {

    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match') && openCards.length < 2) {
      openCards.push(card);
      card.classList.add('open', 'show');
    }
  });
});



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

function matchCards(openCards) {
  if (
    openCards[0].firstElementChild.className ===
    openCards[1].firstElementChild.className
  ) {
    openCards.forEach(setMatch(card));
    console.log('match cards true');
  } else {
    //setTimeout(function() {
    openCards.forEach(closeCard(card));
    console.log('match cards false');
    }//, 1000);
  //}
  openCards = [];
}

function setMatch(card) {
  card.classList.add('match');
    matched += 2;
    if (matched === 16) {
      endGame();
    }
    console.log('set match');
}

function closeCard(card) {
  card.classList.remove('open', 'show');
  console.log('close card');
}

if (openCards.length === 2) {
  matchCards(openCards);
}

//restart
function refresh(card) {
  var restart = document.querySelector('.fa-repeat');
  restart.addEventListener('click', function(e) {
    allCards.forEach(function(card) {
      card.classList.remove('open', 'show', 'match');
    });
    openCards = [];
  });
}
refresh();

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
