import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, LogOut, Users, Briefcase, Plus, CheckCircle, Home, Calendar, Settings } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// --- Theme and Data Setup ---
const statusColors = {
  'Working': '#10b981', // green
  'Available': '#3b82f6', // blue
  'On a Break': '#f97316', // orange
  'Offline': '#ef4444', // red
};

// --- Sidebar Component ---
const Sidebar = ({ onRoleToggle, role, isDark, onToggleDarkMode }) => {
  return (
    <aside className="h-screen w-64 bg-gray-900 text-white p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-2 mb-8">
          <Briefcase size={28} className="text-blue-400" />
          <h1 className="text-xl font-bold">Team Pulse</h1>
        </div>
        <nav className="space-y-2">
          <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
            <Home size={20} />
            <span className="font-medium">Dashboard</span>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
            <Users size={20} />
            <span className="font-medium">Members</span>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
            <Calendar size={20} />
            <span className="font-medium">Tasks</span>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </div>
        </nav>
      </div>
      <div className="space-y-4">
        <button
          onClick={onRoleToggle}
          className="flex items-center space-x-2 w-full p-2 rounded-xl bg-gray-800 text-white font-semibold transition-colors duration-300 hover:bg-blue-600"
        >
          {role === 'member' ? <Users size={20} /> : <Briefcase size={20} />}
          <span>Switch to {role === 'member' ? 'Lead' : 'Member'}</span>
        </button>
        <button
          onClick={onToggleDarkMode}
          className="flex items-center space-x-2 w-full p-2 rounded-xl bg-gray-800 text-white font-semibold transition-colors duration-300 hover:bg-gray-700"
        >
          {isDark ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-400" />}
          <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <button className="flex items-center space-x-2 w-full p-2 rounded-xl bg-gray-800 text-white font-semibold transition-colors duration-300 hover:bg-red-600">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

// --- Team Member View Component ---
const TeamMemberView = ({ myInfo, onStatusUpdate, onTaskProgressChange }) => {
  const [showStatusMessage, setShowStatusMessage] = useState(false);
  const myTasks = myInfo ? myInfo.tasks : [];
  const myStatus = myInfo ? myInfo.status : 'Offline';

  const handleStatusUpdate = (status) => {
    onStatusUpdate(myInfo.id, status);
    setShowStatusMessage(true);
    setTimeout(() => setShowStatusMessage(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Member Info & Status Card */}
      <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
        <img
          src={myInfo?.avatar || 'https://placehold.co/128x128/e5e7eb/4b5563?text=User'}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-4 border-blue-500 dark:border-blue-400 mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{myInfo?.name || 'Loading...'}</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">Team Member</span>
        <div className="mt-4 w-full relative">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">My Current Status:</p>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full px-4 py-2 font-bold mb-4 text-gray-900 dark:text-gray-100">
            {myStatus}
          </div>
          {showStatusMessage && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-4 py-2 rounded-md bg-green-500 text-white text-sm animate-fade-in-up">
              Status Updated!
            </div>
          )}
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleStatusUpdate('Available')}
              className="w-full py-2 rounded-full bg-green-500 text-white font-medium hover:bg-green-600 transition-colors duration-200"
            >
              Set to Available
            </button>
            <button
              onClick={() => handleStatusUpdate('Working')}
              className="w-full py-2 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors duration-200"
            >
              Set to Working
            </button>
            <button
              onClick={() => handleStatusUpdate('On a Break')}
              className="w-full py-2 rounded-full bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition-colors duration-200"
            >
              Set to Break
            </button>
          </div>
        </div>
      </div>

      {/* My Tasks Section */}
      <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">My Tasks</h2>
        <div className="space-y-4">
          {myTasks.length > 0 ? myTasks.map(task => (
            <div key={task.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{task.title}</h3>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${task.progress < 100 ? 'bg-orange-200 text-orange-800' : 'bg-green-200 text-green-800'}`}>
                  {task.progress < 100 ? 'In Progress' : 'Completed'}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{task.description}</p>
              
              {/* Progress Bar & Slider */}
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                <div
                  className="bg-blue-600 dark:bg-blue-400 h-2.5 rounded-full"
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={task.progress}
                  onChange={(e) => onTaskProgressChange(myInfo.id, task.id, e.target.value)}
                  className="w-4/5 h-2 bg-blue-200 dark:bg-blue-800 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {task.progress}%
                </span>
              </div>
            </div>
          )) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No tasks assigned.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Team Lead View Component ---
const TeamLeadView = ({ members, onAssignTask }) => {
  const [taskForm, setTaskForm] = useState({
    memberId: members[0]?.id || '',
    title: '',
    description: '',
  });

  const handleFormChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (taskForm.title && taskForm.memberId) {
      onAssignTask(taskForm.memberId, taskForm.title);
      setTaskForm({ memberId: members[0]?.id || '', title: '', description: '' });
    }
  };

  // Calculate data for the status pie chart
  const statusData = Object.entries(
    members.reduce((acc, member) => {
      acc[member.status] = (acc[member.status] || 0) + 1;
      return acc;
    }, {})
  ).map(([status, count]) => ({
    name: status,
    value: count,
    color: statusColors[status]
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Status Distribution Chart */}
      <div className="col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Team Status Overview</h2>
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                // Removed fill prop here to let individual cells handle the colors
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm font-medium text-gray-900 dark:text-gray-100">
          {Object.keys(statusColors).map(status => (
            <div key={status} className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColors[status] }}></span>
              <span>{status}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">Assign a new task</h3>
          <form onSubmit={handleTaskSubmit} className="space-y-3">
            <select
              name="memberId"
              value={taskForm.memberId}
              onChange={handleFormChange}
              className="w-full p-2 rounded-md bg-white dark:bg-gray-800 border dark:border-gray-600 text-gray-900 dark:text-gray-100"
            >
              {members.map(member => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </select>
            <input
              type="text"
              name="title"
              value={taskForm.title}
              onChange={handleFormChange}
              placeholder="Task Title"
              className="w-full p-2 rounded-md bg-white dark:bg-gray-800 border dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Plus size={18} />
              <span>Assign</span>
            </button>
          </form>
        </div>
      </div>

      {/* Team Member List */}
      <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Team Members</h2>
        <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
          {members.map(member => (
            <div key={member.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700 shadow-sm">
              <div className="flex items-center space-x-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full border-2 border-blue-500"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{member.name}</h3>
                  <span className={`text-sm px-2 py-1 rounded-full font-bold ${member.status === 'Working' ? 'bg-green-200 text-green-800' : member.status === 'Available' ? 'bg-blue-200 text-blue-800' : member.status === 'On a Break' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}`}>
                    {member.status}
                  </span>
                </div>
              </div>
              <div className="flex-1 ml-6 text-sm">
                <p className="font-medium mb-1 text-gray-900 dark:text-gray-100">Tasks:</p>
                {member.tasks.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {member.tasks.map(task => (
                      <li key={task.id} className="text-gray-600 dark:text-gray-300 flex items-center">
                        {task.progress >= 100 && <CheckCircle size={16} className="text-green-500 mr-2" />}
                        <span>{task.title} - {task.progress}%</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No tasks assigned</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [appState, setAppState] = useState({
    role: 'member',
    isDark: false,
    currentUser: null,
    members: [
      {
        id: 'member-1',
        name: 'Aditya',
        avatar: 'https://placehold.co/100x100/1e40af/ffffff?text=AD',
        status: 'Working',
        tasks: [
          { id: 'task-1', title: 'Complete Frontend Assignment', progress: 50 },
          { id: 'task-2', title: 'Design API Schema', progress: 10 },
        ],
      },
      {
        id: 'member-2',
        name: 'Aman',
        avatar: 'https://placehold.co/100x100/1e40af/ffffff?text=AM',
        status: 'Available',
        tasks: [
          { id: 'task-3', title: 'Write Project Report', progress: 100 },
        ],
      },
      {
        id: 'member-3',
        name: 'Anuj',
        avatar: 'https://placehold.co/100x100/1e40af/ffffff?text=AN',
        status: 'On a Break',
        tasks: [
          { id: 'task-4', title: 'Research new libraries', progress: 75 },
        ],
      },
    ],
  });

  // Ref to hold the inactivity timer
  const inactivityTimeout = useRef(null);

  useEffect(() => {
    // Set up a user activity listener
    const handleUserActivity = () => {
      clearTimeout(inactivityTimeout.current);
      inactivityTimeout.current = setTimeout(() => {
        // Find the current user and update their status to 'Offline'
        setAppState(prev => ({
          ...prev,
          members: prev.members.map(member =>
            member.id === prev.currentUser?.id
              ? { ...member, status: 'Offline' }
              : member
          )
        }));
      }, 10 * 60 * 1000); // 10 minutes
    };

    // Add event listeners for user activity
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('click', handleUserActivity);

    // Initial call to start the timer
    handleUserActivity();

    // Clean up event listeners on component unmount
    return () => {
      clearTimeout(inactivityTimeout.current);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
    };
  }, [appState.currentUser?.id]); // Re-run effect if current user changes

  useEffect(() => {
    if (appState.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [appState.isDark]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        setAppState(prev => ({
          ...prev,
          currentUser: {
            id: 'member-1',
            name: `${data.results[0].name.first} ${data.results[0].name.last}`,
            avatar: data.results[0].picture.large,
          },
        }));
      } catch (error) {
        console.error("Could not fetch user data", error);
        setAppState(prev => ({
          ...prev,
          currentUser: {
            id: 'member-1',
            name: 'John Doe',
            avatar: 'https://placehold.co/128x128/e5e7eb/4b5563?text=User',
          },
        }));
      }
    };
    fetchUser();
  }, []);

  const handleToggleDarkMode = () => {
    setAppState(prev => ({ ...prev, isDark: !prev.isDark }));
  };

  const handleToggleRole = () => {
    setAppState(prev => ({
      ...prev,
      role: prev.role === 'member' ? 'lead' : 'member'
    }));
  };

  const handleUpdateStatus = (memberId, newStatus) => {
    setAppState(prev => ({
      ...prev,
      members: prev.members.map(member =>
        member.id === memberId ? { ...member, status: newStatus } : member
      )
    }));
  };

  const handleUpdateTaskProgress = (memberId, taskId, newProgress) => {
    setAppState(prev => ({
      ...prev,
      members: prev.members.map(member => {
        if (member.id === memberId) {
          const updatedTasks = member.tasks.map(task =>
            task.id === taskId ? { ...task, progress: parseInt(newProgress, 10) } : task
          );
          return { ...member, tasks: updatedTasks };
        }
        return member;
      })
    }));
  };

  const handleAssignTask = (memberId, title) => {
    setAppState(prev => ({
      ...prev,
      members: prev.members.map(member => {
        if (member.id === memberId) {
          const newTaskId = `task-${Date.now()}`;
          const newTask = {
            id: newTaskId,
            title: title,
            progress: 0
          };
          return { ...member, tasks: [...member.tasks, newTask] };
        }
        return member;
      })
    }));
  };

  const myInfo = appState.members.find(m => m.id === appState.currentUser?.id) || {
    id: 'member-1',
    name: 'User',
    avatar: 'https://placehold.co/128x128/e5e7eb/4b5563?text=User',
    status: 'Offline',
    tasks: [],
  };

  return (
    <div className="flex min-h-screen font-sans bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Sidebar
        onRoleToggle={handleToggleRole}
        role={appState.role}
        isDark={appState.isDark}
        onToggleDarkMode={handleToggleDarkMode}
      />
      <div className="flex-1 p-4 sm:p-8 overflow-auto">
        <header className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">Team Pulse Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-semibold">{appState.role === 'member' ? 'Team Member' : 'Team Lead'}</span>
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">|</span>
            <div className="flex items-center space-x-2">
              <img
                src={myInfo.avatar}
                alt="User Avatar"
                className="w-8 h-8 rounded-full border-2 border-blue-400"
              />
              <span className="text-sm font-semibold hidden sm:inline">{myInfo.name}</span>
            </div>
          </div>
        </header>

        <main>
          {appState.role === 'member' ? (
            <TeamMemberView
              myInfo={myInfo}
              onStatusUpdate={handleUpdateStatus}
              onTaskProgressChange={handleUpdateTaskProgress}
            />
          ) : (
            <TeamLeadView
              members={appState.members}
              onAssignTask={handleAssignTask}
            />
          )}
        </main>
      </div>
    </div>
  );
}
