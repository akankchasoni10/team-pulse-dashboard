import React, { useState } from "react";
import { useSelector } from "react-redux";
import MemberCard from "../components/MemberCard";
import TaskForm from "../components/TaskForm";

export default function LeadView() {
  const members = useSelector((s) => s.members);

  const [filter, setFilter] = useState("All");
  const [sortByTasks, setSortByTasks] = useState(false);

  // filter + sort members
  let list = [...members];
  if (filter !== "All") list = list.filter((m) => m.status === filter);
  if (sortByTasks) {
    list.sort((a, b) => {
      const aActive = a.tasks.filter((t) => !t.completed).length;
      const bActive = b.tasks.filter((t) => !t.completed).length;
      return bActive - aActive;
    });
  }

  // summary counts
  const counts = members.reduce((acc, m) => {
    acc[m.status] = (acc[m.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Members list */}
      <div className="col-span-2 space-y-4">
        {/* Filter + Sort */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 border rounded"
            >
              <option>All</option>
              <option>Working</option>
              <option>Meeting</option>
              <option>Break</option>
              <option>Offline</option>
            </select>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={sortByTasks}
                onChange={(e) => setSortByTasks(e.target.checked)}
              />
              Sort by active tasks
            </label>
          </div>

          {/* Status summary */}
          <div className="text-sm text-gray-600">
            {Object.entries(counts).map(([k, v]) => (
              <span key={k} className="mr-3">
                {v} {k}
              </span>
            ))}
          </div>
        </div>

        {/* Member Cards */}
        <div className="grid grid-cols-2 gap-3">
          {list.map((m) => (
            <MemberCard key={m.id} member={m} />
          ))}
        </div>
      </div>

      {/* Task assignment */}
      <div>
        <TaskForm />
      </div>
    </div>
  );
}
