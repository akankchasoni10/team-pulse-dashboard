import React from "react";

export default function MemberCard({ member }) {
  return (
    <div className="border rounded-md p-4 shadow-sm bg-white flex justify-between">
      <div>
        <h3 className="font-semibold">{member.name}</h3>
        <p className="text-sm text-gray-500">
          Tasks: {member.tasks.length} · Active:{" "}
          {member.tasks.filter((t) => t.progress < 100).length}
        </p>
      </div>
      <span
        className={`px-2 py-1 rounded text-sm ${
          member.status === "Working"
            ? "bg-green-100 text-green-600"
            : member.status === "Meeting"
            ? "bg-blue-100 text-blue-600"
            : member.status === "Break"
            ? "bg-yellow-100 text-yellow-600"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {member.status}
      </span>
    </div>
  );
}
