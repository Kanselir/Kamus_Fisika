/**
 * Gemini AI Configuration
 * This file handles API key configuration and initialization of the Gemini API
 */

// Configuration object for Gemini AI
const GeminiConfig = {
    // API endpoint for Gemini Pro model
    API_URL: 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent',
    
    // Initialize Gemini with your API key
    initialize: function() {
        // Get API key from environment variable or configuration
        this.API_KEY = process.env.GEMINI_API_KEY || '';
        
        // Validate API key
        if (!this.API_KEY) {
            console.error('Please set your Gemini API key in the environment variables');
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
            // Validate prompt
            this.validatePrompt(prompt);
            
            // Construct the request URL with API key
            const requestUrl = `${this.API_URL}?key=${this.API_KEY}`;
            
            // Prepare the request body
            const requestBody = {
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024
                }
            };
            
            // Make the API request
            const response = await fetch(requestUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            
            // Handle response errors
            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 401) {
                    throw new Error('Authentication failed: Invalid API key');
                } else if (response.status === 429) {
                    throw new Error('Rate limit exceeded: Please try again later');
                } else {
                    throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
                }
            }
            
            // Parse and return the response
            const data = await response.json();
            
            // Extract the generated text from the response
            if (data.candidates && data.candidates.length > 0 && 
                data.candidates[0].content && 
                data.candidates[0].content.parts && 
                data.candidates[0].content.parts.length > 0) {
                
                return data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('No valid response content found');
            }
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