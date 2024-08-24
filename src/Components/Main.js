import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { fetchData } from './FetchData';

export default function Main({ mode }) {
    const [prompt, setPrompt] = useState({ usr_input: '' });
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)

    const chatContainerRef = useRef(null);

    const handlePromptChange = (event) => {
        setPrompt({ usr_input: event.target.value });
    };

    const handleClick = () => {
        if (prompt.usr_input !== '') {
            setMessages(prevMessages => [
                ...prevMessages,
                { type: 'user', usr_msg: prompt.usr_input }
            ]);

            setLoading(true);

            fetchData(prompt, (response) => {
                try {
                    if (response) {
                        setMessages(prevMessages => [
                            ...prevMessages,
                            { type: 'ai', ai_msg: response }
                        ]);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setError('Error fetching data! :(', error)
                } finally {
                    setLoading(false);
                    setPrompt('')
                }
            });

            setPrompt({ usr_input: '' });
        }
    };

    useEffect(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [messages]);

    const handleFocus = () => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    };

    return (
        <>
            <div ref={chatContainerRef} className="chat-container">
                <div className="spacer"></div>
                {messages.map((msg, index) => (
                    <div key={index} className={`${msg.type === 'user' ? `usr_msg-${mode}` : `ai_msg-${mode}`}`}>
                        <ReactMarkdown>
                            {msg.type === 'user' ? msg.usr_msg : msg.ai_msg}
                        </ReactMarkdown>
                    </div>
                ))}
                {loading && (
                    <div>
                        <div className="spinner-grow spinner-grow-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
                {error && 
                <div class="alert alert-danger" role="alert">
                    {error}
                </div>}
            </div>
            <div className={`chat-input-container-${mode}`}>
                <button type='file' className={`file-upload-button-${mode}`}>
                    <span className="material-symbols-outlined">attach_file</span>
                </button>
                <input
                    onFocus={handleFocus}
                    onChange={handlePromptChange}
                    type="text"
                    value={prompt.usr_input || ''}  // Ensure a default value
                    placeholder="Ask me anything"
                    className={`chat-input-${mode}`}
                    onKeyDown={(e) => e.key === 'Enter' && handleClick()}
                />
                {loading ? <button onClick={handleClick} className={`pending-button-${mode}`} disabled={loading}>
                    <span className="material-symbols-outlined">adjust</span>
                </button> : <button onClick={handleClick} className={`send-button-${mode}`}>
                    <span className="material-symbols-outlined">send</span>
                </button>}
            </div>
        </>
    );
}
