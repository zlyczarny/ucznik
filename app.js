const questions = [];
let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = 10;

// Wczytanie pytań z pliku CSV
fetch('questions.csv')
    .then(response => response.text())
    .then(data => {
        const lines = data.trim().split('\n');
        lines.forEach(line => {
            const [question, answer1, answer2, answer3, answer4, correctAnswers, imageUrl] = line.split(';');
            questions.push({
                question,
                answers: [answer1, answer2, answer3, answer4],
                correctAnswers: correctAnswers.split(',').map(ans => ans.trim()), // Tworzenie tablicy prawidłowych odpowiedzi
                imageUrl: imageUrl ? imageUrl.trim() : null
            });
        });
        startQuiz();
    });

function startQuiz() {
    questions.sort(() => 0.5 - Math.random());
    showQuestion();
}

function showQuestion() {
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const checkButton = document.getElementById('check-button');
    const nextButton = document.getElementById('next-button');
    const imageElement = document.getElementById('question-image');

    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.imageUrl) {
        imageElement.src = currentQuestion.imageUrl;
        imageElement.style.display = 'block';
    } else {
        imageElement.style.display = 'none';
    }

    questionElement.innerText = currentQuestion.question;
    answersElement.innerHTML = '';

    currentQuestion.answers.forEach(answer => {
        const answerButton = document.createElement('button');
        answerButton.innerText = answer;
        answerButton.classList.add('answer');
        answerButton.addEventListener('click', () => selectAnswer(answer, answerButton));
        answersElement.appendChild(answerButton);
    });

    // Ukrycie przycisku Next i pokazanie Check Answer
    checkButton.style.display = 'block';
    nextButton.style.display = 'none';
}

let selectedAnswers = [];

function selectAnswer(selectedAnswer, selectedButton) {
    const correctAnswers = questions[currentQuestionIndex].correctAnswers;

    // Przełączanie zaznaczenia odpowiedzi
    if (selectedAnswers.includes(selectedAnswer)) {
        selectedAnswers = selectedAnswers.filter(ans => ans !== selectedAnswer);
        selectedButton.classList.remove('selected');
    } else {
        selectedAnswers.push(selectedAnswer);
        selectedButton.classList.add('selected');
    }
}

document.getElementById('check-button').addEventListener('click', () => {
    checkAnswer();
    document.getElementById('check-button').style.display = 'none';
    document.getElementById('next-button').style.display = 'block';
});

document.getElementById('next-button').addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions && currentQuestionIndex < questions.length) {
        showQuestion();
        selectedAnswers = [];
    } else {
        showScore();
    }
});

function checkAnswer() {
    const correctAnswers = questions[currentQuestionIndex].correctAnswers;
    const answerButtons = document.querySelectorAll('.answer');

    answerButtons.forEach(button => {
        const answerText = button.innerText.trim();
    
        // Usunięcie klasy 'selected'
        button.classList.remove('selected');
    
        // Dodanie odpowiednich klas w zależności od poprawności odpowiedzi
        if (correctAnswers.includes(answerText)) {
            button.classList.add('correct');
        } else if (selectedAnswers.includes(answerText)) {
            button.classList.add('wrong');
        }
    
        // Zablokowanie przycisku po sprawdzeniu odpowiedzi
        button.disabled = true;
    });
    

    // Zliczanie punktów, jeśli wszystkie odpowiedzi są poprawne
    if (selectedAnswers.length === correctAnswers.length && 
        selectedAnswers.every(ans => correctAnswers.includes(ans))) {
        score++;
    }
}




function showScore() {
    document.getElementById('question').innerText = `You scored ${score} out of ${Math.min(totalQuestions, questions.length)}`;
    document.getElementById('answers').innerHTML = '';
    document.getElementById('check-button').style.display = 'none';
    document.getElementById('next-button').style.display = 'none';
    document.getElementById('question-image').style.display = 'none';
}


// Obsługa przełącznika trybu Dark Mode
const darkModeCheckbox = document.getElementById('dark-mode-checkbox');
darkModeCheckbox.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', darkModeCheckbox.checked);
    
    // Można dodać zapis trybu w localStorage, aby tryb był zachowany po odświeżeniu strony
    localStorage.setItem('dark-mode-enabled', darkModeCheckbox.checked);
});

// Wczytaj preferencje trybu z localStorage (opcjonalnie)
if (localStorage.getItem('dark-mode-enabled') === 'true') {
    darkModeCheckbox.checked = true;
    document.body.classList.add('dark-mode');
}
