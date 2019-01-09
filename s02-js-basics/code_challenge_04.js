//-------------------------------------
// Coding Challenge Four: Basketball average
//-------------------------------------

/**
 * John and Mike both play basketball in different teams. In the latest 3 games, John's teams
 * scored 89, 120 and 103 points, while Mike's team scored 116, 94 and 123 points.
 *
 * 1. Calculate the average score for each team.
 * 2. Decide which teams wins in average (highest average score), and print the winner to the console.
 * 3. Then change the score to show different winners. Don't forget to take into account there might be a draw
 * 4. Extra: Mary also plays basketball, and her team score 97, 134 and 105 points. Like before,
 *    log the average winner to the console. Hint: You will need the && operator to take the decision.
 */

console.log('-------------------------------------------------')
console.log('Coding Challenge Four - Start')
console.log('-------------------------------------------------')

const johnTeamScoreAverage = (92 + 180 + 108) / 3
const mikeTeamScoreAverage = (120 + 140 + 120) / 3
const maryTeamScoreAverage = (50 + 150 + 180) / 3

if(johnTeamScoreAverage > mikeTeamScoreAverage && johnTeamScoreAverage > maryTeamScoreAverage) {
  console.log(`John's Team is the winner with a score average of ${johnTeamScoreAverage}`)
} else if(maryTeamScoreAverage > mikeTeamScoreAverage && maryTeamScoreAverage > johnTeamScoreAverage) {
  console.log(`Mary's Team is the winner with a score average of ${maryTeamScoreAverage}`)
} else if(mikeTeamScoreAverage > johnTeamScoreAverage && mikeTeamScoreAverage > maryTeamScoreAverage) {
  console.log(`Mike's Team is the winner with a score average of ${mikeTeamScoreAverage}`)
} else {
  console.log(`We have a draw in the score average of ${johnTeamScoreAverage}`)
}

console.log('-------------------------------------------------')
console.log('Coding Challenge Four - End')
console.log('-------------------------------------------------')