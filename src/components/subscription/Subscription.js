import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import { getSubscribtions } from '../../service/subscribeApi';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function Subscription() {

    const [data, setData] = useState();
    const history = useHistory();
    const [loading, setloading] = useState(true);

    
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
    const handleClick = (id) => {
        history.push({
            pathname: "/demo",
            state: { id }
        })
    }

    const getall = () => {
        getSubscribtions().then((response) => {
            console.log(response.data);
            setData(response.data);
            setloading(false);
        })
    }

    useEffect(() => {
        getall();
    }, [])
    return ((!loading) ?
        <div>
            <Grid container spacing={3} style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                <Grid item xs={12} md={6} sm={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Batch ID</TableCell>
                                    <TableCell >Name</TableCell>
                                    <TableCell >Subscribed ON</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data &&
                                    data.map((row) => (
                                        <TableRow onClick={() => handleClick(row.batchId)} style={{ cursor: "pointer" }}>
                                            <TableCell >{row.batchId}</TableCell>
                                            <TableCell >{row.batch.name}</TableCell>
                                            <TableCell >{formatDate(row.date.split("T")[0])}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>


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
