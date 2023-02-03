// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE } from './action-types'

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
    switch(action.type) {
      case MOVE_CLOCKWISE:
         return state === 5 ? 0 : state + 1
      case MOVE_COUNTERCLOCKWISE :
      return state === 0 ? 5 : state - 1

        default:
          return state;
    }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  return state
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  return state
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  return state
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  return state
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
