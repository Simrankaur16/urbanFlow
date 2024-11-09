import { useState } from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('carpool');

  const carpoolLeaders = [
    { name: 'John Doe', points: 1500 },
    { name: 'Jane Smith', points: 1350 },
    { name: 'Mike Johnson', points: 1200 },
    { name: 'Sarah Wilson', points: 1100 },
    { name: 'Tom Brown', points: 1000 }
  ];

  const cyclingLeaders = [
    { name: 'Emma Davis', points: 2000 },
    { name: 'James Wilson', points: 1800 },
    { name: 'Lisa Anderson', points: 1600 },
    { name: 'Chris Martin', points: 1400 },
    { name: 'Amy White', points: 1200 }
  ];

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      
      <div className="tab-buttons">
        <button 
          className={activeTab === 'carpool' ? 'active' : ''}
          onClick={() => setActiveTab('carpool')}
        >
          Carpooling
        </button>
        <button 
          className={activeTab === 'cycling' ? 'active' : ''}
          onClick={() => setActiveTab('cycling')}
        >
          Cycling
        </button>
      </div>

      <div className="leaders-list">
        {(activeTab === 'carpool' ? carpoolLeaders : cyclingLeaders).map((leader, index) => (
          <div key={index} className="leader-card">
            <div className="rank">#{index + 1}</div>
            <div className="name">{leader.name}</div>
            <div className="points">{leader.points} pts</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard; 