import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import ClientStatusBadge from '../../components/clients/ClientStatusBadge';
import './ClientsList.css';

const ClientsList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [clients, setClients] = useState([
        {
            id: 1,
            name: 'John Smith',
            company: 'Innovate Solutions',
            email: 'john.smith@innovate.com',
            phone: '+1 (555) 123-4567',
            status: 'Active',
            createdAt: '2023-01-15'
        },
        {
            id: 2,
            name: 'Jane Doe',
            company: 'Global Dynamics',
            email: 'jane.doe@global.com',
            phone: '+1 (555) 987-6543',
            status: 'New',
            createdAt: '2024-03-01'
        },
        {
            id: 3,
            name: 'Peter Jones',
            company: 'Future Tech Inc.',
            email: 'peter.j@future.com',
            phone: '+1 (555) 234-5678',
            status: 'Paused',
            createdAt: '2022-11-20'
        },
        {
            id: 4,
            name: 'Alice Brown',
            company: 'Creative Studio',
            email: 'alice.b@creative.com',
            phone: '+1 (555) 876-5432',
            status: 'Active',
            createdAt: '2023-06-10'
        },
        {
            id: 5,
            name: 'Michael Green',
            company: 'Data Solutions Co.',
            email: 'michael.g@data.com',
            phone: '+1 (555) 345-6789',
            status: 'Closed',
            createdAt: '2021-09-01'
        },
        {
            id: 6,
            name: 'Sarah White',
            company: 'Innovate Solutions',
            email: 'sarah.w@innovate.com',
            phone: '+1 (555) 432-1098',
            status: 'Active',
            createdAt: '2023-08-22'
        }
    ]);
    const navigate = useNavigate();

    const statusOptions = [
        { value: '', label: 'All Statuses' },
        { value: 'New', label: 'New' },
        { value: 'Active', label: 'Active' },
        { value: 'Paused', label: 'Paused' },
        { value: 'Closed', label: 'Closed' }
    ];

    // Action handlers
    const handleView = (client) => {
        console.log('View client:', client);
        // TODO: Navigate to client details page
        // navigate(`/clients/${client.id}`);
        alert(`Viewing client: ${client.name}\n\nThis will navigate to the client details page.`);
    };

    const handleEdit = (client) => {
        console.log('Edit client:', client);
        // TODO: Navigate to edit client page
        // navigate(`/clients/${client.id}/edit`);
        alert(`Editing client: ${client.name}\n\nThis will navigate to the edit client page.`);
    };

    const handleDelete = (client) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${client.name}?\n\nThis action cannot be undone.`
        );

        if (confirmed) {
            // Remove from clients list
            setClients(prevClients => prevClients.filter(c => c.id !== client.id));
            console.log('Deleted client:', client);
            alert(`Client "${client.name}" has been deleted successfully.`);
        }
    };

    // Filter clients
    const filteredClients = clients.filter(client => {
        const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = !statusFilter || client.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalEntries = filteredClients.length;
    const entriesPerPage = 6;
    const totalPages = Math.ceil(totalEntries / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);
    const currentClients = filteredClients.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="clients-layout">
            <Sidebar />

            <div className="main-content-wrapper">
                <Navbar userInitials="AD" />

                <main className="main-content">
                    <div className="page-header">
                        <h1>Clients Management</h1>
                        <Button
                            variant="primary"
                            icon="fas fa-plus"
                            onClick={() => navigate('/clients/new')}
                            className="btn-sm"
                        >
                            Add New Client
                        </Button>
                    </div>

                    <div className="card filter-card">
                        <div className="filter-bar">
                            <Input
                                label="Search by Name or Company"
                                id="client-search"
                                placeholder="e.g., John Doe, Acme Corp"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                            <Select
                                label="Status"
                                id="client-status"
                                options={statusOptions}
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="status-filter"
                            />
                        </div>
                    </div>

                    <div className="card table-card">
                        <div className="data-table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Company Name</th>
                                        <th>Contact Email</th>
                                        <th>Phone</th>
                                        <th>Status</th>
                                        <th>Created At</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentClients.map((client) => (
                                        <tr key={client.id}>
                                            <td>{client.name}</td>
                                            <td>{client.company}</td>
                                            <td>{client.email}</td>
                                            <td>{client.phone}</td>
                                            <td>
                                                <ClientStatusBadge status={client.status} />
                                            </td>
                                            <td>{client.createdAt}</td>
                                            <td className="actions">
                                                <Button
                                                    variant="icon"
                                                    aria-label="View Details"
                                                    onClick={() => handleView(client)}
                                                    title="View Details"
                                                >
                                                    <i className="fas fa-eye"></i>
                                                </Button>
                                                <Button
                                                    variant="icon"
                                                    aria-label="Edit Client"
                                                    onClick={() => handleEdit(client)}
                                                    title="Edit Client"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                                <Button
                                                    variant="icon"
                                                    className="danger"
                                                    aria-label="Delete Client"
                                                    onClick={() => handleDelete(client)}
                                                    title="Delete Client"
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="pagination">
                            <small className="text-sm">
                                Showing {startIndex + 1} to {endIndex} of {totalEntries} entries
                            </small>
                            <div className="pagination-controls">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <i className="fas fa-chevron-left"></i> Previous
                                </button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        className={currentPage === index + 1 ? 'active' : ''}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next <i className="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ClientsList;
