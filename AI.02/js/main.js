/**
 * Main JavaScript for Gemini AI Chatbot
 * Handles user interactions and communication with the Gemini AI API
 */

// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Chat history to maintain conversation context
let chatHistory = [];

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing application...');
    
    // Initialize Gemini AI configuration
    const initialized = GeminiConfig.initialize();
    console.log('Gemini initialization status:', initialized);
    
    // Set up event listeners
    setupEventListeners();
    console.log('Event listeners set up');
    
    // Auto-resize the input field as the user types
    setupInputAutoResize();
    console.log('Input auto-resize set up');
});

/**
 * Set up event listeners for user interactions
 */
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Send message when the send button is clicked
    sendButton.addEventListener('click', () => {
        console.log('Send button clicked');
        handleSendMessage();
    });
    
    // Send message when Enter key is pressed (without Shift)
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            console.log('Enter key pressed');
            event.preventDefault();
            handleSendMessage();
        }
    });
}

/**
 * Handle sending a user message
 */
async function handleSendMessage() {
    // Get user input and trim whitespace
    const message = userInput.value.trim();
    console.log('Handling message:', message);
    
    // Don't send empty messages
    if (!message) {
        console.log('Empty message, not sending');
        return;
    }
    
    try {
        // Add user message to the chat
        addMessageToChat('user', message);
        console.log('User message added to chat');
        
        // Clear the input field
        userInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        console.log('Typing indicator shown');
        
        // Add message to history
        chatHistory.push({ role: 'user', content: message });
        
        // Get response from Gemini AI
        console.log('Getting response from Gemini...');
        const response = await GeminiConfig.generateResponse(message);
        console.log('Received response from Gemini:', response);
        
        // Hide typing indicator
        hideTypingIndicator();
        console.log('Typing indicator hidden');
        
        // Add bot response to the chat
        addMessageToChat('bot', response);
        console.log('Bot response added to chat');
        
        // Add response to history
        chatHistory.push({ role: 'bot', content: response });
    } catch (error) {
        console.error('Error in handleSendMessage:', error);
        
        // Hide typing indicator
        hideTypingIndicator();
        
        // Display error message
        displayError(`Failed to get response: ${error.message}`);
    }
}

/**
 * Add a message to the chat display
 * @param {string} sender - 'user' or 'bot'
 * @param {string} content - The message content
 */
function addMessageToChat(sender, content) {
    // Create message container
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    // Create avatar element
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    
    // Set avatar image based on sender
    const avatarImg = document.createElement('img');
    avatarImg.src = sender === 'user' ? 'img/user.jpg' : 'img/logo.png';
    avatarImg.alt = sender === 'user' ? 'User' : 'AI';
    avatarDiv.appendChild(avatarImg);
    
    // Create message content container
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Process and render the message content
    const formattedContent = formatMessageContent(content);
    contentDiv.innerHTML = `<p>${formattedContent}</p>`;
    
    // Append avatar and content to message
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    // Add message to chat
    chatMessages.appendChild(messageDiv);
    
    // Scroll to the bottom of the chat
    scrollToBottom();
    
    // Add animation for smooth appearance
    setTimeout(() => {
        messageDiv.classList.add('visible');
    }, 10);
}

/**
 * Format message content to handle markdown-like syntax
 * @param {string} content - Raw message content
 * @returns {string} - Formatted HTML content
 */
function formatMessageContent(content) {
    // Simple formatting for code blocks
    let formatted = content.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    
    // Format bold text
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Format italic text
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert URLs to clickable links
    formatted = formatted.replace(
        /(https?:\/\/[^\s]+)/g, 
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );
    
    // Convert line breaks to <br> tags
    formatted = formatted.replace(/\n/g, '<br>');
    
    return formatted;
}

/**
 * Show typing indicator in the chat
 */
function showTypingIndicator() {
    // Create typing indicator container
    const indicator = document.createElement('div');
    indicator.id = 'typing-indicator';
    indicator.className = 'message bot-message';
    
    // Create avatar element
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    
    // Set avatar image
    const avatarImg = document.createElement('img');
    avatarImg.src = 'img/logo.png';
    avatarImg.alt = 'AI';
    avatarDiv.appendChild(avatarImg);
    
    // Create indicator content
    const content = document.createElement('div');
    content.className = 'message-content typing-indicator';
    
    // Add typing dots
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'typing-dot';
        content.appendChild(dot);
    }
    
    // Add to DOM
    indicator.appendChild(avatarDiv);
    indicator.appendChild(content);
    chatMessages.appendChild(indicator);
    
    // Scroll to make indicator visible
    scrollToBottom();
}

/**
 * Hide the typing indicator
 */
function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

/**
 * Scroll to the bottom of the chat container
 */
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Set up auto-resizing for the input textarea
 */
function setupInputAutoResize() {
    userInput.addEventListener('input', () => {
        // Reset height to auto to get the correct scrollHeight
        userInput.style.height = 'auto';
        
        // Set height to scrollHeight to expand the textarea
        userInput.style.height = Math.min(userInput.scrollHeight, 150) + 'px';
    });
} 