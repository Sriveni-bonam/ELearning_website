// List of course topics
const topics = [
    { id: 'basicHTML', title: 'Basic HTML Structure', content: `
        <h3>Basic HTML Structure</h3>
        <p>HTML documents have a basic structure that includes: </p>
        <pre>
        &lt;!DOCTYPE html&gt;
        &lt;html&gt;
            &lt;head&gt;
                &lt;title&gt;Page Title&lt;/title&gt;
            &lt;/head&gt;
            &lt;body&gt;
                &lt;h1&gt;This is a Heading&lt;/h1&gt;
                &lt;p&gt;This is a paragraph.&lt;/p&gt;
            &lt;/body&gt;
        &lt;/html&gt;
        </pre>
    `},
    { id: 'htmlTags', title: 'HTML Tags', content: `
        <h3>Common HTML Tags</h3>
        <p>HTML tags are used to define the structure and content of a webpage.</p>
        <ul>
            <li>&lt;p&gt; - Paragraph</li>
            <li>&lt;a&gt; - Anchor for links</li>
            <li>&lt;div&gt; - Division or section of content</li>
            <li>&lt;img&gt; - Image</li>
        </ul>
    `},
    { id: 'basicCSS', title: 'Basic CSS Syntax', content: `
        <h3>Basic CSS Syntax</h3>
        <p>CSS is used to style HTML elements.</p>
        <pre>
        selector {
            property: value;
        }

        h1 {
            color: blue;
            font-size: 30px;
        }
        </pre>
    `},
    { id: 'selectors', title: 'CSS Selectors', content: `
        <h3>CSS Selectors</h3>
        <p>Selectors are patterns used to select the elements you want to style.</p>
        <ul>
            <li>Element Selector: h1 { color: red; }</li>
            <li>Class Selector: .my-class { color: green; }</li>
            <li>ID Selector: #my-id { color: blue; }</li>
        </ul>
    `}
];

let currentTopicIndex = 0;
let currentQuestionIndex = 0;
let userAnswers = [];
let timer;

document.addEventListener('DOMContentLoaded', () => {
    // Show the initial content
    showContent('basicHTML');
});

// Function to toggle submenus in the sidebar
function toggleSubMenu(menuId, link) {
    const menu = document.getElementById(menuId);
    const dropdown = link.querySelector('.dropdown');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    dropdown.textContent = (menu.style.display === 'block') ? '▲' : '▼';
}

// Global variables for navigation
let currentIndex = 0;

function showContent(topicId) {
    let flashCard = document.getElementById('flash-card');
    const topic = topics.find(t => t.id === topicId);

    if (topic) {
        flashCard.innerHTML = `
            <div id="course-content">
                ${topic.content}
            </div>
            <div id="nav-buttons">
                <button id="prev-btn" onclick="navigate('prev')" ${currentIndex === 0 ? 'disabled' : ''}>Previous</button>
                <button id="next-btn" onclick="navigate('next')">Next</button>
            </div>
        `;
        currentIndex = topics.findIndex(t => t.id === topicId);
        updateNavButtons();
    }
}

function updateNavButtons() {
    document.getElementById('prev-btn').disabled = currentIndex === 0;
    document.getElementById('next-btn').disabled = currentIndex === topics.length - 1;
}

function navigate(direction) {
    if (direction === 'prev' && currentIndex > 0) {
        currentIndex--;
    } else if (direction === 'next' && currentIndex < topics.length - 1) {
        currentIndex++;
    }
    showContent(topics[currentIndex].id);
}

// Function to show the assessment quiz
function showAssessment() {
    const flashCard = document.getElementById('flash-card');
    flashCard.innerHTML = `
        <h3>HTML & CSS Quiz</h3>
        <div id="quiz-container">
            <div id="question-container">
                <p id="question">What is the capital of France?</p>
                <div id="options">
                    <label>
                        <input type="radio" name="option" value="A" class="option"> Berlin
                    </label>
                    <label>
                        <input type="radio" name="option" value="B" class="option"> Madrid
                    </label>
                    <label>
                        <input type="radio" name="option" value="C" class="option"> Paris
                    </label>
                    <label>
                        <input type="radio" name="option" value="D" class="option"> Rome
                    </label>
                </div>
                <div id="timer">10 seconds left</div>
                <button id="next-btn">Next Question</button>
            </div>
        </div>
    `;
    loadQuestion();
}

