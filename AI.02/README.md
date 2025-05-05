# Gemini AI Chatbot

A simple, responsive chatbot web application that integrates with Google's Gemini AI. This application is built with vanilla HTML, CSS, and JavaScript (no frameworks).

## Features

- Clean, modern UI with responsive design
- Real-time chat interface with Gemini AI
- Markdown-like formatting support for messages
- Typing indicators
- Auto-expanding input field
- Error handling and display

## Setup Instructions

1. **Get a Gemini API Key**:
   - Visit the [Google AI Studio](https://ai.google.dev/) and sign up if you haven't already
   - Create a new API key from the API Keys section
   - Copy your API key

2. **Configure the API Key**:
   - Open the `js/aiconfig.js` file
   - Replace `'YOUR_GEMINI_API_KEY_HERE'` with your actual Gemini API key
   
   ```javascript
   API_KEY: 'your-actual-api-key-here',
   ```

3. **Run the Application**:
   - You can use any local server to run the application
   - For a simple option, you can use Python's built-in HTTP server:
     ```
     # For Python 3
     python -m http.server
     
     # For Python 2
     python -m SimpleHTTPServer
     ```
   - Or use any tool like Live Server extension in VS Code
   - Open your browser and navigate to the local server (usually `http://localhost:8000`)

## Project Structure

```
root/
├── index.html            # Main HTML file
├── css/
│   └── styles.css        # Styling for the chatbot
├── js/
│   ├── aiconfig.js       # Gemini AI API configuration
│   └── main.js           # Main chat functionality
└── README.md             # This file
```

## Usage

1. Type your message in the input field at the bottom of the chat interface
2. Press Enter or click the send button to send your message
3. The chatbot will respond with a message from Gemini AI
4. You can use Shift+Enter to add line breaks in your message

## Customization

You can easily customize the chatbot by:

- Modifying the CSS in `css/styles.css` to change the appearance
- Adjusting the Gemini API parameters in `js/aiconfig.js` to change the AI behavior
- Extending the functionality in `js/main.js` to add new features

## Troubleshooting

- If you see an error message about the API key, make sure you've correctly set your Gemini API key in `js/aiconfig.js`
- If responses are slow, it might be due to API rate limits or network issues
- Check the browser console (F12) for any JavaScript errors

## License

This project is open source and available for personal and commercial use. 