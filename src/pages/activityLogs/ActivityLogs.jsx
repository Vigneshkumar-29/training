import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import './ActivityLogs.css';

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        keyword: '',
        module: 'all',
        user: 'all',
        dateFrom: '',
        dateTo: ''
    });

    // Mock activity logs data
    const [logs] = useState([
        { id: 1, timestamp: '2024-07-23 14:30:00', user: 'Admin User', action: 'Logged In', module: 'Auth', referenceId: 'N/A' },
        { id: 2, timestamp: '2024-07-23 14:28:15', user: 'John Doe', action: 'Created Client: Acme Innovations', module: 'Client', referenceId: '#CLI001' },
        { id: 3, timestamp: '2024-07-23 14:20:00', user: 'Admin User', action: 'Created Project: Website Redesign', module: 'Project', referenceId: '#PRJ005' },
        { id: 4, timestamp: '2024-07-23 14:15:30', user: 'Jane Smith', action: "Updated Task Status: Design Mockups to 'In Progress'", module: 'Task', referenceId: '#TSK012' },
        { id: 5, timestamp: '2024-07-23 14:10:05', user: 'Admin User', action: "Updated Client Status: Beta Solutions to 'Active'", module: 'Client', referenceId: '#CLI002' },
        { id: 6, timestamp: '2024-07-23 14:05:00', user: 'Staff User 1', action: 'Logged Out', module: 'Auth', referenceId: 'N/A' },
        { id: 7, timestamp: '2024-07-23 13:59:40', user: 'John Doe', action: 'Assigned Task: Implement Feature X to Jane Smith', module: 'Task', referenceId: '#TSK015' },
        { id: 8, timestamp: '2024-07-23 13:55:22', user: 'Admin User', action: 'Deleted Project: Old Marketing Campaign', module: 'Project', referenceId: '#PRJ001' },
        { id: 9, timestamp: '2024-07-23 13:50:10', user: 'Jane Smith', action: 'Created Task: Review UI/UX designs', module: 'Task', referenceId: '#TSK016' },
        { id: 10, timestamp: '2024-07-23 13:45:00', user: 'Admin User', action: 'Updated User Role: Staff User 1 to Admin', module: 'User', referenceId: '#USR003' },
        { id: 11, timestamp: '2024-07-23 13:40:00', user: 'Admin User', action: 'Logged In', module: 'Auth', referenceId: 'N/A' },
        { id: 12, timestamp: '2024-07-23 13:35:00', user: 'Staff User 1', action: 'Created Project: Mobile App V2', module: 'Project', referenceId: '#PRJ006' },
        { id: 13, timestamp: '2024-07-23 13:30:00', user: 'John Doe', action: 'Updated Client: Global Solutions contact email', module: 'Client', referenceId: '#CLI003' },
        { id: 14, timestamp: '2024-07-23 13:25:00', user: 'Jane Smith', action: 'Completed Task: Bug Fixes for V1', module: 'Task', referenceId: '#TSK010' },
        { id: 15, timestamp: '2024-07-23 13:20:00', user: 'Admin User', action: 'Created Client: Innovate Tech', module: 'Client', referenceId: '#CLI004' }
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const totalPages = 6;

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleFilter = () => {
        console.log('Applying filters:', filters);
        // In a real application, this would filter the data
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // In a real application, this would fetch new data
    };

    return (
        <div className="activity-logs-layout">
            <Sidebar />
            <div className="main-content-wrapper">
                <Navbar userInitials="AD" />

                <main className="main-content">
                    {/* Page Header */}
                    <div className="activity-logs-header">
                        <h1>Activity Logs</h1>
                    </div>

                    {/* Filter Bar */}
                    <div className="filter-bar">
                        <div className="form-group filter-group search-field">
                            <label htmlFor="search-keyword">Keyword Search</label>
                            <input
                                type="text"
                                id="search-keyword"
                                name="keyword"
                                className="form-control"
                                placeholder="Search action, user, or module..."
                                value={filters.keyword}
                                onChange={handleFilterChange}
                            />
                        </div>

                        <div className="form-group filter-group">
                            <label htmlFor="filter-module">Module</label>
                            <select
                                id="filter-module"
                                name="module"
                                className="form-control"
                                value={filters.module}
                                onChange={handleFilterChange}
                            >
                                <option value="all">All Modules</option>
                                <option value="auth">Auth</option>
                                <option value="client">Client</option>
                                <option value="project">Project</option>
                                <option value="task">Task</option>
                                <option value="user">User</option>
                            </select>
                        </div>

                        <div className="form-group filter-group">
                            <label htmlFor="filter-user">User</label>
                            <select
                                id="filter-user"
                                name="user"
                                className="form-control"
                                value={filters.user}
                                onChange={handleFilterChange}
                            >
                                <option value="all">All Users</option>
                                <option value="admin">Admin User</option>
                                <option value="john">John Doe</option>
                                <option value="jane">Jane Smith</option>
                                <option value="staff1">Staff User 1</option>
                            </select>
                        </div>

                        <div className="form-group filter-group">
                            <label htmlFor="filter-date-from">Date From</label>
                            <input
                                type="date"
                                id="filter-date-from"
                                name="dateFrom"
                                className="form-control"
                                value={filters.dateFrom}
                                onChange={handleFilterChange}
                            />
                        </div>

                        <div className="form-group filter-group">
                            <label htmlFor="filter-date-to">Date To</label>
                            <input
                                type="date"
                                id="filter-date-to"
                                name="dateTo"
                                className="form-control"
                                value={filters.dateTo}
                                onChange={handleFilterChange}
                            />
                        </div>

                        <button className="btn btn-primary" onClick={handleFilter}>
                            <i className="fas fa-filter"></i> Filter
                        </button>
                    </div>

                    {/* Activity Logs Table */}
                    <div className="card">
                        <div className="table-responsive">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Timestamp</th>
                                        <th>User</th>
                                        <th>Action</th>
                                        <th>Module</th>
                                        <th>Reference ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map((log) => (
                                        <tr key={log.id} className="interactive-row">
                                            <td>{log.timestamp}</td>
                                            <td>{log.user}</td>
                                            <td>{log.action}</td>
                                            <td>{log.module}</td>
                                            <td>{log.referenceId}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="pagination">
                            <span>Showing 1-15 of 78 results</span>
                            <div>
                                <button
                                    className="pagination-button"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                <button
                                    className={`pagination-button ${currentPage === 1 ? 'active' : ''}`}
                                    onClick={() => handlePageChange(1)}
                                >
                                    1
                                </button>
                                <button
                                    className={`pagination-button ${currentPage === 2 ? 'active' : ''}`}
                                    onClick={() => handlePageChange(2)}
                                >
                                    2
                                </button>
                                <button
                                    className={`pagination-button ${currentPage === 3 ? 'active' : ''}`}
                                    onClick={() => handlePageChange(3)}
                                >
                                    3
                                </button>
                                <button className="pagination-button" disabled>
                                    ...
                                </button>
                                <button
                                    className={`pagination-button ${currentPage === totalPages ? 'active' : ''}`}
                                    onClick={() => handlePageChange(totalPages)}
                                >
                                    {totalPages}
                                </button>
                                <button
                                    className="pagination-button"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ActivityLogs;
