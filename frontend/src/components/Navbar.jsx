import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>
        IM Fit Centre
      </div>
      <div style={styles.right}>
        <span style={styles.welcome}>Welcome, {username}!</span>
        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    background: '#0f3460',
    color: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    flexWrap: 'wrap',
    gap: '8px',
  },
  brand: {
    fontSize: '22px',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  welcome: {
    fontSize: '14px',
    opacity: 0.9,
  },
  button: {
    padding: '8px 18px',
    background: 'transparent',
    color: 'white',
    border: '2px solid white',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default Navbar;
