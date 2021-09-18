/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { rank } from '../../service/Result';
import './rank.css';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles({
    table: {
        minWidth: 250,
    },
});



export default function Rank(props) {
    const classes = useStyles();

    const [data, setdata] = useState();
    const [loading, setloading] = useState(true);
    const getrank = () => {
        rank(props.location.state.paperId, props.location.state.count).then((response) => {
            console.log(response);
            setdata(response.data);
            setloading(false);
        })
    }
    useEffect(() => {
        console.log(props);
        getrank();
    }, [])
    return (
        <div>
            <div style={{ color: "black", width: "100%", height: "70px", padding: "10px" }}>
                <h3>{props.location.state.paper}</h3>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            <TableCell >Name</TableCell>
                            <TableCell >Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data &&
                            data.map((item, index) =>
                                <TableRow className={((index + 1) === props.location.state.rank) ? "changeColor" : null}>
                                    <TableCell >{index + 1}</TableCell>
                                    <TableCell >{item.name}</TableCell>
                                    <TableCell >{item.score}</TableCell>
                                </TableRow>
                            )}


                    </TableBody>
                </Table>
            </TableContainer>
            <div className="progress" style={{
                position: "fixed",
                top: "80px",
                bottom: "0px",
                display: (loading) ? "flex" : "none",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "1000",
                width: "100%",
                height: "100%",
                borderRadius: "0",
                backgroundColor: "rgba(0, 0, 0, 0)"
            }} >
                <CircularProgress />
            </div>

        </div>
    )
}
