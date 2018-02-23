// ----------------------------------------------------
// Code Challenge
// ----------------------------------------------------

/**
* 1. A player losses his ENTIRE score when he rolls two 6 in a row. After that, it' the  
* turn changes.
* 2. Add an input field to the HTML here players can set the winnign score, so that they can 
* change the predifined score of 100.
* 3. Add another dice to the game, so that there are two dices now. The player losses his current
* score when on of them is a 1.
*
*/

var scores,
    roundScore,
    activePlayer,
    previousDiceValue,
    isGamePlaying;
    
initializeGame();

// Add event listener to the roll dice button
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(isGamePlaying) {        
        var diceOneValue,
            diceTwoValue;

        diceOneValue = Math.floor(Math.random() * 6) + 1;
        diceTwoValue = Math.floor(Math.random() * 6) + 1;

        document.querySelector('.dice-one').style.display = 'block';
        document.querySelector('.dice-two').style.display = 'block';
        document.querySelector('.dice-one').src = 'dice-'+ diceOneValue +'.png';
        document.querySelector('.dice-two').src = 'dice-'+ diceTwoValue +'.png';
        
        // Update the round score IF the rolled number was not a 1
        if(diceOneValue !== 1 && diceTwoValue !== 1) {
            roundScore += diceOneValue + diceTwoValue;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            changePlayerTurn();
        }
    }
});

// Add event listener to the hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    var maxScore,
        inputValue;

    if(isGamePlaying) {
        scores[activePlayer] += roundScore;

        inputValue = document.querySelector('.max-score').value;

        //Check if input value is different from 0, null or undefined
        if(inputValue) {
            maxScore = inputValue;
        } else {
            maxScore = 100;
        }

        if(scores[activePlayer] >= maxScore) {
            document.querySelector('#name-'+ activePlayer).textContent = 'WINNER!';
            document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
            document.querySelector('.dice-one').style.display = 'none';
            document.querySelector('.dice-two').style.display = 'none';
            
            isGamePlaying = false;
    
        } else {
            changePlayerTurn();
        }
    }
});

// Add event listener to the new game button
document.querySelector('.btn-new').addEventListener('click', initializeGame);

// Don't repeat yourself: Create a function to change the player turns
function changePlayerTurn() {
    document.getElementById('score-'+ activePlayer).textContent = scores[activePlayer];

    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice-one').style.display = 'none';
    document.querySelector('.dice-two').style.display = 'none';
}

// Don't repeat yourself: Create a function to initialize your game and call it on new game button and at the begining of this javascript file.
function initializeGame() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    isGamePlaying = true;
    
    document.querySelector('.dice-one').style.display = 'none';
    document.querySelector('.dice-two').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
