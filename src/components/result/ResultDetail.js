import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    PieSeries,
    Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { getresult } from '../../service/Result';
import CircularProgress from '@material-ui/core/CircularProgress';
import './resultdetail.css';
import { getsubject, getTestwithanswer } from '../../service/testApi';




const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
const useStyles = makeStyles({
    table: {
        minWidth: 250,
        height: 500,
    },

});

export default function ResultDetail(props) {
    const classes = useStyles();

    const history = useHistory();
    const [result, setresult] = useState();
    const [loading, setloading] = useState(true);
    const [question, setQuestion] = useState();
    const [subject, setsubjects] = useState();
    const [filterResult, setFilterResult] = useState();
    const [overall, setOverall] = useState(true);
    const [date, setdate] = useState();

    function formatDate(d) {
        var date = new Date(d);

        if (isNaN(date.getTime())) {
            return d;
        }
        else {

            var month = [];
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "october";
            month[10] = "november";
            month[11] = "December";

            var day = date.getDate();

            if (day < 10) {
                day = "0" + day;
            }

            return day + " " + month[date.getMonth()] + " " + date.getFullYear();
        }

    }

    const handleRank = () => {
        history.push({
            pathname: "/rank",
            state: {
                paperId: result.paper.id,
                count: result.outOfRank,
                paper: result.paper.name,
                rank: result.rank
            }
        })
    }
    const handleReviewBtn = () => {
        result && question &&
            history.push({
                pathname: "/reviewAnswers",
                state: { questions: question, res: result }
            })
    }
    const data = [
        { argument: 'Skipped', value: ((result) ? (result.skipped) : 0) },
        { argument: 'Incorrect', value: ((result) ? ((result.mcQuestions.length) - (result.skipped) - (result.correctAnswers)) : 0) },
        { argument: 'Correct', value: ((result) ? (result.correctAnswers) : 0) }
    ];

    const getResult = () => {
        getresult(props.location.state.id).then((response) => {
            setresult(response.data);
            setFilterResult(response.data);
            setdate(formatDate(response.data.date.split("T")[0]));
            getpaper(response.data.testPaperId);

        });

    }
    const getpaper = (paperId) => {

        getTestwithanswer(paperId).then((response) => {
            setQuestion(response.data.mcQuestions);
            setloading(false);
            getSubjects(paperId, response.data.mcQuestions);
        })
    }

    const getSubjects = (id, mcQuestions) => {
        getsubject().then((response) => {
            let arr = [];
            for (var i = 0; i < mcQuestions.length; i++) {
                var flag = 0;

                if (arr) {
                    for (var k = 0; k < arr.length; k++) {
                        if (mcQuestions[i].subjectId === arr[k]) {
                            flag = 1;
                        }
                    }
                    if (flag === 0) {
                        arr.push(mcQuestions[i].subjectId);
                    }
                }
            }
            let allsub = response.data;
            let sub = [];
            for (k = 0; k < allsub.length; k++) {
                if (arr) {
                    for (i = 0; i < arr.length; i++) {
                        if (allsub[k].id === arr[i]) {
                            sub.push(allsub[k]);
                        }
                    }
                }
            }
            setsubjects(sub);
        })
    }

    const handleFilterClick = (id) => {
        if (id === null) {
            console.log(result, question, subject);
            setresult(filterResult);
            setOverall(true);
        } else {
            setOverall(false);
            console.log(result, question, subject);
            var correctAnswers = 0;
            var skipped = 0;
            var mcQuestions = [];
            let obj;
            let paper;
            let date;
            let rank;
            let outOfRank;
            // eslint-disable-next-line no-unused-vars
            let questionId;
            for (var i = 0; i < question.length; i++) {
                if (question[i].subject.id === id) {
                    for (var j = 0; j < filterResult.mcQuestions.length; j++) {
                        if (question[i].id === filterResult.mcQuestions[j].questionId) {
                            if (filterResult.mcQuestions[j].studentAnswer === null) {
                                skipped = skipped + 1;
                                mcQuestions.push({
                                    id: filterResult.mcQuestions[j].id,
                                    answerCorrect: skipped,
                                    studentAnswer: filterResult.mcQuestions[j].studentAnswer,
                                    answer: question[i].answer,
                                    subjectId: question[i].subjectId,
                                    questionId: filterResult.mcQuestions[j].questionId
                                })
                            } else
                                if (question[i].answer === filterResult.mcQuestions[j].studentAnswer) {
                                    correctAnswers = correctAnswers + 1;
                                    mcQuestions.push({
                                        id: filterResult.mcQuestions[j].id,
                                        answerCorrect: true,
                                        studentAnswer: filterResult.mcQuestions[j].studentAnswer,
                                        answer: question[i].answer,
                                        subjectId: question[i].subjectId,
                                        questionId: filterResult.mcQuestions[j].questionId
                                    })
                                } else {
                                    mcQuestions.push({
                                        id: filterResult.mcQuestions[j].id,
                                        answerCorrect: false,
                                        studentAnswer: filterResult.mcQuestions[j].studentAnswer,
                                        answer: question[i].answer,
                                        subjectId: question[i].subjectId,
                                        questionId: filterResult.mcQuestions[j].questionId
                                    })
                                }
                        }
                    }
                }
            }
            rank = filterResult.rank;
            outOfRank = filterResult.outOfRank;
            date = filterResult.date;
            paper = filterResult.paper;
            obj = { id: filterResult.id, testPaperId: filterResult.testPaperId, correctAnswers, mcQuestions, skipped, paper, outOfRank, rank, date };
            console.log(obj);
            setresult(obj);

        }
    }
    const handleClass = (id) => {
        for (var c = 0; c < result.mcQuestions.length; c++) {
            if (id !== result.mcQuestions[c].subjectId) {
                return false;
            }
        }
        return true;

    }

    useEffect(() => {
        getResult();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        (!loading) ?
            <div onScroll="false" >
                <div className="filterContainer" >
                    <div className={(overall) ? "filterActive" : "filter"} onClick={() => handleFilterClick(null)}>Overall</div>
                    {
                        subject &&
                        subject.map((item) =>
                            <div className={(handleClass(item.id)) ? "filterActive" : "filter"} onClick={() => handleFilterClick(item.id)}>{item.name}</div>
                        )
                    }

                </div>
                <Grid container >
                    <Grid item xs={12} md={6}>
                        <Paper style={{ borderRadius: "0" }}>
                            <Chart data={data} >
                                <PieSeries valueField="value" argumentField="argument" />
                                <Title text="Result" />
                                <Animation />
                            </Chart>
                            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
                                <div style={{ display: "flex", height: "30px" }}>
                                    <div style={{ border: "1px solid black", backgroundColor: "rgb(156, 204, 101)", width: "20px", height: "20px" }} />
                                    <p style={{ marginLeft: "5px" }}>Correct</p>
                                </div>
                                <div style={{ display: "flex", height: "30px" }}>
                                    <div style={{ border: "1px solid black", backgroundColor: "rgb(255, 112, 67)", width: "20px", height: "20px" }} />
                                    <p style={{ marginLeft: "5px" }}>Incorrect</p>
                                </div>
                                <div style={{ display: "flex", height: "30px" }}>
                                    <div style={{ border: "1px solid black", backgroundColor: "rgb(66, 165, 245)", width: "20px", height: "20px" }} />
                                    <p style={{ marginLeft: "5px" }}>Skipped</p>
                                </div>
                            </div>
                        </Paper>
                        <TableContainer component={Paper} style={{ borderRadius: "0" }} >
                            <Table aria-label="customized table" >

                                <TableBody>

                                    <StyledTableRow>
                                        <StyledTableCell component="th" scope="row"> Question </StyledTableCell>
                                        <StyledTableCell align="right">{(result) ? (result.mcQuestions.length) : null}</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow >
                                        <StyledTableCell component="th" scope="row"> Correct </StyledTableCell>
                                        <StyledTableCell align="right">{(result) ? (result.correctAnswers) : null}</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow >
                                        <StyledTableCell component="th" scope="row"> Incorrect </StyledTableCell>
                                        <StyledTableCell align="right">{(result) ? ((result.mcQuestions.length) - (result.skipped) - (result.correctAnswers)) : null}</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow >
                                        <StyledTableCell component="th" scope="row"> Skipped </StyledTableCell>
                                        <StyledTableCell align="right">{(result) ? (result.skipped) : null}</StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Grid>
                    <Grid item xs={12} md={6} style={{ borderLeft: "1px solid black" }}>

                        <TableContainer component={Paper} style={{ borderRadius: "0" }}>
                            <Table className={classes.table} aria-label="customized table">

                                <TableBody>

                                    <StyledTableRow>
                                        <StyledTableCell component="th" scope="row"> Batch </StyledTableCell>
                                        <StyledTableCell align="right">{(result) ? (result.paper.batch.name) : null}</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow >
                                        <StyledTableCell component="th" scope="row"> Paper </StyledTableCell>
                                        <StyledTableCell align="right">{(result) ? (result.paper.name) : null}</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow >
                                        <StyledTableCell component="th" scope="row"> Date </StyledTableCell>
                                        <StyledTableCell align="right">{(date) ? date : null} </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow >
                                        <StyledTableCell component="th" scope="row"> Total Question </StyledTableCell>
                                        <StyledTableCell align="right">{(result) ? (result.mcQuestions.length) : null}</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow >
                                        <StyledTableCell component="th" scope="row"> Total Marks </StyledTableCell>
                                        <StyledTableCell align="right">{(result) ? ((result.correctAnswers) * (result.paper.markPerQuestion)) : null}</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow >
                                        <StyledTableCell component="th" scope="row"> Negative Marks </StyledTableCell>
                                        <StyledTableCell align="right"> {(result) ? (result.paper.negativeMark != null) ?
                                            (result.paper.negativeMark * ((result.mcQuestions.length) - (result.skipped) - (result.correctAnswers))) : "0" : null}</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell component="th" scope="row"> Final Score </StyledTableCell>
                                        <StyledTableCell align="right">{(result) ? (result.paper.negativeMark != null) ?
                                            (((result.correctAnswers) * (result.paper.markPerQuestion)) - (result.paper.negativeMark * ((result.mcQuestions.length) - (result.skipped) - (result.correctAnswers)))) : ((result.correctAnswers) * (result.paper.markPerQuestion)) : null}/{(result) ? ((result.mcQuestions.length) * (result.paper.markPerQuestion)) : null}</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow >
                                        <StyledTableCell component="th" scope="row"> Rank </StyledTableCell>
                                        <StyledTableCell align="right">{(result) ? (result.rank) : null} / {(result) ? (result.outOfRank) : null} </StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", borderRadius: "0" }}>
                            <Button variant="contained" color="primary" style={{ width: "200px", height: "50px", marginBottom: "10px", marginTop: "10px" }} onClick={handleReviewBtn}>Review Answer</Button>
                            <Button variant="contained" color="primary" style={{ width: "200px", height: "50px" }} onClick={handleRank}> Rank</Button>
                        </div>
                    </Grid>
                </Grid>

            </div >
            :
            <div className="progress" style={{
                position: "fixed",
                top: "80px",
                bottom: "0px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "1000",
                width: "100%",
                height: "100%",
                borderRadius: "0",
                backgroundColor: "white"
            }} >
                <CircularProgress />
            </div>

    )
}
