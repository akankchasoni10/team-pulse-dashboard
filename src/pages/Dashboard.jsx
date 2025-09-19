// src/pages/Dashboard.jsx
import React from "react";
import { useSelector } from "react-redux";
import LeadView from "./LeadView";
import MemberView from "./MemberView";

// The Dashboard component acts as the router for the two different views.
export default function Dashboard() {
  // We get the current role from the Redux store.
  const role = useSelector((s) => s.role.currentRole);

  // Based on the role, we render the appropriate component.
  // This keeps the Dashboard component simple and focused on
  // view selection rather than rendering logic.
  if (role === "member") {
    return <MemberView />;
  }

  // The default view is the LeadView.
  return <LeadView />;
}
