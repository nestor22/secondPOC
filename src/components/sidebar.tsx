import React from 'react';

const Sidebar = () => {
  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col w-64">
      <div className="flex items-center justify-center h-16 border-b border-gray-800">
        <h1 className="text-lg font-bold">My Dashboard</h1>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-4">
          <li>
            <a href="#" className="flex items-center p-2 text-gray-300 rounded hover:bg-gray-700">
              <span className="material-icons">dashboard</span>
              <span className="ml-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-300 rounded hover:bg-gray-700">
              <span className="material-icons">settings</span>
              <span className="ml-3">Settings</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-300 rounded hover:bg-gray-700">
              <span className="material-icons">logout</span>
              <span className="ml-3">Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;