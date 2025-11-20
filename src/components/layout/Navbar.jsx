import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const Navbar = ({ userName = 'Admin Name', userInitials = 'AD' }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="header-left">
                <span className="company-name">Business Operations Platform</span>
            </div>
            <div className="header-right">
                <button className="icon-button" aria-label="Search">
                    <i className="fas fa-search"></i>
                </button>
                <button className="icon-button" aria-label="Notifications">
                    <i className="fas fa-bell"></i>
                </button>
                <div className="user-menu" ref={menuRef} role="navigation">
                    <div
                        className="user-avatar"
                        role="button"
                        aria-expanded={isMenuOpen}
                        aria-controls="user-dropdown-menu"
                        tabIndex="0"
                        onClick={toggleMenu}
                    >
                        {userInitials}
                    </div>
                    {isMenuOpen && (
                        <div id="user-dropdown-menu" className="user-menu-dropdown">
                            <a href="#">Profile</a>
                            <a href="#">Change Password</a>
                            <a href="#">Logout</a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
