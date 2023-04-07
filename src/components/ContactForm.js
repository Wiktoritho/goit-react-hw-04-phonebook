import { nanoid } from 'nanoid';
import { Component } from 'react';
import css from "../App.module.css";

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class ContactForm extends Component {
  state = { ...INITIAL_STATE };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { contacts, addContact } = this.props;
    const contact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };

    let userExists = false;

    contacts.forEach(user => {
      if (user.name.toLowerCase() === contact.name.toLowerCase()) {
        alert(contact.name + " is already in your contacts");
        userExists = true;
      }
    });

    if (userExists === false) {
      addContact(contact);
    }
    this.reset();
  };

  reset = () => {
    this.setState({
      ...INITIAL_STATE,
    });
  };

  render() {
    const { name, number } = this.state;
    const nameInputId = nanoid();
    const numberInputId = nanoid();

    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <label htmlFor={nameInputId}>Name</label>
        <input
          id={nameInputId}
          type="text"
          name="name"
          className='input'
          value={name}
          placeholder="Enter contact's name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={this.handleChange}
        />
        <label htmlFor={numberInputId}>Number</label>
        <input
          id={numberInputId}
          type="tel"
          name="number"
          value={number}
          placeholder="Enter contact's number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={this.handleChange}
        />
        <button type="submit" name="submit" className={css.button}>
          Add contact
        </button>
      </form>
    );
  }
}
