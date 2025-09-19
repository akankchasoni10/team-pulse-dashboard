// src/redux/slices/membersSlice.js
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, name: "Alice", status: "Working", tasks: [] },
  { id: 2, name: "Bob", status: "Offline", tasks: [] },
  { id: 3, name: "Charlie", status: "Break", tasks: [] },
];

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      const { memberId, status } = action.payload;
      const member = state.find((m) => m.id === memberId);
      if (member) member.status = status;
    },
    assignTask: (state, action) => {
      const { memberId, title, dueDate } = action.payload;
      const member = state.find((m) => m.id === memberId);
      if (member) {
        member.tasks.push({
          id: nanoid(),
          title,
          dueDate,
          progress: 0,
        });
      }
    },
    updateTaskProgress: (state, action) => {
      const { memberId, taskId, change } = action.payload;
      const member = state.find((m) => m.id === memberId);
      if (member) {
        const task = member.tasks.find((t) => t.id === taskId);
        if (task) {
          task.progress = Math.min(100, Math.max(0, task.progress + change));
        }
      }
    },
  },
});

export const { updateStatus, assignTask, updateTaskProgress } =
  membersSlice.actions;
export default membersSlice.reducer;