import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


axios.defaults.baseURL = "https://65d4f01b3f1ab8c634364efe.mockapi.io/contacts";

const initialState = {
  contacts: [],
};

export const fetchTasks = createAsyncThunk("tasks/fetchAll", async () => {
  const response = await axios.get("/contacts");
  return response.data;
});

// Asynchroniczny thunk do dodawania nowego kontaktu
export const addContactAsync = createAsyncThunk(
  'contacts/addContact',
  async (contactData) => {
    const response = await axios.post('/contacts', contactData); // '/contacts' to endpoint API
    return response.data;
  }
);

export const fetchContactsAsync = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await axios.get('/contacts');
    return response.data;
  }
);

// Asynchroniczny thunk do usuwania kontaktu
export const deleteContactAsync = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId) => {
    await axios.delete(`/contacts/${contactId}`);
    return contactId;
  }
);

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(addContactAsync.pending, (state) => {
        
      })
      .addCase(addContactAsync.fulfilled, (state, action) => {
        state.contacts.push(action.payload); 
      })
      .addCase(addContactAsync.rejected, (state) => {
      })
      .addCase(fetchContactsAsync.fulfilled, (state, action) => {
        state.contacts = action.payload; 
      })
      .addCase(deleteContactAsync.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload); 
      });
    
  },
});

export const { addContact, deleteContacts } = contactsSlice.actions;
export const contactReducer = contactsSlice.reducer;

