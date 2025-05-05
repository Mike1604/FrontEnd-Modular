import "./exam.modules.css";
import Question from "../../../components/exam/Question.jsx";
import {useEffect, useState} from "react";
import {useLocation} from "react-router";

const dummy = {
    "questions": [
        {
            "question": "Which of the following words means 'Return' in English?",
            "answers": [
                "Devolver",
                "Comer"
            ],
            "correct_answer": [
                "Devolver"
            ]
        },
        {
            "question": "Which word is correctly translated to 'Remorse' in Spanish?",
            "answers": [
                "Arrepentimiento",
                "Alegria"
            ],
            "correct_answer": [
                "Arrepentimiento"
            ]
        },
        {
            "question": "Select the English word that corresponds with 'Plato' in Spanish.",
            "answers": [
                "Dish",
                "Book"
            ],
            "correct_answer": [
                "Dish"
            ]
        }
    ],
    "original_input": [
        "Return",
        "Remorse",
        "Dish"
    ],
    "group_id": "lets say this",
    "assigned_to": "",
    "completed_by": null
}

export default function Exam() {
    const location = useLocation();

    useEffect(() => {
        const fetchExam = () => {
            // const requestOptions = {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         deck_name: location.state.name,
            //         deck_owner: location.state.owner
            //     })
            // };
            //
            // fetch('http://127.0.0.1:8000/fetch-cards', requestOptions)
            //     .then(response => response.json())
            //     .then(data => {
            //         setCards(data);
            //         setCardsInitialLength(data.length);
            //         console.log(data)
            //         setBarWidth(((100 / cardsInitialLength) * (data.length)).toString() + "%");
            //     });
            console.log(location.state.id);
        }

        fetchExam();
    }, []);

    const [answers, setAnswers] = useState(new Array(dummy.questions.length).fill(false));

    const handleAnswerSelect = (questionIndex, selectedAnswer) => {
        if (dummy.questions[questionIndex].answers[selectedAnswer - 1] == dummy.questions[questionIndex].correct_answer) {
            let updated_answers = answers
            updated_answers[questionIndex] = true;
            setAnswers(updated_answers);
        } else {
            let updated_answers = answers
            updated_answers[questionIndex] = false;
            setAnswers(updated_answers);
        }
    };

    const sendResult = () => {
        let score = answers.filter(answer => answer === true).length
        // Send score of exam with answers
    }

    return <div className={"main_container margin-left-30"}>
        {
            dummy.questions.map((question, index) => (
                <Question
                    key={index}
                    data={question}
                    number={index}
                    onAnswerSelect={handleAnswerSelect}
                />
            ))
        }
        {/* END TEST */}
        <button className="endbtn" style={{marginTop: "50px"}} onClick={sendResult}>
            Terminar examen
        </button>

    </div>
}
