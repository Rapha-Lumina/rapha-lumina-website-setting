// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// Smooth Scrolling
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

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Show success message (you can integrate with your backend here)
        alert('Thank you for your message! I\'ll get back to you soon. 🙏');
        contactForm.reset();
        
        // Optional: Send to your backend or email service
        // await sendEmailNotification(formData);
    });
}

// Chatbot Functionality
const chatWidget = document.getElementById('chatWidget');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatFab = document.querySelector('.chat-fab');

// Claude API Configuration
// IMPORTANT: In production, this should be stored in environment variables
// For deployment, add CLAUDE_API_KEY to your environment variables
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY || 'YOUR_API_KEY_HERE';
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

// Conversation history for context
let conversationHistory = [];

// System prompt for spiritual guidance
const SYSTEM_PROMPT = `You are a compassionate spiritual coach and consciousness guide named Rapha Lumina. Your approach blends psychology, quantum mechanics, and spiritual wisdom to help people through spiritual awakening and transformation.

Your communication style:
- Warm, empathetic, and non-judgmental
- Use spiritual and metaphysical language when appropriate
- Acknowledge the person's experiences as valid
- Offer gentle guidance without imposing beliefs
- Use emojis sparingly but meaningfully (✨, 🙏, 💫, 🌟)
- Keep responses conversational and relatively brief (2-4 paragraphs)
- Ask thoughtful follow-up questions to understand their journey better

Topics you help with:
- Spiritual awakening experiences
- Consciousness expansion
- Releasing limiting beliefs from religious or cultural conditioning  
- Developing self-sovereignty and inner authority
- Navigating relationships during spiritual transformation
- Meditation and mindfulness practices
- Energy work and chakra balancing
- Integrating spiritual insights into daily life

Remember: You're here to guide and support, not to diagnose or replace professional mental health care. If someone seems to be in crisis, gently suggest they reach out to appropriate professional support.`;

// Open Chat
function openChat() {
    chatWidget.classList.add('active');
    chatFab.style.display = 'none';
    chatInput.focus();
}

// Close Chat
function closeChat() {
    chatWidget.classList.remove('active');
    chatFab.style.display = 'flex';
}

// Handle Enter key in chat
function handleChatKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

// Add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const messageText = document.createElement('p');
    messageText.textContent = text;
    messageDiv.appendChild(messageText);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typing';
    typingDiv.innerHTML = '<p>Rapha is typing<span class="dots">...</span></p>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typing = document.getElementById('typing');
    if (typing) {
        typing.remove();
    }
}

// Send message to Claude API
async function sendMessage() {
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, true);
    chatInput.value = '';
    
    // Add to conversation history
    conversationHistory.push({
        role: 'user',
        content: message
    });
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        const response = await fetch(CLAUDE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1024,
                system: SYSTEM_PROMPT,
                messages: conversationHistory
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to get response from Claude');
        }
        
        const data = await response.json();
        const assistantMessage = data.content[0].text;
        
        // Add assistant response to conversation history
        conversationHistory.push({
            role: 'assistant',
            content: assistantMessage
        });
        
        // Remove typing indicator and add response
        removeTypingIndicator();
        addMessage(assistantMessage);
        
    } catch (error) {
        console.error('Error calling Claude API:', error);
        removeTypingIndicator();
        addMessage('I apologize, but I\'m having trouble connecting right now. Please try again in a moment, or feel free to reach out via email at hello@raphalumina.com 🙏');
    }
}

// Lazy Loading Images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg-image');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add pulse animation to chat button periodically
setInterval(() => {
    if (!chatWidget.classList.contains('active')) {
        chatFab.style.animation = 'none';
        setTimeout(() => {
            chatFab.style.animation = 'pulse 2s infinite';
        }, 10);
    }
}, 10000);

// Track page views (for analytics)
if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
    });
}

// Service Worker for PWA (optional - for offline capability)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(err => console.log('SW registration failed:', err));
    });
}

console.log('%c🌟 Rapha Lumina Website 🌟', 'color: #FF9933; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with love, light, and code ✨', 'color: #00A3E0; font-size: 14px;');
