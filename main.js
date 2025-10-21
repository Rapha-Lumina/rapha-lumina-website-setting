// Rapha Lumina Website - Main JavaScript

// Initialise AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
}

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navbar Transparency Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (name && email && message) {
            alert('Thank you for your message! I\'ll get back to you soon. 🙏');
            contactForm.reset();
        } else {
            alert('Please fill in all fields before submitting.');
        }
    });
}

// ============================================
// CHATBOT FUNCTIONALITY
// ============================================

// Configuration
const USE_API = false; // Set to true when you have backend proxy set up
const CHATBOT_API_ENDPOINT = '/api/chat'; // Your backend endpoint

// Chatbot State
let chatHistory = [];
let chatOpen = false;

// Chatbot Elements
const chatWidget = document.getElementById('chatWidget');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatIntro = document.getElementById('chatIntro');

// Predefined Responses (Fallback when API is not available)
const predefinedResponses = {
    greeting: {
        patterns: ['hello', 'hi', 'hey', 'namaste', 'greetings'],
        responses: [
            "🙏 Welcome, beautiful soul! I'm here to support your spiritual journey. What's on your heart today?",
            "Hello! ✨ It's wonderful to connect with you. How can I guide you on your path today?",
            "Namaste! 🌟 Thank you for reaching out. What aspects of your spiritual journey would you like to explore?"
        ]
    },
    awakening: {
        patterns: ['awakening', 'awakened', 'spiritual crisis', 'consciousness', 'enlightenment', 'transformation'],
        responses: [
            "Spiritual awakening is a profound transformation! 🌟 It can feel overwhelming, but you're exactly where you need to be. Would you like to discuss what you're experiencing? For deeper guidance, please email me at hello@raphalumina.com",
            "The awakening process is different for everyone. ✨ Common signs include questioning reality, feeling disconnected from old life, heightened sensitivity, and seeking deeper meaning. I'd love to support you further - reach out at hello@raphalumina.com"
        ]
    },
    help: {
        patterns: ['help', 'services', 'support', 'guidance', 'coach', 'session'],
        responses: [
            "I offer guidance in several areas: 🧘‍♀️ Spiritual Awakening Support, 💫 Consciousness Expansion, 🌈 Authenticity & Purpose, and 🔮 Energetic Practices. To discuss which path resonates with you, email hello@raphalumina.com",
            "I'd be honoured to support your journey! My approach blends psychology, quantum mechanics, and spiritual wisdom. Let's connect via email (hello@raphalumina.com) to explore how I can best serve your unique path."
        ]
    },
    meditation: {
        patterns: ['meditate', 'meditation', 'practice', 'mindfulness', 'breathwork'],
        responses: [
            "Meditation is powerful for expanding consciousness! 🧘 I teach various practices tailored to your journey. For personalised guidance, please reach out at hello@raphalumina.com",
            "There are many meditation techniques - from breathwork to quantum field meditation. ✨ I'd love to help you find what resonates. Email me at hello@raphalumina.com"
        ]
    },
    contact: {
        patterns: ['contact', 'email', 'reach', 'booking', 'book', 'session', 'appointment'],
        responses: [
            "I'd love to connect with you more deeply! 💌 You can reach me at hello@raphalumina.com. I typically respond within 24 hours. Looking forward to hearing from you!",
            "To book a session or ask detailed questions, please email me at hello@raphalumina.com 📧 I'll get back to you personally within a day. Excited to support your journey!"
        ]
    },
    default: {
        patterns: [],
        responses: [
            "That's a wonderful question! 💫 For a detailed response tailored to your unique journey, please email me at hello@raphalumina.com. I'd love to explore this with you further.",
            "I appreciate you sharing that. 🙏 To give you the personalised guidance you deserve, let's continue this conversation via email: hello@raphalumina.com",
            "Thank you for reaching out! ✨ Your question deserves a thoughtful response. Please email me at hello@raphalumina.com so we can dive deeper into this together."
        ]
    }
};

// Open Chat Widget
function openChat() {
    chatOpen = true;
    chatWidget.classList.add('active');
    chatInput.focus();
}

// Close Chat Widget
function closeChat() {
    chatOpen = false;
    chatWidget.classList.remove('active');
}

// Send Message Function
function sendMessage() {
    const message = chatInput.value.trim();
    
    if (message === '') return;
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input
    chatInput.value = '';
    
    // Add to history
    chatHistory.push({ role: 'user', content: message });
    
    // Show typing indicator
    showTypingIndicator();
    
    // Get response (with delay for natural feel)
    setTimeout(() => {
        if (USE_API) {
            getAPIResponse(message);
        } else {
            getPredefinedResponse(message);
        }
    }, 1000 + Math.random() * 1000); // 1-2 second delay
}

// Handle Enter Key in Chat Input
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Add Message to Chat
function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const messageText = document.createElement('p');
    messageText.textContent = content;
    
    messageDiv.appendChild(messageText);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show Typing Indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typingIndicator';
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        typingDiv.appendChild(dot);
    }
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove Typing Indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Get Predefined Response (Fallback)
function getPredefinedResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check each category for pattern matches
    for (const category in predefinedResponses) {
        const { patterns, responses } = predefinedResponses[category];
        
        for (const pattern of patterns) {
            if (lowerMessage.includes(pattern)) {
                removeTypingIndicator();
                const response = responses[Math.floor(Math.random() * responses.length)];
                addMessage(response, 'bot');
                chatHistory.push({ role: 'assistant', content: response });
                return;
            }
        }
    }
    
    // Default response if no pattern matches
    removeTypingIndicator();
    const defaultResponse = predefinedResponses.default.responses[
        Math.floor(Math.random() * predefinedResponses.default.responses.length)
    ];
    addMessage(defaultResponse, 'bot');
    chatHistory.push({ role: 'assistant', content: defaultResponse });
}

// Get API Response (When backend is set up)
async function getAPIResponse(userMessage) {
    try {
        const response = await fetch(CHATBOT_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: userMessage,
                history: chatHistory
            })
        });
        
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        const data = await response.json();
        removeTypingIndicator();
        
        if (data.response) {
            addMessage(data.response, 'bot');
            chatHistory.push({ role: 'assistant', content: data.response });
        } else {
            throw new Error('No response from API');
        }
    } catch (error) {
        console.error('Chat API Error:', error);
        removeTypingIndicator();
        
        // Fallback to predefined responses
        getPredefinedResponse(userMessage);
    }
}

// Chat Intro Popup (Shows after 8 seconds on first visit)
function showChatIntro() {
    // Check if intro was already shown
    const introShown = localStorage.getItem('chatIntroShown');
    
    if (!introShown) {
        setTimeout(() => {
            chatIntro.classList.add('active');
        }, 8000); // Show after 8 seconds
    }
}

// Close Chat Intro
function closeChatIntro() {
    chatIntro.classList.remove('active');
    localStorage.setItem('chatIntroShown', 'true');
}

// Open Chat from Intro
function openChatFromIntro() {
    closeChatIntro();
    openChat();
}

// Initialize Chat Intro on Page Load
window.addEventListener('load', () => {
    showChatIntro();
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-bg-image');
    if (heroImage && window.scrollY < window.innerHeight) {
        const scrolled = window.scrollY;
        heroImage.style.transform = `scale(1.1) translateY(${scrolled * 0.5}px)`;
    }
});

// Log that JavaScript is loaded
console.log('🌟 Rapha Lumina Website Loaded Successfully!');
console.log('💬 Chatbot Mode:', USE_API ? 'API' : 'Predefined Responses');
