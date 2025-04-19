// Global variables
let quizEnded = false;
let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let questions = [];

document.addEventListener('DOMContentLoaded', function () {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        const difficulty = urlParams.get('difficulty');

        if (!category || !difficulty) {
            throw new Error('Quiz settings not found');
        }

        fetchQuizQuestions(category, difficulty);

    } catch (error) {
        console.error('Quiz initialization error:', error);
        alert('Quiz settings not found. Returning to home page.');
        window.location.href = 'index.html';
    }
});

async function fetchQuizQuestions(category, difficulty) {
    const skeletonLoader = document.getElementById('skeletonLoader');
    const quizContent = document.getElementById('quizContent');

    try {
        skeletonLoader.style.display = 'block';
        quizContent.style.display = 'none';

        const response = await fetch(
            `https://opentdb.com/api.php?amount=25&category=${category}&difficulty=${difficulty}&type=multiple`
        );
        const data = await response.json();

        if (data.response_code === 0) {
            questions = data.results;
            skeletonLoader.style.display = 'none';
            quizContent.style.display = 'block';
            initializeQuiz(questions);
        } else {
            throw new Error('Failed to load questions');
        }
    } catch (error) {
        console.error('API Error:', error);
        alert('Failed to load questions. Returning to home page.');
        window.location.href = 'index.html';
    }
}

function initializeQuiz(quizQuestions) {
    const quizTitle = document.getElementById('quizTitle');
    const skeletonLoader = document.getElementById('skeletonLoader');
    const quizContent = document.getElementById('quizContent');
    const questionElement = quizContent.querySelector('.question p');
    const optionsContainer = quizContent.querySelector('.options');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const progressElement = document.querySelector('.quiz-count');
    const scoreElement = document.querySelector('.quiz-score');
    const endQuizBtn = document.getElementById('endQuizBtn');

    userAnswers = new Array(quizQuestions.length).fill(null);

    quizTitle.textContent = `${quizQuestions[0].category} Quiz`;

    endQuizBtn.addEventListener('click', handleEndQuizClick);

    function handleEndQuizClick() {
        if (quizEnded) {
            window.location.href = 'index.html';
        } else {
            if (confirm('Are you sure you want to end the quiz? Your progress will be shown in the results.')) {
                showResults();
            }
        }
    }

    function updateEndQuizButton() {
        if (quizEnded) {
            endQuizBtn.textContent = 'Start New Quiz';
            endQuizBtn.classList.remove('end-quiz-btn');
            endQuizBtn.classList.add('start-new-btn');
        } else {
            endQuizBtn.textContent = 'End Quiz';
            endQuizBtn.classList.remove('start-new-btn');
            endQuizBtn.classList.add('end-quiz-btn');
        }
    }

    function displayQuestion(index) {
        const question = quizQuestions[index];
        questionElement.innerHTML = question.question;

        const answers = [...question.incorrect_answers, question.correct_answer]
            .sort(() => Math.random() - 0.5);

        optionsContainer.innerHTML = answers.map(answer => `
            <label class="option-label">
                <input type="radio" name="answer" value="${answer}" 
                    ${userAnswers[index] === answer ? 'checked' : ''}>
                <span>${answer}</span>
            </label>
        `).join('');

        progressElement.textContent = `Question ${index + 1} of ${quizQuestions.length}`;
        prevBtn.disabled = index === 0;
        nextBtn.textContent = index === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next ❯';
    }

    function checkAnswer() {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked')?.value;
        if (!selectedAnswer) return false;

        userAnswers[currentQuestion] = selectedAnswer;
        return true;
    }

    function calculateScore() {
        score = userAnswers.reduce((total, answer, index) => {
            return total + (answer === quizQuestions[index].correct_answer ? 1 : 0);
        }, 0);
    }

    function showResults() {
        quizEnded = true;
        updateEndQuizButton();
        calculateScore();

        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = `
            <div class="quiz-results">
                <h1>Quiz Complete!</h1>
                <div class="score-summary">
                    <p class="final-score">Your score: ${score} out of ${quizQuestions.length}</p>
                    <p class="score-percentage">Percentage: ${Math.round((score / quizQuestions.length) * 100)}%</p>
                </div>
                
                <div class="questions-review">
                    <h2>Detailed Review</h2>
                    ${quizQuestions.map((question, index) => {
            const userAnswer = userAnswers[index] || 'Not answered';
            const isCorrect = userAnswer === question.correct_answer;

            return `
                            <div class="question-review ${isCorrect ? 'correct' : 'incorrect'}">
                                <div class="question-number">Question ${index + 1}</div>
                                <div class="question-text">${question.question}</div>
                                
                                <div class="answer-details">
                                    <div class="user-answer">
                                        <strong>Your Answer:</strong> 
                                        <span class="${isCorrect ? 'correct-answer' : 'wrong-answer'}">
                                            ${userAnswer}
                                        </span>
                                    </div>
                                    
                                    ${!isCorrect ? `
                                        <div class="correct-answer">
                                            <strong>Correct Answer:</strong> 
                                            <span class="correct-answer-text">
                                                ${question.correct_answer}
                                            </span>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        `;
        }).join('')}
                </div>
            </div>
        `;
    }

    nextBtn.addEventListener('click', () => {
        if (currentQuestion < quizQuestions.length) {
            if (checkAnswer()) {
                currentQuestion++;
                if (currentQuestion < quizQuestions.length) {
                    displayQuestion(currentQuestion);
                } else {
                    showResults();
                }
            } else {
                alert('Please select an answer');
            }
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            displayQuestion(currentQuestion);
        }
    });

    displayQuestion(currentQuestion);
} 