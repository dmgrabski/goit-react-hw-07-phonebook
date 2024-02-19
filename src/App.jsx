import React from "react";
import Section from "./components/Section/Section";
import ContactForm from "./components/ContactForm/ContactForm";
import Contacts from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import "./App.css";

const App = () => {
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

