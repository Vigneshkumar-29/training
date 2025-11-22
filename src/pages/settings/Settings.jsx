import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import './Settings.css';

const Settings = () => {
    const navigate = useNavigate();

    // Mock user data
    const user = {
        name: 'Admin Name',
        email: 'admin@example.com',
        role: 'Admin',
        initials: 'AD'
    };

    // Mock recent activity data
    const recentActivities = [
        { id: 1, action: 'Logged in', module: 'Authentication', timestamp: '2023-10-26 14:30' },
        { id: 2, action: 'Updated profile', module: 'User', timestamp: '2023-10-25 10:15' },
        { id: 3, action: 'Logged out', module: 'Authentication', timestamp: '2023-10-24 18:00' },
        { id: 4, action: 'Logged in', module: 'Authentication', timestamp: '2023-10-24 09:00' },
        { id: 5, action: 'Changed password', module: 'Authentication', timestamp: '2023-10-20 16:45' }
    ];

    const handleChangePassword = () => {
        navigate('/change-password');
    };

    const handleEditProfile = () => {
        alert('Edit Profile functionality to be implemented');
    };

    const handleViewAllActivities = () => {
        navigate('/activity-logs');
    };

    return (
        <div className="settings-layout">
            <Sidebar />
            <div className="main-content-wrapper">
                <Navbar userInitials="AD" />

                <main className="main-content">
                    {/* Page Header */}
                    <div className="settings-header">
                        <h1>My Profile</h1>
                    </div>

                    {/* Grid Layout */}
                    <div className="grid grid-2-cols">
                        {/* Profile Card */}
                        <div className="card profile-card">
                            {/* Profile Avatar */}
                            <div className="profile-avatar-large">
                                {user.initials}
                            </div>

                            {/* Profile Details */}
                            <div className="profile-details">
                                <h2>{user.name}</h2>
                                <p>{user.email}</p>
                                <span className="profile-role-badge">{user.role}</span>
                            </div>

                            {/* Section Divider */}
                            <div className="section-divider"></div>

                            {/* Security Section */}
                            <h3 className="section-header">Security</h3>
                            <div className="form-group">
                                <button className="btn-secondary" onClick={handleChangePassword}>
                                    <i className="fas fa-lock"></i>
                                    Change Password
                                </button>
                            </div>

                            {/* Edit Profile Button */}
                            <button className="btn-primary" onClick={handleEditProfile}>
                                <i className="fas fa-edit"></i>
                                Edit Profile
                            </button>
                        </div>

                        {/* Recent Account Activity Card */}
                        <div className="card">
                            <div className="card-header">
                                <h2>Recent Account Activity</h2>
                                <a
                                    href="#"
                                    className="view-all-link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleViewAllActivities();
                                    }}
                                >
                                    View All Activities
                                </a>
                            </div>

                            {/* Activity Log Table */}
                            <div>
                                <table className="activity-log-table">
                                    <thead>
                                        <tr>
                                            <th>ACTION</th>
                                            <th>MODULE</th>
                                            <th>TIMESTAMP</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentActivities.map((activity) => (
                                            <tr key={activity.id} className="interactive-row">
                                                <td>{activity.action}</td>
                                                <td>{activity.module}</td>
                                                <td>{activity.timestamp}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Settings;
