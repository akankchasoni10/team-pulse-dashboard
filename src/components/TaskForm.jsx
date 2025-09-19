import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignTask } from "../redux/slices/membersSlice";

export default function TaskForm() {
  const dispatch = useDispatch();
  const members = useSelector((s) => s.members);

  const [memberId, setMemberId] = useState(members[0]?.id || "");
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAssign = () => {
    if (!title || !dueDate) return;
    dispatch(assignTask({ memberId, title, dueDate }));
    setTitle("");
    setDueDate("");
  };

  return (
    <div className="border p-4 rounded-md shadow-sm bg-white">
      <h3 className="font-semibold mb-2">Assign Task</h3>
      <select
        value={memberId}
        onChange={(e) => setMemberId(Number(e.target.value))}
        className="w-full mb-2 border rounded p-2"
      >
        {members.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 border rounded p-2"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full mb-2 border rounded p-2"
      />
      <button
        onClick={handleAssign}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Assign
      </button>
    </div>
  );
}
