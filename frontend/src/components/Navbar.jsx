import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, BookOpen, Music, PenTool, LogOut, User } from 'lucide-react';

import logo from '../assets/logo.jpg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    // Mock auth state for now, replace with context later
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const allLinks = [
        { name: 'Home', path: '/', icon: <Heart size={20} />, public: true },
        { name: 'Stress Tools', path: '/stress-tools', icon: <User size={20} />, public: false },
        { name: 'Breathing', path: '/breathing', icon: <User size={20} />, public: false },
        { name: 'Journal', path: '/journal', icon: <PenTool size={20} />, public: false },
        { name: 'Motivation & Quran', path: '/audio', icon: <Music size={20} />, public: false },
        { name: 'Quotes', path: '/quotes', icon: <BookOpen size={20} />, public: false },
    ];

    const navLinks = isAuthenticated
        ? allLinks
        : allLinks.filter(link => link.public);

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <img src={logo} alt="Nabad Logo" className="h-10 w-10 rounded-full object-cover mr-2" />
                            <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">Nabad</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                {link.name}
                            </Link>
                        ))}
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center"
                            >
                                <LogOut size={16} className="mr-2" />
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 dark:text-gray-300 hover:text-teal-600 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className="text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 block px-3 py-2 rounded-md text-base font-medium flex items-center"
                            >
                                <span className="mr-3">{link.icon}</span>
                                {link.name}
                            </Link>
                        ))}
                        {isAuthenticated ? (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                                className="w-full text-left text-red-500 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium flex items-center"
                            >
                                <LogOut size={20} className="mr-3" />
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className="w-full text-left text-teal-600 hover:text-teal-700 block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
