import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Nav/Navbar'
import Home from './Pages/Home/Home'
import Footer from './Components/Footer/Footer'

// Import other pages
import Chatbot from './Pages/Chatbot/Chatbot'
import Experts from './Pages/Experts/Experts'
import Pricing from './Pages/Pricing/Pricing'
import Login from './Pages/Auth/Login'

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main content grows to push footer down */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/experts" element={<Experts />} />
            <Route path="/pricing" element={<Pricing />} />
            {/* <Route path="/login" element={<Login />} /> */}
          </Routes>
        </main>

        {/* Footer always at bottom */}
        <Footer />
      </div>
    </Router>
  )
}

export default App
