/* eslint-disable react-hooks/exhaustive-deps */
import './welcome.css';
import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { getTest } from '../../service/testApi';
import { useHistory } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function Welcome(props) {
    const history = useHistory();
    const [data, setData] = useState([]);
    const [loading, setloading] = useState(true);


    const getdata = () => {
        getTest(props.history.location.state.id).then((response) => {
            setData(response.data);
            setloading(false);
        });
    }
    const submit = () => {
        history.push({
            pathname: "/test",
            state: { paperId: props.history.location.state.id }
        })
    }

    useEffect(() => {
        getdata();
    }, []);

    return (
        <div className="main">
            <div className="welcome">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <p className="welcomeMessage">Welcome,</p>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <p className="testHeading">{data.name}</p>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <div className="testInfo">
                            <p>Negative marks per Question : {(data.negativeMark == null) ? "0" : data.negativeMark} marks</p>
                            <p>Marks Per Question: {data.markPerQuestion} marks</p>
                            <p> Attempt Limit : {data.attemptLimit}</p>
                            <p>Time Duration : {data.duration} mins</p>
                            <Button variant="contained" className="btnAttempt" style={{ marginTop: "50px" }} onClick={submit}>Attempt Test</Button>

                        </div>
                    </Grid>
                </Grid>
            </div>
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
        </div >
    )
}
