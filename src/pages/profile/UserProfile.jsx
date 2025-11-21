import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import './UserProfile.css';

const UserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock user data - in a real app, fetch based on id
    const [user] = useState({
        id: 1,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'Senior Developer',
        status: 'Active',
        phone: '+1 (555) 987-6543',
        location: 'New York, USA',
        joinDate: '2023-03-15',
        bio: 'Experienced Full Stack Developer with a passion for building scalable web applications. Expert in React, Node.js, and Cloud Architecture.',
        avatar: 'JS'
    });

    // Mock assigned projects
    const [projects] = useState([
        { id: 101, title: 'Website Redesign', role: 'Lead Dev', status: 'In Progress', deadline: '2024-12-01' },
        { id: 102, title: 'Mobile App V2', role: 'Contributor', status: 'Planning', deadline: '2025-02-15' },
        { id: 103, title: 'Legacy Migration', role: 'Reviewer', status: 'Completed', deadline: '2023-11-30' }
    ]);

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content-wrapper">
                <Navbar userInitials="AD" />
                <main className="main-content">
                    {/* Page Header */}
                    <div className="page-header">
                        <h1>User Profile: {user.name}</h1>
                        <div className="page-actions">
                            <button className="btn btn-secondary" onClick={() => alert('Edit User functionality')}>
                                <i className="fas fa-edit"></i> Edit User
                            </button>
                            <button className="btn btn-danger" onClick={() => alert('Delete User functionality')}>
                                <i className="fas fa-trash-alt"></i> Deactivate User
                            </button>
                        </div>
                    </div>

                    {/* User Details Grid */}
                    <div className="user-profile-grid">
                        {/* User Info Card */}
                        <div className="card">
                            <div className="card-header">
                                <h2>User Information</h2>
                            </div>
                            <div className="user-info-section">
                                <div className="user-info-item">
                                    <i className="fas fa-user-circle"></i>
                                    <span className="label">Full Name:</span>
                                    <span className="value">{user.name}</span>
                                </div>
                                <div className="user-info-item">
                                    <i className="fas fa-envelope"></i>
                                    <span className="label">Email:</span>
                                    <span className="value">{user.email}</span>
                                </div>
                                <div className="user-info-item">
                                    <i className="fas fa-id-badge"></i>
                                    <span className="label">Role:</span>
                                    <span className="value">
                                        <span className="badge-role">{user.role}</span>
                                    </span>
                                </div>
                                <div className="user-info-item">
                                    <i className="fas fa-phone"></i>
                                    <span className="label">Phone:</span>
                                    <span className="value">{user.phone}</span>
                                </div>
                                <div className="user-info-item">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span className="label">Location:</span>
                                    <span className="value">{user.location}</span>
                                </div>
                                <div className="user-info-item">
                                    <i className="fas fa-info-circle"></i>
                                    <span className="label">Status:</span>
                                    <span className="value">
                                        <span className={`badge-status-${user.status.toLowerCase()}`}>{user.status}</span>
                                    </span>
                                </div>
                                <div className="user-info-item">
                                    <i className="fas fa-calendar-alt"></i>
                                    <span className="label">Joined:</span>
                                    <span className="value">{user.joinDate}</span>
                                </div>
                            </div>
                            <div className="user-info-actions">
                                <button className="btn btn-secondary">
                                    <i className="fas fa-envelope"></i> Send Email
                                </button>
                                <button className="btn btn-secondary">
                                    <i className="fas fa-key"></i> Reset Password
                                </button>
                            </div>
                        </div>

                        {/* Bio / Stats Card */}
                        <div className="card">
                            <div className="card-header">
                                <h2>Professional Bio</h2>
                            </div>
                            <div style={{ padding: '0 24px 24px' }}>
                                <p className="text-sm" style={{ lineHeight: '1.6', color: 'var(--color-text-secondary)' }}>
                                    {user.bio}
                                </p>
                            </div>

                            <div className="card-header" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
                                <h2>Performance Stats</h2>
                            </div>
                            <div style={{ padding: '0 24px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                                <div style={{ textAlign: 'center', padding: '16px', backgroundColor: 'var(--color-background-light)', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-primary)' }}>12</div>
                                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Projects</div>
                                </div>
                                <div style={{ textAlign: 'center', padding: '16px', backgroundColor: 'var(--color-background-light)', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-success)' }}>45</div>
                                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Tasks Done</div>
                                </div>
                                <div style={{ textAlign: 'center', padding: '16px', backgroundColor: 'var(--color-background-light)', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-warning-orange)' }}>98%</div>
                                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>On Time</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Assigned Projects Table */}
                    <div className="card">
                        <div className="card-header">
                            <h2>Assigned Projects</h2>
                        </div>
                        <div className="data-table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Project Title</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Deadline</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map(project => (
                                        <tr key={project.id} className="interactive-row">
                                            <td>{project.title}</td>
                                            <td>{project.role}</td>
                                            <td>
                                                <span className={`badge badge-${project.status.toLowerCase().replace(' ', '-')}`}>
                                                    {project.status}
                                                </span>
                                            </td>
                                            <td>{project.deadline}</td>
                                            <td>
                                                <button className="btn-icon" onClick={() => navigate(`/projects/${project.id}`)} title="View Project">
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserProfile;
