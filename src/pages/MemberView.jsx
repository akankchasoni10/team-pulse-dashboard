// src/pages/MemberView.jsx
import React from "react";
import { useSelector } from "react-redux";
import StatusSelector from "../components/StatusSelector";

export default function MemberView() {
  const currentUserId = useSelector((s) => s.role.currentUserId);
  const members = useSelector((s) => s.members);

  const member = members.find((m) => m.id === currentUserId);

  if (!member) {
    return (
      <div className="p-6 text-gray-600 text-center">
        No member data found
      </div>
    );
  }

  const totalTasks = member.tasks.length;
  const completedTasks = member.tasks.filter((t) => t.completed).length;
  const activeTasks = member.tasks.filter((t) => !t.completed).length;
  const avgProgress =
    totalTasks > 0
      ? Math.round(
          member.tasks.reduce((sum, t) => sum + t.progress, 0) / totalTasks
        )
      : 0;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <h2 className="text-2xl font-bold">Team Member Dashboard</h2>
      <p className="text-gray-500">
        Manage your status and track your task progress
      </p>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Section */}
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Your Profile</h3>
            <div className="flex items-center space-x-4">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
                {member.name[0]}
              </div>
              <div>
                <p className="text-xl font-semibold">{member.name}</p>
                <p className="text-gray-500 dark:text-gray-300">
                  Status: {member.status}
                </p>
              </div>
            </div>

            {/* Task stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-white dark:bg-gray-600 rounded-lg text-center shadow">
                <h4 className="text-gray-500 dark:text-gray-300">Total</h4>
                <p className="text-2xl font-bold">{totalTasks}</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-600 rounded-lg text-center shadow">
                <h4 className="text-gray-500 dark:text-gray-300">Active</h4>
                <p className="text-2xl font-bold">{activeTasks}</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-600 rounded-lg text-center shadow">
                <h4 className="text-gray-500 dark:text-gray-300">Completed</h4>
                <p className="text-2xl font-bold">{completedTasks}</p>
              </div>
            </div>
          </div>

          {/* Status selector */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Update Your Status</h3>
            <StatusSelector />
          </div>

          {/* Tasks */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Your Tasks</h3>
            <div className="space-y-3">
              {member.tasks.length === 0 ? (
                <p className="text-gray-500">No tasks assigned yet.</p>
              ) : (
                member.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow"
                  >
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Due: {task.dueDate || "No date"}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                      <div
                        className={`h-3 rounded-full ${
                          task.completed ? "bg-green-500" : "bg-blue-500"
                        }`}
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm mt-1">{task.progress}%</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Today's Progress (overall) */}
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Today's Progress</h3>
            {member.tasks.length === 0 ? (
              <p className="text-gray-500">No tasks for today.</p>
            ) : (
              <>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="h-4 bg-blue-500 rounded-full"
                    style={{ width: `${avgProgress}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Overall Progress: <span className="font-bold">{avgProgress}%</span>
                </p>
              </>
            )}
          </div>

          {/* Performance */}
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Performance</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Completion Rate: <span className="font-bold">{completionRate}%</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Average Progress: <span className="font-bold">{avgProgress}%</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Status: <span className="font-bold">{member.status}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



