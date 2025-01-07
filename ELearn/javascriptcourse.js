// List of course topics
const topics = [
    { id: 'basicHTML', title: 'Basic HTML Structure', content: `
        <h3>Basic HTML Structure</h3>
        <p>HTML documents have a basic structure that includes a doctype declaration, <code>&lt;html&gt;</code> tag, <code>&lt;head&gt;</code> tag (for metadata), and <code>&lt;body&gt;</code> tag (for the content of the page).</p>
        <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
        &lt;title&gt;Document&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;h1&gt;Welcome to HTML&lt;/h1&gt;
        &lt;p&gt;This is a simple page&lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;</code></pre>
    ` },
    { id: 'htmlTags', title: 'HTML Tags', content: `
        <h3>HTML Tags</h3>
        <p>HTML uses tags to define elements. Some common tags are <strong>&lt;h1&gt;</strong> for main headings, <strong>&lt;p&gt;</strong> for paragraphs, and <strong>&lt;a&gt;</strong> for links.</p>
        <p>Example:</p>
        <pre><code>&lt;h1&gt;This is a Heading&lt;/h1&gt;
&lt;p&gt;This is a paragraph of text&lt;/p&gt;
&lt;a href="https://www.example.com"&gt;Visit Example&lt;/a&gt;</code></pre>
    ` },
    { id: 'basicCSS', title: 'Basic CSS Syntax', content: `
        <h3>Basic CSS Syntax</h3>
        <p>CSS syntax consists of selectors, properties, and values. For example, <code>p { color: blue; }</code> changes the text color of all <code>&lt;p&gt;</code> tags to blue.</p>
        <p>Here’s an example of a simple CSS rule:</p>
        <pre><code>p {
    color: blue;
    font-size: 16px;
}</code></pre>
    ` },
    { id: 'selectors', title: 'CSS Selectors', content: `
        <h3>CSS Selectors</h3>
        <p>CSS selectors are patterns used to select elements for styling. Common selectors include:</p>
        <ul>
            <li><strong>Element selectors</strong> (e.g., <code>p</code>, <code>h1</code>)</li>
            <li><strong>Class selectors</strong> (e.g., <code>.class-name</code>)</li>
            <li><strong>ID selectors</strong> (e.g., <code>#id-name</code>)</li>
        </ul>
        <p>Example:</p>
        <pre><code>/* Element selector */
p {
    color: red;
}

/* Class selector */
.class-name {
    font-size: 20px;
}

/* ID selector */
#id-name {
    background-color: yellow;
}</code></pre>
    ` },
    { id: 'basicJS', title: 'Basic JavaScript Syntax', content: `
        <h3>Basic JavaScript Syntax</h3>
        <p>JavaScript syntax is used to create interactive functionality for web pages. A simple example is:</p>
        <pre><code>console.log("Hello, world!");</code></pre>
    ` },
    { id: 'variables', title: 'JavaScript Variables', content: `
        <h3>JavaScript Variables</h3>
        <p>Variables are used to store data in JavaScript. You can define variables using <code>let</code>, <code>const</code>, or <code>var</code>.</p>
        <p>Example:</p>
        <pre><code>let name = "John";
const age = 30;</code></pre>
    ` },
    { id: 'functions', title: 'JavaScript Functions', content: `
        <h3>JavaScript Functions</h3>
        <p>Functions in JavaScript are blocks of code that perform a task when called. For example:</p>
        <pre><code>function greet() {
    console.log("Hello, world!");
}

greet();</code></pre>
    ` }
];

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

function toggleSubMenu(menuId, button) {
    let submenu = document.getElementById(menuId);
    submenu.style.display = (submenu.style.display === 'block') ? 'none' : 'block';
    button.querySelector('.dropdown').textContent = submenu.style.display === 'block' ? '▲' : '▼';
}
