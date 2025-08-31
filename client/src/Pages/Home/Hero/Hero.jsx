import React from 'react';
import { Phone } from 'lucide-react';
import ment from '../../../assets/ment1.jpg'
import { Link } from 'react-router-dom';
 const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 flex justify-center items-center">
    

      {/* Hero Section */}
      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Depression Badge */}
            <div className="inline-flex items-center space-x-2 bg-pink-100 px-3 py-2 rounded-full">
              <span className="text-sm text-pink-600 font-medium">Depressed?</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                There's No One Face
              </h1>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                to Mental Health
              </h1>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Conditions
              </h1>
            </div>

            {/* Description */}
            <div className="space-y-2 text-gray-600 text-lg">
              <p>At Mind care, there's no one-size-fits-all approach to mental health.</p>
              <p>We tailor our care plans to fit each person's unique needs.</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 transform hover:scale-105">
                Start Free Chat
              </button>
              
              <div className="flex items-center space-x-2 text-gray-700 hover:cursor-pointer">
                <Phone className="w-5 h-5" />
                <span className="font-medium">+254 796 871876</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            {/* Image placeholder */}
            <div className="relative w-full h-[600px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden">
              {/* Placeholder for the person looking up */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-500">
                   <img src={ment} alt='person'/>
                </div>
              </div>
              
              {/* Decorative elements to match the original */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/20 rounded-full translate-y-24 -translate-x-24"></div>
              <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-200/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;