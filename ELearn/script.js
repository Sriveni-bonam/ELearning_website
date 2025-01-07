function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}
  
function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

  const sentences = [
    "Get educated online from home", 
    "Get ready to become coder", 
    "Free to learn, Free to earn"
  ];
  
  let sentenceIndex = 0;
  let letterIndex = 0;
  let currentSentence = "";
  let isDeleting = false;
  let typingSpeed = 150; // Speed for typing
  let erasingSpeed = 100; // Speed for erasing
  let pauseDuration = 1500; // Pause after completing a sentence
  
  const typedTextElement = document.getElementById("typed-text");
  
  const typeText = () => {
    if (sentenceIndex === sentences.length) {
      sentenceIndex = 0; // Reset the sentence index
    }
    
    currentSentence = sentences[sentenceIndex];
  
    // Handle typing effect
    if (isDeleting) {
      if (letterIndex > 0) {
        letterIndex--;
        typedTextElement.textContent = currentSentence.substring(0, letterIndex);
      } else {
        isDeleting = false;
        sentenceIndex++;
        setTimeout(typeText, pauseDuration);
        return;
      }
    } else {
      if (letterIndex < currentSentence.length) {
        letterIndex++;
        typedTextElement.textContent = currentSentence.substring(0, letterIndex);
      } else {
        isDeleting = true;
        setTimeout(typeText, pauseDuration);
        return;
      }
    }
  
    // Call the function recursively
    setTimeout(typeText, isDeleting ? erasingSpeed : typingSpeed);
  };
  
  // Start the typing effect when the page loads
  window.onload = () => {
    typeText();
  };
  // Handle the form submission
function handleSubmit(event) {
  event.preventDefault(); // Prevent form from refreshing the page
  document.getElementById("contactForm").reset();
  document.getElementById("successMessage").classList.remove("hidden");
  console.log("Form submitted!");
}

function showSidebar() {
  document.querySelector(".sidebar").style.display = "block";
}

function hideSidebar() {
  document.querySelector(".sidebar").style.display = "none";
}
// Show the "Back to Top" button when the user scrolls down
window.onscroll = function() {
  const backToTopButton = document.querySelector('.bottom-right-line');
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    backToTopButton.style.display = 'block'; // Show the button
  } else {
    backToTopButton.style.display = 'none'; // Hide the button
  }
};
function goBack() {
  if (window.history.length > 1) {
     window.history.back(); // Go to the previous page in history
  } else {
     window.location.href = 'logins.html'; // Fallback to login page if no history
  }
}
//slider student
var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 25,
  centerSlide:true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints:{
    0:{
      slidesPerView:1,
    },
    520:{
      slidesPerView:2,
    },
    950:{
      slidesPerView:3,
    }
  }
});
