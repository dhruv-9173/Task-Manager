import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { taskStore } from "../store/taskstore";

export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const tasks = await taskStore();
  return tasks;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      state.items.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((task) => task._id !== action.payload);
    },
    updateTask: (state, action) => {
      const index = state.items.findIndex(
        (task) => task._id === action.payload._id
      );
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addTask, deleteTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
