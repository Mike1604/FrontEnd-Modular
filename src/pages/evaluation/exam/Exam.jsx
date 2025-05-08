import "./exam.modules.css";
import Question from "../../../components/exam/Question.jsx";
import {useEffect, useState} from "react";
import {useLocation} from "react-router";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {Save} from "@mui/icons-material";
import {Button} from "@mui/material";


export default function Exam() {
    const location = useLocation();
    const userId = useSelector((state) => state.auth.userId);
    const [exam, setExam] = useState(null);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchExam = () => {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: location.state.id
                })
            };

            fetch('http://127.0.0.1:8000/fetch-exam', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setExam(data);
                    console.log(data);
                });
        }

        fetchExam();
    }, []);

    const [answers, setAnswers] = useState(new Array(30).fill(false));

    const handleAnswerSelect = (questionIndex, selectedAnswer) => {
        if (exam.questions[questionIndex].answers[selectedAnswer - 1] == exam.questions[questionIndex].correct_answer) {
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
        let score = answers.slice(0, exam.questions.length).filter(answer => answer === true).length

        // TODO Add validation
        setShowModal(true);

        // Send score of exam with answers
        console.log("Attempting to save score: " + score + "/" + exam.questions.length)
        fetch('http://127.0.0.1:8000/save-score', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                exam_id: location.state.id,
                score: score,
                total_questions: exam.questions.length,
                user_id: userId
            })
        }).then(response => response.json()).then(data => {
            console.log(data);
        });

        // Redirect
        navigate('/')
    }

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    return <div className={"main_container margin-left-30 margin-bottom-100"}>
        {
            exam ? exam.questions.map((question, index) => (
                <Question
                    key={index}
                    data={question}
                    number={index}
                    onAnswerSelect={handleAnswerSelect}
                />
            )) : null
        }
        <button className="endbtn" style={{marginTop: "50px", marginBottom: "100px"}} onClick={sendResult}>
            Terminar examen
        </button>
        {showModal ?
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">¿Quieres entregar tu examen?</div>

                    <div className="modal-buttons">
                        <Button
                            variant="contained"
                            endIcon={<Save />}
                            onClick={sendResult}
                        >
                            Terminar
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={toggleModal}
                        >
                            Continuar
                        </Button>
                    </div>
                </div>
            </div>
            : null}
    </div>
}