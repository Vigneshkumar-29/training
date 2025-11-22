import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="logo">
                <h2>M-BOP</h2>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                            <i className="fas fa-chart-line"></i>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/clients" className={({ isActive }) => isActive ? 'active' : ''}>
                            <i className="fas fa-users"></i>
                            <span>Clients</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>
                            <i className="fas fa-project-diagram"></i>
                            <span>Projects</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/tasks" className={({ isActive }) => isActive ? 'active' : ''}>
                            <i className="fas fa-tasks"></i>
                            <span>Tasks</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/activity-logs" className={({ isActive }) => isActive ? 'active' : ''}>
                            <i className="fas fa-clipboard-list"></i>
                            <span>Activity Logs</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/users/1" className={({ isActive }) => isActive ? 'active' : ''}>
                            <i className="fas fa-user-tie"></i>
                            <span>Users</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
                            <i className="fas fa-cog"></i>
                            <span>Settings</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
