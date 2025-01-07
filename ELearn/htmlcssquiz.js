// Define Questions and Options
const questions = [
    {
      title: "What does the `<title>` tag define in an HTML document?",
      options: [
        "The main heading of the page",
        "The title shown on the browser tab",
        "The footer text of the page",
        "The background color of the page"
      ],
      correct: "The title shown on the browser tab"
    },
    {
      title: "Which CSS property is used to change the text color of an element?",
      options: [
        "font-style",
        "color",
        "text-color",
        "background-color"
      ],
      correct: "color"
    },
    {
      title: "What is the purpose of the `<meta>` tag in HTML?",
      options: [
        "To include multimedia files",
        "To specify metadata about the document",
        "To create a new section",
        "To link external CSS files"
      ],
      correct: "To specify metadata about the document"
    },
    {
      title: "Which CSS property is used to set the spacing between lines of text?",
      options: [
        "padding",
        "margin",
        "line-height",
        "letter-spacing"
      ],
      correct: "line-height"
    },
    {
      title: "What is the correct syntax to link an external CSS file to an HTML document?",
      options: [
        `<link href="styles.css" rel="stylesheet">`,
        `<style href="styles.css" rel="stylesheet">`,
        `<css src="styles.css">`,
        `<link rel="css" href="styles.css">`
      ],
      correct: `<link href="styles.css" rel="stylesheet">`
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
    if (selectedOption && selectedOption.value === questions[currentIndex].correct) {
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
    window.location.href = "htmlcsscourse.html"; // Replace with the actual URL or page name
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
  
