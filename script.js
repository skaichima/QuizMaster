document.addEventListener('DOMContentLoaded', function () {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const quizScreen = document.getElementById('quizScreen');
    const startQuizBtn = document.getElementById('startQuiz');
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');
    const categorySelect = document.getElementById('category');

    let selectedDifficulty = '';

    console.log(categorySelect.value);
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            difficultyBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedDifficulty = btn.dataset.difficulty;
        });
    });


    startQuizBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const category = categorySelect.value;
        const selectedLevel = document.querySelector('input[name="level"]:checked')?.value;

        if (!category) {
            alert('Please select a category');
            return;
        }
        if (!selectedLevel) {
            alert('Please select a difficulty level');
            return;
        }

        const categoryIds = {
            'art': 25,
            'geography': 22,
            'history': 23,
            'general': 9,
            'sports': 21,
            'politics': 24,
        };

        const quizURL = `quiz.html?category=${categoryIds[category]}&difficulty=${selectedLevel}`;
        window.location.href = quizURL;
    });
});

function initializeQuiz(category, difficulty) {
    console.log(`Starting quiz with category: ${category} and difficulty: ${difficulty}`);
}
