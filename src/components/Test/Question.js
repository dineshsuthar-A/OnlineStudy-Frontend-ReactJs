/* eslint-disable react-hooks/exhaustive-deps */
import { RadioGroup } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { getsubject, getTest } from '../../service/testApi';
import './question.css';
import { baseImageUrl } from '../../config';
import Axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router';
import parse from 'html-react-parser';
import { Prompt } from 'react-router';


export default function Question(props) {


    window.addEventListener("beforeunload", function (e) {
        // eslint-disable-next-line no-useless-escape
        var confirmationMessage = "\o/";
        e.returnValue = confirmationMessage;
        return confirmationMessage;
    });

    const btnRef = useRef();
    const [timerfinish, setTimerfinish] = useState();
    const [ans, setAns] = useState([]);
    const [allquestion, setAllquestion] = useState();
    const [loading, setloading] = useState(true);
    const [i, seti] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState();
    const [data, setData] = useState([]);
    const [a, setA] = useState(false);
    const [b, setB] = useState(false);
    const [c, setC] = useState(false);
    const [d, setD] = useState(false);
    const [subid, setsubId] = useState();
    const [sidebar, setsidebar] = useState(false);
    const [subject, setsubjects] = useState();
    const history = useHistory();
    const [actall, setactall] = useState(true);
    const [hours, sethours] = useState();
    const [minute, setminute] = useState();
    const [seconds, setSeconds] = useState();

    const allsubject = () => {
        getsubject().then((response) => {
            setsubjects(response.data);
        });
    }

    const startTimer = (mins) => {
        var h = mins / 60;
        var hour = Math.floor(mins / 60);
        var m = (h - hour) * 60;
        var min = Math.round(m);
        var sec = Math.round((m - min) * 60);
        var interval = setInterval(() => {
            sec = sec - 1;
            if (sec <= 0) {
                if (min <= 0) {
                    if (hour <= 0) {
                        clearInterval(interval);
                        setTimerfinish(1);
                        btnRef.current.click();

                    } else {
                        hour = hour - 1;
                        min = 59;
                        sec = 59;
                    }
                } else {
                    min = min - 1;
                    sec = 59;
                }
            }
            sethours(hour);
            setminute(min);
            setSeconds(sec);
        }, 1000)
    }


    const handleclick = () => {
        setsidebar(!sidebar)
    }

    const handlenext = () => {

        if (i < currentQuestion.length - 1) {
            seti(i + 1);
            var flag = 0;
            for (var j = 0; j < ans.length; j++) {
                if (currentQuestion[i + 1].id === ans[j].questionId) {
                    if (ans[j].studentAnswer === 0) {
                        setA(true);
                        setB(false);
                        setC(false);
                        setD(false);
                        flag = 1;
                    } else if (ans[j].studentAnswer === 1) {
                        setA(false);
                        setB(true);
                        setC(false);
                        setD(false);
                        flag = 1;
                    } else if (ans[j].studentAnswer === 2) {
                        setA(false);
                        setB(false);
                        setC(true);
                        setD(false);
                        flag = 1;
                    } else if (ans[j].studentAnswer === 3) {
                        setA(false);
                        setB(false);
                        setC(false);
                        setD(true);
                        flag = 1;
                    } else {
                        setA(false);
                        setB(false);
                        setC(false);
                        setD(false);
                        flag = 1;
                    }
                }

            }
            if (flag === 0) {
                setA(false);
                setB(false);
                setC(false);
                setD(false);
            }
        }
    }

    const handleprev = () => {

        if (i > 0) {
            seti(i - 1);
            var flag = 0;
            for (var j = 0; j < ans.length; j++) {
                if (currentQuestion[i - 1].id === ans[j].questionId) {
                    if (ans[j].studentAnswer === 0) {
                        setA(true);
                        setB(false);
                        setC(false);
                        setD(false);
                        flag = 1;
                    } else if (ans[j].studentAnswer === 1) {
                        setA(false);
                        setB(true);
                        setC(false);
                        setD(false);
                        flag = 1;
                    } else if (ans[j].studentAnswer === 2) {
                        setA(false);
                        setB(false);
                        setC(true);
                        setD(false);
                        flag = 1;
                    } else if (ans[j].studentAnswer === 3) {
                        setA(false);
                        setB(false);
                        setC(false);
                        setD(true);
                        flag = 1;
                    } else {
                        setA(false);
                        setB(false);
                        setC(false);
                        setD(false);
                        flag = 1;
                    }
                }
            }
            if (flag === 0) {
                setA(false);
                setB(false);
                setC(false);
                setD(false);
            }
        }

    }

    const handleA = () => {
        setA(!a);
        if (a === false) {
            var flag = 0;
            for (var k = 0; k < ans.length; k++) {
                if (currentQuestion[i].id === ans[k].questionId) {
                    ans[k].studentAnswer = 0;
                    flag = 1;
                }
            }
            if (flag === 0) {
                setAns([...ans, { "questionId": currentQuestion[i].id, "studentAnswer": 0 }]);
            }
        } else {
            let temp = [];
            for (k = 0; k < ans.length; k++) {
                if (currentQuestion[i].id !== ans[k].questionId) {
                    temp.push(ans[k]);
                }
            }
            setAns(temp);
        }
        setB(false);
        setD(false);
        setC(false);
    }

    const handleB = () => {
        setB(!b);
        if (b === false) {
            var flag = 0;
            for (var k = 0; k < ans.length; k++) {
                if (currentQuestion[i].id === ans[k].questionId) {
                    ans[k].studentAnswer = 1;
                    flag = 1;
                }
            }
            if (flag === 0) {
                setAns([...ans, { "questionId": currentQuestion[i].id, "studentAnswer": 1 }]);
            }
        } else {
            let temp = [];
            for (k = 0; k < ans.length; k++) {
                if (currentQuestion[i].id !== ans[k].questionId) {
                    temp.push(ans[k]);
                }
            }
            setAns(temp);
        }
        setD(false);
        setA(false);
        setC(false);
    }

    const handleC = () => {
        setC(!c);
        if (c === false) {
            var flag = 0;
            for (var k = 0; k < ans.length; k++) {
                if (currentQuestion[i].id === ans[k].questionId) {
                    ans[k].studentAnswer = 2;
                    flag = 1;
                }
            }
            if (flag === 0) {
                setAns([...ans, { "questionId": currentQuestion[i].id, "studentAnswer": 2 }]);
            }
        } else {
            let temp = [];
            for (k = 0; k < ans.length; k++) {
                if (currentQuestion[i].id !== ans[k].questionId) {
                    temp.push(ans[k]);
                }
            }
            setAns(temp);
        }
        setB(false);
        setA(false);
        setD(false);
    }

    const handleD = () => {
        setD(!d);
        var flag = 0;
        if (d === false) {
            for (var k = 0; k < ans.length; k++) {
                if (currentQuestion[i].id === ans[k].questionId) {
                    ans[k].studentAnswer = 3;
                    flag = 1;
                }
            }
            if (flag === 0) {
                setAns([...ans, { "questionId": currentQuestion[i].id, "studentAnswer": 3 }]);
            }
        } else {
            let temp = [];
            for (k = 0; k < ans.length; k++) {
                if (currentQuestion[i].id !== ans[k].questionId) {
                    temp.push(ans[k]);

                }
            }
            setAns(temp);
        }
        setB(false);
        setA(false);
        setC(false);
    }

    const handlenav = (index) => {
        seti(index);
        var flag = 0;
        for (var j = 0; j < ans.length; j++) {
            if (currentQuestion[index].id === ans[j].questionId) {
                if (ans[j].studentAnswer === 0) {
                    setA(true);
                    setB(false);
                    setC(false);
                    setD(false);
                    flag = 1;
                } else if (ans[j].studentAnswer === 1) {
                    setA(false);
                    setB(true);
                    setC(false);
                    setD(false);
                    flag = 1;
                } else if (ans[j].studentAnswer === 2) {
                    setA(false);
                    setB(false);
                    setC(true);
                    setD(false);
                    flag = 1;
                } else if (ans[j].studentAnswer === 3) {
                    setA(false);
                    setB(false);
                    setC(false);
                    setD(true);
                    flag = 1;
                } else {
                    setA(false);
                    setB(false);
                    setC(false);
                    setD(false);
                    flag = 1;
                }
            }

        }
        if (flag === 0) {
            setA(false);
            setB(false);
            setC(false);
            setD(false);
        }
    }
    const getQuestions = () => {
        getTest(props.location.state.paperId).then((response) => {

            setCurrentQuestion(response.data.mcQuestions);
            setAllquestion(response.data.mcQuestions);
            var sub = []
            for (var h = 0; h < response.data.mcQuestions.length; h++) {
                var flag = 0;

                if (sub) {
                    for (var u = 0; u < sub.length; u++)
                        if (sub[u] === response.data.mcQuestions[h].subjectId) {
                            flag = 1;
                        }
                    if (flag === 0) {
                        sub.push(response.data.mcQuestions[h].subjectId);
                    }
                }
            }
            setsubId(sub);
            setData(response.data);
            setloading(false);
            startTimer(response.data.duration);
        });
    }

    const find = (id) => {
        let q = ans.findIndex(a => a.questionId === id);
        return q > -1 ? true : false;
    }


    const finishquiz = () => {
        var prop;
        if (!timerfinish) {
            prop = window.confirm("Are you sure you want to finish the exam?");
        } else {
            prop = true;
        }
        if (prop) {
            var token = localStorage.getItem("token");
            let arr = [];
            for (var p = 0; p < allquestion?.length; p++) {
                var flag = 0;
                for (var l = 0; l < ans.length; l++) {
                    if (allquestion[p].id === ans[l].questionId) {
                        flag = 1;
                        arr.push(ans[l]);
                    }
                }
                if (flag === 0) {
                    arr.push({ "questionId": allquestion[p].id, "studentAnswer": null });
                }
            }
            Axios.post("/api/TestPaperApi/submittest", {
                paperId: data.id,
                mcQuestions: arr
            }, {

                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((response) => {
                let id = response.data.id;
                history.push({
                    pathname: "/resultdetail",
                    state: { id }
                })
            });
        }
    }
    const handlemap = (item) => {
        for (var d = 0; d < subid.length; d++) {
            if (item.id === subid[d])
                return true;
        }
        return false;
    }
    const handlefilter = (id) => {
        if (id === null) {
            setactall(true);
        }
        seti(0);
        var filtered = allquestion.filter((q) => {

            return (q.subjectId === id);
        });

        if (filtered?.length) {
            setactall(false);
            setCurrentQuestion(filtered)
        }
        else {
            filtered = allquestion;
            setCurrentQuestion(allquestion);
        }


        var flag = 0;
        if (ans && filtered?.length)
            for (var j = 0; j < ans.length; j++) {
                if (filtered[0].id === ans[j].questionId) {
                    if (ans[j].studentAnswer === 0) {
                        setA(true);
                        setB(false);
                        setC(false);
                        setD(false);
                        flag = 1;
                        break;
                    } else if (ans[j].studentAnswer === 1) {
                        setA(false);
                        setB(true);
                        setC(false);
                        setD(false);
                        flag = 1;
                        break;
                    } else if (ans[j].studentAnswer === 2) {
                        setA(false);
                        setB(false);
                        setC(true);
                        setD(false);
                        flag = 1;
                        break;
                    } else if (ans[j].studentAnswer === 3) {
                        setA(false);
                        setB(false);
                        setC(false);
                        setD(true);
                        flag = 1;
                        break;
                    } else {
                        setA(false);
                        setB(false);
                        setC(false);
                        setD(false);
                        flag = 1;
                        break;
                    }

                }
            }
        if (flag === 0) {
            setA(false);
            setB(false);
            setC(false);
            setD(false);
        }

    }

    const handleactive = (id) => {
        for (var h = 0; h < currentQuestion.length; h++) {
            if (currentQuestion[h].subjectId !== id) {
                return true;
            }
        }
        return false;
    }
    const Check = () => {
        if (localStorage.getItem("test") === "true") {
            history.push({
                pathname: "/"
            })
        }
    }

    useEffect(() => {
        Check();
        getQuestions();
        allsubject();
    }, [])

    return (<>
        <div className="progress" style={{
            position: "fixed",
            top: "0px",
            bottom: "0px",
            display: (loading) ? "flex" : "none",
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
        {(currentQuestion?.length) ?


            <div style={{ backgroundColor: "rgb(249,249,249)" }}>


                <div style={{ backgroundColor: "white", color: "black", padding: "10px", width: '100%', height: '75px', paddingLeft: "20px", borderBottom: "1px solid #d3d3d3", marginBottom: "10px" }}>
                    <h3 className="headTest" > {data.name}</h3>
                    <button type="button" className="buttonSidebar" onClick={handleclick} ><ArrowBackIosIcon /></button>
                    <p style={{ position: "absolute", right: '0', top: '0', marginTop: "30px", border: "0", borderStartStartRadius: "100px", padding: "10px", fontSize: "18px" }}>Time Left  <span style={{ color: "black", fontWeight: "bold" }}> {(hours < 10) ? "0" + hours : hours}:{(minute < 10) ? "0" + minute : minute}:{(seconds < 10) ? "0" + seconds : seconds} </span> </p>
                </div>

                <Grid container style={{ width: "100%" }}>
                    <Grid item xs={12} sm={9} md={9} >
                        <div style={{ display: "flex", border: "1px solid #d3d3d3", marginLeft: "10px", marginRight: "10px", marginBottom: "10px", padding: "10px", overflowX: "auto" }}>
                            <div className={actall ? "tagactive" : "tag"} onClick={() => handlefilter(null)}>All</div>
                            {
                                subject && subid &&
                                subject.filter((item, index) => handlemap(item)).map((item) =>
                                    <div className={(handleactive(item.id)) ? "tag" : "tagactive"} onClick={() => handlefilter(item.id)}>{item.name}</div>)

                            }
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={9} md={9}>
                        <div style={{ backgroundColor: "#f9f9f9", display: "flex", alignContent: "center", flexDirection: "column", justifyContent: "center", paddingBottom: "20px", marginLeft: "10px", marginRight: "10px", border: "1px solid #d3d3d3" }}>
                            <h6 style={{ backgroundColor: "#f2f2f2", lineHeight: "25px", color: "#337ab7", padding: "20px" }}><span>{i + 1}. </span>{(currentQuestion[i].hindiQuestion != null) ? parse(currentQuestion[i].hindiQuestion) : undefined}<span>{(currentQuestion[i].englishQuestion != null) ? parse(currentQuestion[i].englishQuestion) : undefined} </span></h6>


                            {
                                (currentQuestion[i].questionPhoto != null) ? <img style={{ backgroundColor: "f2f2f2", padding: "10px", width: "280px", alignSelf: "center" }} src={baseImageUrl + currentQuestion[i].questionPhoto} alt="Not Loaded. Check you internet connection" /> : undefined
                            }

                            <RadioGroup aria-label="gender" name="gender1" style={{ paddingLeft: "20px" }}  >
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <FormControlLabel checked={a} onClick={handleA} control={<Radio />} label={<p style={{ margin: "0px", padding: "0px" }}>{(currentQuestion[i].engAnsA != null) ? parse(currentQuestion[i].engAnsA) : null} <span>{(currentQuestion[i].hinAnsA != null) ? parse(currentQuestion[i].hinAnsA) : null}
                                        </span>

                                            {(currentQuestion[i].photoA != null) ? <img style={{ backgroundColor: "f2f2f2", padding: "10px", width: "150px", alignSelf: "center" }} src={baseImageUrl + currentQuestion[i].photoA} alt="Not Loaded. Check you internet connection" /> : undefined} </p>} ></FormControlLabel>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControlLabel checked={b} onClick={handleB} control={<Radio />} label={<p style={{ margin: "0px", padding: "0px" }}>{(currentQuestion[i].engAnsB != null) ? parse(currentQuestion[i].engAnsB) : null} <span>{(currentQuestion[i].hinAnsB != null) ? parse(currentQuestion[i].hinAnsB) : null}</span>

                                            {(currentQuestion[i].photoB != null) ? <img style={{ backgroundColor: "f2f2f2", padding: "10px", width: "150px", alignSelf: "center" }} src={baseImageUrl + currentQuestion[i].photoB} alt="Not Loaded. Check you internet connection" /> : undefined} </p>} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControlLabel checked={c} onClick={handleC} control={<Radio />} label={<p style={{ margin: "0px", padding: "0px" }}>{(currentQuestion[i].engAnsC != null) ? parse(currentQuestion[i].engAnsC) : null} <span>{(currentQuestion[i].hinAnsC != null) ? parse(currentQuestion[i].hinAnsC) : null}</span>

                                            {(currentQuestion[i].photoC != null) ? <img style={{ backgroundColor: "f2f2f2", padding: "10px", width: "150px", alignSelf: "center" }} src={baseImageUrl + currentQuestion[i].photoC} alt="Not Loaded. Check you internet connection" /> : undefined} </p>} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControlLabel checked={d} onClick={handleD} control={<Radio />} label={<p style={{ margin: "0px", padding: "0px" }}>{(currentQuestion[i].engAnsD != null) ? parse(currentQuestion[i].engAnsD) : null} <span>{(currentQuestion[i].hinAnsD != null) ? parse(currentQuestion[i].hinAnsD) : null}</span>

                                            {(currentQuestion[i].photoD != null) ? <img style={{ backgroundColor: "f2f2f2", padding: "10px", width: "150px", alignSelf: "center" }} src={baseImageUrl + currentQuestion[i].photoD} alt="Not Loaded. Check you internet connection" /> : undefined} </p>} />
                                    </Grid>
                                </Grid>
                            </RadioGroup>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={9} md={9}>
                        <div className="navControl">
                            <Button
                                variant="contained"
                                startIcon={<KeyboardArrowLeftIcon />}
                                className="navigationButton"
                                onClick={handleprev}
                            >
                                Previous
                            </Button>

                            <p style={{ margin: '10px' }}>{i + 1}<span> / </span>{currentQuestion.length}</p>
                            <Button
                                variant="contained"
                                endIcon={<KeyboardArrowRightIcon />}
                                className="navigationButton"
                                onClick={handlenext}
                            >
                                Next
                            </Button>
                        </div>
                    </Grid>
                </Grid>
                <div className={sidebar ? "leftBars" : "leftBarsactive"}>
                    <div className="closeSidebar" onClick={handleclick}>
                        <CloseIcon />
                    </div>


                    <div class="sidebarNavigation">
                        {
                            currentQuestion.map((item, index) => {

                                return (
                                    <div className={(index === i) ? (find(item.id) ? "NocardDoneactive" : "Nocardactive") : (find(item.id) ? "NocardDone" : "Nocard")} onClick={() => handlenav(index)}>
                                        <h9>{index + 1}</h9>
                                    </div>

                                );

                            })
                        }
                    </div>
                    <Button ref={btnRef} variant="contained" onClick={finishquiz} className="finishButton" >Finish Quiz</Button>
                </div>
                <Prompt
                    message={(location, action) => {
                        if (action === 'POP') {
                            return location.pathname.startsWith("/app")
                                ? true
                                : `Are you sure you want to go to ${location.pathname}? You will lost all your progress.`
                        }

                    }}
                />
            </div>

            : <div style={{ backgroundColor: "white", textAlign: "center", verticalAlign: "center" }}>
                <h1 style={{ color: "RED" }}>SORRY!! NO QUESTION AVALABLE</h1>
            </div>}

    </>)
}
