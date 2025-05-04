document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messages');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-btn');
    const uploadButton = document.getElementById('upload-btn');
    const fileInput = document.getElementById('file-input');
    const modeButtons = document.querySelectorAll('.mode-btn');
    const themeToggle = document.getElementById('theme-toggle');

    let currentMode = 'chat';
    let interactionState = 'idle';
    let currentProblem = null;
    let uploadedImage = null;

    // Theme handling
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    let currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
    });

    // Auto-resize textarea
    userInput.addEventListener('input', () => {
        userInput.style.height = 'auto';
        userInput.style.height = userInput.scrollHeight + 'px';
    });

    // Mode selection
    modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentMode = button.dataset.mode;
            updatePlaceholder();
        });
    });

    // File upload
    uploadButton.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', handleImageUpload);

    // Form submission
    chatForm.addEventListener('submit', handleSubmit);

    function updatePlaceholder() {
        if (interactionState === 'thinking') {
            userInput.placeholder = 'PhysiPal is thinking...';
        } else if (currentMode === 'practice') {
            if (interactionState === 'awaiting_feedback') {
                userInput.placeholder = 'Enter your solution to the practice problem...';
            } else {
                userInput.placeholder = 'Click "Send" or type anything to get a practice problem.';
            }
        } else if (currentMode === 'homework' && uploadedImage) {
            userInput.placeholder = 'Image uploaded. PhysiPal is working on it...';
        } else if (currentMode === 'homework') {
            userInput.placeholder = 'Type your homework problem or upload an image...';
        } else {
            userInput.placeholder = 'Ask PhysiPal anything about physics...';
        }
    }

    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                uploadedImage = reader.result;
                if (currentMode === 'homework') {
                    addMessage('user', 'Uploaded an image');
                    getAiResponse('Solve the problem in the image.', currentMode, uploadedImage);
                }
            };
            reader.readAsDataURL(file);
        }
    }

    function addMessage(sender, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        // Create avatar with image
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        const avatarImg = document.createElement('img');
        avatarImg.src = sender === 'user' ? 'user-avatar.png' : 'ai-avatar.png';
        avatarImg.alt = sender === 'user' ? 'User' : 'AI';
        avatarDiv.appendChild(avatarImg);
        messageDiv.appendChild(avatarDiv);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = content.replace(/\n/g, '<br>');
        
        messageDiv.appendChild(contentDiv);
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom with smooth animation
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const trimmedInput = userInput.value.trim();

        if (interactionState === 'thinking') return;

        if (currentMode === 'practice' && interactionState === 'idle') {
            addMessage('user', 'Give me a practice problem.');
            getAiResponse('Give me a practice problem.', 'practice');
            return;
        }

        if (currentMode === 'practice' && interactionState === 'awaiting_feedback' && trimmedInput && currentProblem) {
            addMessage('user', trimmedInput);
            getAiResponse(trimmedInput, 'practice', null, true, currentProblem);
            return;
        }

        if (trimmedInput || uploadedImage) {
            const messageToSend = trimmedInput || (uploadedImage ? 'Please solve the problem in the image.' : '');
            if (messageToSend) {
                addMessage('user', messageToSend);
                getAiResponse(messageToSend, currentMode, uploadedImage);
            }
        }

        userInput.value = '';
        userInput.style.height = 'auto';
    }

    function getAiResponse(userMessage, mode, image = null, isFeedbackReq = false, problemCtx = null) {
        interactionState = 'thinking';
        updatePlaceholder();
        userInput.value = '';
        uploadedImage = null;

        // Show thinking indicator
        const thinkingMessage = document.createElement('div');
        thinkingMessage.className = 'message ai thinking';
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        const avatarImg = document.createElement('img');
        avatarImg.src = 'ai-avatar.png';
        avatarImg.alt = 'AI';
        avatarDiv.appendChild(avatarImg);
        thinkingMessage.appendChild(avatarDiv);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = 'Thinking';
        thinkingMessage.appendChild(contentDiv);
        
        messagesContainer.appendChild(thinkingMessage);
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });

        // Simulate AI response (replace with actual API call)
        setTimeout(() => {
            // Remove thinking indicator
            thinkingMessage.remove();
            
            let aiResponseContent = '';
            
            if (mode === 'chat') {
                aiResponseContent = `I understand you're asking about physics. Here's a detailed explanation...`;
            } else if (mode === 'practice') {
                if (isFeedbackReq && problemCtx) {
                    aiResponseContent = `**Correct!** Your solution is well-reasoned and follows the correct principles of physics.`;
                } else {
                    aiResponseContent = `Here's a practice problem for you:\n\nA ball is thrown vertically upward with an initial velocity of 20 m/s. Calculate the maximum height it reaches.`;
                    currentProblem = aiResponseContent;
                    interactionState = 'awaiting_feedback';
                }
            } else if (mode === 'homework') {
                if (image) {
                    aiResponseContent = `Based on the image you provided, here's the solution to the physics problem...`;
                } else {
                    aiResponseContent = `Here's the solution to your homework problem...`;
                }
            }

            addMessage('ai', aiResponseContent);
            interactionState = 'idle';
            updatePlaceholder();
        }, 1000);
    }

    // Initialize placeholder
    updatePlaceholder();
}); 