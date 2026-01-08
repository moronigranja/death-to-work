import React, { useState } from 'react';
import './Dashboard.css';

interface DashboardCard {
  id: string;
  title: string;
  value: string | number;
  description?: string;
  icon?: string;
}

export const Dashboard: React.FC = () => {
  const [cards, setCards] = useState<DashboardCard[]>([
    {
      id: '1',
      title: 'Total Projects',
      value: 20,
      description: 'Active projects',
      icon: '📊'
    },
    {
      id: '2',
      title: 'Tasks Completed',
      value: 156,
      description: 'This month',
      icon: '✓'
    },
    {
      id: '3',
      title: 'Team Members',
      value: 8,
      description: 'Active contributors',
      icon: '👥'
    },
    {
      id: '4',
      title: 'Completion Rate',
      value: '92%',
      description: 'Overall progress',
      icon: '📈'
    }
  ]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back! Here's your overview.</p>
      </header>

      <div className="dashboard-grid">
        {cards.map((card) => (
          <div key={card.id} className="dashboard-card">
            {card.icon && <span className="card-icon">{card.icon}</span>}
            <div className="card-content">
              <h2 className="card-title">{card.title}</h2>
              <p className="card-value">{card.value}</p>
              {card.description && (
                <p className="card-description">{card.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <section className="dashboard-section">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-dot"></span>
            <p>Project Alpha marked as complete</p>
            <span className="activity-time">2 hours ago</span>
          </div>
          <div className="activity-item">
            <span className="activity-dot"></span>
            <p>New team member joined the workspace</p>
            <span className="activity-time">5 hours ago</span>
          </div>
          <div className="activity-item">
            <span className="activity-dot"></span>
            <p>Monthly report generated</p>
            <span className="activity-time">1 day ago</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
