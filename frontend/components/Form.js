import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'
import { inputChange } from '../state/action-creators'
import { useDispatch } from 'react-redux'
import { postQuiz } from '../state/action-creators'
import { resetForm } from '../state/action-creators'
import * as yup  from "yup"
import { useState } from 'react'


export function Form(props) {

  const {form, postQuiz,inputChange} =props
 

  

  const dispatch = useDispatch();

  const onChange = evt => {
    evt.preventDefault();
    const { name, value } = evt.target;
    dispatch(inputChange(name,value))


  }

  const onSubmit = evt => {
    console.log('submit')
    evt.preventDefault();
    const formObj = {
      question_text: form.newQuestion,
      true_answer_text: form.newTrueAnswer,
      false_answer_text: form.newFalseAnswer
    }
    postQuiz(formObj)
    
}

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" name='newQuestion' value={form.newQuestion} placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" name='newTrueAnswer' value={form.newTrueAnswer} placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" name='newFalseAnswer' value={form.newFalseAnswer} placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={false}>Submit new quiz</button>
    </form>
  )
}

const newQuestionInput = document.getElementById('newQuestion');
const newTrueAnswerInput = document.getElementById('newTrueAnswer');
const newFalseAnswerInput = document.getElementById('newFalseAnswer');
const submitButton = document.getElementById('submitNewQuizBtn');

/*newQuestionInput.addEventListener('input', validateInputs);
newTrueAnswerInput.addEventListener('input', validateInputs);
newFalseAnswerInput.addEventListener('input', validateInputs);
*/

function validateInputs() {
  if (newQuestionInput.value.length > 0 && newTrueAnswerInput.value.length > 0 && newFalseAnswerInput.value.length > 0) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}


const mapStateToProps = (state) => {
  
  return({

    form: state.form
  })
}

export default connect(mapStateToProps, {inputChange, postQuiz, resetForm})(Form)
