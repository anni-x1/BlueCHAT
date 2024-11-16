import React, { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "./Context/AppContext";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { fetchData } from "./FetchData";

export default function Main() {
  const { username, mode, authenticated, registered, messages, setMessages } = useContext(AppContext);
  const [prompt, setPrompt] = useState({ usr_input: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const chatContainerRef = useRef();

  const exampleMessages = [
    "How do I get started with React?",
    "Write a python code to print Hello World!",
    "What is the meaning of life?"
  ];

  const handlePromptChange = (event) => {
    setPrompt({ usr_input: event.target.value });
  };

  const handleTabClick = (message) => {
    setPrompt({ usr_input: message });
  }; 

  const handleReset = async () => {
    setMessages([]);
    try {
      await fetch('http://localhost:56000/api/user/resetHistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
    } catch (error) {
      console.error("Error resetting history:", error);
    }
  };

  const handleClick = () => {
    if (prompt.usr_input !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          "type": "user",
          "content": prompt.usr_input
        },
      ]);

      setLoading(true);
      setPrompt({ usr_input: "" });
      fetchData(username, prompt, (response) => {
        try {
          if (response) {
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                "type": "ai",
                "content": response
              },
            ]);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Error fetching data! :(", error);
        } finally {
          setLoading(false);
        }
      });
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFocus = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return "Good Morning";
    } else if (hours < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={materialDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  if (!authenticated) {
    if (registered)
      return <Login />;
    else
      return <Signup />
  }

  return (
    <>
      <div ref={chatContainerRef} className="chat-container">
        <div className="spacer"></div>
        {messages.length === 0 && (
          <>
            <div className="greeting-container">
              <h2>{getGreeting()}, {username}!</h2>
            </div>
            <div className="tab-container">
              {exampleMessages.map((msg, index) => (
                <div key={index} className={`tab-${mode} mx-1`} onClick={() => handleTabClick(msg)}>
                  {msg}
                </div>
              ))}
            </div>
          </>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${msg.type === "user" ? `usr_msg-${mode}` : `ai_msg-${mode}`}`}
          >
            <ReactMarkdown components={components}>
              {msg.type === "user" ? msg.content : msg.content}
            </ReactMarkdown>
          </div>
        ))}

        {loading && (
          <div style={{ color: "black" }}>
            <span>typing...</span>
            <div className="spinner-grow spinner-grow-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
      </div>
      <div className={`chat-input-container-${mode}`}>
        <input
          onFocus={handleFocus}
          onChange={handlePromptChange}
          type="text"
          value={prompt.usr_input}
          placeholder="Ask me anything..."
          className={`chat-input-${mode}`}
          onKeyDown={(e) =>
            e.key === "Enter" && prompt.usr_input.trim() !== "" && handleClick()
          }
          disabled={loading}
        />
        {loading ? (
          <button
            onClick={handleClick}
            className={`pending-button-${mode}`}
            disabled={true}
          >
            <span className="material-symbols-outlined">adjust</span>
          </button>
        ) : (
          <button
            onClick={handleClick}
            className={`send-button-${mode}`}
            disabled={prompt.usr_input.trim() === ""}
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        )}
        <button
          data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Reset chat history"
          onClick={handleReset}
          className={`send-button-${mode}`}
        >
          <span className="material-symbols-outlined">restart_alt</span>
        </button>
      </div>
    </>
  );
}
