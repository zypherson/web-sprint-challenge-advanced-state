import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { selectAnswer } from '../state/action-creators'
import { fetchQuiz } from '../state/action-creators'

//handle submit answer click function
//post request


//handle select answer click
//select answer


export function Quiz(props) {

  const {fetchQuiz, answer, selectAnswer, quiz} = props
  

  useEffect(() => { 
     if (!quiz){
      fetchQuiz()
     } 
  }, [])

  function changeButtonText() {
    var button = document.getElementById("select");
    button.innerHTML = "Selected";

    var button2 = document.getElementById("select2")
    button2.innerHTML = "Select"
  }
  
  function changeButtonText2() {
    var button = document.getElementById("select2");
    button.innerHTML = "Selected";

    var button1 = document.getElementById("select")
    button1.innerHTML = "Select"
  }



  
  console.log('quiz', answer)
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

            <button id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
  
}


const mapStateToProps = (state) => {
  console.log(state)
  return({

    quiz: state.quiz,
    answer: state.selectedAnswer
  })
}


export default connect(mapStateToProps, {selectAnswer, fetchQuiz} )(Quiz)
