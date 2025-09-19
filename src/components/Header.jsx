// src/components/Header.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchRole } from "../redux/slices/roleSlice";
import { User, Users } from "lucide-react";

export default function Header() {
  const dispatch = useDispatch();
  const currentRole = useSelector((s) => s.role.currentRole);

  const handleRoleSwitch = () => {
    if (currentRole === "lead") {
      // When switching to member view, set the userId to a valid member ID
      // Assuming 'Alice' has ID 1
      dispatch(switchRole({ role: "member", userId: 1 }));
    } else {
      // When switching to lead view, set userId to null as it's not needed
      dispatch(switchRole({ role: "lead", userId: null }));
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold">Team Pulse</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium capitalize">
          {currentRole} view
        </span>
        <button
          onClick={handleRoleSwitch}
          className="p-2 text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200"
        >
          {currentRole === "lead" ? (
            <User className="w-5 h-5" />
          ) : (
            <Users className="w-5 h-5" />
          )}
        </button>
      </div>
    </header>
  );
}