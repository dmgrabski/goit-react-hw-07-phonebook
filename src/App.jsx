import React, { useEffect } from "react";
import { useDispatch } from "react-redux"; 
import { fetchTasks } from "../src/redux/contactsSlice"; 

import Section from "./components/Section/Section";
import ContactForm from "./components/ContactForm/ContactForm";
import Contacts from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import "./App.css";

const App = () => {
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]); 

  return (
    <>
      <Section title="Phonebook">
        <ContactForm />
      </Section>
      <Section title="Contacts">
        <Filter />
        <Contacts />
      </Section>
    </>
  );
};

export default App;

