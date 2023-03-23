import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'
import { inputChange } from '../state/action-creators'
import { useDispatch } from 'react-redux'
import { postQuiz } from '../state/action-creators'

export function Form(props) {

  const {form} =props
  console.log(form)

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
      <input maxLength={50} onChange={onChange} id="newQuestion" name='newQuestion' placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" name='newTrueAnswer' placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" name='newFalseAnswer' placeholder="Enter false answer" />
      <button id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = (state) => {
  
  return({

    form: state.form
  })
}

export default connect(mapStateToProps, {inputChange})(Form)
