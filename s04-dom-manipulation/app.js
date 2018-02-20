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
    diceValue,
    isGamePlaying;
    
initializeGame();

/*
document.querySelector('#current-' + activePlayer).textContent = '0';

var readTextContentScoreOne = document.querySelector('#score-' + activePlayer).textContent;
console.log(readTextContentScoreOne);
*/

// Add event listener to the roll dice button
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(isGamePlaying) {
        var diceValue;
    
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
    }
});

// Add event listener to the hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(isGamePlaying) {
        scores[activePlayer] += roundScore;
    
        if(scores[activePlayer] >= 20) {
            document.querySelector('#name-'+ activePlayer).textContent = 'WINNER!';
            document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            
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

    document.querySelector('.dice').style.display = 'none';
}

// Don't repeat yourself: Create a function to initialize your game and call it on new game button and at the begining of this javascript file.
function initializeGame() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    isGamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';

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
