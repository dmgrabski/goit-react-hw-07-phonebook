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
    return response.data; // Zwraca dodany kontakt
  }
);

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
      .addCase(addContactAsync.pending, (state) => {
        // Opcjonalnie: zaktualizuj stan, aby wskazać, że trwa ładowanie
      })
      .addCase(addContactAsync.fulfilled, (state, action) => {
        state.contacts.push(action.payload); // Dodaj nowy kontakt do stanu
      })
      .addCase(addContactAsync.rejected, (state) => {
        // Opcjonalnie: obsłuż błąd
      });
    // Obsługa innych akcji asynchronicznych...
  },
});

export const { addContact, deleteContacts } = contactsSlice.actions;
export const contactReducer = contactsSlice.reducer;

