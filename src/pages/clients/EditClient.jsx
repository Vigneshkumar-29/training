import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Toast from '../../components/ui/Toast';
import './CreateClient.css';

const EditClient = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        clientName: '',
        contactEmail: '',
        phone: '',
        companyName: '',
        status: 'Active'
    });

    const [toast, setToast] = useState({ message: '', type: '' });

    const statusOptions = [
        { value: 'New', label: 'New' },
        { value: 'Active', label: 'Active' },
        { value: 'Paused', label: 'Paused' },
        { value: 'Closed', label: 'Closed' }
    ];

    // Simulate fetching client data
    useEffect(() => {
        const fetchClientData = async () => {
            setLoading(true);
            // Simulate API call
            setTimeout(() => {
                // Mock data - in real app, this would come from API
                setFormData({
                    clientName: 'Acme Corporation',
                    contactEmail: 'contact@acmecorp.com',
                    phone: '+1 (555) 123-4567',
                    companyName: 'Acme Corporation',
                    status: 'Active'
                });
                setLoading(false);
            }, 800);
        };

        fetchClientData();
    }, [id]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.clientName || !formData.contactEmail || !formData.companyName) {
            showToast('Please fill in all required fields.', 'error');
            return;
        }

        console.log('Updated Client Data:', formData);

        // Simulate API call
        setTimeout(() => {
            showToast('Client updated successfully!', 'success');

            // Navigate back after delay
            setTimeout(() => navigate(`/clients/${id}`), 1500);
        }, 1000);
    };

    if (loading) {
        return (
            <div className="create-client-layout">
                <Sidebar />
                <div className="main-content-wrapper">
                    <Navbar userInitials="AD" />
                    <main className="main-content">
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                            <p>Loading client data...</p>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="create-client-layout">
            <Sidebar />

            <div className="main-content-wrapper">
                <Navbar userInitials="AD" />

                <main className="main-content">
                    <div className="page-header">
                        <h1>Edit Client</h1>
                        <button
                            className="back-link no-hover-effect"
                            onClick={() => navigate(`/clients/${id}`)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                        >
                            <i className="fas fa-arrow-left"></i>
                            <span>Back to Client Details</span>
                        </button>
                    </div>

                    <div className="card form-card">
                        <form onSubmit={handleSubmit} id="editClientForm">
                            <Input
                                label="Client Name"
                                id="clientName"
                                placeholder="E.g., Acme Corp"
                                value={formData.clientName}
                                onChange={handleChange}
                                required
                                className="required-field"
                            />

                            <Input
                                label="Contact Email"
                                id="contactEmail"
                                type="email"
                                placeholder="E.g., contact@acmecorp.com"
                                value={formData.contactEmail}
                                onChange={handleChange}
                                required
                                className="required-field"
                            />

                            <Input
                                label="Phone Number"
                                id="phone"
                                type="tel"
                                placeholder="E.g., +1 (555) 123-4567"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                            <Input
                                label="Company Name"
                                id="companyName"
                                placeholder="E.g., Acme Corporation"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                                className="required-field"
                            />

                            <Select
                                label="Status"
                                id="status"
                                options={statusOptions}
                                value={formData.status}
                                onChange={handleChange}
                            />

                            <div className="button-group">
                                <Button
                                    variant="secondary"
                                    onClick={() => navigate(`/clients/${id}`)}
                                    type="button"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary">
                                    Update Client
                                </Button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>

            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ message: '', type: '' })}
            />
        </div>
    );
};

export default EditClient;
