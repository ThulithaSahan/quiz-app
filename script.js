const questions = [
            {
                question: "Which is the largest animal in the world?",
                answers: [
                    { text: "Shark", correct: false },
                    { text: "Blue whale", correct: true },
                    { text: "Elephant", correct: false },
                    { text: "Giraffe", correct: false }
                ]
            },
            {
                question: "What is the capital of France?",
                answers: [
                    { text: "London", correct: false },
                    { text: "Berlin", correct: false },
                    { text: "Paris", correct: true },
                    { text: "Madrid", correct: false }
                ]
            },
            {
                question: "Which language runs in a web browser?",
                answers: [
                    { text: "Java", correct: false },
                    { text: "C", correct: false },
                    { text: "Python", correct: false },
                    { text: "JavaScript", correct: true }
                ]
            },
            {
                question: "What year was JavaScript launched?",
                answers: [
                    { text: "1996", correct: false },
                    { text: "1995", correct: true },
                    { text: "1994", correct: false },
                    { text: "None of the above", correct: false }
                ]
            },
            {
                question: "Which planet is known as the Red Planet?",
                answers: [
                    { text: "Venus", correct: false },
                    { text: "Mars", correct: true },
                    { text: "Jupiter", correct: false },
                    { text: "Saturn", correct: false }
                ]
            },
            {
                question: "What does HTML stand for?",
                answers: [
                    { text: "Hypertext Markup Language", correct: true },
                    { text: "Hypertext Machine Language", correct: false },
                    { text: "Hyper Transfer Markup Language", correct: false },
                    { text: "High Text Machine Language", correct: false }
                ]
            }
        ];

        const questionElement = document.getElementById("question");
        const answerButtons = document.getElementById("answer-buttons");
        const nextButton = document.getElementById("next-button");

        let currentQuestionIndex = 0;
        let score = 0;
        let selectedButton = null;

        function startQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            nextButton.innerHTML = "Next";
            showQuestion();
        }

        function showQuestion() {
            resetState();
            let currentQuestion = questions[currentQuestionIndex];
            let questionNo = currentQuestionIndex + 1;
            questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

            currentQuestion.answers.forEach(answer => {
                const button = document.createElement("button");
                button.innerHTML = answer.text;
                button.classList.add("Btn");
                answerButtons.appendChild(button);
                if (answer.correct) {
                    button.dataset.correct = answer.correct;
                }
                button.addEventListener("click", (e) => {
                    // Remove selection from previous button if exists
                    if (selectedButton) {
                        selectedButton.classList.remove("selected");
                    }
                    // Highlight new selection
                    e.target.classList.add("selected");
                    selectedButton = e.target;
                    selectAnswer(e);
                });
            });
        }

        function resetState() {
            nextButton.style.display = "none";
            while (answerButtons.firstChild) {
                answerButtons.removeChild(answerButtons.firstChild);
            }
            selectedButton = null;
        }

        function selectAnswer(e) {
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === "true";
            if (isCorrect) {
                score++;
            }
            Array.from(answerButtons.children).forEach(button => {
                if (button.dataset.correct === "true") {
                    button.classList.add("correct");
                } else if (button === selectedBtn && !isCorrect) {
                    button.classList.add("incorrect");
                }
                button.disabled = true;
            });
            nextButton.style.display = "block";
        }

        function showScore() {
            resetState();
            questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
            nextButton.innerHTML = "Play Again";
            nextButton.style.display = "block";
        }

        function handleNextButton() {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showScore();
            }
        }

        nextButton.addEventListener("click", () => {
            if (currentQuestionIndex < questions.length) {
                handleNextButton();
            } else {
                startQuiz();
            }
        });

        startQuiz();