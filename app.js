const questions = [];
let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = 10;

// Wczytanie pytań z pliku CSV
// Wczytanie pytań z pliku CSV
fetch('questions.csv')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.text();
    })
    .then(data => {
        const lines = data.trim().split('\n');
        lines.forEach(line => {
            const [question, answer1, answer2, answer3, answer4, answer5, correctAnswers, imageUrl] = line.split(';');
            const answers = [answer1, answer2, answer3, answer4];
            if (answer5) answers.push(answer5); // Dodanie piątej odpowiedzi, jeśli istnieje

            questions.push({
                question: question.replace(/\\n/g, '\n'), // Zamiana "\n" na prawdziwy znak nowej linii w pytaniu
                answers: answers.map(ans => ans.replace(/\\n/g, '<br>')), // Zamiana "\n" na <br> w odpowiedziach
                correctAnswers: correctAnswers.split(',').map(ans => ans.trim()), // Tworzenie tablicy prawidłowych odpowiedzi
                imageUrl: imageUrl ? imageUrl.trim() : null
            });
        });
        startQuiz();
    })
    .catch(error => {
        console.error('Error fetching or parsing the questions:', error);
        // Display an error message to the user
        const questionElement = document.getElementById('question');
        questionElement.innerText = 'An error occurred while loading the quiz. Please try again later.';
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
        answerButton.innerHTML = answer;  // Użycie innerHTML zamiast innerText do interpretowania HTML w odpowiedziach
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
        // Extract the text content
        const answerText = button.textContent.trim();
    
        // Remove 'selected' class
        button.classList.remove('selected');
    
        if (correctAnswers.includes(answerText)) {
            button.classList.add('correct');
            console.log(`Correct class added to: ${answerText}`);
        } else if (selectedAnswers.includes(answerText)) {
            button.classList.add('wrong');
            console.log(`Wrong class added to: ${answerText}`);
        }
    
        // Disable the button
        button.disabled = true;
    });
    

    // Zliczanie punktów, jeśli wszystkie odpowiedzi są poprawne
    if (selectedAnswers.length === correctAnswers.length && 
        selectedAnswers.every(ans => correctAnswers.includes(ans))) {
        score++;
    }
}

function showScore() {
    const totalAnsweredQuestions = Math.min(totalQuestions, questions.length);
    const percentageScore = (score / totalAnsweredQuestions) * 100;

    document.getElementById('question').innerText = `You scored ${score} out of ${totalAnsweredQuestions} (${percentageScore.toFixed(2)}%)`;
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
