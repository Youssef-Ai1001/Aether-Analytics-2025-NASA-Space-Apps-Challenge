import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, DropletIcon } from 'lucide-react';
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navLinks = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Dashboard',
    path: '/dashboard'
  }, {
    name: 'Alerts',
    path: '/alerts'
  }, {
    name: 'Health Advisor',
    path: '/health-advisor'
  }, {
    name: 'Education',
    path: '/education'
  }, {
    name: 'Community',
    path: '/community'
  }, {
    name: 'About',
    path: '/about'
  }, {
    name: 'Contact',
    path: '/contact'
  }];
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  return <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background-dark/80 backdrop-blur-md shadow-md border-b border-neon-cyan/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-neon-cyan to-neon-green rounded-full p-1.5 shadow-neon-glow">
              <DropletIcon className="h-6 w-6 text-background-dark" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-neon-cyan to-neon-green text-transparent bg-clip-text">
              Air Guard
            </span>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => <Link key={link.name} to={link.path} className={`text-sm font-medium transition-all duration-300 hover:text-neon-cyan relative group ${location.pathname === link.path ? 'text-neon-green' : 'text-text-primary'}`}>
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-green transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`}></span>
              </Link>)}
          </nav>
          {/* Mobile menu button */}
          <button className="md:hidden text-neon-cyan focus:outline-none" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isOpen && <div className="md:hidden bg-background-dark/95 backdrop-blur-md shadow-lg border-t border-neon-cyan/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => <Link key={link.name} to={link.path} className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${location.pathname === link.path ? 'bg-gradient-to-r from-neon-cyan/20 to-neon-green/20 text-neon-cyan border-l-2 border-neon-cyan' : 'text-text-primary hover:bg-background-light/50 hover:text-neon-cyan'}`}>
                {link.name}
              </Link>)}
          </div>
        </div>}
    </header>;
};