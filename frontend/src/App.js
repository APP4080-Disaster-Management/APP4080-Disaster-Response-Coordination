import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import IncidentReportForm from './components/IncidentReportForm';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Donations from './components/Donations';
import AddDonation from './components/AddDonation';
import Volunteers from './components/Volunteers';
import Navigation from './components/Navigation';
import NotFound from './pages/NotFound';
import Alerts from './components/Alerts';
import Disasters from './components/Disaster';
import IncidentList from './components/IncidentList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the token is in localStorage to set login state
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }
  }, []);

  const notify = () => {
    toast('Welcome to the Disaster Response Coordination App!');
  };

  return (
    <>
      <ToastContainer />

      <Router>
        <div className="nav-container">
          <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <button onClick={notify} className="notify-btn">Notification</button>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/incident-reporting" element={<IncidentReportForm />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/Add_Donation" element={<AddDonation />} />
          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/disasters" element={<Disasters />} />
          <Route path="/incidentlists" element={<IncidentList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
