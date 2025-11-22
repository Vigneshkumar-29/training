import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import './ProjectTasks.css';

const ProjectTasks = () => {
    const navigate = useNavigate();
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [selectedPriority, setSelectedPriority] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock tasks data
    const allTasks = [
        {
            id: 1,
            title: 'Design Homepage Mockup',
            description: 'Create wireframes and high-fidelity mockups for the new homepage',
            project: 'Website Redesign',
            assignee: 'John Doe',
            priority: 'High',
            status: 'In Progress',
            dueDate: '2024-12-15',
            progress: 60
        },
        {
            id: 2,
            title: 'Implement User Authentication',
            description: 'Set up JWT-based authentication system',
            project: 'Mobile App Development',
            assignee: 'Jane Smith',
            priority: 'Critical',
            status: 'In Progress',
            dueDate: '2024-12-10',
            progress: 75
        },
        {
            id: 3,
            title: 'Database Schema Design',
            description: 'Design and implement the database schema for the new features',
            project: 'CRM Integration',
            assignee: 'Alice Brown',
            priority: 'High',
            status: 'Completed',
            dueDate: '2024-11-30',
            progress: 100
        },
        {
            id: 4,
            title: 'Write API Documentation',
            description: 'Document all REST API endpoints with examples',
            project: 'Website Redesign',
            assignee: 'Robert Green',
            priority: 'Medium',
            status: 'Not Started',
            dueDate: '2024-12-20',
            progress: 0
        },
        {
            id: 5,
            title: 'Performance Optimization',
            description: 'Optimize page load times and reduce bundle size',
            project: 'SEO Optimization',
            assignee: 'John Doe',
            priority: 'Low',
            status: 'In Progress',
            dueDate: '2024-12-25',
            progress: 30
        },
        {
            id: 6,
            title: 'Setup CI/CD Pipeline',
            description: 'Configure automated testing and deployment',
            project: 'Mobile App Development',
            assignee: 'Jane Smith',
            priority: 'High',
            status: 'Not Started',
            dueDate: '2024-12-18',
            progress: 0
        },
        {
            id: 7,
            title: 'User Testing & Feedback',
            description: 'Conduct user testing sessions and gather feedback',
            project: 'Website Redesign',
            assignee: 'Alice Brown',
            priority: 'Medium',
            status: 'Completed',
            dueDate: '2024-11-28',
            progress: 100
        },
        {
            id: 8,
            title: 'Security Audit',
            description: 'Perform comprehensive security audit and fix vulnerabilities',
            project: 'CRM Integration',
            assignee: 'Robert Green',
            priority: 'Critical',
            status: 'In Progress',
            dueDate: '2024-12-12',
            progress: 45
        }
    ];

    // Filter tasks based on status and priority
    const filteredTasks = allTasks.filter(task => {
        const matchesStatus = selectedFilter === 'All' || task.status === selectedFilter;
        const matchesPriority = selectedPriority === 'All' || task.priority === selectedPriority;
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.project.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesPriority && matchesSearch;
    });

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Completed':
                return 'completed';
            case 'In Progress':
                return 'in-progress';
            case 'Not Started':
                return 'not-started';
            default:
                return '';
        }
    };

    const getPriorityBadgeClass = (priority) => {
        switch (priority) {
            case 'Critical':
                return 'badge-critical';
            case 'High':
                return 'badge-high';
            case 'Medium':
                return 'badge-medium';
            case 'Low':
                return 'badge-low';
            default:
                return 'badge-default';
        }
    };

    const stats = {
        total: allTasks.length,
        completed: allTasks.filter(t => t.status === 'Completed').length,
        inProgress: allTasks.filter(t => t.status === 'In Progress').length,
        notStarted: allTasks.filter(t => t.status === 'Not Started').length
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content-wrapper">
                <Navbar userInitials="AD" />
                <main className="main-content">
                    <div className="page-header">
                        <h1>Tasks Management</h1>
                        <button className="btn btn-primary" onClick={() => alert('Create Task functionality coming soon!')}>
                            <i className="fas fa-plus"></i> Create New Task
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                <i className="fas fa-tasks"></i>
                            </div>
                            <div className="stat-details">
                                <h3>{stats.total}</h3>
                                <p>Total Tasks</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                                <i className="fas fa-spinner"></i>
                            </div>
                            <div className="stat-details">
                                <h3>{stats.inProgress}</h3>
                                <p>In Progress</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                                <i className="fas fa-check-circle"></i>
                            </div>
                            <div className="stat-details">
                                <h3>{stats.completed}</h3>
                                <p>Completed</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                                <i className="fas fa-clock"></i>
                            </div>
                            <div className="stat-details">
                                <h3>{stats.notStarted}</h3>
                                <p>Not Started</p>
                            </div>
                        </div>
                    </div>

                    {/* Filters and Search */}
                    <div className="card">
                        <div className="filters-section">
                            <div className="filter-group">
                                <label>Status:</label>
                                <select
                                    value={selectedFilter}
                                    onChange={(e) => setSelectedFilter(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="All">All Status</option>
                                    <option value="Not Started">Not Started</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label>Priority:</label>
                                <select
                                    value={selectedPriority}
                                    onChange={(e) => setSelectedPriority(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="All">All Priorities</option>
                                    <option value="Critical">Critical</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                            <div className="search-group">
                                <i className="fas fa-search"></i>
                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tasks Table */}
                    <div className="projects-table-card">
                        <div className="projects-table-responsive">
                            <table className="projects-table">
                                <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th>Project</th>
                                        <th>Assignee</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th>Due Date</th>
                                        <th>Progress</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTasks.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>
                                                No tasks found matching your filters.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredTasks.map(task => (
                                            <tr key={task.id}>
                                                <td>
                                                    <div className="task-info">
                                                        <strong>{task.title}</strong>
                                                        <small>{task.description}</small>
                                                    </div>
                                                </td>
                                                <td>{task.project}</td>
                                                <td>
                                                    <div className="assignee-info">
                                                        <div className="avatar-sm">{task.assignee.split(' ').map(n => n[0]).join('')}</div>
                                                        {task.assignee}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>
                                                        {task.priority}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`status-badge ${getStatusBadgeClass(task.status)}`}>
                                                        {task.status}
                                                    </span>
                                                </td>
                                                <td>{task.dueDate}</td>
                                                <td>
                                                    <div className="progress-container">
                                                        <div className="progress-bar">
                                                            <div
                                                                className="progress-fill"
                                                                style={{ width: `${task.progress}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="progress-text">{task.progress}%</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <button className="btn-icon" title="View Task">
                                                            <i className="fas fa-eye"></i>
                                                        </button>
                                                        <button className="btn-icon" title="Edit Task">
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button className="btn-icon delete" title="Delete Task">
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
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

export default ProjectTasks;
