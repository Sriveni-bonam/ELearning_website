const questions = [
    {
        "title": "What does 'var' do in JavaScript?",
        "options": [
            "Declare a constant",
            "Declare a variable",
            "Define a function",
            "None of the above"
        ],
        "correctAnswer": "Declare a variable"
    },
    {
        "title": "What is the correct syntax for creating a function in JavaScript?",
        "options": [
            "function = myFunction()",
            "function: myFunction()",
            "function myFunction() {}",
            "function myFunction[]"
        ],
        "correctAnswer": "function myFunction() {}"
    },
    {
        "title": "Which of the following is used to create a comment in JavaScript?",
        "options": [
            "// comment",
            "# comment",
            "<!-- comment -->",
            "% comment"
        ],
        "correctAnswer": "// comment"
    },
    {
        "title": "How do you access an array element by index in JavaScript?",
        "options": [
            "array{index}",
            "array[index]",
            "array[index]",
            "array.get(index)"
        ],
        "correctAnswer": "array[index]"
    },
    {
        "title": "Which statement is used to stop a loop in JavaScript?",
        "options": [
            "break",
            "continue",
            "stop",
            "exit"
        ],
        "correctAnswer": "break"
    }
];

// DOM Elements
const quizArea = document.querySelector(".quiz-area");
const answersArea = document.querySelector(".answers-area");
const submitButton = document.querySelector(".submit-button");
const resultsContainer = document.querySelector(".results");
const timerElement = document.querySelector(".timer");
const progressBar = document.querySelector(".progress-bar");

let currentIndex = 0;
let correctAnswers = 0;
let countdownInterval;

// Load Question
function loadQuestion(index) {
    // Clear Previous Content
    quizArea.innerHTML = "";
    answersArea.innerHTML = "";
    timerElement.textContent = "10";

    // Display Question Title
    const questionTitle = document.createElement("h2");
    questionTitle.textContent = questions[index].title;
    quizArea.appendChild(questionTitle);

    // Display Options
    questions[index].options.forEach((option, i) => {
        const answerDiv = document.createElement("div");
        answerDiv.className = "answer";

        // Create Radio Input
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = "question";
        radioInput.id = `option_${i}`;
        radioInput.value = option;

        // Create Label
        const label = document.createElement("label");
        label.htmlFor = `option_${i}`;
        label.textContent = option;

        // Append Input and Label to Answer Div
        answerDiv.appendChild(radioInput);
        answerDiv.appendChild(label);

        // Append Answer Div to Answers Area
        answersArea.appendChild(answerDiv);
    });

    // Start Timer
    startTimer();
    updateProgressBar(index + 1);
}

// Start 10-Second Timer
function startTimer() {
    let timeLeft = 10;
    timerElement.textContent = timeLeft;

    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            submitButton.click(); // Auto-submit the question when time runs out
        }
    }, 1000);
}

// Check Answer
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="question"]:checked');
    if (selectedOption && selectedOption.value === questions[currentIndex].correctAnswer) {
        correctAnswers++;
    }
}

// Update Progress Bar
function updateProgressBar(currentStep) {
    const progress = (currentStep / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Show Results
function showResults() {
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    timerElement.remove();
    progressBar.parentElement.remove();

    const percentage = (correctAnswers / questions.length) * 100;
    let feedback = "";

    if (percentage === 100) {
        feedback = `<p class="perfect">🎉 Perfect! You answered all questions correctly!</p>`;
    } else if (percentage >= 70) {
        feedback = `<p class="good">👍 Good Job! You got ${correctAnswers} out of ${questions.length} questions right.</p>`;
    } else if (percentage >= 50) {
        feedback = `<p class="average">🙂 Not bad, but there's room for improvement! You scored ${correctAnswers} out of ${questions.length}.</p>`;
    } else {
        feedback = `<p class="bad">😟 Keep practicing! You got ${correctAnswers} out of ${questions.length} questions right.</p>`;
    }

    resultsContainer.innerHTML = `
      <h2>Results</h2>
      <div class="feedback">${feedback}</div>
      <p class="summary">Your score: <strong>${percentage}%</strong></p>
      <button class="restart-button" onclick="goToCoursesPage()">Back to Course</button>
    `;
}

// Navigate to Courses Page
function goToCoursesPage() {
    window.location.href = "courses.html"; // Replace with the actual URL or page name
}

// Handle Submit Button Click
submitButton.addEventListener("click", () => {
    checkAnswer();

    currentIndex++;
    if (currentIndex < questions.length) {
        loadQuestion(currentIndex);
    } else {
        clearInterval(countdownInterval);
        showResults();
    }
});

// Initialize Quiz
loadQuestion(currentIndex);
