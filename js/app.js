/*
 * Create a list that holds all of your cards
 */
const icons = [
    "fa fa-diamond", "fa fa-diamond",
    "fa fa-paper-plane-o", "fa fa-paper-plane-o",
    "fa fa-anchor", "fa fa-anchor",
    "fa fa-bolt", "fa fa-bolt",
    "fa fa-cube", "fa fa-cube",
    "fa fa-leaf", "fa fa-leaf",
    "fa fa-bicycle", "fa fa-bicycle",
    "fa fa-bomb", "fa fa-bomb"
];

// declaring move variable
let moves = 0;
let moveCounter = document.querySelector('.moves');
// declaring variable of matchedCards
let matchedCards = document.getElementsByClassName('match');
// declare variables for star icons
let stars = document.querySelectorAll('.fa-star');

function generateCard(card) {
    return `<li class = "card" data-card = "${card}"><i class = "fa ${card}"></i></li>`;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

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

 //start the game
document.body.onload = initGame();

function initGame() {
    let deck = document.querySelector('.deck');
    let cardHTML = shuffle(icons).map(function(card) {
        return generateCard(card);
    });

    moves = 0;
    moveCounter.innerText = moves;

    deck.innerHTML = cardHTML.join('');

}

initGame();


let allCards = document.querySelectorAll('.card');
let openCards = [];

allCards.forEach(function(card) {
    card.addEventListener('click', function(e) {

        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match'))
            openCards.push(card);
        card.classList.add('open', 'show');


        if (openCards.length == 2) {
            if (openCards[0].dataset.card == openCards[1].dataset.card) {
                openCards[0].classList.add('match');
                openCards[0].classList.add('open');
                openCards[0].classList.add('show');

                openCards[1].classList.add('match');
                openCards[1].classList.add('open');
                openCards[1].classList.add('show');

                openCards = [];
            } else {
                setTimeout(function() {
                    openCards.forEach(function(card) {
                        card.classList.remove('open', 'show');
                    });

                    openCards = [];
                }, 300);
            }
            moveCount();
            starRating();

            if (matchedCards.length == 16) {
            	openModal();
                function myPopup() {
    			let popup = document.getElementById("myPopup");
    			popup.classList.toggle("show");
			}
            }
        }
    });
});

// Handles primary game logic of game
var onClick = function() {
    if (isValid( $(this) )) {

        if (open.length === 0) {
            openCard( $(this) );

        } else if (open.length === 1) {
            openCard( $(this) );
            moveCounter++;
            updateMoveCounter();

            if (checkMatch()) {
                setTimeout(setMatch, 300);

            } else {
                setTimeout(resetOpen, 700);

            }
        }
    }
};

//count player moves
function moveCount() {
    moves++;
    moveCounter.innerHTML = moves;
// star timer
    if (moves == 1) {
        sec = 0;
        min = 0;
        startTimer();
    }
}
// star rating
function starRating() {
    if (moves > 8 && moves < 12) {
        for (var i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = 'collapse';
            }
        }
    } else if (moves > 13) {
        for (var i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = 'collapse';
            }
        }
    }
}
//game timer
let sec = 0;
let min = 0;
let timer = document.querySelector('.timer');
let interval;

function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = `${min}  ${sec}  `;
        sec++;

        if (sec == 60) {
            min++;
            sec = 0;
        }
    }, 1000);
}


//congratulations popup
let modal = document.getElementById('win');
let span = document.getElementsByClassName("close")[0];

function openModal() {
    modal.style.display = "block";

    clearInterval(interval);

    let moveScore = document.querySelector('.final-moves');
    moveScore.innerHTML = moves;

    let timeScore = document.querySelector('.final-time');
    timeScore.innerHTML = `${min}  ${sec} `;

    let starScore = document.querySelector('.final-stars');
    let starRating = document.querySelector('#star-rating').innerHTML;
    starScore.innerHTML = starRating;

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
//restart game
const refreshIcon = document.body.querySelector('.restart');
	  refreshIcon.addEventListener('click', function () {
  	  location.reload();
});

function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //closeicon on modal
        closeModal();
    };
}


// @description close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}


// @desciption for user to play Again 
function playAgain(){
    modal.classList.remove("show");
    startGame();
}
