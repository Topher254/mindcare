import React, { useState, useEffect, useRef } from 'react';
import user1 from '../../assets/user.png';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user] = useState({
    name: "Alex Johnson",
    status: "Premium Member",
    avatar: user1,
    sessionTime: "03:00"
  });
  const messagesEndRef = useRef(null);
  const timerRef = useRef(null);

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <h2 className="text-lg font-semibold">MindCare Chat</h2>
        <div className="w-6"></div> {/* Spacer for balance */}
      </div>

      {/* Left Sidebar - User Dashboard */}
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-1/4 bg-white border-r border-gray-200 flex flex-col overflow-y-auto`}>
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
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${Math.min(100, (chatTime / 180) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-blue-100 text-blue-700 p-3 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
              Mood Check
            </button>
            <button className="bg-green-100 text-green-700 p-3 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
              Exercises
            </button>
            <button className="bg-purple-100 text-purple-700 p-3 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors">
              Journal
            </button>
            <button className="bg-yellow-100 text-yellow-700 p-3 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors">
              Resources
            </button>
          </div>
        </div>

        {/* Resources */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">Quick Resources</h4>
          <ul className="space-y-2">
            <li className="flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer p-2 hover:bg-blue-50 rounded">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Breathing Exercises
            </li>
            <li className="flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer p-2 hover:bg-blue-50 rounded">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Mood Tracker
            </li>
            <li className="flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer p-2 hover:bg-blue-50 rounded">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Therapist Directory
            </li>
            <li className="flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer p-2 hover:bg-blue-50 rounded">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              Emergency Contacts
            </li>
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

        {/* Wellness Tips */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">Today's Wellness Tip</h4>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-gray-700">Practice gratitude by writing down three things you're thankful for today. This simple exercise can boost your mood and overall well-being.</p>
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
        <div className="bg-pink-500 p-4 text-white">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
              <img src={user1} alt='MindCare Bot' className='rounded-full w-8 h-8'/>
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
              <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200 shadow-sm'}`}>
                <div dangerouslySetInnerHTML={formatMessage(message.text)} />
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex mb-4 justify-start">
              <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
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
              className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              disabled={showPaymentPrompt}
            />
            <button
              onClick={handleSendMessage}
              disabled={inputText.trim() === '' || showPaymentPrompt}
              className="bg-pink-500 text-white rounded-r-lg px-4 py-2 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
              </svg>
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