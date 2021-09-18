import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { baseImageUrl } from '../../config';
import './review.css';


export default function ReviewAnswer(props) {

    const [review, setReview] = useState();

    const buildObj = () => {
        let questionData = props.location.state.questions;
        let resultdata = props.location.state.res.mcQuestions;
        let answers = [];
        let answerStatus;
        let studentAnswer;
        for (var k = 0; k < resultdata.length; k++) {
            for (var i = 0; i < questionData.length; i++) {
                if (resultdata[k].questionId === questionData[i].id) {
                    if (resultdata[k].studentAnswer === null) {
                        answerStatus = "skipped";
                        studentAnswer = null;
                        break;
                    } else if (resultdata[k].studentAnswer === questionData[i].answer) {
                        answerStatus = "true";
                        studentAnswer = resultdata[k].studentAnswer;
                        break;
                    } else {
                        answerStatus = "false";
                        studentAnswer = resultdata[k].studentAnswer;
                        break;
                    }
                }
            }
            answers.push({ answerStatus, studentAnswer, mcQuestions: questionData[i] });
        }
        setReview(answers);
    }

    const correctCheck = (sanswer, answer, option) => {
        console.log(answer, option);
        if (answer === option) {
            return true;
        } else
            return false;
    }
    const wrongCheck = (sanswer, answer, option) => {
        if (sanswer !== answer)
            if (sanswer === option)
                return true;

        return false;

    }

    useEffect(() => {
        buildObj();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div style={{ backgroundColor: "white" }}>
            <div style={{ color: "black", width: "100%", height: "70px", borderBottom: "1px solid black", padding: "10px" }}>
                <h2>{props.location.state.res.paper.name} - Review Answers</h2>
            </div>
            <Grid container spacing={3} justifyContent="center" style={{ marginTop: "20px" }} >

                {
                    review &&
                    review.map((item, index) =>
                        <Grid item xs={12} md={7} style={{ border: "1px solid #d3d3d3", backgroundColor: "#f9f9f9", padding: "0px", marginBottom: "10px" }}>

                            <h6 className={(item.answerStatus === 'false') ? "wrongQuestion" : (item.answerStatus === 'true') ? "correctQuestion" : "skippedQuestion"} >{index + 1 + ". "} {(item.mcQuestions.hindiQuestion == null) ? item.mcQuestions.englishQuestion : item.mcQuestions.hindiQuestion}</h6>
                            {
                                (item.mcQuestions.questionPhoto != null) ? <img style={{ backgroundColor: "f2f2f2", padding: "10px", width: "280px", alignSelf: "center" }} src={baseImageUrl + item.mcQuestions.questionPhoto} alt="Not Loaded. Check you internet connection" /> : undefined
                            }
                            <Grid items xs={12} >
                                <p className={(correctCheck(item.studentAnswer, item.mcQuestions.answer, 0)) ? "correctAnswer" : (wrongCheck(item.studentAnswer, item.mcQuestions.answer, 0)) ? "wrongAnswer" : "answer"}> a) {(item.mcQuestions.engAnsA == null) ? (item.mcQuestions.hinAnsA == null) ? (item.mcQuestions.photoA != null) ? <img style={{ backgroundColor: "f2f2f2", padding: "10px", width: "200px", alignSelf: "center" }} src={baseImageUrl + item.mcQuestions.photoA} alt="Not Loaded. Check you internet connection" /> : undefined : item.mcQuestions.hinAnsA : item.mcQuestions.engAnsA}</p>
                            </Grid>
                            <Grid items xs={12}>
                                <p className={(correctCheck(item.studentAnswer, item.mcQuestions.answer, 1)) ? "correctAnswer" : (wrongCheck(item.studentAnswer, item.mcQuestions.answer, 1)) ? "wrongAnswer" : "answer"}> b) {(item.mcQuestions.engAnsB == null) ? (item.mcQuestions.hinAnsB == null) ? (item.mcQuestions.photoB != null) ? <img style={{ backgroundColor: "f2f2f2", padding: "10px", width: "200px", alignSelf: "center" }} src={baseImageUrl + item.mcQuestions.photoB} alt="Not Loaded. Check you internet connection" /> : undefined : item.mcQuestions.hinAnsB : item.mcQuestions.engAnsB}</p>
                            </Grid>
                            <Grid items xs={12}>
                                <p className={(correctCheck(item.studentAnswer, item.mcQuestions.answer, 2)) ? "correctAnswer" : (wrongCheck(item.studentAnswer, item.mcQuestions.answer, 2)) ? "wrongAnswer" : "answer"}> c) {(item.mcQuestions.engAnsC == null) ? (item.mcQuestions.hinAnsC == null) ? (item.mcQuestions.photoC != null) ? <img style={{ backgroundColor: "f2f2f2", padding: "10px", width: "200px", alignSelf: "center" }} src={baseImageUrl + item.mcQuestions.photoC} alt="Not Loaded. Check you internet connection" /> : undefined : item.mcQuestions.hinAnsC : item.mcQuestions.engAnsC}</p>
                            </Grid>
                            <Grid items xs={12}>
                                <p className={(correctCheck(item.studentAnswer, item.mcQuestions.answer, 3)) ? "correctAnswer" : (wrongCheck(item.studentAnswer, item.mcQuestions.answer, 3)) ? "wrongAnswer" : "answer"}> d) {(item.mcQuestions.engAnsD == null) ? (item.mcQuestions.hinAnsD == null) ? (item.mcQuestions.photoD != null) ? <img style={{ backgroundColor: "f2f2f2", padding: "10px", width: "200px", alignSelf: "center" }} src={baseImageUrl + item.mcQuestions.photoD} alt="Not Loaded. Check you internet connection" /> : undefined : item.mcQuestions.hinAnsD : item.mcQuestions.engAnsD}</p>
                            </Grid>
                        </Grid>)
                }
            </Grid>
        </div >
    )
}
