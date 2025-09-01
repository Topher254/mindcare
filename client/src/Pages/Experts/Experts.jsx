import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Experts = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    sessionType: 'online',
    date: '',
    time: '',
    location: '',
    notes: '',
    emergencyContact: '',
    preferredCommunication: 'video'
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [user, setUser] = useState(null);

  // Configure axios to include credentials
  axios.defaults.withCredentials = true;

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('https://mindcare.proessayworks.com/api/auth/check');
        if (response.data.authenticated) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };
    
    checkAuth();
  }, []);

  // Expert data
  const experts = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Clinical Psychologist",
      specialty: "Anxiety and Depression",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      reviews: 128,
      experience: "10 years",
      price: "Kshs120/session",
      education: "PhD in Clinical Psychology, Harvard University",
      approach: "Cognitive Behavioral Therapy (CBT), Mindfulness",
      languages: ["English", "Spanish"],
      availability: "Mon-Fri, 9am-5pm",
      bio: "Dr. Johnson specializes in treating anxiety and depression using evidence-based approaches. She creates a safe, non-judgmental space for clients to explore their challenges and develop effective coping strategies."
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      title: "Licensed Therapist",
      specialty: "Trauma and PTSD",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      reviews: 96,
      experience: "8 years",
      price: "Kshs110/session",
      education: "MSW, Columbia University",
      approach: "EMDR, Trauma-Focused CBT",
      languages: ["English", "Mandarin"],
      availability: "Tue-Sat, 10am-6pm",
      bio: "Dr. Chen specializes in trauma recovery and helping clients overcome PTSD. His compassionate approach helps clients process traumatic experiences and rebuild their lives."
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      title: "Relationship Counselor",
      specialty: "Relationship Issues",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      reviews: 142,
      experience: "12 years",
      price: "Kshs130/session",
      education: "PhD in Marriage and Family Therapy, Northwestern University",
      approach: "Gottman Method, Emotionally Focused Therapy",
      languages: ["English", "Spanish", "French"],
      availability: "Mon-Thu, 8am-4pm",
      bio: "Dr. Rodriguez helps couples and individuals navigate relationship challenges, improve communication, and build stronger connections."
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      title: "Addiction Specialist",
      specialty: "Addiction Recovery",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      reviews: 87,
      experience: "15 years",
      price: "Kshs140/session",
      education: "MD, Johns Hopkins University",
      approach: "Motivational Interviewing, 12-Step Facilitation",
      languages: ["English"],
      availability: "Mon-Fri, 9am-5pm",
      bio: "Dr. Wilson specializes in addiction recovery, helping clients overcome substance abuse and develop healthy coping mechanisms for long-term sobriety."
    },
    {
      id: 5,
      name: "Dr. Lisa Thompson",
      title: "Child Psychologist",
      specialty: "Child and Adolescent Therapy",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      reviews: 113,
      experience: "9 years",
      price: "Kshs125/session",
      education: "PsyD in Child Psychology, UCLA",
      approach: "Play Therapy, Family Systems Therapy",
      languages: ["English", "German"],
      availability: "Wed-Sun, 10am-6pm",
      bio: "Dr. Thompson specializes in working with children and adolescents, helping them navigate emotional challenges, behavioral issues, and family dynamics."
    },
    {
      id: 6,
      name: "Dr. Robert Kim",
      title: "Psychiatrist",
      specialty: "Medication Management",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      reviews: 91,
      experience: "11 years",
      price: "Kshs150/session",
      education: "MD, Stanford University",
      approach: "Pharmacotherapy, Psychodynamic Therapy",
      languages: ["English", "Korean"],
      availability: "Mon-Fri, 8am-4pm",
      bio: "Dr. Kim specializes in psychiatric medication management, working with clients to find the right pharmacological approach to support their mental health journey."
    }
  ];

  // Filter experts by specialty
  const filteredExperts = activeFilter === 'all' 
    ? experts 
    : experts.filter(expert => expert.specialty.toLowerCase().includes(activeFilter));

  const handleBookingClick = (expert) => {
    if (!user) {
      alert('Please log in first to book a session');
      return;
    }
    
    setSelectedExpert(expert);
    setShowBookingModal(true);
    setBookingSuccess(false);
    // Reset form data
    setBookingData({
      sessionType: 'online',
      date: '',
      time: '',
      location: '',
      notes: '',
      emergencyContact: '',
      preferredCommunication: 'video'
    });
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitBooking = async () => {
    try {
      const response = await axios.post('https://mindcare.proessayworks.com/api/bookings', {
        expertId: selectedExpert.id,
        expertName: selectedExpert.name,
        userId: user.id,
        userName: user.username,
        sessionType: bookingData.sessionType,
        date: bookingData.date,
        time: bookingData.time,
        location: bookingData.location,
        notes: bookingData.notes,
        emergencyContact: bookingData.emergencyContact,
        preferredCommunication: bookingData.preferredCommunication,
        status: 'pending'
      });

      if (response.data.success) {
        setBookingSuccess(true);
      } else {
        alert('Booking failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('An error occurred while booking the session');
    }
  };

  // Generate time slots for the time select
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const time = `Kshs{hour.toString().padStart(2, '0')}:Kshs{min.toString().padStart(2, '0')}`;
        slots.push(<option key={time} value={time}>{time}</option>);
      }
    }
    return slots;
  };

  // Function to handle assessment quiz
  const handleAssessmentQuiz = () => {
    alert('Assessment quiz feature coming soon!');
    // You can implement navigation to a quiz page here
    // For example: navigate('/assessment-quiz');
  };

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
                    <button 
                      onClick={() => handleBookingClick(expert)}
                      className="flex-1 border border-pink-500 text-pink-500 py-2 rounded-lg hover:bg-pink-50 transition-colors"
                    >
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
        <div className="text-center bg-pink-500 rounded-2xl p-10 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Take the Next Step?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Connect with a mental health expert today and start your journey toward better well-being.
          </p>
          <div className="space-x-4">
            <button className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Browse All Experts
            </button>
            <button 
              onClick={handleAssessmentQuiz}
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors"
            >
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
                <button 
                  onClick={() => handleBookingClick(selectedExpert)}
                  className="flex-1 bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors"
                >
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

      {/* Booking Modal */}
      {showBookingModal && selectedExpert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Book a Session with {selectedExpert.name}</h2>
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              {bookingSuccess ? (
                <div className="text-center py-8">
                  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2">Booking Confirmed!</h3>
                  <p className="text-gray-600 mb-6">Your session with {selectedExpert.name} has been scheduled successfully.</p>
                  <button 
                    onClick={() => setShowBookingModal(false)}
                    className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Session Type</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="sessionType"
                          value="online"
                          checked={bookingData.sessionType === 'online'}
                          onChange={handleBookingChange}
                          className="mr-2"
                        />
                        Online
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="sessionType"
                          value="physical"
                          checked={bookingData.sessionType === 'physical'}
                          onChange={handleBookingChange}
                          className="mr-2"
                        />
                        Physical
                      </label>
                    </div>
                  </div>

                  {bookingData.sessionType === 'physical' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location/Address</label>
                      <input
                        type="text"
                        name="location"
                        value={bookingData.location}
                        onChange={handleBookingChange}
                        placeholder="Enter your location or preferred meeting address"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  )}

                  {bookingData.sessionType === 'online' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Communication</label>
                      <select
                        name="preferredCommunication"
                        value={bookingData.preferredCommunication}
                        onChange={handleBookingChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="video">Video Call</option>
                        <option value="audio">Audio Call</option>
                        <option value="chat">Chat</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={bookingData.date}
                      onChange={handleBookingChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <select
                      name="time"
                      value={bookingData.time}
                      onChange={handleBookingChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select a time</option>
                      {generateTimeSlots()}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={bookingData.emergencyContact}
                      onChange={handleBookingChange}
                      placeholder="Phone number of someone to contact in case of emergency"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
                    <textarea
                      name="notes"
                      value={bookingData.notes}
                      onChange={handleBookingChange}
                      placeholder="Any specific concerns or preferences you'd like to share"
                      rows="3"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={submitBooking}
                      disabled={!bookingData.date || !bookingData.time}
                      className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 disabled:opacity-50"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experts;