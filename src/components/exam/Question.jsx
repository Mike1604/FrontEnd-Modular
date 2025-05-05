import { useState } from "react";
import "./Question.css";

const Question = ({ data, number, onAnswerSelect }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);
        if (onAnswerSelect) {
            onAnswerSelect(number, selectedValue); // Send both question number and selected answer
        }
    };

    return (
        <>
            <h2 className="question_number">Pregunta {number + 1}</h2>
            <div className="question">
                <h2>{data.question}</h2>
                <hr/>
                <form>
                    <div>
                        <label htmlFor="1">
                            <input
                                type="radio"
                                id="1"
                                name="option"
                                value="1"
                                checked={selectedOption === "1"}
                                onChange={handleOptionChange}
                            />
                            {data.answers[0]}
                        </label>
                    </div>

                    <div>
                        <label htmlFor="2">
                            <input
                                type="radio"
                                id="2"
                                name="option"
                                value="2"
                                checked={selectedOption === "2"}
                                onChange={handleOptionChange}
                            />
                            {data.answers[1]}
                        </label>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Question;