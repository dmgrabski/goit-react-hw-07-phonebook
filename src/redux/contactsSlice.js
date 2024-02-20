import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


axios.defaults.baseURL = "https://65d4f01b3f1ab8c634364efe.mockapi.io/contacts";

//const initialState = {
  //contacts: [
   // { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    //{ id: "id-2", name: "Hermione Kline", number: "443-89-12" },
   // { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    //{ id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  //],
//};

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

