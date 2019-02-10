let scores = [0, 0],
    roundScore = 0,
    activePlayer = 0,
    gamePlaying = true;

let diceImageOne = document.querySelectorAll('.dice')[0],
    diceImageTwo = document.querySelectorAll('.dice')[1],
    scoreOne = document.querySelector('#score-0'),
    scoreTwo = document.querySelector('#score-1'),
    currentScoreOne = document.querySelector('#current-0'),
    currentScoreTwo = document.querySelector('#current-1'),
    playerOnePanel = document.querySelector('.player-0-panel'),
    playerTwoPanel = document.querySelector('.player-1-panel'),
    playerNameOne = document.querySelector('#name-0'),
    playerNameTwo = document.querySelector('#name-1');



// Hiding dices
hidingDices = () => {
    diceImageOne.style.display = 'none';
    diceImageTwo.style.display = 'none';
}

/*  
    Restarting a game 
    Setting values to default values
    Deleting a winner and active class
*/
newGame = () => {
    hidingDices();
    scores = [0, 0]
    scoreOne.textContent = 0;
    scoreTwo.textContent = 0;
    currentScoreOne.textContent = 0;
    currentScoreTwo.textContent = 0;
    playerNameOne.textContent = 'Player 1';
    playerNameTwo.textContent = 'Player 2';
    playerOnePanel.classList.remove('winner');
    playerTwoPanel.classList.remove('winner');
    playerOnePanel.classList.remove('active');
    playerTwoPanel.classList.remove('active');
    playerOnePanel.classList.add('active');
    gamePlaying = true;
};


newGame();

/*  
    Logic how to roll dices 
    Adding a score to the player 
    Changing an active panel class
*/
rollDice = () => {
    if (gamePlaying) {
        let diceOne = Math.floor(Math.random() * 6) + 1;
        let diceTwo = Math.floor(Math.random() * 6) + 1;

        diceImageOne.style.display = 'block';
        diceImageTwo.style.display = 'block';
        diceImageOne.src = 'img/dice-' + diceOne + '.png';
        diceImageTwo.src = 'img/dice-' + diceTwo + '.png';

        if (diceOne !== 1 && diceTwo !== 1) {
            roundScore += diceOne + diceTwo;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        };

    };
};

/* 
    Logic for hold button
    Updaing UI
    Checking if the player is the winner
*/
savingScore = () => {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        let inputScore = document.querySelector('.final-score').value;
        let winnerScore = 0;

        if (inputScore) {
            winnerScore = inputScore
        } else {
            winnerScore = 100;
        }


        if (scores[activePlayer] >= winnerScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            hidingDices();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        };
    };
};


//  Event listeners
document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', savingScore);
document.querySelector('.btn-new').addEventListener('click', newGame);



/* 
    Changing active player
    Reseting a round score and a current score
    Changing active class 
*/
nextPlayer = () => {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    currentScoreOne.textContent = 0;
    currentScoreTwo.textContent = 0;
    playerOnePanel.classList.toggle('active');
    playerTwoPanel.classList.toggle('active');
    hidingDices();
}

