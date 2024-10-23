import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import IncidentReportForm from './components/IncidentReportForm';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Donations from './components/Donations';
import Volunteers from './components/Volunteers';
import Navigation from './components/Navigation';
import NotFound from './pages/NotFound';
import Alerts from './components/Alerts';


function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/incident-reporting" element={<IncidentReportForm />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/volunteers" element={<Volunteers />} />
        <Route path="/alerts" element={<Alerts />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
