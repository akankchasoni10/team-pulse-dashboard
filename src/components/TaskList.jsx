// src/redux/membersSlice.js

import { createSlice } from "@reduxjs/toolkit";



const initialState = [

  { id: "1", name: "Alice", status: "Working", tasks: [] },

  { id: "2", name: "Bob", status: "Offline", tasks: [] },

  { id: "3", name: "Charlie", status: "Break", tasks: [] },

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

          id: Date.now().toString(),

          title,

          dueDate,

          progress: 0,

          completed: false,

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

          task.completed = task.progress === 100;

        }

      }

    },

  },

});



export const { updateStatus, assignTask, updateTaskProgress } =

  membersSlice.actions;



export default membersSlice.reducer;



