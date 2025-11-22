import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import './ProjectsList.css';

const ProjectsList = () => {
    const navigate = useNavigate();
    const [projects] = useState([
        { id: 1, title: 'Website Redesign', client: 'Acme Corp', startDate: '2023-01-15', endDate: '2023-06-30', assignedDevs: 'Alice, Bob', status: 'In Progress' },
        { id: 2, title: 'Mobile App Development', client: 'Globex Inc.', startDate: '2023-03-01', endDate: '2023-12-31', assignedDevs: 'Charlie', status: 'Not Started' },
        { id: 3, title: 'CRM Integration', client: 'Acme Corp', startDate: '2023-02-10', endDate: '2023-05-20', assignedDevs: 'Alice, David', status: 'Completed' },
        { id: 4, title: 'Marketing Campaign Launch', client: 'Beta Solutions', startDate: '2023-04-01', endDate: '2023-07-15', assignedDevs: 'Eve', status: 'Paused' },
        { id: 5, title: 'Cloud Migration Project', client: 'Globex Inc.', startDate: '2023-05-01', endDate: '2024-03-31', assignedDevs: 'Bob, Charlie', status: 'In Progress' },
        { id: 6, title: 'Data Analytics Platform', client: 'Beta Solutions', startDate: '2023-06-20', endDate: '2024-02-28', assignedDevs: 'David', status: 'Not Started' },
        { id: 7, title: 'Internal Tool Development', client: 'Acme Corp', startDate: '2023-07-01', endDate: '2023-11-30', assignedDevs: 'Eve, Alice', status: 'In Progress' },
        { id: 8, title: 'E-commerce Platform Upgrade', client: 'Globex Inc.', startDate: '2023-08-10', endDate: '2024-01-15', assignedDevs: 'Bob', status: 'Paused' },
        { id: 9, title: 'IT Infrastructure Refresh', client: 'Beta Solutions', startDate: '2023-09-01', endDate: '2023-12-31', assignedDevs: 'Charlie, David', status: 'Completed' },
        { id: 10, title: 'Customer Support Automation', client: 'Acme Corp', startDate: '2023-10-01', endDate: '2024-04-30', assignedDevs: 'Eve', status: 'In Progress' },
    ]);

    const getStatusClass = (status) => {
        switch (status) {
            case 'In Progress': return 'in-progress';
            case 'Not Started': return 'not-started';
            case 'Completed': return 'completed';
            case 'Paused': return 'paused';
            default: return '';
        }
    };

    return (
        <div className="projects-layout">
            <Sidebar />
            <div className="main-content-wrapper">
                <Navbar userInitials="AD" />

                <main className="main-content">
                    <div className="projects-page-header">
                        <h1>Projects Management</h1>
                        <button className="btn-create-project" onClick={() => navigate('/projects/new')}>
                            <i className="fas fa-plus"></i> Create New Project
                        </button>
                    </div>

                    <div className="projects-filter-card">
                        <div className="projects-filter-bar">
                            <div className="filter-group">
                                <label>Search Project</label>
                                <input type="text" placeholder="Search by title..." className="filter-input" />
                            </div>
                            <div className="filter-group">
                                <label>Client</label>
                                <select className="filter-select">
                                    <option>All Clients</option>
                                    <option>Acme Corp</option>
                                    <option>Globex Inc.</option>
                                    <option>Beta Solutions</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label>Status</label>
                                <select className="filter-select">
                                    <option>All Statuses</option>
                                    <option>In Progress</option>
                                    <option>Not Started</option>
                                    <option>Completed</option>
                                    <option>Paused</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label>Assigned Dev</label>
                                <select className="filter-select">
                                    <option>All Developers</option>
                                    <option>Alice</option>
                                    <option>Bob</option>
                                    <option>Charlie</option>
                                    <option>David</option>
                                    <option>Eve</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="projects-table-card">
                        <div className="projects-table-responsive">
                            <table className="projects-table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Client</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Assigned Devs</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((project) => (
                                        <tr key={project.id}>
                                            <td>{project.title}</td>
                                            <td>{project.client}</td>
                                            <td>{project.startDate}</td>
                                            <td>{project.endDate}</td>
                                            <td>{project.assignedDevs}</td>
                                            <td>
                                                <span className={`status-badge ${getStatusClass(project.status)}`}>
                                                    {project.status}
                                                    <i className="fas fa-caret-down" style={{ marginLeft: '4px' }}></i>
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        className="btn-icon"
                                                        title="View Details"
                                                        onClick={() => navigate(`/projects/${project.id}`)}
                                                    >
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                    <button
                                                        className="btn-icon"
                                                        title="Edit Project"
                                                        onClick={() => navigate(`/projects/${project.id}/edit`)}
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button className="btn-icon delete" title="Delete Project">
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="pagination-container">
                            <button className="btn-pagination" disabled>
                                <i className="fas fa-chevron-left"></i> Previous
                            </button>
                            <button className="btn-pagination active">1</button>
                            <button className="btn-pagination">2</button>
                            <button className="btn-pagination">
                                Next <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProjectsList;
