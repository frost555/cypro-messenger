import React from 'react';
import _ from 'lodash';
import Contact from './Contact';
import {connect} from 'react-redux';
import {contactsSelector, selectedContactIdSelector, selectContact} from '../index';
import {Redirect} from 'react-router-dom';
class Contacts extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.initialContactId != undefined) {
      this.props.dispatch(selectContact(this.props.initialContactId));
    }
  }
  handleContactClicked = (contactId) => {
    this.props.dispatch(selectContact(contactId));
  };
  render() {
    const {contacts, selectedContactId} = this.props;
    return (
      <div className="contacts">
        <Redirect key={`/chat/${selectedContactId}`} to={selectedContactId != undefined ? `/chat/${selectedContactId}` : "/chat/"}/>
        <div className="contacts__list">
          {_.map(contacts, (contact, id) => (
            <Contact key={id} selected={id == selectedContactId} contact={contact} onClick={this.handleContactClicked}/>
          ))}
        </div>
      </div>
    )
  }
}


//<Redirect key={`/chat/${selectedContactId}`} to={selectedContactId != undefined ? `/chat/${selectedContactId}` : "/chat/"}/>
const mapStateToProps = (state, props) => {
  return {
    contacts: contactsSelector(state),
    selectedContactId: selectedContactIdSelector(state)
  }
};

export default connect(mapStateToProps)(Contacts)
