// ----------------------------------------------------
// Code Challenge: Quiz
// ----------------------------------------------------

/**
* Part one
*
* 1. Build a constructor called Question to describe a question, should include:
*   1.1. The question itself
*   1.2. The answers from which the player can choose the correct one
*   1.3. The correct answer
* 2. Create a couple of  question using the constructor.
* 3. Store the all the question in an array.
* 4. Select one random question and log it on the console, together with the possible answers.
* 5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on task 4.
* 6. Check if the answer is correct and print to the console whether the answer is correct or not.
* 7. Make sure that all your code is private.
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

    Question.prototype.checkAnswer = function(userAnswer) {
        if (userAnswer === this._correctAnswer) {
            console.log('Correct answer!')
        } else {
            console.log('Ops! Try again')
        }
    }

    var answersToQuestionOne = ['15', '13', '10', '19'];
    var questionOne = new Question('What Episode did Ling and his followers first appear in?', answersToQuestionOne, 0);

    var answersToQuestionTwo = ['Colonel','Watchman','Furher'];
    var questionTwo = new Question('What Military rank did Roy Mustang aspire to achieve?', answersToQuestionTwo, 2)

    var answersToQuestionThree = ['Wrath','Slot','Lust', 'Greed'];
    var questionThree = new Question('Which Homunculus didn\'t recognize Edward and Alphonse when they first met?', answersToQuestionThree, 1);

    var questions = [questionOne, questionTwo, questionThree];
    var selectedRandomQuestion = Math.floor(Math.random() * questions.length);

    questions[selectedRandomQuestion].displayQuestion();
    var userAnswer = parseInt(prompt('Select your answer'));
    questions[selectedRandomQuestion].checkAnswer(userAnswer);
})();
