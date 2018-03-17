// ----------------------------------------------------
// Code Challenge: Quiz Part Two
// ----------------------------------------------------

/**
* Part two
*
* 8. After you display the result, display the next random question, so that the game never ends.
* 9. Be careful, include and option to quit the game if the user writes 'exit'.
* 10. Track the user score. Each time an answer is correct, add 1 point to the score.
* 11. Display the score in the console.
*/

(function(){
    function Question(question, answers, correctAnswer) {
        this._question = question;
        this._answers = answers;
        this._correctAnswer = correctAnswer;
    }


    Question.prototype.displayQuestion = function() {    
        console.log(this._question);

        for (var i = 0; i < this._answers.length; i++){
            console.log(i +': '+ this._answers[i]);
        }
    }

    Question.prototype.checkAnswer = function(userAnswer, callbackFunction) {
        var scoreCallbackValue; 

        if(userAnswer === this._correctAnswer) {
            console.log('Correct answer!')
            scoreCallbackValue = callbackFunction(true);
        } else {
            console.log('Ops! Try again')
            scoreCallbackValue = callbackFunction(false);
        }

        this.displayScore(scoreCallbackValue);
    }

    Question.prototype.displayScore = function(score) {
        console.log('Your current score is: '+ score);
        console.log('----------------------------------');
    }

    var answersToQuestionOne = ['15', '13', '10', '19'];
    var questionOne = new Question('What Episode did Ling and his followers first appear in?', answersToQuestionOne, 0);

    var answersToQuestionTwo = ['Colonel','Watchman','Furher'];
    var questionTwo = new Question('What Military rank did Roy Mustang aspire to achieve?', answersToQuestionTwo, 2)

    var answersToQuestionThree = ['Wrath','Slot','Lust', 'Greed'];
    var questionThree = new Question('Which Homunculus didn\'t recognize Edward and Alphonse when they first met?', answersToQuestionThree, 1);

    var questions = [questionOne, questionTwo, questionThree];

    function handleScore() {
        var score = 0;

        return function(isCorrect) {
            return isCorrect ? score = score += 1 : score = score;
        }
    }

    var keepScore = handleScore();

    function displayNextQuestion() {    
        var selectedRandomQuestion = Math.floor(Math.random() * questions.length);

        questions[selectedRandomQuestion].displayQuestion();
        var userAnswer = prompt('Select your answer');

        if(userAnswer !== 'exit') {
            questions[selectedRandomQuestion].checkAnswer(parseInt(userAnswer), keepScore);
            displayNextQuestion();
        }
    }

    displayNextQuestion();
})();
