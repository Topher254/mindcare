import React from 'react';
import { MessageCircle, TrendingUp, Users, ArrowRight } from 'lucide-react';

const Bhero = () => {
  return (
    <div className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header section */}
        <div className="text-center mb-16">
          {/* Badge */}
          {/* <div className="inline-flex items-center bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            Comprehensive Support
          </div> */}

          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need for
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold bg-pink-500 bg-clip-text text-transparent mb-6">
            Mental Wellness
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            From AI-powered conversations to professional therapy, we provide
            the complete toolkit for your mental health journey.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* AI Chatbot */}
          <div className="bg-white cursor-pointer rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-6 bg-pink-100  rounded-2xl flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-pink-600" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">AI Chatbot</h3>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Get free, instant support and stress management tips from our intelligent AI 
              companion, available 24/7.
            </p>
            
            <button className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors">
              Learn More
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          {/* Mood Tracking & Insights */}
          <div className="bg-white cursor-pointer rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-6 bg-pink-100 rounded-2xl flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-pink-600" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mood Tracking & Insights</h3>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Track your emotional patterns and receive personalized insights to better 
              understand your mental health journey.
            </p>
            
            <button className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors">
              Learn More
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          {/* Expert Consultations */}
          <div className="bg-white cursor-pointer rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-6 bg-pink-100 to-emerald-100 rounded-2xl flex items-center justify-center">
              <Users className="h-8 w-8 text-pink-600" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Consultations</h3>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Connect with verified mental health professionals for personalized therapy 
              sessions and professional guidance.
            </p>
            
            <button className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors">
              Learn More
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bhero;