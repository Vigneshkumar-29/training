import React from 'react';
import './Select.css';

const Select = ({
    label,
    id,
    options = [],
    value,
    onChange,
    className = '',
    ...props
}) => {
    return (
        <div className={`form-group ${className}`}>
            {label && <label htmlFor={id}>{label}</label>}
            <select
                id={id}
                value={value}
                onChange={onChange}
                {...props}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
