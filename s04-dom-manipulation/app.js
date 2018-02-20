/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,
    roundScore,
    activePlayer,
    diceValue;
    
scores = [0, 0];
roundScore = 0;
activePlayer = 0; 
diceValue = 0

/*
document.querySelector('#current-' + activePlayer).textContent = diceValue;

var readTextContentScoreOne = document.querySelector('#score-' + activePlayer).textContent;
console.log(readTextContentScoreOne);
*/

document.getElementById('score-0').textContent = diceValue;
document.getElementById('score-1').textContent = diceValue;
document.getElementById('current-0').textContent = roundScore;
document.getElementById('current-1').textContent = roundScore;
document.querySelector('.dice').style.display = 'none';

// Add event listener to the roll dice button
document.querySelector('.btn-roll').addEventListener('click', function() {
    diceValue = Math.floor(Math.random() * 6) + 1;
    
    document.querySelector('.dice').style.display = 'block';
    document.querySelector('.dice').src = 'dice-'+ diceValue +'.png';
    
    // Update the round score IF the rolled number was not a 1
    if(diceValue !== 1) {
        roundScore += diceValue;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
        changePlayerTurn();
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    scores[activePlayer] += roundScore;

    if(scores[activePlayer] >= 20) {
        document.querySelector('#name-'+ activePlayer).textContent = 'WINNER!';
        document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
        document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
        document.querySelector('.dice').style.display = 'none';

    } else {
        changePlayerTurn();
    }
});

// Don't repeat yourself: Create a functio to change the player turns
function changePlayerTurn() {
    document.getElementById('score-'+ activePlayer).textContent = scores[activePlayer];

    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}