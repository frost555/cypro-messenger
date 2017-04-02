import React from 'react';
import {connect} from 'react-redux';
import {messagesSelector, selectedContactIdSelector, contactsSelector, selfSelector, sendMessage} from '../index';
import _ from 'lodash';
import ReplyForm from './ReplyForm';
import Messages from './Messages';


class Dialog extends React.PureComponent {
  render() {
    const {messages, selectedContactId, contact, self} = this.props;
    if (!contact) {
      return (<div className="dialog"></div>)
    }
    return (
      <div className="dialog">
        <Messages messages={messages} contact={contact} self={self}/>
        <ReplyForm dispatch={this.props.dispatch} selectedContactId={selectedContactId}/>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  var selectedContactId = selectedContactIdSelector(state);
  return {
    messages: messagesSelector(state, selectedContactId),
    selectedContactId: selectedContactId,
    contact: contactsSelector(state)[selectedContactId],
    self: selfSelector(state)
  }
};

export default connect(mapStateToProps)(Dialog)
