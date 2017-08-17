//loads the script before running
    $(document).ready(function() {

        //Varible set to an Array of questions with options and answers
        var questions = [{
            question: "Who invented Pizza??",
            choices: ["0) Ireland", "1) Italy", "2) China", "3) America"],
            correctAnswer: 2
        }, {
            question: "What is the 5th digit of PI?",
            choices: ["0) 1", "1) 9", "2) 3", "3) 5"],
            correctAnswer: 3
        }, {
            question: "What country was Neutral during WWII?",
            choices: ["0) America", "1) Switzerland", "2) Germany", "3) England"],
            correctAnswer: 1
        }, {
            question: "What day was the Declaration of Independence Signed?",
            choices: ["0) July, 4th", "1) July, 8th", "2) January, 5th", "3) December, 15th"],
            correctAnswer: 0
        }, {
            question: "What year was the Declaration of Independence Signed?",
            choices: ["1) 1934", "2) 1629", "3) 1776", "4) 1853"],
            correctAnswer: 2
        }];
        //variables
        var currentQuestion = 0;
        var correctAnswers = 0;
        var quizOver = false;
        var correctAnswer = 0;
        var wrongAnswer = 0;
        var usersChoice;
        var timeLeft = 30;
        var elem = document.getElementById('timer');
        var timerId = setInterval(countdown, 1000);
        //sets countdown to 30 and marks question wrong if reaches 0
        function resetQuiz() {
            currentQuestion = 0;
            correctAnswers = 0;
            quizOver = false;
            correctAnswer = 0;
            wrongAnswer = 0;
            usersChoice;
            timeLeft = 30;
            elem = document.getElementById('timer');
            timerId = setInterval(countdown, 1000);
            $(".choiceList").show();
            $(".question").show();
            $(".wrong").hide();
            $(".correct").hide();
        }



        function countdown() {
            if (timeLeft == 0) {
                clearTimeout(timerId);
                nextButton();
                wrongAnswer++;
            } else {
                elem.innerHTML = timeLeft + "Seconds Remaining";
                timeLeft--;
            }
        };
        //moves on to next question and resets timer
        function nextButton() {
            timeLeft = 30;
            timerId = setInterval(countdown, 1000);
            if (!quizOver) {
                // checks to see if user selected an answer if no answer displays please select an answer
                if (usersChoice == undefined) {
                    $(document).find(".quizMessage").hide();
                    currentQuestion++;
                    if (currentQuestion < questions.length) {
                        displayCurrentQuestion();
                    } else {
                        //if answer is selected move to next question if on last question display final score
                        $(document).find(".quizMessage").hide();
                        currentQuestion++;
                        if (currentQuestion < questions.length) {
                            displayCurrentQuestion();
                        } else {
                            displayScore();
                            //if quiz is over change next button to play agian button
                            $(document).find(".nextButton").text("Play Again?");
                            quizOver = true;
                            resetQuiz();

                        }
                    }
                } else {
                    quizOver = false;
                    $(document).find(".nextButton").text("Next Question");
                    displayCurrentQuestion();

                };
            };
        };

        //function displays the number of correct answers
        function displayScore() {
            $(".question").hide();
            $(".choiceList").hide();
            $(".wrong").show();
            $(".correct").show();
            $(document).find(".correct").text("Correct Answers: " + correctAnswers)
            $(document).find(".wrong").text("wrong Answers: " + wrongAnswer)
        }
        //calls the function display current question
        displayCurrentQuestion();
        $(this).find(".quizMessage").hide();
        //when next question button is clicked checks to see if quiz is over based on number of questions
        $(this).find(".nextButton").on("click", function() {
            timeLeft = 30;
            if (!quizOver) {
                // checks to see if user selected an answer if no answer displays please select an answer
                if (usersChoice == undefined) {
                    $(document).find(".quizMessage").text("Please select an answer");
                    $(document).find(".quizMessage").show();
                } else {
                    //if answer is selected move to next question if on last question display final score
                    $(document).find(".quizMessage").hide();
                    currentQuestion++;
                    if (currentQuestion < questions.length) {
                        displayCurrentQuestion();
                    } else {
                        displayScore();
                        //if quiz is over change next button to play agian button
                        $(document).find(".nextButton").text("Play Again?");
                        quizOver = true;

                    }
                }
            } else {
                quizOver = false;
                $(document).find(".nextButton").text("Next Question");
                resetQuiz();
                displayCurrentQuestion();


            }
        });
        //displays user selection
        $("ul.choiceList").on("click", "li.answer", function() {

            usersChoice = $(this).attr("compare");
            $(document).find(".quizMessage").text("you chose answer " + usersChoice);

            $(document).find(".quizMessage").show();
            if (usersChoice == correctAnswer) {

                correctAnswers++;
                console.log("correct Answer" + correctAnswers);
            } else {
                wrongAnswer++;
                console.log("wrongngAnswer" + wrongAnswer)
            }
        })
        //displays the current question
        function displayCurrentQuestion() {

            console.log("in display current question")

            var question = questions[currentQuestion].question;
            var questionClass = $(document).find(".quizContainer > .question");
            var choiceList = $(document).find(".quizContainer > .choiceList");
            var numChoices = questions[currentQuestion].choices.length;

            correctAnswer = questions[currentQuestion].correctAnswer;

            questionClass.text(question);


            choiceList.find("li").remove();

            var choice;
            for (i = 0; i < numChoices; i++) {
                choice = questions[currentQuestion].choices;

                var choiceli = $("<li>")
                //compares user input to correct answer
                choiceli.attr("compare", i);
                choiceli.addClass("answer");
                choiceli.text(choice[i]);
                choiceList.append(choiceli);


            }
        }
    });