
const GeminiConfig = {
    API_KEY: 'AIzaSyCRCddtqKt1Kg44_QMY3KY04WbhLL7IMnc',
    
    API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    
    // Initialize Gemini with your API key
    initialize: function() {
        if (!this.API_KEY) {
            console.error('Please set your Gemini API key');
            displayError('API key not configured. Please set up your Gemini API key.');
            return false;
        }
        console.log('Gemini API initialized successfully');
        return true;
    },

    // Validate input prompt
    validatePrompt: function(prompt) {
        if (!prompt || typeof prompt !== 'string') {
            throw new Error('Invalid prompt: Prompt must be a non-empty string');
        }
        if (prompt.length > 10000) {
            throw new Error('Invalid prompt: Prompt is too long (max 10000 characters)');
        }
        return true;
    },

    // Send a request to the Gemini API
    generateResponse: async function(prompt) {
        try {
            this.validatePrompt(prompt);

            const requestUrl = `${this.API_URL}?key=${this.API_KEY}`;
            console.log('Sending request to:', requestUrl);

            const requestBody = {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024
                }
            };

            console.log('Request body:', JSON.stringify(requestBody, null, 2));

            const response = await fetch(requestUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error Response:', errorData);

                if (response.status === 401) {
                    throw new Error('Authentication failed: Invalid API key');
                } else if (response.status === 429) {
                    throw new Error('Rate limit exceeded: Please try again later');
                } else {
                    throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
                }
            }

            const data = await response.json();
            console.log('Full Gemini API response:', data);

            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!text) {
                throw new Error('No valid response content found');
            }

            return text;
        } catch (error) {
            console.error('Error generating response:', error);
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                displayError('Network error: Please check your internet connection');
            } else {
                displayError(error.message);
            }
            throw error;
        }
    }
};

// Helper function to display errors in the UI
function displayError(message) {
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'message bot-message';
        errorMessage.innerHTML = `
            <div class="message-content" style="background-color: #ffebee;">
                <p style="color: #d32f2f;"><strong>Error:</strong> ${message}</p>
            </div>
        `;
        chatMessages.appendChild(errorMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Initialize the Gemini API when the script loads
document.addEventListener('DOMContentLoaded', function() {
    GeminiConfig.initialize();
});
