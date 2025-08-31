import React from 'react';
import test1 from '../../../assets/ment1.jpg';
import test2 from '../../../assets/ment2.jpg';
import test3 from '../../../assets/ment3.jpg';
import test4 from '../../../assets/ment4.jpg';
import test5 from '../../../assets/ment5.jpg';

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Geoffrey Mott",
      image: test5,
      text: "This is simply unbelievable! Without it, we would have gone bankrupt by now. I didn't even need training.",
      date: "01 March, 2022"
    },
    {
      id: 2,
      name: "Daryl Nehls",
      image: test2,
      text: "No matter where you go, It's is the coolest, most happening thing around! Not able to tell you how happy I am with it.",
      date: "03 March, 2022"
    },
    {
      id: 3,
      name: "Edgar Torrey",
      image: test3,
      text: "I'd be lost without it. It's incredible. It's is the real deal! Since I invested in it I made over 100,000 dollars profits.",
      date: "06 March, 2022"
    },
    {
      id: 4,
      name: "Sarah Johnson",
      image: test2,
      text: "The personalized care I received was outstanding. The staff understood my needs and provided exactly what I needed for recovery.",
      date: "08 March, 2022"
    },
    {
      id: 5,
      name: "Michael Chen",
      image: test5,
      text: "After struggling with anxiety for years, this program changed my life. The support system is incredible and truly life-changing.",
      date: "12 March, 2022"
    },
    {
      id: 6,
      name: "Lisa Rodriguez",
      image: test1,
      text: "Professional, caring, and effective. I couldn't have asked for better mental health support. Highly recommend to anyone seeking help.",
      date: "15 March, 2022"
    }
  ];

  const TestimonialCard = ({ testimonial }) => (
    <div className="p-6 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-80 shrink-0 bg-white">
      <div className="flex gap-4 items-start">
        <img className="w-12 h-12 rounded-full object-cover" src={testimonial.image} alt={testimonial.name} />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p className="font-medium text-gray-900">{testimonial.name}</p>
            <svg className="mt-0.5" width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" fill="#2196F3" />
            </svg>
          </div>
          <span className="text-xs text-slate-500 mt-1">@{testimonial.name.toLowerCase().replace(/\s+/g, '')}</span>
        </div>
      </div>
      <p className="text-sm py-4 text-gray-800">{testimonial.text}</p>
      <div className="flex items-center justify-between text-slate-500 text-xs">
        <div className="flex items-center gap-1">
          <span>Posted on</span>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-500">
            <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="m.027 0 4.247 5.516L0 10h.962l3.742-3.926L7.727 10H11L6.514 4.174 10.492 0H9.53L6.084 3.616 3.3 0zM1.44.688h1.504l6.64 8.624H8.082z" fill="currentColor" />
            </svg>
          </a>
        </div>
        <p>{testimonial.date}</p>
      </div>
    </div>
  );

  return (
    <div className="py-20 px-6 bg-gradient-to-br from-gray-50 to-pink-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Love from patients who treated by
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Mindcare's best service
          </h2>
        </div>

        {/* Marquee Testimonials */}
        <style>{`
          @keyframes marqueeScroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }

          .marquee-inner {
            animation: marqueeScroll 30s linear infinite;
            display: flex;
          }

          .marquee-reverse {
            animation-direction: reverse;
          }

          .marquee-row:hover .marquee-inner {
            animation-play-state: paused;
          }
        `}</style>

        {/* First Marquee Row */}
        <div className="marquee-row w-full mx-auto max-w-6xl overflow-hidden relative mb-8">
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-gray-50 to-transparent"></div>
          <div className="marquee-inner flex transform-gpu">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <TestimonialCard key={`first-${index}`} testimonial={testimonial} />
            ))}
          </div>
          <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-gray-50 to-transparent"></div>
        </div>

        {/* Second Marquee Row (Reverse Direction) */}
        <div className="marquee-row w-full mx-auto max-w-6xl overflow-hidden relative">
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-gray-50 to-transparent"></div>
          <div className="marquee-inner marquee-reverse flex transform-gpu">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <TestimonialCard key={`second-${index}`} testimonial={testimonial} />
            ))}
          </div>
          <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-gray-50 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;