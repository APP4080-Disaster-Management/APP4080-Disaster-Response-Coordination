import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
        <li><Link to="/chief-dashboard">Chief Dashboard</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
