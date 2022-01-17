import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = (props) => {
  const intialState = {
    contacts: [
      {
        id: 1,
        name: 'Tom Hanks',
        email: 'tomhanks@gmail.com',
        phone: '222-333-4444',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Morgan Freeman',
        email: 'morganfreeman@gmail.com',
        phone: '222-333-5555',
        type: 'professional',
      },
      {
        id: 3,
        name: 'Robert De Nero',
        email: 'robertdenero@gmail.com',
        phone: '222-777-4444',
        type: 'personal',
      },
      {
        id: 4,
        name: 'Harrison Ford',
        email: 'harrisonford@gmail.com',
        phone: '222-777-9999',
        type: 'personal',
      },
      {
        id: 5,
        name: 'Clint Eastwood',
        email: 'clinteastwood@gmail.com',
        phone: '222-777-9999',
        type: 'professional',
      },
    ],
    current: null,
  };

  // Add Contact
  const addContact = (contact) => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Delete Contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // Update Contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  // Set Current
  const setCurrent = (current) => {
    dispatch({ type: SET_CURRENT, payload: current });
  };

  // Clear Current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const [state, dispatch] = useReducer(contactReducer, intialState);
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        updateContact,
        setCurrent,
        clearCurrent,
      }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
