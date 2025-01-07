// Sample courses data
const courses = [
    {
        title: "Complete HTML Tutorial",
        description: "Master HTML concepts.",
        imageUrl: "thumb-1.png",
        playlistLink: "playlisthtmlcss.html"
    },
    {
        title: "Complete CSS Tutorial",
        description: "Master CSS concepts.",
        imageUrl: "thumb-2.png",
        playlistLink: "playlisthtmlcss.html"
    },
    {
        title: "Complete JS Tutorial",
        description: "An introductory course to JavaScript.",
        imageUrl: "thumb-3.png",
        playlistLink: "playlistjs.html"
    },
    {
        title: "Complete Python Tutorial",
        description: "Learn the fundamentals of Python.",
        imageUrl: "thumb-4.png"
    },
    {
        title: "Complete Bootstrap Tutorial",
        description: "Learn Bootstrap.",
        imageUrl: "thumb-5.png",
    },
    {
        title: "Complete Sass Tutorial",
        description: "Master Sass concepts.",
        imageUrl: "thumb-6.png",
    }
];

// Function to display courses
function displayCourses(filteredCourses) {
    const coursesContainer = document.getElementById('courses-container');
    coursesContainer.innerHTML = ''; // Clear any existing content

    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');

        courseCard.innerHTML = `
            <img src="${course.imageUrl}" alt="${course.title}">
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <a href="${course.playlistLink}" class="inline-btn">View Playlist</a>
        `;

        coursesContainer.appendChild(courseCard);
    });
}

// Function to search courses
function searchCourses() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filteredCourses = courses.filter(course => 
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query)
    );

    displayCourses(filteredCourses);
}

// Display all courses initially
displayCourses(courses);
