import ChatReducer, {NAME as chatReducerName} from 'features/Chat/index';
import {reducer as formReducer} from 'redux-form';
export default function(state = {}, action = {}) {
  return {
    "form": formReducer(state.form, action),
    [chatReducerName]: ChatReducer(state[chatReducerName], action)
  }
}
