import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { selectAnswer } from '../state/action-creators'
import { fetchQuiz } from '../state/action-creators'

export function Quiz(props) {

  const {fetchQuiz, answer, quiz} = props

  useEffect(() => {
    console.log('first', props)
     if (!quiz){
      fetchQuiz()
     } 
    console.log('second')
  }, [])

  console.log('quiz', quiz)
  console.log(quiz.question)
  console.log('answer', props.answer)
  
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        true ? (
          <>
            <h2>What is a closure?</h2>
            
            <div id="quizAnswers">
              <div className={`answer ${  null ? ' selected' : '' }` }>
                A function
                <button >
                  SELECTED
                </button>
              </div>

              <div className="answer">
                An elephant
                <button>
                  Select
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return({
    quiz: state.quiz,
    answer: state.answer
  })
}


export default connect(mapStateToProps, {selectAnswer, fetchQuiz} )(Quiz)
