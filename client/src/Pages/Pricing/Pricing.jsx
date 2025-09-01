import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Configure axios to include credentials with all requests
  axios.defaults.withCredentials = true;

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:5000/api/auth/check');
        if (response.data.authenticated) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const handlePayment = async (plan, price) => {
    if (!user) {
      alert('Please log in first to subscribe to a plan');
      // Redirect to login page or show login modal
      return;
    }
    
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const processPayment = async () => {
    if (!phoneNumber.startsWith('254')) {
      alert('Please enter a valid Kenyan phone number starting with 254');
      return;
    }

    setIsProcessing(true);
    try {
      // Calculate amount based on plan and billing cycle
      const amount = billingCycle === 'monthly' 
        ? (selectedPlan === 'basic' ? 9.99 : selectedPlan === 'premium' ? 29.99 : 79.99)
        : (selectedPlan === 'basic' ? 99.99 : selectedPlan === 'premium' ? 299.99 : 799.99);

      // Call backend to initiate payment
      const response = await axios.post('http://localhost:5000/api/payment/mpesa', {
        phoneNumber,
        amount,
        plan: selectedPlan,
        billingCycle
      });

      if (response.data.success) {
        setPaymentStatus('pending');
        // Poll for payment status
        checkPaymentStatus(response.data.checkoutRequestId);
      } else {
        setPaymentStatus('failed');
        alert('Payment initiation failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('failed');
      alert('An error occurred during payment processing');
    } finally {
      setIsProcessing(false);
    }
  };

  const checkPaymentStatus = async (checkoutRequestId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/payment/status/${checkoutRequestId}`
      );
      
      if (response.data.status === 'Paid') {
        setPaymentStatus('success');
        // Update user subscription status
        const userResponse = await axios.get('http://localhost:5000/api/auth/check');
        setUser(userResponse.data.user);
      } else if (response.data.status === 'Failed') {
        setPaymentStatus('failed');
      } else {
        // Keep checking if still pending
        setTimeout(() => checkPaymentStatus(checkoutRequestId), 3000);
      }
    } catch (error) {
      console.error('Status check error:', error);
    }
  };


  // Pricing plans (same as before)
  const plans = {
    monthly: [
      {
        name: "Basic",
        price: "Kshs999.99",
        period: "per month",
        description: "Essential mental health support for everyday needs",
        features: [
          "Unlimited chat with MindCare Bot",
          "Daily mood tracking",
          "Basic mindfulness exercises",
          "Community support access",
          "Email support"
        ],
        buttonText: "Get Started",
        popular: false
      },
      {
        name: "Premium",
        price: "Kshs1999.99",
        period: "per month",
        description: "Comprehensive support with expert access",
        features: [
          "All Basic features",
          "2 live sessions with experts monthly",
          "Personalized therapy plans",
          "Advanced mindfulness library",
          "Priority chat support",
          "Crisis management tools"
        ],
        buttonText: "Most Popular",
        popular: true
      },
      {
        name: "Professional",
        price: "Kshs2499.99",
        period: "per month",
        description: "Complete mental wellness package",
        features: [
          "All Premium features",
          "Unlimited expert sessions",
          "24/7 crisis support line",
          "Personalized treatment plan",
          "Family therapy sessions (2 monthly)",
          "Wellness workshops access",
          "Dedicated care coordinator"
        ],
        buttonText: "Get Premium Care",
        popular: false
      }
    ],
    yearly: [
      {
        name: "Basic",
        price: "Kshs99.99",
        period: "per year",
        description: "Essential mental health support for everyday needs",
        features: [
          "Unlimited chat with MindCare Bot",
          "Daily mood tracking",
          "Basic mindfulness exercises",
          "Community support access",
          "Email support"
        ],
        buttonText: "Get Started",
        popular: false,
        savings: "17% savings"
      },
      {
        name: "Premium",
        price: "Kshs299.99",
        period: "per year",
        description: "Comprehensive support with expert access",
        features: [
          "All Basic features",
          "2 live sessions with experts monthly",
          "Personalized therapy plans",
          "Advanced mindfulness library",
          "Priority chat support",
          "Crisis management tools"
        ],
        buttonText: "Most Popular",
        popular: true,
        savings: "17% savings"
      },
      {
        name: "Professional",
        price: "Kshs799.99",
        period: "per year",
        description: "Complete mental wellness package",
        features: [
          "All Premium features",
          "Unlimited expert sessions",
          "24/7 crisis support line",
          "Personalized treatment plan",
          "Family therapy sessions (2 monthly)",
          "Wellness workshops access",
          "Dedicated care coordinator"
        ],
        buttonText: "Get Premium Care",
        popular: false,
        savings: "17% savings"
      }
    ]
  };

  // Value propositions (same as before)
  const valueProps = [
    {
      icon: "💪",
      title: "Build Resilience",
      description: "Develop coping strategies that help you navigate life's challenges with greater ease and confidence."
    },
    {
      icon: "🎯",
      title: "Personalized Approach",
      description: "Get support tailored to your specific needs, preferences, and mental health goals."
    },
    {
      icon: "🔒",
      title: "Safe & Confidential",
      description: "Your privacy is our priority. All sessions and data are encrypted and confidential."
    },
    {
      icon: "⏰",
      title: "Immediate Access",
      description: "Get help when you need it most with on-demand support and scheduled sessions."
    }
  ];

  // FAQ items (same as before)
  const faqItems = [
    {
      question: "How do I know which plan is right for me?",
      answer: "Our Basic plan is great for those who need occasional support and want to develop mindfulness habits. Premium is ideal if you want regular expert guidance. Professional offers comprehensive care for those with more significant mental health needs. You can always start with one plan and upgrade later."
    },
    {
      question: "Can I change or cancel my plan anytime?",
      answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. If you cancel, you'll continue to have access until the end of your billing period."
    },
    {
      question: "Do you accept insurance?",
      answer: "We don't directly bill insurance, but we can provide you with detailed receipts (superbills) that you can submit to your insurance provider for possible reimbursement. Many PPO plans offer partial coverage for mental health services."
    },
    {
      question: "How do sessions with experts work?",
      answer: "After selecting a plan, you can browse our network of licensed therapists and mental health professionals. Sessions are conducted via secure video call, and you can book times that work with your schedule."
    },
    {
      question: "What if I need immediate help in a crisis?",
      answer: "Our Professional plan includes 24/7 crisis support. For Basic and Premium users, we provide connections to emergency resources. However, if you're experiencing a mental health emergency, please call 988 (Suicide and Crisis Lifeline) or go to your nearest emergency room."
    },
    {
      question: "Is my data private and secure?",
      answer: "Absolutely. We use bank-level encryption and adhere to HIPAA guidelines to protect all your personal information and session data. Your information is never sold or shared without your explicit consent."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "We offer a 14-day money-back guarantee for all new subscriptions. If you're not satisfied with our service, contact our support team for a full refund."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Invest in Your Mental Wellbeing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quality mental health care shouldn't be a luxury. We offer transparent pricing to make professional support accessible to everyone.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-1 shadow-sm inline-flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full ${billingCycle === 'monthly' ? 'bg-pink-500 text-white' : 'text-gray-700'}`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full ${billingCycle === 'yearly' ? 'bg-pink-500 text-white' : 'text-gray-700'}`}
            >
              Yearly Billing
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Save 17%</span>
            </button>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans[billingCycle].map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-2xl p-8 ${plan.popular ? 'border-2 border-pink-500 bg-white shadow-xl' : 'bg-white border border-gray-200 shadow-md'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              {plan.savings && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {plan.savings}
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600">/{plan.period}</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handlePayment(plan.name.toLowerCase(), plan.price)}
                className={`w-full py-3 rounded-lg font-semibold ${
                  plan.popular 
                    ? 'bg-pink-500 text-white hover:bg-pink-600' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                } transition-colors`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Complete Your Subscription</h3>
              
              {paymentStatus === null && (
                <>
                  <p className="mb-4">You're subscribing to the <strong>{selectedPlan}</strong> plan ({billingCycle}).</p>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      M-Pesa Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="254712345678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter your M-Pesa number in the format 254712345678</p>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowPaymentModal(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={processPayment}
                      disabled={isProcessing || phoneNumber.length < 12}
                      className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 disabled:opacity-50"
                    >
                      {isProcessing ? 'Processing...' : 'Pay Now'}
                    </button>
                  </div>
                </>
              )}
              
              {paymentStatus === 'pending' && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
                  <p>Waiting for you to complete the M-Pesa payment on your phone...</p>
                </div>
              )}
              
              {paymentStatus === 'success' && (
                <div className="text-center py-4">
                  <svg className="h-12 w-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-lg font-medium mb-2">Payment Successful!</p>
                  <p>Your {selectedPlan} subscription is now active.</p>
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
                  >
                    Continue to MindCare
                  </button>
                </div>
              )}
              
              {paymentStatus === 'failed' && (
                <div className="text-center py-4">
                  <svg className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <p className="text-lg font-medium mb-2">Payment Failed</p>
                  <p>Please try again or contact support if the problem persists.</p>
                  <button
                    onClick={() => setPaymentStatus(null)}
                    className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full text-left py-4 font-medium text-gray-900 hover:text-pink-600"
                >
                  <span>{item.question}</span>
                  <svg 
                    className={`h-5 w-5 transform ${activeFAQ === index ? 'rotate-180' : ''} transition-transform`} 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {activeFAQ === index && (
                  <div className="pb-4 text-gray-600">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;