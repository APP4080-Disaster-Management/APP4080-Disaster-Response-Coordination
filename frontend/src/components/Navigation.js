import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/donations">Donations</Link></li>
        <li><Link to="/volunteers">Volunteers</Link></li>
        <li><Link to="/incident-reporting">Real-time Reporting</Link></li>
        <li><Link to="/alerts">Alerts</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
