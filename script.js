document.addEventListener('DOMContentLoaded', function () {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const quizScreen = document.getElementById('quizScreen');
    const startQuizBtn = document.getElementById('startQuiz');
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');
    const categorySelect = document.getElementById('category');

    let selectedDifficulty = '';

    console.log(categorySelect.value);
    // Handle difficulty button selection
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove selected class from all buttons
            difficultyBtns.forEach(b => b.classList.remove('selected'));
            // Add selected class to clicked button
            btn.classList.add('selected');
            selectedDifficulty = btn.dataset.difficulty;
            // console.log(selectedDifficulty);
        });
    });


    // Handle start quiz button
    startQuizBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const category = categorySelect.value;
        const selectedLevel = document.querySelector('input[name="level"]:checked')?.value;

        // Validation
        if (!category) {
            alert('Please select a category');
            return;
        }
        if (!selectedLevel) {
            alert('Please select a difficulty level');
            return;
        }

        // Map categories to Open Trivia DB category IDs
        const categoryIds = {
            'art': 25,
            'geography': 22,
            'history': 23,
            'general': 9,
            'sports': 21,
            'politics': 24,
        };

        // Create URL with parameters
        const quizURL = `quiz.html?category=${categoryIds[category]}&difficulty=${selectedLevel}`;
        window.location.href = quizURL;
    });
});

function initializeQuiz(category, difficulty) {
    // Initialize your quiz here with the selected category and difficulty
    console.log(`Starting quiz with category: ${category} and difficulty: ${difficulty}`);
    // Add your quiz logic here
}
