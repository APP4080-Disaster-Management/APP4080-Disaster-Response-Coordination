import { Link } from 'react-router-dom';

function Navigation({ isLoggedIn, setIsLoggedIn }) {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    setIsLoggedIn(false); // Update login state
    window.location.href = '/'; // Redirect to home page
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>

        {/* Show these links only when not logged in */}
        {!isLoggedIn && (
          <>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/Add_Donation">Donate</Link></li>
            <li><Link to="/volunteers">Volunteers</Link></li>
            <li><Link to="/incident-reporting">Real-time Reporting</Link></li>
            <li><Link to="/alerts">Alerts</Link></li>
            <li><Link to="/disasters">Disasters</Link></li>
            <li><Link to="/incidentlists">Incidences</Link></li>

          </>
        )}

        {/* Show these links when logged in */}
        {isLoggedIn && (
          <>
            <li><Link to="/donations">Donations</Link></li>
            <li><Link to="/Add_Donation">Donate</Link></li>
            <li><Link to="/volunteers">Volunteers</Link></li>
            <li><Link to="/incident-reporting">Real-time Reporting</Link></li>
            <li><Link to="/alerts">Alerts</Link></li>
            <li><Link to="/disasters">Disasters</Link></li>
            <li><Link to="/incidentlists">Incidences</Link></li>
            {/* Show Logout when logged in */}
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
