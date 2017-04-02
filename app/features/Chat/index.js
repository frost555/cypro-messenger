import mockData from './mockData';
import formatDate from 'date-fns/format';

export const NAME = "chat";

const prefix = 'chat/';
export const SELECT_CONTACT = prefix + "SELECT_CONTACT";
export const MESSAGES_FETCHED = prefix + "MESSAGES_FETCHED";
export const SEND_MESSAGE = prefix + "SEND_MESSAGE";
export const MESSAGE_ARRIVED = prefix + "MESSAGE_ARRIVED";

export const selectContact = (contactId) => ({type: SELECT_CONTACT, payload: contactId});
export const reply = (contactId, message) => ({});
export const sendFile = (contactId) => ({});
export const sendMessage = (contactId, text, attachment) => ({type: SEND_MESSAGE, payload: {contactId, text, attachment}});
export const messagesFetched = (contactId, messages) => ({type: MESSAGES_FETCHED, payload: {contactId, messages}});
export const messageArrived = (contactId, message) => ({type: MESSAGE_ARRIVED, payload: {contactId, message}});

const initialState = {
  selectedContactId: undefined,
  contacts: mockData.initialContacts,
  messagesByContactId: {},
  self: {
    name: 'Игорь'
  }
};

export const selectedContactIdSelector = (state) => state.chat.selectedContactId;
export const contactsSelector = (state) => state.chat.contacts;
export const messagesSelector = (state, contactId) => state.chat.messagesByContactId[contactId];
export const selfSelector = (state) => state.chat.self;

export default function (state = initialState, action = null) {
  switch (action.type) {
    case SELECT_CONTACT:
      return {
        ...state,
        selectedContactId: action.payload
      };
    case MESSAGES_FETCHED:
      return {
        ...state,
        messagesByContactId: {
          ...state.messagesByContactId,
          [action.payload.contactId]: action.payload.messages
        }
      };
    case SEND_MESSAGE:
    {
      const dateSent = formatDate(new Date(), "DD.MM.YYYY HH:mm:ss");
      let messages = [
        ...state.messagesByContactId[action.payload.contactId],
        {
          text: action.payload.text,
          direction: "out",
          dateSent: dateSent,
          attachment: action.payload.attachment
        }
      ];

      return {
        ...state,
        messagesByContactId: {
          ...state.messagesByContactId,
          [action.payload.contactId]: messages
        }
      }
    }
    case MESSAGE_ARRIVED:
    {
      let messages = [
        ...state.messagesByContactId[action.payload.contactId],
        action.payload.message
      ];
      return {
        ...state,
        messagesByContactId: {
          ...state.messagesByContactId,
          [action.payload.contactId]: messages
        }
      }
    }
    default:
      return state;
  }
};
