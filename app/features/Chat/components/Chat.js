import React from 'react';
import Contacts from './Contacts';
import Dialog from './Dialog';

export default class Chat extends React.Component {
  render() {
    var {match} = this.props;
    return (
      <div className="chat-container">
        <Contacts initialContactId={match.params.contactId}/>
        <Dialog />
      </div>
    )
  }
};
