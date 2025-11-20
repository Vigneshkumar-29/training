import React from 'react';
import './StatsCard.css';

const StatsCard = ({
    value,
    label,
    trend,
    trendDirection = 'neutral',
    variant = 'default',
    quickLink
}) => {
    const getTrendIcon = () => {
        switch (trendDirection) {
            case 'positive':
                return 'fas fa-arrow-up';
            case 'negative':
                return 'fas fa-arrow-down';
            default:
                return 'fas fa-minus';
        }
    };

    return (
        <div className={`card metric-card ${variant}`}>
            <div className="value">{value}</div>
            <div className="label">{label}</div>
            {trend && (
                <div className={`trend ${trendDirection}`}>
                    <i className={getTrendIcon()}></i> {trend}
                </div>
            )}
            {quickLink && (
                <a href={quickLink.href} className="quick-link">
                    {quickLink.text}
                </a>
            )}
        </div>
    );
};

export default StatsCard;
