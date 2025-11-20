import React from 'react';
import './Button.css';

const Button = ({
    children,
    variant = 'primary',
    icon,
    onClick,
    disabled = false,
    type = 'button',
    className = '',
    ...props
}) => {
    const buttonClass = `btn ${variant === 'icon' ? 'btn-icon' : `btn-${variant}`} ${className}`;

    return (
        <button
            type={type}
            className={buttonClass}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {icon && <i className={icon}></i>}
            {children}
        </button>
    );
};

export default Button;
