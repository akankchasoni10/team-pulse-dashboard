// src/redux/slices/roleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const roleSlice = createSlice({
  name: 'role',
  initialState: {
    currentRole: 'lead',
    currentUserId: 1,
  },
  reducers: {
    switchRole: (state, action) => {
      state.currentRole = action.payload.role;
      state.currentUserId = action.payload.userId;
    },
  },
});

export const { switchRole } = roleSlice.actions;
export default roleSlice.reducer;