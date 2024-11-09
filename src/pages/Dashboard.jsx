import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPoints: 0,
    ridesGiven: 0,
    bikeRides: 0,
    rank: 0
  });
  const [rideHistory, setRideHistory] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    // Fetch user stats
    fetchUserStats();
    // Fetch ride history
    fetchRideHistory();
    // Fetch achievements
    fetchAchievements();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await fetch('your_api_url/user/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRideHistory = async () => {
    try {
      const response = await fetch('your_api_url/user/rides', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setRideHistory(data);
    } catch (error) {
      console.error('Error fetching ride history:', error);
    }
  };

  const fetchAchievements = async () => {
    try {
      const response = await fetch('your_api_url/user/achievements', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setAchievements(data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}</h1>
        {user?.prestoCard && (
          <div className="presto-info">
            <h3>PRESTO Card: {user.prestoCard}</h3>
            <p>Balance: ${user.prestoBalance}</p>
          </div>
        )}
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Points</h3>
          <p className="stat-value">{stats.totalPoints}</p>
        </div>
        <div className="stat-card">
          <h3>Rides Given</h3>
          <p className="stat-value">{stats.ridesGiven}</p>
        </div>
        <div className="stat-card">
          <h3>Bike Rides</h3>
          <p className="stat-value">{stats.bikeRides}</p>
        </div>
        <div className="stat-card">
          <h3>Current Rank</h3>
          <p className="stat-value">#{stats.rank}</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="ride-history-section">
          <h2>Recent Rides</h2>
          <div className="ride-list">
            {rideHistory.map((ride, index) => (
              <div key={index} className="ride-card">
                <div className="ride-info">
                  <h3>{ride.type} - {ride.date}</h3>
                  <p>{ride.from} → {ride.to}</p>
                  <p className="points-earned">+{ride.points} points</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="achievements-section">
          <h2>Achievements</h2>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-card">
                <span className="achievement-icon">{achievement.icon}</span>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                {!achievement.unlocked && (
                  <div className="progress-bar">
                    <div 
                      className="progress" 
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
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

export default Dashboard; 