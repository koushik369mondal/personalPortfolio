document.addEventListener("DOMContentLoaded", () => {
    // Typing Effect
    const typedTextSpan = document.querySelector(".typed-text");
    const textArray = ["Web Developer", "Frontend Designer", "MERN Stack Learner", "Finance Enthusiast"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if (typedTextSpan) {
        setTimeout(type, newTextDelay + 250);
    }

    // Counter Animation
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const countUp = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(() => countUp(), 1);
            } else {
                counter.innerText = target;
            }
        });
    };

    // Intersection Observer for counter animation
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    countUp();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // Navbar scroll effect
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinksContainer = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinksContainer.classList.toggle("active");
        hamburger.classList.toggle("toggle");
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinksContainer.classList.remove("active");
            hamburger.classList.remove("toggle");
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector("header").offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            }
        });
    });

    // Theme Toggle
    const themeToggle = document.querySelector(".theme-toggle");
    const body = document.body;
    const themeIcon = document.querySelector(".theme-toggle i");

    // Check if user has a theme preference stored
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
        body.classList.add("dark-theme");
        themeIcon.classList.replace("fa-moon", "fa-sun");
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-theme");

        if (body.classList.contains("dark-theme")) {
            themeIcon.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("theme", "dark");
        } else {
            themeIcon.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("theme", "light");
        }
    });

    // Form Submission
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        // Simple form validation
        if (!name || !email || !subject || !message) {
            alert("Please fill in all fields");
            return;
        }

        // In a real implementation, you would send this data to a server
        console.log({
            name,
            email,
            subject,
            message,
        });

        // Show success message
        alert("Message sent successfully!");
        contactForm.reset();
    });

    // Animate elements on scroll
    const fadeElements = document.querySelectorAll(".fadeIn");

    function checkFade() {
        fadeElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight * 0.9) {
                element.style.opacity = 1;
                element.style.transform = "translateY(0)";
            }
        });
    }

    // Initial check
    checkFade();

    // Check on scroll
    window.addEventListener("scroll", checkFade);
});

const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    statusEl.textContent = "Sending...";
    const btn = form.querySelector("button[type='submit']");
    btn.disabled = true;

    try {
        const res = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { "Accept": "application/json" }
        });

        if (res.ok) {
            statusEl.textContent = "✅ Message sent! I'll get back to you soon.";
            form.reset();
        } else {
            const data = await res.json().catch(() => null);
            const msg = data?.errors?.map(e => e.message).join(", ") || "❌ Oops! Something went wrong.";
            statusEl.textContent = msg;
        }
    } catch (err) {
        statusEl.textContent = "⚠️ Network error. Please try again.";
    } finally {
        btn.disabled = false;
    }
});

// Project filtering functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all') {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.animation = 'fadeInUp 0.5s ease';
                }, 100);
            } else {
                const categories = card.getAttribute('data-category');
                if (categories.includes(filterValue)) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.animation = 'fadeInUp 0.5s ease';
                    }, 100);
                } else {
                    card.classList.add('hidden');
                }
            }
        });
    });
});

// ===================================
// Chatbot Functionality
// ===================================

// Chatbot Knowledge Base
const chatbotData = {
    "who are you": "I'm Kaushik Mandal, a passionate Web Developer based in India. I specialize in building responsive and visually appealing websites and applications using HTML, CSS, and JavaScript. 🚀",

    "what technologies do you use": "I work with HTML5, CSS3, JavaScript, and I'm currently learning backend technologies and the MERN stack (MongoDB, Express.js, React.js, Node.js) to become a full-stack developer. 💻",

    "can i see your projects": "Absolutely! You can check out my projects section on this website, or visit my GitHub profile. I've built various web applications showcasing my skills in front-end development. 🎨",

    "how can i contact you": "You can reach me through the contact form on this website, email me directly, or connect with me on LinkedIn, GitHub, or Instagram. All my contact details are in the footer section! 📧",

    "what are your interests": "Besides coding, I love exploring new technologies, contributing to open-source projects, and diving into finance and stock market trends. I'm always curious about learning new things! 📚",

    "do you take freelance projects": "Yes! I'm open to freelance web development projects. Feel free to reach out through the contact form or email me directly to discuss your project requirements. 💼",

    "what's your goal": "My goal is to become a proficient full-stack developer and create meaningful digital solutions that solve real-world problems. I'm committed to continuous learning and staying updated with the latest web technologies. 🎯",

    "what are you learning right now": "Currently, I'm focusing on backend technologies and the MERN stack to expand my skill set. I'm also exploring best practices in web performance optimization and modern JavaScript frameworks. 📖",

    "any fun fact": "Fun fact: When I'm not coding, you might find me analyzing stock market trends! I believe the analytical skills from finance complement my problem-solving abilities in programming. 📊🎉"
};

// All available suggestion questions
const allSuggestions = [
    { emoji: "👤", text: "Who are you?", question: "Who are you?" },
    { emoji: "💻", text: "Your skills?", question: "What technologies do you use?" },
    { emoji: "🎨", text: "Projects?", question: "Can I see your projects?" },
    { emoji: "📧", text: "Contact?", question: "How can I contact you?" },
    { emoji: "💼", text: "Freelance?", question: "Do you take freelance projects?" },
    { emoji: "🎯", text: "Your goal?", question: "What's your goal?" },
    { emoji: "📖", text: "Learning?", question: "What are you learning right now?" },
    { emoji: "📚", text: "Interests?", question: "What are your interests?" },
    { emoji: "🎉", text: "Fun fact?", question: "Any fun fact?" }
];

let usedSuggestions = [];

