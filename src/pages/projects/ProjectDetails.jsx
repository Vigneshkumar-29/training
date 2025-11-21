import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import './ProjectDetails.css';

const ProjectDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Mock project data
    const project = {
        id: 1,
        title: 'Stellar Launch Pad',
        client: 'AstroDynamics Inc.',
        status: 'In Progress',
        startDate: '2023-01-15',
        endDate: '2023-12-31',
        createdAt: '2022-12-01 10:30 AM',
        description: 'Develop a cutting-edge web application for managing space mission launches, including payload tracking, crew assignments, and pre-flight checklists. The platform will integrate with existing legacy systems and provide real-time updates.',
        assignedDevelopers: [
            { id: 1, name: 'Jane Smith', initials: 'JS' },
            { id: 2, name: 'Mark Kross', initials: 'MK' },
            { id: 3, name: 'Chris Hayes', initials: 'CH' }
        ],
        progress: 65
    };

    const [tasks, setTasks] = useState([
        { id: 1, title: 'Design UI Mockups', assignedTo: { name: 'Jane Smith', initials: 'JS' }, deadline: '2023-03-15', status: 'Todo', isOverdue: true },
        { id: 2, title: 'Develop Frontend - Dashboard', assignedTo: { name: 'Mark Kross', initials: 'MK' }, deadline: '2023-04-30', status: 'In Progress', isOverdue: false },
        { id: 3, title: 'Setup Database Schema', assignedTo: { name: 'Chris Hayes', initials: 'CH' }, deadline: '2023-02-28', status: 'Done', isOverdue: false },
        { id: 4, title: 'Integrate API Endpoints', assignedTo: { name: 'Mark Kross', initials: 'MK' }, deadline: '2023-06-15', status: 'In Progress', isNearDeadline: true },
        { id: 5, title: 'Write Unit Tests', assignedTo: { name: 'Jane Smith', initials: 'JS' }, deadline: '2023-07-30', status: 'Todo', isOverdue: false }
    ]);

    const handleEditProject = () => {
        alert('Edit Project functionality to be implemented');
    };

    const handleDeleteProject = () => {
        const confirmed = window.confirm('Are you sure you want to delete this project? This action cannot be undone.');
        if (confirmed) {
            alert('Project deleted successfully');
            navigate('/projects');
        }
    };

    const handleAddTask = () => {
        alert('Add Task functionality to be implemented');
    };

    const handleEditTask = (task) => {
        alert(`Edit task: ${task.title}`);
    };

    const handleDeleteTask = (taskId) => {
        const confirmed = window.confirm('Are you sure you want to delete this task?');
        if (confirmed) {
            setTasks(tasks.filter(t => t.id !== taskId));
        }
    };

    const handleStatusChange = (taskId, newStatus) => {
        setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'In Progress': return 'badge-status-in-progress';
            case 'Todo': return 'badge-status-todo';
            case 'Done': return 'badge-status-done';
            default: return '';
        }
    };

    return (
        <div className="project-details-layout">
            <Sidebar />
            <div className="main-content-wrapper">
                <Navbar userInitials="AD" />

                <main className="main-content">
                    {/* Back to Projects Link */}
                    <div style={{ marginBottom: '16px' }}>
                        <div
                            className="btn-back"
                            onClick={() => navigate('/projects')}
                            style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', fontSize: '15px', fontWeight: '500' }}
                        >
                            <i className="fas fa-arrow-left"></i> Back to Projects
                        </div>
                    </div>

                    {/* Page Header */}
                    <div className="project-details-header">
                        <h1>Project Details: {project.title}</h1>
                        <div className="button-group">
                            <button className="button button-secondary" onClick={handleEditProject}>
                                <i className="fas fa-edit"></i> Edit Project
                            </button>
                            <button className="button button-danger" onClick={handleDeleteProject}>
                                <i className="fas fa-trash-alt"></i> Delete Project
                            </button>
                        </div>
                    </div>

                    {/* Project Information Card */}
                    <div className="project-info-card">
                        <div className="card-header">
                            <h2>Project Information</h2>
                        </div>

                        <div className="project-info-grid">
                            <div className="project-info-item">
                                <label>Title</label>
                                <span>{project.title}</span>
                            </div>

                            <div className="project-info-item">
                                <label>Client</label>
                                <a href="#">{project.client}</a>
                            </div>

                            <div className="project-info-item">
                                <label>Status</label>
                                <span className={`badge ${getStatusClass(project.status)}`}>
                                    {project.status}
                                </span>
                            </div>

                            <div className="project-info-item">
                                <label>Start Date</label>
                                <span>{project.startDate}</span>
                            </div>

                            <div className="project-info-item">
                                <label>End Date</label>
                                <span>{project.endDate}</span>
                            </div>

                            <div className="project-info-item">
                                <label>Created At</label>
                                <span>{project.createdAt}</span>
                            </div>

                            <div className="project-info-item full-width">
                                <label>Description</label>
                                <span className="description">{project.description}</span>
                            </div>

                            <div className="project-info-item full-width">
                                <label>Assigned Developers</label>
                                <div className="assigned-users">
                                    {project.assignedDevelopers.map(dev => (
                                        <span key={dev.id} className="user-tag">
                                            <div className="avatar-small">{dev.initials}</div>
                                            {dev.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="project-info-item full-width">
                                <label>Project Progress</label>
                                <div className="progress-bar-container">
                                    <div className="progress-bar" style={{ width: `${project.progress}%` }}></div>
                                </div>
                                <div className="progress-text">{project.progress}% Completed</div>
                            </div>
                        </div>
                    </div>

                    {/* Tasks Card */}
                    <div className="tasks-card">
                        <div className="card-header">
                            <h2>Tasks for {project.title}</h2>
                            <button className="button button-primary" onClick={handleAddTask}>
                                <i className="fas fa-plus"></i> Add New Task
                            </button>
                        </div>

                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>TITLE</th>
                                    <th>ASSIGNED TO</th>
                                    <th>DEADLINE</th>
                                    <th>STATUS</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map(task => (
                                    <tr key={task.id} className="interactive-row">
                                        <td>{task.title}</td>
                                        <td>
                                            <span className="user-tag">
                                                <div className="avatar-small">{task.assignedTo.initials}</div>
                                                {task.assignedTo.name}
                                            </span>
                                        </td>
                                        <td>
                                            {task.deadline}{' '}
                                            {task.isOverdue && <span className="badge badge-overdue">Overdue</span>}
                                            {task.isNearDeadline && <span className="badge badge-near-deadline">Near Deadline</span>}
                                            {!task.isOverdue && !task.isNearDeadline && task.status === 'Done' && (
                                                <span className="badge badge-status-done">Done</span>
                                            )}
                                        </td>
                                        <td>
                                            <select
                                                className={`task-status-select badge ${getStatusClass(task.status)}`}
                                                value={task.status}
                                                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                            >
                                                <option value="Todo">Todo</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Done">Done</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button
                                                className="button-icon edit-task-button"
                                                onClick={() => handleEditTask(task)}
                                                aria-label="Edit task"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>{' '}
                                            <button
                                                className="button-icon delete-task-button"
                                                onClick={() => handleDeleteTask(task.id)}
                                                aria-label="Delete task"
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="pagination">
                            <button disabled>
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <button className="page-number active">1</button>
                            <button className="page-number">2</button>
                            <button className="page-number">3</button>
                            <button>
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProjectDetails;
