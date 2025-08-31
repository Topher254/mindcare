import React, { useState, useEffect, useRef } from 'react';
import user1 from '../../assets/user.png'

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hi there! I'm MindCare Bot, your mental health companion. How are you feeling today?",
      sender: 'bot'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatTime, setChatTime] = useState(0);
  const [showPaymentPrompt, setShowPaymentPrompt] = useState(false);
  const [user] = useState({
    name: "Alex Johnson",
    status: "Premium Member",
    avatar: user1,
    sessionTime: "03:00"
  });
  const messagesEndRef = useRef(null);
  const timerRef = useRef(null);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Start timer when component mounts
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setChatTime(prev => {
        if (prev >= 180) { // 3 minutes in seconds
          clearInterval(timerRef.current);
          setShowPaymentPrompt(true);
          return 180;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle serious issues - provide resources immediately
  const handleSeriousIssues = () => {
    const crisisResources = [
      { text: "I'm really concerned about what you're sharing. It's important to talk to a professional who can help right away.", sender: 'bot' },
      { text: "Please contact one of these resources immediately:", sender: 'bot' },
      { text: "National Suicide Prevention Lifeline: 988 or 1-800-273-8255", sender: 'bot' },
      { text: "Crisis Text Line: Text HOME to 741741", sender: 'bot' },
      { text: "These services are free, confidential, and available 24/7.", sender: 'bot' },
      { text: "Remember, I'm not a replacement for a licensed therapist. If you're in crisis, please reach out to a professional immediately.", sender: 'bot' }
    ];
    
    setMessages(prev => [...prev, ...crisisResources]);
  };

  // Bot responses based on user input
  const getBotResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Check for crisis keywords first
    if (lowerCaseMessage.includes('suicide') || lowerCaseMessage.includes('kill myself') || 
        lowerCaseMessage.includes('end it all') || lowerCaseMessage.includes('self-harm')) {
      handleSeriousIssues();
      return;
    }
    
    // Check for other mental health concerns
    if (lowerCaseMessage.includes('anxious') || lowerCaseMessage.includes('anxiety') || 
        lowerCaseMessage.includes('nervous') || lowerCaseMessage.includes('worried')) {
      return [
        "I'm sorry you're feeling anxious. That can be really challenging.",
        "When anxiety shows up, try this simple breathing exercise: Inhale slowly for 4 counts, hold for 2, then exhale slowly for 6 counts. Repeat 5 times.",
        "Would you like to try a grounding technique or learn about our anxiety management resources?"
      ];
    }
    
    if (lowerCaseMessage.includes('depress') || lowerCaseMessage.includes('sad') || 
        lowerCaseMessage.includes('hopeless') || lowerCaseMessage.includes('empty')) {
      return [
        "I hear that you're going through a difficult time. Thank you for sharing that with me.",
        "When feeling down, sometimes small actions can help. Would you consider taking a short walk outside or writing down one thing you appreciate?",
        "Our mood tracking feature might help you identify patterns in your emotions. Would you like to learn more about it?"
      ];
    }
    
    if (lowerCaseMessage.includes('stress') || lowerCaseMessage.includes('overwhelm') || 
        lowerCaseMessage.includes('stressed')) {
      return [
        "Stress can feel overwhelming, but there are ways to manage it.",
        "Try the 5-4-3-2-1 grounding technique: Name 5 things you can see, 4 things you can feel, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
        "MindCare also offers stress management sessions with licensed professionals. Would you like information about booking a consultation?"
      ];
    }
    
    if (lowerCaseMessage.includes('sleep') || lowerCaseMessage.includes('insomnia') || 
        lowerCaseMessage.includes('tired')) {
      return [
        "Sleep issues can really impact our mental health. Have you tried establishing a calming bedtime routine?",
        "Consider limiting screen time before bed, trying a guided sleep meditation, or journaling to clear your mind before sleep.",
        "I can suggest some sleep hygiene resources if that would be helpful."
      ];
    }
    
    // Default responses for general conversation
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || 
        lowerCaseMessage.includes('hey')) {
      return ["Hello there! How are you feeling today?"];
    }
    
    if (lowerCaseMessage.includes('thank')) {
      return ["You're very welcome! I'm here whenever you need to talk."];
    }
    
    return [
      "Thank you for sharing. How has that been affecting your daily life?",
      "I'm here to listen and support you. Would you like to try a mindfulness exercise or perhaps some journaling prompts?",
      "Remember to be gentle with yourself today. Small steps forward are still progress."
    ];
  };

  // Handle sending messages
  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    const userMessage = { text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Bot is typing
    setIsTyping(true);
    
    // Simulate bot thinking and response
    setTimeout(() => {
      const botResponses = getBotResponse(inputText);
      
      if (botResponses) {
        const botMessages = botResponses.map(text => ({ text, sender: 'bot' }));
        setMessages(prev => [...prev, ...botMessages]);
      }
      
      setIsTyping(false);
    }, 1500);
  };

  // Handle payment option
  const handlePayment = () => {
    setShowPaymentPrompt(false);
    setMessages(prev => [...prev, 
      { text: "Thank you for subscribing! You now have full access to our premium features.", sender: 'bot' }
    ]);
  };

  // Handle therapist connection
  const handleTherapist = () => {
    setShowPaymentPrompt(false);
    setMessages(prev => [...prev, 
      { text: "I'm connecting you with a licensed therapist. Please hold while we find the best match for you.", sender: 'bot' },
      { text: "In the meantime, is there anything specific you'd like to share about what you're looking for in a therapist?", sender: 'bot' }
    ]);
  };

  // Quick suggestion buttons
  const quickSuggestions = [
    "I'm feeling anxious",
    "I've been really stressed",
    "I'm having a tough day",
    "Suggest a breathing exercise"
  ];

  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion);
  };

  // Format message text with links and emphasis
  const formatMessage = (text) => {
    // Make numbers bold (like helpline numbers)
    const formattedText = text.replace(/(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4})/g, '<strong>$1</strong>');
    
    return { __html: formattedText };
  };

  return (
    <div className="flex h-screen mb-10 bg-gray-100">
      {/* Left Sidebar - User Dashboard */}
      <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
        {/* User Profile */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{user.name}</h3>
              <p className="text-sm text-green-600">{user.status}</p>
            </div>
          </div>
        </div>

        {/* Session Timer */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Session Time:</span>
            <span className="font-mono text-lg font-semibold text-blue-600">{formatTime(chatTime)}</span>
          </div>
        </div>

        {/* Resources */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">Quick Resources</h4>
          <ul className="space-y-2">
            <li className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">Breathing Exercises</li>
            <li className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">Mood Tracker</li>
            <li className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">Therapist Directory</li>
            <li className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">Emergency Contacts</li>
          </ul>
        </div>

        {/* Payment Prompt - shows after 3 minutes */}
        {showPaymentPrompt && (
          <div className="p-4 border-b border-gray-200 bg-yellow-50">
            <h4 className="font-medium text-gray-900 mb-2">Continue Your Session</h4>
            <p className="text-sm text-gray-600 mb-3">Your free chat session has ended. Choose an option to continue:</p>
            <button 
              onClick={handlePayment}
              className="w-full bg-green-600 text-white py-2 rounded-lg mb-2 hover:bg-green-700 transition-colors"
            >
              Subscribe ($9.99/month)
            </button>
            <button 
              onClick={handleTherapist}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Talk to a Therapist Now
            </button>
          </div>
        )}

        {/* Upcoming Sessions */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">Upcoming Sessions</h4>
          <div className="text-sm text-gray-600">
            <p>No upcoming sessions</p>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="p-4">
          <h4 className="font-medium text-gray-900 mb-2">Your Progress</h4>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-sm">
                <span>Mood Improvement</span>
                <span>65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Consistency</span>
                <span>42%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="bg-pink-400  p-4 text-white">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
             <img src={user1} alt='image' className='rounded-full'/>
            </div>
            <div>
              <h2 className="font-bold text-lg">MindCare Bot</h2>
              <p className="text-sm opacity-80">Your mental health companion</p>
            </div>
          </div>
        </div>
        
        {/* Chat messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.map((message, index) => (
            <div key={index} className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                <div dangerouslySetInnerHTML={formatMessage(message.text)} />
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex mb-4 justify-start">
              <div className="bg-gray-200 text-gray-800 rounded-lg p-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Quick suggestions */}
        <div className="p-3 bg-gray-100 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 mb-2">
            {quickSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs bg-white border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-50 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
          
          {/* Input area */}
          <div className="flex">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message here..."
              className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={showPaymentPrompt}
            />
            <button
              onClick={handleSendMessage}
              disabled={inputText.trim() === '' || showPaymentPrompt}
              className="bg-blue-500 text-white rounded-r-lg px-4 py-2 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="bg-gray-800 text-white text-xs p-2 text-center">
          Remember: I'm not a replacement for professional help. If you're in crisis, please contact a mental health professional or emergency services immediately.
        </div>
      </div>
    </div>
  );
};

export default Chatbot;