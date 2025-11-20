import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Toast from '../../components/ui/Toast';
import './CreateClient.css';

const CreateClient = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        clientName: '',
        contactEmail: '',
        phone: '',
        companyName: '',
        status: 'New'
    });

    const [toast, setToast] = useState({ message: '', type: '' });

    const statusOptions = [
        { value: 'New', label: 'New' },
        { value: 'Active', label: 'Active' },
        { value: 'Paused', label: 'Paused' },
        { value: 'Closed', label: 'Closed' }
    ];

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

        console.log('Client Data to be saved:', formData);

        // Simulate API call
        setTimeout(() => {
            showToast('Client created successfully!', 'success');
            // Reset form
            setFormData({
                clientName: '',
                contactEmail: '',
                phone: '',
                companyName: '',
                status: 'New'
            });

            // Navigate back after delay
            setTimeout(() => navigate('/clients'), 1500);
        }, 1000);
    };

    return (
        <div className="create-client-layout">
            <Sidebar />

            <div className="main-content-wrapper">
                <Navbar userInitials="AD" />

                <main className="main-content">
                    <div className="page-header">
                        <h1>Create New Client</h1>
                        <button
                            className="back-link no-hover-effect"
                            onClick={() => navigate('/clients')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                        >
                            <i className="fas fa-arrow-left"></i>
                            <span>Back to Clients</span>
                        </button>
                    </div>

                    <div className="card form-card">
                        <form onSubmit={handleSubmit} id="createClientForm">
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
                                    onClick={() => navigate('/clients')}
                                    type="button"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary">
                                    Save Client
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

export default CreateClient;
