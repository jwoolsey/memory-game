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
    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
      openCards.push(card);
      card.classList.add('open', 'show');
    }
  });
});

//adjust stars and move count
function moves() {
//span class 'moves'
}
//match cards
function matchCards() {

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

//game over
function endGame() {

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