// Get elements
const toggleBtn = document.getElementById('chatbot-toggle');
const closeBtn = document.getElementById('chatbot-close');
const chatWindow = document.getElementById('chatbot-window');
const messagesContainer = document.getElementById('chatbot-messages');
const inputField = document.getElementById('chatbot-input');
const sendBtn = document.getElementById('chatbot-send');
const suggestionsContainer = document.getElementById('chatbot-suggestions');

// Function to get random suggestions
function getRandomSuggestions(count = 5) {
    // Filter out already used suggestions
    let availableSuggestions = allSuggestions.filter(s =>
        !usedSuggestions.includes(s.question)
    );

    // If all used, reset
    if (availableSuggestions.length < count) {
        usedSuggestions = [];
        availableSuggestions = [...allSuggestions];
    }

    // Shuffle and pick random suggestions
    const shuffled = availableSuggestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Function to update suggestion buttons
function updateSuggestions() {
    const suggestions = getRandomSuggestions(2);
    suggestionsContainer.innerHTML = '';

    suggestions.forEach(suggestion => {
        const btn = document.createElement('button');
        btn.className = 'suggestion-btn';
        btn.setAttribute('data-question', suggestion.question);
        btn.textContent = `${suggestion.emoji} ${suggestion.text}`;

        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            inputField.value = question;
            sendMessage();
            // Track used suggestion
            usedSuggestions.push(question);
        });

        suggestionsContainer.appendChild(btn);
    });
}

// Toggle chat window
toggleBtn.addEventListener('click', () => {
    if (chatWindow.classList.contains('chatbot-hidden')) {
        chatWindow.classList.remove('chatbot-hidden');
        inputField.focus();
    } else {
        chatWindow.classList.add('chatbot-hidden');
    }
});

closeBtn.addEventListener('click', () => {
    chatWindow.classList.add('chatbot-hidden');
});

// Send message function
function sendMessage() {
    const userMessage = inputField.value.trim();

    if (!userMessage) return;

    // Add user message
    addMessage(userMessage, 'user');
    inputField.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Get bot response after delay
    setTimeout(() => {
        removeTypingIndicator();
        const botResponse = getBotResponse(userMessage);
        addMessage(botResponse, 'bot');
        // Update suggestions after bot response
        updateSuggestions();
    }, 800);
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';

    const bubble = document.createElement('div');
    bubble.className = sender === 'user' ? 'message-bubble user-bubble' : 'message-bubble bot-bubble';
    bubble.textContent = text;

    messageDiv.appendChild(bubble);
    messagesContainer.appendChild(messageDiv);

    // Auto-scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot-message typing-message';
    typingDiv.innerHTML = `
        <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingMessage = document.querySelector('.typing-message');
    if (typingMessage) {
        typingMessage.remove();
    }
}

// Get bot response using keyword matching
function getBotResponse(userMessage) {
    const lowercaseMessage = userMessage.toLowerCase();

    // Direct match
    for (const [question, answer] of Object.entries(chatbotData)) {
        if (lowercaseMessage.includes(question)) {
            return answer;
        }
    }

    // Keyword-based matching
    if (lowercaseMessage.includes('name') || lowercaseMessage.includes('introduce')) {
        return chatbotData["who are you"];
    }

    if (lowercaseMessage.includes('skill') || lowercaseMessage.includes('tech') || lowercaseMessage.includes('stack')) {
        return chatbotData["what technologies do you use"];
    }

    if (lowercaseMessage.includes('project') || lowercaseMessage.includes('work') || lowercaseMessage.includes('portfolio')) {
        return chatbotData["can i see your projects"];
    }

    if (lowercaseMessage.includes('contact') || lowercaseMessage.includes('email') || lowercaseMessage.includes('reach')) {
        return chatbotData["how can i contact you"];
    }

    if (lowercaseMessage.includes('interest') || lowercaseMessage.includes('hobby') || lowercaseMessage.includes('like')) {
        return chatbotData["what are your interests"];
    }

    if (lowercaseMessage.includes('freelance') || lowercaseMessage.includes('hire') || lowercaseMessage.includes('available')) {
        return chatbotData["do you take freelance projects"];
    }

    if (lowercaseMessage.includes('goal') || lowercaseMessage.includes('future') || lowercaseMessage.includes('plan')) {
        return chatbotData["what's your goal"];
    }

    if (lowercaseMessage.includes('learn') || lowercaseMessage.includes('study') || lowercaseMessage.includes('currently')) {
        return chatbotData["what are you learning right now"];
    }

    if (lowercaseMessage.includes('fun') || lowercaseMessage.includes('fact') || lowercaseMessage.includes('interesting')) {
        return chatbotData["any fun fact"];
    }

    if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi') || lowercaseMessage.includes('hey')) {
        return "Hello! 👋 I'm here to answer any questions about Kaushik. What would you like to know?";
    }

    if (lowercaseMessage.includes('thank') || lowercaseMessage.includes('thanks')) {
        return "You're welcome! Feel free to ask anything else about Kaushik. 😊";
    }

    if (lowercaseMessage.includes('bye') || lowercaseMessage.includes('goodbye')) {
        return "Goodbye! Feel free to come back anytime you have questions. Have a great day! 👋";
    }

    // Default response
    return "I'm not sure about that. Try asking me about Kaushik's skills, projects, interests, goals, or how to contact him! 🤔";
}

// Event listeners
sendBtn.addEventListener('click', sendMessage);

inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Prevent empty messages
inputField.addEventListener('input', () => {
    sendBtn.disabled = !inputField.value.trim();
});

// Initial state
sendBtn.disabled = true;

// Initialize suggestions on load
updateSuggestions();
