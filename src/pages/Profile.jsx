import { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [profile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    totalPoints: 1250,
    achievements: [
      'Early Adopter',
      'Green Commuter',
      'Ride Share Pro'
    ]
  });

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-avatar">
          {profile.name.charAt(0)}
        </div>
        <h1>{profile.name}</h1>
        <p>{profile.email}</p>
      </div>

      <div className="profile-stats">
        <div className="stat">
          <h3>Total Points</h3>
          <p>{profile.totalPoints}</p>
        </div>
      </div>

      <div className="achievements-section">
        <h2>Achievements</h2>
        <div className="achievements-grid">
          {profile.achievements.map((achievement, index) => (
            <div key={index} className="achievement-card">
              <span className="achievement-icon">🏆</span>
              <p>{achievement}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile; 