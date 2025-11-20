import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import StatsCard from '../../components/dashboard/StatsCard';
import ProjectsChart from '../../components/dashboard/ProjectsChart';
import ClientsChart from '../../components/dashboard/ClientsChart';
import RecentActivities from '../../components/dashboard/RecentActivities';
import './Dashboard.css';

const Dashboard = () => {
    // Mock data for charts
    const projectStatusData = [
        { status: 'Not Started', count: 10, color: '#ADD8E6' },
        { status: 'In Progress', count: 25, color: '#2D74C0' },
        { status: 'Paused', count: 5, color: '#94A3B8' },
        { status: 'Completed', count: 40, color: '#33CC99' }
    ];

    const taskStatusData = [
        { status: 'Todo', count: 60, color: '#ADD8E6' },
        { status: 'In Progress', count: 35, color: '#2D74C0' },
        { status: 'Done', count: 80, color: '#33CC99' }
    ];

    // Mock data for recent activities
    const recentActivities = [
        {
            type: 'login',
            text: '<span style="font-weight: 500;">John Doe</span> logged in',
            timestamp: '2 minutes ago'
        },
        {
            type: 'project',
            text: 'Project "<span style="font-weight: 500;">Website Redesign</span>" created by <span style="font-weight: 500;">Admin User</span>',
            timestamp: '1 hour ago'
        },
        {
            type: 'task',
            text: 'Task "<span style="font-weight: 500;">Design mockups</span>" marked as \'In Progress\'',
            timestamp: '3 hours ago'
        },
        {
            type: 'client',
            text: 'Client "<span style="font-weight: 500;">Acme Corp</span>" status updated to \'Active\'',
            timestamp: 'Yesterday'
        },
        {
            type: 'password',
            text: '<span style="font-weight: 500;">Jane Smith</span> changed password',
            timestamp: '2 days ago'
        }
    ];

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <div className="main-content-wrapper">
                <Navbar userInitials="AD" />

                <main className="main-content">
                    <div className="welcome-card">
                        <h1>Welcome, Admin Name!</h1>
                        <p>Here's a quick overview of your business operations.</p>
                    </div>

                    <div className="grid grid-4-cols" style={{ marginBottom: 'var(--padding-base)' }}>
                        <StatsCard
                            value="125"
                            label="Active Clients"
                            trend="5% this month"
                            trendDirection="positive"
                        />
                        <StatsCard
                            value="42"
                            label="Projects In Progress"
                            trend="No change"
                            trendDirection="neutral"
                        />
                        <StatsCard
                            value="7"
                            label="Overdue Tasks"
                            variant="overdue"
                            quickLink={{ text: 'View Overdue Tasks', href: '#' }}
                        />
                        <StatsCard
                            value="15"
                            label="Tasks Near Deadline"
                            variant="deadline"
                            quickLink={{ text: 'View Upcoming Tasks', href: '#' }}
                        />
                    </div>

                    <div className="grid grid-2-cols">
                        <div className="card">
                            <div className="card-header">
                                <h2>Projects by Status</h2>
                            </div>
                            <ProjectsChart data={projectStatusData} />
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h2>Tasks by Status</h2>
                            </div>
                            <ClientsChart data={taskStatusData} />
                        </div>
                    </div>

                    <div style={{ marginTop: 'var(--padding-base)' }}>
                        <RecentActivities activities={recentActivities} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
