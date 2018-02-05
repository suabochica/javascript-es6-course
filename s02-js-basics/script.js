//-------------------------------------
// Coding Challange
//-------------------------------------
/**
 * John and a friend invented a simple game where the player with the highest value of his heigh (in centimeters)
 * plus five times his age wins.
 * 
 * 1. Create variables for the heights and ages of two friends and assign the some values.
 * 2. Calculate their scores.
 * 3. Decide who wins and print the winner to the console. Include the score in the output and don't forget that there can be a draw.
 * 4. Extra: Add a third player and now decide who wins.
 * 
 */
 
 var scorePlayerOne,
     scorePlayerTwo,
     playerOneHeight = 180,
     playerOneAge = 18,
     playerTwoHeight = 180,
     playerTwoAge = 20,
     playerThree = false;
     
scorePlayerOne = playerOneHeight + (playerOneAge * 5);
scorePlayerTwo = playerTwoHeight + (playerTwoAge * 5);

if (playerThree) {
    if (scorePlayerOne > scorePlayerTwo) {
        console.log('Player three decides that the winner is player one');
    } else {
        console.log('Player three decides that the winner is player two');
    }
} else {
    if (scorePlayerOne > scorePlayerTwo) {
        console.log('Player one wins with a score of ' + scorePlayerOne);
    } else if (scorePlayerOne === scorePlayerTwo) {
        console.log('We have a draw with a score of ' + scorePlayerOne);
    } else {
        console.log('Player two wins with a score of ' + scorePlayerTwo);
    }
}
