import { Component } from "react";
import Form from "./components/Form/Form.jsx";
import ContactList from "./components/ContactList/ContactList.jsx";
import Filter from "./components/Filter/Filter.jsx";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  handleAddContact = (newContact) =>
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));

  handleCheckUniqueContact = (name) => {
    const { contacts } = this.state;
    const onExistContact = !!contacts.find((contact) => contact.name === name);
    onExistContact && alert("Contact already exists");

    return !onExistContact;
  };

  handleRemoveContact = (id) =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((contact) => contact.id !== id),
    }));

  handleFilterChange = (filter) => this.setState({ filter });
  onFilterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const filterContacts = this.onFilterContacts();

    return (
      <>
        <h1>Phonebook</h1>
        <Form
          AddContact={this.handleAddContact}
          onUnique={this.handleCheckUniqueContact}
        />
        <h2>Contacts List</h2>
        <Filter filter={filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={filterContacts}
          onRemove={this.handleRemoveContact}
        />
      </>
    );
  }
}
