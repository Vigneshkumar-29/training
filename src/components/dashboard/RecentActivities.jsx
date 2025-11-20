import React from 'react';
import './RecentActivities.css';

const RecentActivities = ({ activities = [] }) => {
    const getIconClass = (type) => {
        const iconMap = {
            'login': 'fas fa-user-plus',
            'project': 'fas fa-briefcase',
            'task': 'fas fa-tasks',
            'client': 'fas fa-handshake',
            'password': 'fas fa-lock',
            'default': 'fas fa-info-circle'
        };
        return iconMap[type] || iconMap.default;
    };

    return (
        <div className="card">
            <div className="card-header">
                <h2>Recent Activity</h2>
                <a href="#" className="view-all-link">View All</a>
            </div>
            <ul className="activity-log-list">
                {activities.map((activity, index) => (
                    <li key={index} className={index > 0 ? 'interactive-row' : ''}>
                        <div className="icon">
                            <i className={getIconClass(activity.type)}></i>
                        </div>
                        <div className="action-text" dangerouslySetInnerHTML={{ __html: activity.text }}></div>
                        <div className="timestamp">{activity.timestamp}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentActivities;
