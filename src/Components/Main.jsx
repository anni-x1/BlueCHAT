import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { fetchData } from "./FetchData";

export default function Main({ mode }) {
  const [prompt, setPrompt] = useState({ usr_input: "" });
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const chatContainerRef = useRef();

  // Example messages for the tabs
  const exampleMessages = [
    "Write a python code to print Hello World!",
    "Tell me a fun fact about space.",
    "What is the meaning of life?"
  ];

  // Handle prompt change
  const handlePromptChange = (event) => {
    setPrompt({ usr_input: event.target.value });
  };

  // Handle tab click - sets the selected example message into the input box
  const handleTabClick = (message) => {
    setPrompt({ usr_input: message });
  };

  // Handle send message
  const handleClick = () => {
    if (prompt.usr_input !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", usr_msg: prompt.usr_input },
      ]);

      setLoading(true);
      setPrompt({ usr_input: "" });
      fetchData(prompt, (response) => {
        try {
          if (response) {
            setMessages((prevMessages) => [
              ...prevMessages,
              { type: "ai", ai_msg: response },
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
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  const handleFocus = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
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

  return (
    <>
      <div ref={chatContainerRef} className="chat-container" >
        <div className="spacer"></div>
        {messages.length === 0 && (
          <div className="tab-container">
            {exampleMessages.map((msg, index) => (
              <div key={index} className={`tab-${mode} mx-1`} onClick={() => handleTabClick(msg)}>
                {msg}
              </div>
            ))}
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${msg.type === "user" ? `usr_msg-${mode}` : `ai_msg-${mode}`
              }`}
          >
            <ReactMarkdown components={components}>
              {msg.type === "user" ? msg.usr_msg : msg.ai_msg}
            </ReactMarkdown>
            {msg.type === "user" && (
              <div className={`pen-edit-${mode} material-symbols-outlined`}>
                edit
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div>
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
        <button type="file" className={`file-upload-button-${mode}`}>
          <span className="material-symbols-outlined">attach_file</span>
        </button>
        <input
          onFocus={handleFocus}
          onChange={handlePromptChange}
          type="text"
          value={prompt.usr_input}
          placeholder="Ask me anything"
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
      </div>
    </>
  );
}
