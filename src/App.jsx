import React, { useEffect } from "react";
import { useDispatch } from "react-redux"; 
import { fetchContactAsync } from "../src/redux/contactsSlice"; 
import Section from "./components/Section/Section";
import ContactForm from "./components/ContactForm/ContactForm";
import Contacts from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import "./App.css";

const App = () => {
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(fetchContactAsync());
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

