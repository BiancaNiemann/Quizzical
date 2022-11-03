import React from "react";
import { nanoid } from "nanoid";

export default function Quiz(props) {
    const [score, setScore] = React.useState(0)

    return (
        <div>
            <h3 className="question" dangerouslySetInnerHTML={{__html: props.ask}}></h3>

            <div className="answerBox">
                {props.answers.map((item) => {

            function styler() {
                let style = ''
                if (!props.showAnswer) {
                    return style = {backgroundColor: item.clicked ? '#d6dbf5' : 'transparent'}
                } else if (props.showAnswer) {
                    return style = {backgroundColor: item.clicked && item.correctAns ? '#94D7A2' : 'transparent'
                                    && item.clicked && !item.correctAns ? '#f8bcbc' : 'transparent'}
                }
            }

            const styles = styler()
          
            return (
            <button 
                key={item.id}
                style={styles}
                onClick={() => props.holdAnswer(props.id, props.canswer, item) }
                className='answer'
                dangerouslySetInnerHTML={{__html: item.answer}}>
            </button>
            )
            })
            }
               
            </div>
            <hr/>
        </div>
    )
}