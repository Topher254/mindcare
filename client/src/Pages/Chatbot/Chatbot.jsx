import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello lovely! 🌸 I'm here to support your wellness journey. How are you feeling today?",
      isUser: false
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Get API key from Vite environment variables
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  // console.log("My API Key:", apiKey);
  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

  // Quick questions users can select
  const quickQuestions = [
    "How can I reduce stress?",
    "What are some self-care tips?",
    "I'm feeling anxious, what can I do?",
    "How to improve my sleep?",
    "Tips for mindfulness?",
    "How to build better habits?",
    "Ways to boost my mood?",
    "How to handle negative thoughts?"
  ];

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Check if API key is available
      if (!genAI) {
        throw new Error("API key not configured");
      }

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Act as a compassionate wellness advisor. Respond to this message with warm, supportive, and friendly advice: "${input}". Keep responses under 100 words. Use emojis occasionally. Focus on mental health, self-care, and wellness.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { text, isUser: false }]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages(prev => [...prev, { 
        text: "I'm feeling a bit overwhelmed right now 🌸 Could you try asking me again in a slightly different way?", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInput(question);
  };

  return (
    <div className="flex my-5 flex-col lg:flex-row max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-pink-50 to-pink-100">
      {/* Left Panel - Quick Questions */}
      <div className="lg:w-1/4 bg-pink-200 p-4 flex flex-col">
        <h3 className="text-lg font-semibold text-pink-800 mb-4">Quick Questions 🌸</h3>
        <div className="space-y-2 flex-1 overflow-y-auto">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="w-full text-left p-3 rounded-lg bg-white text-pink-800 hover:bg-pink-300 transition-colors text-sm shadow-sm"
            >
              {question}
            </button>
          ))}
        </div>
        
        {/* Expert CTA */}
        <div className="mt-6 p-4 bg-pink-500 text-white rounded-lg">
          <h3 className="font-semibold mb-2">Need more help?</h3>
          <p className="text-sm mb-3">If you're feeling overwhelmed, our certified experts are here for you.</p>
          <a 
            href="/experts" 
            className="block text-center bg-white text-pink-600 py-2 rounded-lg font-semibold hover:bg-pink-100 transition-colors"
          >
            Connect with Experts
          </a>
        </div>
      </div>

      {/* Chat Panel */}
      <div className="flex flex-col lg:w-3/4 h-[600px]">
        <div className="p-4 bg-pink-400 text-white">
          <h2 className="text-lg font-semibold">Mindcare Companion 🌸</h2>
          <p className="text-sm opacity-90">Here to support you</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  msg.isUser
                    ? 'bg-pink-500 text-white'
                    : 'bg-white text-pink-900 border border-pink-200'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-pink-900 px-4 py-2 rounded-2xl border border-pink-200">
                Thinking... 🌸
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-pink-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Share your thoughts..."
              className="flex-1 rounded-full px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              disabled={isLoading || !apiKey}
            />
            <button
              type="submit"
              disabled={isLoading || !apiKey}
              className="bg-pink-500 text-white rounded-full px-4 py-2 hover:bg-pink-600 disabled:opacity-50 transition-colors"
            >
              Send
            </button>
          </div>
          {!apiKey && (
            <p className="text-red-500 text-xs mt-2">
              Warning: API key not configured. Please set VITE_GEMINI_API_KEY in your environment variables.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Chatbot;