import React from 'react';
import './Input.css';

const Input = ({
    label,
    id,
    type = 'text',
    placeholder,
    value,
    onChange,
    className = '',
    ...props
}) => {
    return (
        <div className={`form-group ${className}`}>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...props}
            />
        </div>
    );
};

export default Input;
