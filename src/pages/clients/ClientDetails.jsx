import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import './ClientDetails.css';

const ClientDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content-wrapper">
                <Navbar userInitials="AD" />
                <main className="main-content">
                    <div className="page-header">
                        <h1>Client Details: Acme Corporation</h1>
                        <div className="page-actions">
                            <button
                                className="btn btn-secondary"
                                onClick={() => navigate(`/clients/${id}/edit`)}
                            >
                                <i className="fas fa-edit"></i> Edit Client
                            </button>
                            <button className="btn btn-danger">
                                <i className="fas fa-trash-alt"></i> Delete Client
                            </button>
                        </div>
                    </div>

                    <div className="grid client-details-grid">
                        <div className="card">
                            <div className="card-header">
                                <h2>Client Information</h2>
                            </div>
                            <div className="client-info-section">
                                <div className="client-info-item">
                                    <i className="fas fa-building"></i>
                                    <span className="label">Company Name:</span>
                                    <span className="value">Acme Corporation</span>
                                </div>
                                <div className="client-info-item">
                                    <i className="fas fa-user"></i>
                                    <span className="label">Contact Person:</span>
                                    <span className="value">Jane Doe</span>
                                </div>
                                <div className="client-info-item">
                                    <i className="fas fa-envelope"></i>
                                    <span className="label">Contact Email:</span>
                                    <span className="value">jane.doe@acmecorp.com</span>
                                </div>
                                <div className="client-info-item">
                                    <i className="fas fa-phone"></i>
                                    <span className="label">Phone:</span>
                                    <span className="value">(555) 123-4567</span>
                                </div>
                                <div className="client-info-item">
                                    <i className="fas fa-info-circle"></i>
                                    <span className="label">Status:</span>
                                    <span className="value">
                                        <span className="badge badge-active">Active</span>
                                    </span>
                                </div>
                                <div className="client-info-item">
                                    <i className="fas fa-calendar-alt"></i>
                                    <span className="label">Created At:</span>
                                    <span className="value">2023-01-15</span>
                                </div>
                            </div>
                            <div className="client-info-actions">
                                <button className="btn btn-secondary">
                                    <i className="fas fa-envelope"></i> Email Client
                                </button>
                                <button className="btn btn-secondary">
                                    <i className="fas fa-phone-alt"></i> Call Client
                                </button>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h2>Client Notes</h2>
                            </div>
                            <p className="text-sm" style={{ padding: '0 24px 24px' }}>
                                Initial onboarding meeting was very productive. Client is interested in scaling their digital presence rapidly. Follow up in Q3 for potential new projects.
                            </p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h2>Projects for Acme Corporation</h2>
                            <button className="btn btn-primary">
                                <i className="fas fa-plus"></i> Add New Project
                            </button>
                        </div>
                        <div className="data-table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Status</th>
                                        <th>Assigned Devs</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="interactive-row">
                                        <td>Website Redesign</td>
                                        <td>2024-03-01</td>
                                        <td>2024-06-30</td>
                                        <td><span className="badge badge-inprogress">In Progress</span></td>
                                        <td>John Doe, Jane Smith</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="icon-button" title="View Project Details"><i className="fas fa-eye"></i></button>
                                                <button className="icon-button" title="Edit Project"><i className="fas fa-edit"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="interactive-row">
                                        <td>Mobile App Development</td>
                                        <td>2024-05-10</td>
                                        <td>2024-11-15</td>
                                        <td><span className="badge badge-notstarted">Not Started</span></td>
                                        <td>Alice Brown</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="icon-button" title="View Project Details"><i className="fas fa-eye"></i></button>
                                                <button className="icon-button" title="Edit Project"><i className="fas fa-edit"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="interactive-row">
                                        <td>SEO Optimization Campaign</td>
                                        <td>2023-09-01</td>
                                        <td>2024-02-28</td>
                                        <td><span className="badge badge-completed">Completed</span></td>
                                        <td>Robert Green</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="icon-button" title="View Project Details"><i className="fas fa-eye"></i></button>
                                                <button className="icon-button" title="Edit Project"><i className="fas fa-edit"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="interactive-row">
                                        <td>CRM Integration</td>
                                        <td>2023-04-01</td>
                                        <td>2023-08-31</td>
                                        <td><span className="badge badge-completed">Completed</span></td>
                                        <td>Jane Smith</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="icon-button" title="View Project Details"><i className="fas fa-eye"></i></button>
                                                <button className="icon-button" title="Edit Project"><i className="fas fa-edit"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination">
                            <button className="page-number">« Previous</button>
                            <button className="page-number active">1</button>
                            <button className="page-number">2</button>
                            <button className="page-number">Next »</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ClientDetails;
