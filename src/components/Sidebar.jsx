// src/components/Sidebar.jsx
import React from "react";
import { Home, Users, ClipboardList, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 text-lg font-bold border-b border-gray-700">
        MY-task
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 text-left">
          <Home size={18} /> Dashboard
        </button>
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 text-left">
          <Users size={18} /> Members
        </button>
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 text-left">
          <ClipboardList size={18} /> Tasks
        </button>
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 text-left">
          <Settings size={18} /> Settings
        </button>
      </nav>
    </aside>
  );
}
