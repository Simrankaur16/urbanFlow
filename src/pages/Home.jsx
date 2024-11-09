import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Welcome to Urban Global</h1>
      <div className="features">
        <div className="feature-card">
          <h2>Route Planning</h2>
          <p>Find the best route with multiple transportation options</p>
          <button onClick={() => navigate('/route')}>Plan Route</button>
        </div>
        <div className="feature-card">
          <h2>Carpooling</h2>
          <p>Share rides and earn points</p>
          <button onClick={() => navigate('/dashboard')}>Find Rides</button>
        </div>
        <div className="feature-card">
          <h2>Bicycle Sharing</h2>
          <p>Eco-friendly transportation option</p>
          <button onClick={() => navigate('/dashboard')}>Find Bikes</button>
        </div>
      </div>
    </div>
  );
};

export default Home; 