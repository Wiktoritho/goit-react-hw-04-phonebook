import { useEffect, useState } from 'react';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactsList } from 'components/ContactList';
import { ContactsListElement } from 'components/ContactListElement';
import css from './App.module.css';

const STORAGE_KEY = '';
const getContactsFromLocalStorage = () => {
  const savedContacts = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedContacts) {
    return savedContacts;
  } else {
    return [];
  }
};


export const App = () => {
  const [contacts, setContacts] = useState(getContactsFromLocalStorage());
  const [filter, setFilter] = useState('');


  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    setContacts([...contacts, contact])
    };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const getFilter = element => {
    setFilter(element.currentTarget.value);
  };

  const filterContacts = () => {
    return contacts.filter(contact => contact.name.includes(filter));
  };

    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm
          addContact={addContact}
          contacts={contacts}
        ></ContactForm>
        <h2>Contacts</h2>
        <Filter
          value={filter}
          filterContacts={filterContacts()}
          onChange={getFilter}
        />
        <ContactsList>
          <ContactsListElement
            contacts={filterContacts()}
            deleteContact={deleteContact}
          />
        </ContactsList>
      </div>
    );
}
