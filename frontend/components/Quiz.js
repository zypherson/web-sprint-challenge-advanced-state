import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { selectAnswer } from '../state/action-creators'
import { fetchQuiz } from '../state/action-creators'
import { postAnswer } from '../state/action-creators'

//handle submit answer click function
//post request


//handle select answer click
//select answer


export function Quiz(props) {

  const {fetchQuiz, answer, selectAnswer, quiz, postAnswer} = props
  

  useEffect(() => { 
     if (!quiz){
      fetchQuiz()
     } 
  }, [])

  //console.log('test', props?.quiz.quiz_id)

const onSubmit = (evt) => {
  console.log('submit')
  evt.preventDefault();
  const answerObj = {
    quiz_id: quiz.quiz_id,
    answer_id: answer.answer_id
    }
  postAnswer(answerObj)
}







  
  console.log('answer', answer )
   //console.log(quiz.question)
 
   
  return (
  
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>
            
            <div id="quizAnswers">
            <div className={`answer ${quiz.answers[0].answer_id=== answer?.answer_id  ? ' selected' : '' }` }>
                {quiz.answers[0].text}
                <button  onClick={()=>selectAnswer(quiz.answers[0])}  >
                  {quiz.answers[0].answer_id === answer?.answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>

              <div className={`answer ${quiz.answers[1].answer_id=== answer?.answer_id  ? ' selected' : '' }` }>
              {quiz.answers[1].text}
                <button onClick={()=>selectAnswer(quiz.answers[1])}>
                {quiz.answers[1].answer_id === answer?.answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" onClick={onSubmit}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
  
}


const mapStateToProps = (state) => {
  console.log()
  return({

    quiz: state.quiz,
    answer: state.selectedAnswer
  })
}


export default connect(mapStateToProps, {selectAnswer, fetchQuiz, postAnswer} )(Quiz)
