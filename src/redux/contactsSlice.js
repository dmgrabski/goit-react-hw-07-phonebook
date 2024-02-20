import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


axios.defaults.baseURL = "https://65d4f01b3f1ab8c634364efe.mockapi.io/contacts/contacts";

const initialState = {
  contacts: [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ],
  tasks: [],
  tasksLoading: false,
};

export const fetchTasks = createAsyncThunk("tasks/fetchAll", async () => {
  const response = await axios.get("/tasks");
  return response.data;
});

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContacts: (state, action) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.tasksLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasksLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.tasksLoading = false;
      });
  },
});

export const { addContact, deleteContacts } = contactsSlice.actions;
export const contactReducer = contactsSlice.reducer;

