import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "../redux/slices/membersSlice";

export default function StatusSelector() {
  const dispatch = useDispatch();
  const currentUserId = useSelector((s) => s.role.currentUserId);
  const members = useSelector((s) => s.members);
  const currentStatus = members.find((m) => m.id === currentUserId)?.status;

  const statuses = ["Working", "Break", "Meeting", "Offline"];

  return (
    <div className="flex gap-2">
      {statuses.map((st) => (
        <button
          key={st}
          onClick={() =>
            dispatch(updateStatus({ memberId: currentUserId, status: st }))
          }
          className={`px-3 py-1 rounded ${
            currentStatus === st
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {st}
        </button>
      ))}
    </div>
  );
}
