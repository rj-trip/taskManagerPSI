// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import AuthService from './AuthService';

// const user = JSON.parse(localStorage.getItem("user"));

// const initialState = {
//   user: user || null,
//   loading: false,
//   error: null,
// };

// export const login = createAsyncThunk('auth/login', AuthService.login);
// export const register = createAsyncThunk('auth/register', AuthService.register);
// export const logout = createAsyncThunk('auth/logout', async () => {
//   AuthService.logout();
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => { state.loading = true })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.error = null;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.user = action.payload;
//       })
//       .addCase(logout.fulfilled, (state) => {
//         state.user = null;
//       });
//   },
// });

// export default authSlice.reducer;

import axios from "../api/axios";

// Get all tasks
const getAll = async () => {
  const res = await axios.get("/tasks");
  return res.data;
};

// Create a task with optional file upload
const create = async (taskData) => {
  const formData = new FormData();
  formData.append("title", taskData.title);
  formData.append("description", taskData.description);
  formData.append("status", taskData.status);
  formData.append("priority", taskData.priority);
  formData.append("dueDate", taskData.dueDate);
  if (taskData.assignedTo) {
    formData.append("assignedTo", taskData.assignedTo);
  }
  if (taskData.documents) {
    Array.from(taskData.documents).forEach((file) => {
      formData.append("documents", file);
    });
  }

  const res = await axios.post("/tasks", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

// Update a task
const update = async (id, updatedData) => {
  const formData = new FormData();
  formData.append("title", updatedData.title);
  formData.append("description", updatedData.description);
  formData.append("status", updatedData.status);
  formData.append("priority", updatedData.priority);
  formData.append("dueDate", updatedData.dueDate);
  if (updatedData.assignedTo) {
    formData.append("assignedTo", updatedData.assignedTo);
  }
  if (updatedData.documents) {
    Array.from(updatedData.documents).forEach((file) => {
      formData.append("documents", file);
    });
  }

  const res = await axios.put(`/tasks/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

// Delete task
const remove = async (id) => {
  const res = await axios.delete(`/tasks/${id}`);
  return res.data;
};

export default {
  getAll,
  create,
  update,
  remove,
};

