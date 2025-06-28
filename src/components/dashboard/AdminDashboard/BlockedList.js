import React, { useEffect, useState } from 'react';
import Tab from '../../common/Tab2';
import { GetAllOrganiser } from '../../../api/Services/AdminApi/getAllOrganiser';
import { GetAllAttendee } from '../../../api/Services/AdminApi/getallAttendee';
import { UnblockUser } from '../../../api/Services/AdminApi/UnblockUserApi';
import { FaUserCheck } from 'react-icons/fa';

const BlockedList = () => {
  const [roleTab, setRoleTab] = useState('organiser');
  const [users, setUsers] = useState([]);

  const tabData = [
    { id: 1, tabName: 'Organisers', type: 'organiser' },
    { id: 2, tabName: 'Attendees', type: 'attendee' },
  ];

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      try {
        const response =
          roleTab === 'organiser'
            ? await GetAllOrganiser()()
            : await GetAllAttendee()();

        if (response.success) {
          const blocked = response.response.filter((user) => user.blocked);
          setUsers(blocked);
        }
      } catch (err) {
        console.error('Error fetching blocked users:', err);
      }
    };

    fetchBlockedUsers();
  }, [roleTab]);

  const handleUnblockUser = async (id) => {
    try {
      await UnblockUser(id)();
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      console.error('Error unblocking user:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Blocked Users</h2>
      <Tab tabData={tabData} field={roleTab} setField={setRoleTab} />

      {users.length === 0 ? (
        <p className="text-gray-400 mt-6">No blocked users found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-richblack-800 rounded-lg p-4 shadow-md flex flex-col gap-3"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white text-lg font-semibold">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
                <button
                  onClick={() => handleUnblockUser(user._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm flex items-center gap-1"
                >
                  <FaUserCheck size={14} />
                  Unblock
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlockedList;