// Function to load quiz questions
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;
    document.getElementById('options').innerHTML = question.options.map((option, index) => `
        <label>
            <input type="radio" name="option" value="${String.fromCharCode(65 + index)}" class="option"> ${option}
        </label>
    `).join('');
}
// List of quiz questions
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "C"
    },
    {
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        correctAnswer: "B"
    },
    {
        question: "Which HTML element is used to define an internal style sheet?",
        options: ["<style>", "<script>", "<css>", "<styles>"],
        correctAnswer: "A"
    }
];

let timerInterval;
let timeLeft = 10;


// Start the quiz
function showAssessment() {
    const flashCard = document.getElementById('flash-card');
    flashCard.innerHTML = `
        <h3>HTML & CSS Quiz</h3>
        <div id="quiz-container">
            <div id="question-container">
                <p id="question">${questions[currentQuestionIndex].question}</p>
                <div id="options">
                    ${questions[currentQuestionIndex].options.map((option, index) => `
                        <label>
                            <input type="radio" name="option" value="${String.fromCharCode(65 + index)}" class="option"> ${option}
                        </label>
                    `).join('')}
                </div>
                <div id="timer">Time left: 10 seconds</div>
                <button id="next-btn" onclick="nextQuestion()">Next Question</button>
            </div>
        </div>
    `;
    startTimer();
    document.getElementById('next-btn').disabled = false; // Enable the next button
}

// Timer function to countdown
function startTimer() {
    // Reset the timer for the new question
    timeLeft = 10;
    updateTimerDisplay();
    timerInterval = setInterval(function() {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextQuestion(); // Move to the next question when time runs out
        }
    }, 1000);
}

// Update the timer display
function updateTimerDisplay() {
    document.getElementById('timer').textContent = `Time left: ${timeLeft} seconds`;
}

// Function to navigate to the next question
function nextQuestion() {
    // Get the user's selected answer
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        userAnswers.push(selectedOption.value);
    } else {
        userAnswers.push(null); // No answer selected
    }

    // Move to the next question
    currentQuestionIndex++;

    // Check if there are more questions
    if (currentQuestionIndex < questions.length) {
        showAssessment(); // Load the next question
    } else {
        showResults(); // Show results if all questions are completed
    }

    // Reset the timer for the next question
    clearInterval(timerInterval);
}

// Function to display the results after all questions are answered
function showResults() {
    const flashCard = document.getElementById('flash-card');
    flashCard.innerHTML = `
        <h3>Your Results:</h3>
        <div id="score">Score: ${calculateScore()} / ${questions.length}</div>
        <div id="appreciation">${getAppreciation()}</div>
        <button id="check-answers-btn" onclick="checkAnswers()">Check Answers</button>
    `;
}

// Function to calculate the user's score
function calculateScore() {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].correctAnswer) {
            score++;
        }
    }
    return score;
}

// Function to generate appreciation based on score
function getAppreciation() {
    const score = calculateScore();
    if (score === questions.length) {
        return "Excellent! Perfect Score!";
    } else if (score >= questions.length / 2) {
        return "Good job! You're getting there.";
    } else {
        return "Keep practicing, you'll get better!";
    }
}

// Function to check and display correct answers
function checkAnswers() {
    const flashCard = document.getElementById('flash-card');
    flashCard.innerHTML = `
        <h3>Correct Answers:</h3>
        <div id="selected-answers">
            <h4>Your Answers:</h4>
            ${userAnswers.map((answer, index) => `
                <p>Q${index + 1}: Your answer: ${answer ? answer : "No answer"}</p>
            `).join('')}
        </div>
        <div id="correct-answers">
            <h4>Correct Answers:</h4>
            ${questions.map((question, index) => `
                <p>Q${index + 1}: Correct answer: ${question.correctAnswer}</p>
            `).join('')}
        </div>
    `;
}
