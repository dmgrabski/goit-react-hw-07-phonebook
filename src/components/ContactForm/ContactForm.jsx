import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Zaimportuj akcję asynchroniczną zamiast synchronicznej
import { addContactAsync } from "../../redux/contactsSlice";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  // Popraw selektor, aby odwołał się do poprawnej struktury stanu
  // Zakładając, że stan kontaktów znajduje się w state.contacts.contacts
  const contacts = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const normalizedName = name.toLowerCase();
    const isAdded = contacts.some(
      (contact) => contact.name.toLowerCase() === normalizedName
    );

    if (isAdded) {
      console.log(`${name} is already in contacts`);
      return;
    }

    // Użyj akcji asynchronicznej z danymi kontaktu bez generowania ID tutaj, 
    // zakładając, że ID będzie generowane przez backend/API.
    dispatch(addContactAsync({ name, number }));
    setName("");
    setNumber("");
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeNumber = (e) => {
    setNumber(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        value={name}
        onChange={handleChangeName}
        required
      />
      <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        value={number}
        onChange={handleChangeNumber}
        required
      />
      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;
