import { Component } from 'react';

export class ContactsListElement extends Component {
  render() {
    const { contacts, deleteContact } = this.props;
    return contacts.map(({ name, number, id }) => (
      <li key={id}>
        <span>{name}: </span>
        <span>{number}</span>
        <button key={id} type="button" onClick={() => deleteContact(id)}>
          Delete
        </button>
      </li>
    ));
    
  }
  
}
