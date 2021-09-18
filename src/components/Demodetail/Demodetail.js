import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { basePaymentUrl } from '../../config';
import { getSubscribtions } from '../../service/subscribeApi';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        minWidth: 350,
    },
});

export default function Demodetail(props) {
    const [loading, setloading] = useState(true);
    const [testpapers, settestpapers] = useState([]);
    var token;
    token = localStorage.getItem("token");
    const [checksub, setchecksub] = useState(false);

    const getsubs = () => {
        getSubscribtions().then((response) => {
            var q = response.data.filter((item) => item.batchId === props.location.state.id);
            if (q.length) {
                setchecksub(true);
            } else {
                setchecksub(false);
            }
        })

    }

    const [data, setdata] = useState();
    const gettestdata = () => {

        Axios.get("/api/BatchApi/get", {
            params: {
                id: props.location.state.id
            },
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((response) => {
            setdata(response.data);
            setloading(false);
            settestpapers(response.data.testPapers);
        })
    }
    useEffect(() => {
        getsubs();
        gettestdata();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const classes = useStyles();
    const history = useHistory();


    const onButtonClick = (testId, Type) => {
        if (Type !== 0) {
            history.push({
                pathname: "/testlogin",
                state: { id: testId, batchId: props.location.state.id }
            })
        } else if (checksub) {
            history.push({
                pathname: "/testlogin",
                state: { id: testId, batchId: props.location.state.id }
            })
        } else {
            window.open(basePaymentUrl + "?batchid=" + props.location.state.id + "&mobilenumber=" + localStorage.getItem("mobile"), "nw", "height:500,width=600");
        }
    }


    return ((!loading) ?
        <div>
            <div style={{ padding: "10px" }}>
                <h4>{(data) ? data.name : ""}</h4>
            </div>
            <div style={{ color: "red", padding: "10px", display: (checksub) ? 'none' : "block" }}>
                You haven't Subscribed for this Batch. Subscribe it to get the full access to the papers and notes.
            </div>
            <TableContainer component={Paper} style={{ borderRadius: "0" }}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Paper</StyledTableCell>
                            <StyledTableCell >Remaining Attempts</StyledTableCell>
                            <StyledTableCell > </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {testpapers.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell >{row.attemptLimit}</StyledTableCell>
                                <StyledTableCell align="right"><Button variant="contained" color={(row.testPaperType !== 0) ? "primary" : (checksub) ? "primary" : "secondary"} style={{ width: "100px" }} onClick={() => onButtonClick(row.id, row.testPaperType)} > {(row.testPaperType !== 0) ? "Attempt" : (checksub) ? "Attempt" : "Subscribe"}</Button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
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
