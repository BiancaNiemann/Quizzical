import React from "react"
import Quiz from "./Quiz"
import { nanoid } from 'nanoid'
import {shuffle} from "lodash"
//import Confetti from "react-confetti"
import flower from "./flower.png"

export default function App() {

  const [showAnswers, setShowAnswers] =React.useState(false)
  const [quiz, setQuiz] = React.useState(false);
  const [questions, setQuestions] = React.useState([])
  const [score, setScore] = React.useState(0)
  const [replay, setReplay] = React.useState(false)

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
     .then(res => res.json())
      .then(data => setQuestions(data.results.map(result => {
        const arrayOfAns = [result.correct_answer, ...result.incorrect_answers]
        const shuffleArrofAns = shuffle(arrayOfAns)
        const newArrofAns = shuffleArrofAns.map((item) => {
          return {
            answer: item,
            clicked: false,
            correctAns: item === result.correct_answer ? true : false,
            id:nanoid()
          }
        })
       return {
        id: nanoid(),
        question: result.question,
        correctAnswer: result.correct_answer,
        incorrectAnswers: result.incorrect_answers,
        shuffledAnswers: newArrofAns        
      }
    })))
  }, [replay])

  function openQuiz() {
    setQuiz(prevQuiz => !prevQuiz)
  }

  function holdAnswer(quesId, correctAns, userAnswer) {
    console.log(quesId, correctAns, userAnswer.answer)
    setQuestions(prevQuestions => {
      const setSelectOpt = prevQuestions.map(({shuffledAnswers, id, ...rest}) => {
        if (id === quesId) {
          const setSelected = shuffledAnswers.map((option) => {
            if (option.answer === userAnswer.answer) {
              return {...option, clicked: true};
              
            } else {
              return {...option, clicked: false};
            }
          });
          return {id, ...rest, shuffledAnswers:setSelected};
        } else {
          return {id, ...rest, shuffledAnswers}
        }
      });
      
      return setSelectOpt.map(ques => {
        return ques.id === quesId
        ?{...ques,  isAnswered: true, answer: userAnswer.answer}
        :ques
        })
      }
    )
  }

  function checkAnswers() {
    setShowAnswers(true)
    questions.map(item => {
      if (item.answer === item.correctAnswer) {
        setScore(prevScore => prevScore + 1)
      }
    })
  }
  
  function clearAnswers() {
    setShowAnswers(false)
    setScore(0)
    setReplay(prevReplay => !prevReplay)
    setQuiz(false)
  }
 
  const ques = questions.map(ask => { 
    
  return ( 
           <Quiz 
              ask={ask.question}
              answers={ask.shuffledAnswers}
              canswer={ask.correctAnswer}
              key={nanoid()}
              id={ask.id}
              holdAnswer={holdAnswer}
              showAnswer={showAnswers}
              />
        )
      })
    
  return (
    <main className="main">
      <div className='bgimage'>
      <img src={flower} alt='test' className="img image1"/>
      <img src={flower} alt='test' className="img image2"/>
      <img src={flower} alt='test' className="img image3"/>
      <img src={flower} alt='test' className="img image4"/>
      <img src={flower} alt='test' className="img image5"/>
      <img src={flower} alt='test' className="img image6"/>
      </div>
     { !quiz
      ?
      <div className="startPage">
        <h1 className="header">Quizzical</h1>
        <h3 className="howTo">Try and see how many you can answer correctly - Beat the Clock!!</h3>
        <button className="startButton" onClick={openQuiz}>Start Quiz</button>
      </div>
      :
      <section className="qanda">{ques}
              {showAnswers && <p className='score'>You scored {score} / 5 correct answers</p>}
              {!showAnswers && <button className="answerButton" onClick={checkAnswers}>Check Answers</button>}
              {showAnswers && <button className="answerButton" onClick={clearAnswers}>Play Again</button>}
              //{score === 5 && <Confetti/>}
      </section>
      
      }
    </main>
  )
}
