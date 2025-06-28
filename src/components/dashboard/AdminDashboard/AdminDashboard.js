// File: src/pages/Admin/Dashboard.jsx
import React, { useState } from 'react';
import UserList from './UserList';
import BlockedList from './BlockedList';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'blocked'

  return (
    <div className="p-6">
      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'users'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          User List
        </button>
        <button
          onClick={() => setActiveTab('blocked')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'blocked'
              ? 'bg-red-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Blocked Users
        </button>
      </div>

      {/* Render Pages Conditionally */}
      {activeTab === 'users' && <UserList />}
      {activeTab === 'blocked' && <BlockedList />}
    </div>
  );
};

export default Dashboard;
