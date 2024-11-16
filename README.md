# BlueChat AI

**BlueChat AI** is an advanced conversational web application powered by Google's **Generative AI (Gemini 1.5 Flash)** model. The platform supports real-time AI conversations and offers a clean, user-friendly chat interface with additional features like light/dark modes, user authentication, and chat history management.

## Features

- **Real-time AI Conversations:** Interact with a conversational AI using Google's powerful Generative AI model.
- **User Authentication:** Secure user registration and login system, allowing personalized chats.
- **Chat History Management:** Stores users' chat history for retrieval during future sessions.
- **Light & Dark Mode:** Provides a theme toggle to switch between visually pleasing light and dark themes.
- **Custom Branding:** Includes sleek "BLUECHAT" branding for a personalized experience.
- **Loading Spinner:** Displays a loading animation while waiting for AI responses.
- **Error Handling:** Robust error handling for a smooth user experience.
- **CORS Support:** Enables seamless communication between the client and server.
  
## Getting Started

### Prerequisites
- **Node.js** installed on your machine.
- **MongoDB** for data storage.
- A valid API key for **Google's Generative AI (Gemini 1.5 Flash)** model.

### Installation

#### 1. Clone the Repository:
```bash
git clone https://github.com/anni-x1/BlueChat-AI.git
cd BlueChat-AI
```

#### 2. Install Dependencies:
```bash
npm install
```

#### 3. Set Up Environment Variables:
Create a `.env` file in the root directory with the following variables:
```bash
API_KEY=your_google_generative_ai_api_key
MONGO_URI=your_mongo_database_url
PORT=your_preferred_port
```

#### 4. Run the Server:
```bash
npm start
```
The server will start on the specified port (default is `http://localhost:59000`).

## Usage

### Sending a Message
Send a POST request to `http://localhost:59000/api/chat` with the following JSON payload:
```json
{
  "username": "your_username",
  "message": "Hello, BlueChat!"
}
```
The response will include the AI's message, which you can display on the chat interface.

### User Authentication

#### Registration
Send a POST request to `http://localhost:59000/api/auth/register` with a JSON body:
```json
{
  "username": "new_username",
  "email": "user_email@example.com",
  "password": "secure_password"
}
```

#### Login
Send a POST request to `http://localhost:59000/api/auth/login`:
```json
{
  "username": "registered_username",
  "password": "user_password"
}
```

Upon successful login, you'll receive user details and chat history in the response.

## Client-Side Integration
You can easily integrate BlueChat into your front-end by making requests to the back-end server.

### Example Client-Side Request (JavaScript):
```javascript
fetch('http://localhost:59000/api/chat', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: 'your_username', message: 'Tell me a joke!' }),
})
    .then(response => response.json())
    .then(data => {
        console.log('AI response:', data.message);
        // Display the response in your chat UI
    })
    .catch(error => console.error('Error:', error));
```

## API Endpoints

- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login with existing credentials.
- `POST /api/chat` - Send a message to the AI and receive a response.
- `POST /api/user/resetHistory` - Reset the chat history for a user.
- `DELETE /api/user/deleteUser` - Delete a user account and all associated data.

## Future Enhancements

- **Multiple Chat Histories:** Store and display previous conversations in a sidebar for easy access.
- **Enhanced Voice Interaction:** Implement real-time voice interaction for a more engaging experience.
- **Advanced Analytics:** Provide insights into user behavior and chat patterns.

## Contributing

I welcome contributions to improve BlueChat! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature-branch`).
5. Create a Pull Request.
