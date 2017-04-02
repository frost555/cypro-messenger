import React from 'react';

import {reduxForm, Field, change, formValueSelector as formValueSelectorFactory} from 'redux-form';
import {sendMessage} from '../index';
import FileInput from './FileInput';
import {connect} from 'react-redux';

class ReplyForm extends React.PureComponent {
  handleSubmit = (data) => {
    if ((data.message && data.message.length > 0) || data.file) {
      this.props.dispatch(sendMessage(this.props.selectedContactId, data.message, data.file));
      this.props.dispatch(change("reply", "message", ""));
      this.props.dispatch(change("reply", "file", null));
    }
  };
  render() {
    const {file} = this.props;
    return (
      <form className="reply-wrapper" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <div className="reply">
          <Field name="message" className="reply__input" component="input" type="text"/>
          <label className="file-upload-label" htmlFor="file-upload"> </label>
          <Field className="file-upload" id="file-upload" name="file" component={FileInput}/>
          <button className="reply__submit">Отправить</button>
        </div>
        {file ? (
          <div className="reply__attachments">
            {file.name}
          </div>
        ) : null}
      </form>
    )
  }
}

let formValueSelector = formValueSelectorFactory("reply");

export default reduxForm({form: "reply"})(connect(
  (state) => ({
    file: formValueSelector(state, "file")
  })
)(ReplyForm));

