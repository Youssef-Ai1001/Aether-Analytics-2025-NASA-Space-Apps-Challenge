import React from 'react';
import { Link } from 'react-router-dom';
import { DropletIcon, GithubIcon, TwitterIcon, LinkedinIcon, FacebookIcon, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
export const Footer = () => {
  return <footer className="bg-background-darker border-t border-neon-cyan/20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-neon-cyan to-neon-green rounded-full p-1.5 shadow-neon-glow">
                <DropletIcon className="h-6 w-6 text-background-dark" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-neon-cyan to-neon-green text-transparent bg-clip-text">
                Air Guard
              </span>
            </div>
            <p className="text-text-secondary mb-4 text-sm">
              Advanced air quality intelligence powered by NASA TEMPO satellite
              data, ground sensors, and predictive analytics for a cleaner,
              healthier future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-text-secondary hover:text-neon-cyan transition-colors" aria-label="Twitter">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-text-secondary hover:text-neon-cyan transition-colors" aria-label="Facebook">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-text-secondary hover:text-neon-cyan transition-colors" aria-label="LinkedIn">
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-text-secondary hover:text-neon-cyan transition-colors" aria-label="GitHub">
                <GithubIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neon-cyan">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-text-secondary hover:text-neon-cyan text-sm transition-colors flex items-center">
                  <span className="mr-2 text-xs">→</span>Dashboard
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="text-text-secondary hover:text-neon-cyan text-sm transition-colors flex items-center">
                  <span className="mr-2 text-xs">→</span>Alerts
                </Link>
              </li>
              <li>
                <Link to="/health-advisor" className="text-text-secondary hover:text-neon-cyan text-sm transition-colors flex items-center">
                  <span className="mr-2 text-xs">→</span>Health Advisor
                </Link>
              </li>
              <li>
                <Link to="/education" className="text-text-secondary hover:text-neon-cyan text-sm transition-colors flex items-center">
                  <span className="mr-2 text-xs">→</span>Education Hub
                </Link>
              </li>
            </ul>
          </div>
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neon-cyan">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-text-secondary hover:text-neon-cyan text-sm transition-colors flex items-center">
                  <span className="mr-2 text-xs">→</span>About Us
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-text-secondary hover:text-neon-cyan text-sm transition-colors flex items-center">
                  <span className="mr-2 text-xs">→</span>Community
                </Link>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-neon-cyan text-sm transition-colors flex items-center">
                  <span className="mr-2 text-xs">→</span>Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-neon-cyan text-sm transition-colors flex items-center">
                  <span className="mr-2 text-xs">→</span>API Documentation
                </a>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neon-cyan">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MailIcon className="h-5 w-5 text-neon-cyan" />
                <span className="text-text-secondary text-sm">
                  support@Air Guard.com
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-neon-cyan" />
                <span className="text-text-secondary text-sm">
                  +1 (888) 123-4567
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-neon-cyan mt-0.5" />
                <span className="text-text-secondary text-sm">
                  1234 Clean Air Way
                  <br />
                  Atmosphere City, AC 98765
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neon-cyan/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} Air Guard. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-text-secondary hover:text-neon-cyan">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-text-secondary hover:text-neon-cyan">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-text-secondary hover:text-neon-cyan">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>;
};