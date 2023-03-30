// ❗ You don't need to add extra action creators to achieve MVP

import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE,RESET_FORM } from "./action-types"
import axios from "axios"
const url = 'http://localhost:9000/api/quiz/answer'

const url2 = 'http://localhost:9000/api/quiz/new'

export function moveClockwise(number) {
  return({ type:MOVE_CLOCKWISE, payload: number})
 }

export function moveCounterClockwise() {
  return({type:MOVE_COUNTERCLOCKWISE})
 }


export function setQuiz(quiz) { 
  return({type: SET_QUIZ_INTO_STATE, payload:quiz })
}

export function selectAnswer(answer) { 
  return({type: SET_SELECTED_ANSWER, payload: answer})
}


export function setMessage(message) { 
  return({type: SET_INFO_MESSAGE, payload: message})

}



export function inputChange(name,value) {
  return({type: INPUT_CHANGE, payload: {name, value}  })
 }

export function resetForm() { 
  return ({type: RESET_FORM})
}

// ❗ Async action creators
export function fetchQuiz() {
  
  return function (dispatch) {

    dispatch(setQuiz(null))
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res=> {
        //console.log('api date', res.data)
        dispatch(setQuiz(res.data))
        
        
      })
  }
}
export function postAnswer(answer) {
  return function (dispatch) {
 // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz

//console.log('post answer',answer)

    axios.post(url, answer) 
      .then( res => {
        console.log('hey',res)
        dispatch(fetchQuiz())
        dispatch(selectAnswer(null))
        dispatch(setMessage(res.data.message))
      })
      .catch(err=> {
        console.log('error', err)
      })
      

      
  }
}
export function postQuiz(form) {
  console.log('sub', form)
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form

    axios.post(url2,form)
      .then( res => {
       console.log(res)
       dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`))
       dispatch(resetForm())
    })
    .catch(err=> {
      console.log('rror', err)
    })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
