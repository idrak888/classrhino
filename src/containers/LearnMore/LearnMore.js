import React from 'react';
import illustration6 from '../../assets/illustration6.png';
import './Main.css';

class LearnMore extends React.Component {
    state = {
        questions: [
            {q: 'Who are the teachers on ClassRhino?',
             a: "At ClassRhino we only accept professional and certified teachers from all over the world who has expertise on particular subjects and curriculums. They are not our employees; ClassRhino's teachers are considered self-employed."},
            {q: 'How do the classes take place?',
             a: "Our classes are held online via skype. The students can browse and choose their own teacher, book a class with them depending on the teacher's schedule and connect via skype on the chosen date and time."},
            {q: 'How do I make payments?',
             a: "Our payment methods include credit and debit cards. Before a student can book a class, we will require them to submit their payment details (only the first time) and we will charge right after the booking, individually for each class."},
            {q: "What if a class doesn't go as expected?",
             a: "If by any chance a student isn't satisfied after a class, they can choose to report and request a refund for that class. We will strictly handle any teacher that hasn't met our expectations."},
            {q: 'How does ClassRhino charge fees?',
             a: "ClassRhino takes a 6% cut from each teacher's monthly earnings at the end of the month."}
        ]
    }
    toggleAnswer = index => {
        const answers = document.querySelectorAll('.answer');
        for (let div of answers) {
            div.classList.remove("visible");
        }
        answers[index].classList.toggle("visible");
    }
    render () {
        return (
            <div className="LearnMore">
                <img alt="dummy-alt" className="img-fluid" src={illustration6}/>
                <h2>Frequently asked questions</h2>
                <br/>
                <div className="main-container">
                    {this.state.questions.map((question, index) => {
                        return ( 
                            <div key={index} onClick={() => this.toggleAnswer(index)} className="QuestionModule">
                                <h4>{question.q}</h4>
                                <div className="answer">
                                    <p>{question.a}</p>
                                </div>    
                            </div>
                        )
                    })}
                </div>
                <br/>
                <h3>Can't find your question?</h3>
                <br/>
                <input type="text" placeholder="Submit your question"/><button className="btn btn-primary">Submit</button>
            </div>
        )
    }
}

export default LearnMore;