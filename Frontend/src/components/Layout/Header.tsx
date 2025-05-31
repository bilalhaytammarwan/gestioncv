import React, { useState } from 'react';
import { Bell, MessageSquare, Menu, X, User } from 'lucide-react';
import { mockUser } from '../../data/mockData';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and company name */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-600">JobBoard</h1>
        </div>
        
        {/* Navigation for desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Dashboard</a>
          <a href="/jobs" className="text-gray-700 hover:text-blue-600 transition-colors">Jobs</a>
        </nav>
        
        {/* User actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={20} />
          </button>
          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors">
            <MessageSquare size={20} />
          </button>
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <span className="text-sm font-medium">{mockUser.name}</span>
          </div>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-3 py-3">
              <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Dashboard</a>
              <a href="/jobs" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Jobs</a>
            </nav>
            <div className="flex items-center space-x-4 py-3 border-t border-gray-200 mt-2">
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors">
                <Bell size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors">
                <MessageSquare size={20} />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="text-sm font-medium">{mockUser.name}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;