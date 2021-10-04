import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { modify_todo_name, modify_todo_name_success, modify_todo_edit, modify_todo_edit_success, clear_todo_completed, clear_todo_completed_success, add_todo, add_todo_success, load_todo, load_todo_success, remove_todo, remove_todo_success, modify_todo, modify_todo_success } from '../actions/todo.actions';

function* load_todo_data() {
  let todoData = yield axios.get('/api/todos')
  yield put(load_todo_success(todoData))
}

function* add_todo_data(action) {
  let taskInfo = yield axios.post('/api/todos', {taskName: action.payload})
  yield put(add_todo_success(taskInfo.task))
}

function* remove_todo_data(action) {
  let result = yield axios.delete('/api/todos', {
    params: {
      id: action.payload
    }
  })
  yield put(remove_todo_success(result.tasks.id))
}

function* modify_todo_data(action) {
  let params = action.payload
  yield axios.put('/api/todos/isCompleted', params)
  yield put(modify_todo_success(params))
}

function* clear_todo_completed_data() {
  yield axios.delete('/api/todos/clearCompleted')
  yield put(clear_todo_completed_success())
}

function* modify_todo_edit_data(action) {
  yield axios.put('/api/todos/isEditing', action.payload)
  yield put(modify_todo_edit_success(action.payload))
}

function* modify_todo_name_data(action) {
  yield axios.put('/api/todos/', action.payload)
  yield put(modify_todo_name_success(action.payload))
}

export default function* todoSaga() {
  yield takeEvery(load_todo, load_todo_data)
  yield takeEvery(add_todo, add_todo_data)
  yield takeEvery(remove_todo, remove_todo_data)
  yield takeEvery(modify_todo, modify_todo_data)
  yield takeEvery(clear_todo_completed, clear_todo_completed_data)
  yield takeEvery(modify_todo_edit, modify_todo_edit_data)
  yield takeEvery(modify_todo_name, modify_todo_name_data)
}