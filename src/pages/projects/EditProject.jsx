import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import './EditProject.css';

const EditProject = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        client: '',
        startDate: '',
        endDate: '',
        assignedDevelopers: [],
        status: 'Not Started'
    });

    useEffect(() => {
        if (!id) return;

        const fetchProjectData = () => {
            try {
                // Mock data matching the structure
                const mockProject = {
                    id: id,
                    title: 'Stellar Launch Pad',
                    description: 'Develop a cutting-edge web application for managing space mission launches, including payload tracking, crew assignments, and pre-flight checklists.',
                    client: 'Acme Corp',
                    startDate: '2023-01-15',
                    endDate: '2023-12-31',
                    assignedDevelopers: ['Alice Johnson', 'Bob Williams'],
                    status: 'In Progress'
                };
                setFormData(mockProject);
            } catch (error) {
                console.error("Error fetching project:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'select-multiple') {
            const selectedOptions = Array.from(e.target.selectedOptions || [], option => option.value);
            setFormData(prev => ({ ...prev, [name]: selectedOptions }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Project updated:', formData);
        alert('Project updated successfully!');
        navigate('/projects');
    };

    if (loading) {
        return (
            <div className="create-project-layout">
                <Sidebar />
                <div className="main-content-wrapper">
                    <Navbar userInitials="AD" />
                    <main className="main-content">
                        <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="create-project-layout">
            <Sidebar />
            <div className="main-content-wrapper">
                <Navbar userInitials="AD" />

                <main className="main-content">
                    <div className="create-project-header">
                        <h1>Edit Project</h1>
                        <div className="btn-back" onClick={() => navigate('/projects')}>
                            <i className="fas fa-arrow-left"></i> Back to Projects
                        </div>
                    </div>

                    <div className="create-project-card">
                        <form onSubmit={handleSubmit}>
                            {/* Project Details Section */}
                            <div className="form-section-title">Project Details</div>

                            <div className="form-group">
                                <label htmlFor="title">Project Title <span className="required-asterisk">*</span></label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="form-control"
                                    placeholder="e.g., Website Redesign for Acme Corp"
                                    value={formData.title || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="form-control"
                                    placeholder="Detailed description of the project scope and objectives"
                                    value={formData.description || ''}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="client">Client <span className="required-asterisk">*</span></label>
                                <select
                                    id="client"
                                    name="client"
                                    className="form-control"
                                    value={formData.client || ''}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select a client</option>
                                    <option value="Acme Corp">Acme Corp</option>
                                    <option value="Globex Inc.">Globex Inc.</option>
                                    <option value="Beta Solutions">Beta Solutions</option>
                                    <option value="Stark Industries">Stark Industries</option>
                                </select>
                            </div>

                            <div className="grid-2-cols">
                                <div className="form-group">
                                    <label htmlFor="startDate">Start Date <span className="required-asterisk">*</span></label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        className="form-control"
                                        value={formData.startDate || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="endDate">End Date <span className="required-asterisk">*</span></label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        name="endDate"
                                        className="form-control"
                                        value={formData.endDate || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Team & Status Section */}
                            <div className="form-section-title">Team & Status</div>

                            <div className="form-group">
                                <label htmlFor="assignedDevelopers">Assigned Developers (Multi-select, searchable in app)</label>
                                <select
                                    id="assignedDevelopers"
                                    name="assignedDevelopers"
                                    className="form-control"
                                    multiple
                                    value={formData.assignedDevelopers || []}
                                    onChange={handleChange}
                                >
                                    <option value="Alice Johnson">Alice Johnson</option>
                                    <option value="Bob Williams">Bob Williams</option>
                                    <option value="Charlie Brown">Charlie Brown</option>
                                    <option value="Diana Prince">Diana Prince</option>
                                    <option value="Eve Adams">Eve Adams</option>
                                </select>
                                <small className="helper-text">Hold Ctrl/Cmd to select multiple developers.</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="status">Status <span className="required-asterisk">*</span></label>
                                <select
                                    id="status"
                                    name="status"
                                    className="form-control"
                                    value={formData.status || 'Not Started'}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Not Started">Not Started</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Paused">Paused</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary">
                                    <i className="fas fa-save"></i> Update Project
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={() => navigate('/projects')}>
                                    <i className="fas fa-times"></i> Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default EditProject;
