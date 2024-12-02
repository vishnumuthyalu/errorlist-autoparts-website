import React, { useState, useEffect } from 'react';
import '../styles/ChatBot.css';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';


const client = new GoogleGenerativeAI(
    "AIzaSyCVeuASMlt40xoIn9sWVbHVTL2FNV_V5WE" 
);
console.log(client);
//const model = client.getGenerativeModel({model: "gemini-1.5-flash"});

export const ChatBot = () => {
    const [input, setInput] = useState('');
    const [conversation, setConversation] = useState([]);

    const prompt =  input;

    useEffect(() => {
        console.log('Google Generative AI Client:', client);
        console.log('Client Methods and Properties:', Object.keys(client)); // Logs all available methods
        console.log('Client Methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(client)));
    }, []);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setConversation([...conversation, userMessage]);

        try {
            
            const response = await client.generateContent(prompt);

            const botMessage = {
                sender: 'bot',
                text: response.candidates[0].content, 
            };
            setConversation([...conversation, userMessage, botMessage]);
        } catch (error) {
            console.error('Error communicating with Gemini API:', error);
            const errorMessage = {
                sender: 'bot',
                text: 'Oops! Something went wrong. Please try again.',
            };
            setConversation([...conversation, userMessage, errorMessage]);
        }

        setInput('');
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    return (
        <div className="chatbot-container">
            <h1>Chat With GearBot</h1>
            <p className="caption" > Feel free to ask our AI Chatbot, any of your car related questions, for immediate answers </p>
            <div className="chat-window">
                {conversation.map((message, index) => (
                    <div
                        key={index}
                        className={message.sender === 'user' ? 'user-message' : 'bot-message'}
                    >
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                ))}
            </div>
            <div className="chat-input-container">
                <input
                    className={"chat-input"}
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message here..."
                />
                <button className={"chat-btn"} onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};
