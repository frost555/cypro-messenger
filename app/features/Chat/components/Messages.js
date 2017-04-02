import React from 'react';
import _ from 'lodash';

class Messages extends React.Component {
  componentDidUpdate = (prevProps) => {
    if (prevProps.messages != this.props.messages) {
      this.refs.messages.scrollTop =  this.refs.messages.scrollHeight;
    }
  };
  render() {
    const {messages, contact, self} = this.props;
    return (
        <div className="messages" ref="messages">
          {_.map(messages, (m, ix) => (
            <div key={ix} className="message">
              <div className="message__title">
                <div className="message__author">
                  {m.direction == "in" ? contact.name : self.name}
                </div>
                <div className="message__datesent">
                  {m.dateSent}
                </div>
              </div>
              <div className="message__text">{m.text}</div>
              {m.attachment ? (
                <div className="message__attachment">
                  {m.attachment.name}
                </div>
              ) : null}
            </div>
          ))}
        </div>
    )
  }
}

export default (Messages)
