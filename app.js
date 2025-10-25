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
