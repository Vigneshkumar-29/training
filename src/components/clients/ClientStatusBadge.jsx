import React from 'react';
import './ClientStatusBadge.css';

const ClientStatusBadge = ({ status }) => {
    const statusClass = status ? status.toLowerCase() : 'new';

    return (
        <span className={`status-badge ${statusClass}`}>
            {status}
        </span>
    );
};

export default ClientStatusBadge;
