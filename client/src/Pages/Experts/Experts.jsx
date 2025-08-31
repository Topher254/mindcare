import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Experts = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedExpert, setSelectedExpert] = useState(null);

  // Expert data
  const experts = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Clinical Psychologist",
      specialty: "Anxiety & Depression",
      experience: "12 years",
      education: "PhD in Clinical Psychology, Harvard University",
      approach: "Cognitive Behavioral Therapy (CBT), Mindfulness",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      rating: 4.9,
      reviews: 142,
      price: "Kshs150/session",
      languages: ["English", "Spanish"],
      availability: "Mon, Wed, Fri",
      bio: "Specialized in helping adults overcome anxiety and depression through evidence-based approaches. Passionate about empowering clients with practical tools for daily life."
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      title: "Psychiatrist",
      specialty: "Medication Management",
      experience: "15 years",
      education: "MD Psychiatry, Johns Hopkins University",
      approach: "Pharmacotherapy, Integrated Treatment",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
      rating: 4.8,
      reviews: 89,
      price: "Kshs200/session",
      languages: ["English", "Mandarin"],
      availability: "Tue, Thu",
      bio: "Board-certified psychiatrist with expertise in medication management for mood disorders. Believes in combining medication with therapy for best outcomes."
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      title: "Licensed Therapist",
      specialty: "Trauma & PTSD",
      experience: "8 years",
      education: "MA in Counseling Psychology, Stanford University",
      approach: "EMDR, Trauma-Focused CBT",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
      rating: 4.9,
      reviews: 117,
      price: "Kshs120/session",
      languages: ["English", "Spanish"],
      availability: "Mon-Fri",
      bio: "Specializes in trauma recovery and helping clients overcome PTSD. Creates a safe, supportive environment for healing and growth."
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      title: "Couples Therapist",
      specialty: "Relationships & Marriage",
      experience: "18 years",
      education: "PhD in Marriage and Family Therapy, NYU",
      approach: "Gottman Method, Emotionally Focused Therapy",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      rating: 4.7,
      reviews: 203,
      price: "Kshs180/session",
      languages: ["English"],
      availability: "Wed, Thu, Sat",
      bio: "Helps couples improve communication, resolve conflicts, and strengthen their relationships. Over 18 years of experience working with diverse couples."
    },
    {
      id: 5,
      name: "Dr. Amina Patel",
      title: "Child Psychologist",
      specialty: "Child & Adolescent Therapy",
      experience: "10 years",
      education: "PhD in Child Psychology, UCLA",
      approach: "Play Therapy, Family Systems",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
      rating: 4.9,
      reviews: 96,
      price: "Kshs160/session",
      languages: ["English", "Hindi", "Gujarati"],
      availability: "Mon, Tue, Thu",
      bio: "Specializes in working with children and adolescents dealing with anxiety, behavioral issues, and school-related challenges."
    },
    {
      id: 6,
      name: "Robert Kim",
      title: "Addiction Specialist",
      specialty: "Substance Abuse Recovery",
      experience: "14 years",
      education: "MA in Clinical Social Work, Columbia University",
      approach: "Motivational Interviewing, Relapse Prevention",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
      rating: 4.8,
      reviews: 134,
      price: "Kshs140/session",
      languages: ["English", "Korean"],
      availability: "Mon-Fri",
      bio: "Dedicated to helping individuals overcome addiction and maintain long-term recovery. Focuses on building coping skills and resilience."
    }
  ];

 

  // Filter experts by specialty
  const filteredExperts = activeFilter === 'all' 
    ? experts 
    : experts.filter(expert => expert.specialty.toLowerCase().includes(activeFilter));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Connect With Mental Health Experts
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our licensed professionals are here to provide personalized care and evidence-based treatment for your mental health needs.
          </p>
        </div>

       
        {/* Filter Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Find the Right Expert for You
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full Kshs{activeFilter === 'all' ? 'bg-pink-500 text-white' : 'bg-white text-gray-700'} shadow-sm`}
            >
              All Specialties
            </button>
            <button
              onClick={() => setActiveFilter('anxiety')}
              className={`px-4 py-2 rounded-full Kshs{activeFilter === 'anxiety' ? 'bg-pink-500 text-white' : 'bg-white text-gray-700'} shadow-sm`}
            >
              Anxiety
            </button>
            <button
              onClick={() => setActiveFilter('depression')}
              className={`px-4 py-2 rounded-full Kshs{activeFilter === 'depression' ? 'bg-pink-500 text-white' : 'bg-white text-gray-700'} shadow-sm`}
            >
              Depression
            </button>
            <button
              onClick={() => setActiveFilter('trauma')}
              className={`px-4 py-2 rounded-full Kshs{activeFilter === 'trauma' ? 'bg-pink-500 text-white' : 'bg-white text-gray-700'} shadow-sm`}
            >
              Trauma
            </button>
            <button
              onClick={() => setActiveFilter('relationship')}
              className={`px-4 py-2 rounded-full Kshs{activeFilter === 'relationship' ? 'bg-pink-500 text-white' : 'bg-white text-gray-700'} shadow-sm`}
            >
              Relationships
            </button>
            <button
              onClick={() => setActiveFilter('addiction')}
              className={`px-4 py-2 rounded-full Kshs{activeFilter === 'addiction' ? 'bg-pink-500 text-white' : 'bg-white text-gray-700'} shadow-sm`}
            >
              Addiction
            </button>
          </div>

          {/* Experts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperts.map(expert => (
              <div key={expert.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={expert.image} alt={expert.name} className="w-full h-60 object-cover" />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-semibold">{expert.rating}</span>
                    <span className="text-gray-500 ml-1">({expert.reviews})</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{expert.name}</h3>
                  <p className="text-pink-600 font-medium">{expert.title}</p>
                  <p className="text-gray-600 mt-2">{expert.specialty}</p>
                  
                  <div className="flex items-center mt-4">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-gray-600">{expert.experience} experience</span>
                  </div>
                  
                  <div className="mt-4">
                    <span className="text-2xl font-bold text-gray-900">{expert.price}</span>
                  </div>
                  
                  <div className="mt-6 flex space-x-3">
                    <button 
                      onClick={() => setSelectedExpert(expert)}
                      className="flex-1 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
                    >
                      View Profile
                    </button>
                    <button className="flex-1 border border-pink-500 text-pink-500 py-2 rounded-lg hover:bg-pink-50 transition-colors">
                      Book Session
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-2xl p-8 shadow-md mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose an Expert</h3>
              <p className="text-gray-600">Browse profiles, read reviews, and select the right mental health professional for your needs.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Book a Session</h3>
              <p className="text-gray-600">Schedule a convenient time for your appointment through our secure booking system.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Your Journey</h3>
              <p className="text-gray-600">Connect with your expert via video call and begin your path to better mental health.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-pink-500  rounded-2xl p-10 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Take the Next Step?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Connect with a mental health expert today and start your journey toward better well-being.
          </p>
          <div className="space-x-4">
            <button className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Browse All Experts
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors">
              Take Assessment Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Expert Detail Modal */}
      {selectedExpert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="relative">
              <img src={selectedExpert.image} alt={selectedExpert.name} className="w-full h-64 object-cover" />
              <button 
                onClick={() => setSelectedExpert(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedExpert.name}</h2>
                  <p className="text-pink-600 font-medium">{selectedExpert.title}</p>
                  <p className="text-gray-600 mt-1">{selectedExpert.specialty}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-semibold">{selectedExpert.rating}</span>
                    <span className="text-gray-500 ml-1">({selectedExpert.reviews} reviews)</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{selectedExpert.price}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Experience</h3>
                  <p className="text-gray-600">{selectedExpert.experience}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Education</h3>
                  <p className="text-gray-600">{selectedExpert.education}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Approach</h3>
                  <p className="text-gray-600">{selectedExpert.approach}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
                  <p className="text-gray-600">{selectedExpert.languages.join(', ')}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Availability</h3>
                  <p className="text-gray-600">{selectedExpert.availability}</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-600">{selectedExpert.bio}</p>
              </div>

              <div className="mt-8 flex space-x-4">
                <button className="flex-1 bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors">
                  Book a Session
                </button>
                <button className="flex-1 border border-pink-500 text-pink-500 py-3 rounded-lg hover:bg-pink-50 transition-colors">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experts;