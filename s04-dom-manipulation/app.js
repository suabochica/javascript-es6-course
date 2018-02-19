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

/*
document.querySelector('#current-' + activePlayer).textContent = diceValue;

var readTextContentScoreOne = document.querySelector('#score-' + activePlayer).textContent;
console.log(readTextContentScoreOne);
*/

document.querySelector('.dice').style.display = 'none';

// Add event listener to the roll dice button
document.querySelector('.btn-roll').addEventListener('click', function() {
    var diceElement = document.querySelector('.dice');
    
    diceValue = Math.floor(Math.random() * 6) + 1;
    
    diceElement.style.display = 'block';
    diceElement.src = 'dice-'+ diceValue +'.png';
    
    // Update the round score IF the rolled number was not a 1
    if(diceValue !== 1) {
        roundScore += diceValue;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
        activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        diceElement.style.display = 'none';
    }
});
