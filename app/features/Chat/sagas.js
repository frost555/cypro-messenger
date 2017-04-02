import {SELECT_CONTACT, SEND_MESSAGE, messagesFetched, messageArrived} from './index';
import {delay, takeEvery} from 'redux-saga';
import {put} from 'redux-saga/effects';
import mockData from './mockData';
import _ from 'lodash';
import formatDate from 'date-fns/format';

const fetchedDialogs = [];

function* fetchDialogs({payload : contactId}){
  if (_.indexOf(fetchedDialogs, contactId) == -1) {
    yield delay(1000);
    console.log(contactId);
    yield put(messagesFetched(contactId, mockData.messagesByContactId[contactId]));
    fetchedDialogs.push(contactId);
  }
}
function* watchContactChange() {
  yield takeEvery(SELECT_CONTACT, fetchDialogs);
}

const responses = [
  "Неплохо, надо подумать.",
  "Ок",
  "Класс",
  "Что думаешь?",
  "Пожалуй откажусь",
  "Неее..."
];

const getRandomResponse = () => responses[Math.floor(Math.random() * responses.length)];

function* sendMessage({payload: {contactId, text}}) {
  // Сохранение сообщения на сервер.
  yield delay(1000);

  // По условиям задания, собеседник должен ответить через некоторое время.
  yield delay(1000);
  yield put(messageArrived(contactId, {
    text: getRandomResponse(),
    direction: "in",
    dateSent: formatDate(new Date(), "DD.MM.YYYY HH:mm:ss")
  }))
}

function* watchSendMessage() {
  yield takeEvery(SEND_MESSAGE, sendMessage);
}

export default function*() {
 yield [
   watchContactChange(),
   watchSendMessage()
 ];
};
