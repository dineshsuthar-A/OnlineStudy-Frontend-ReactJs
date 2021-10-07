import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Grid } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from 'react-router';
import { getallresult } from '../../service/Result';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    table: {
        minWidth: 250,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },


}));


export default function Result() {

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
    const classes = useStyles();
    const [loading, setloading] = useState(true);
    const history = useHistory();
    const [data, setdata] = useState();
    const [search, setSearch] = useState();

    const getresultinfo = () => {
        getallresult().then((response) => {
            setdata(response.data);
            setloading(false);
        }).catch(()=>{
            localStorage.removeItem("token");
            history.push("/home");
        });
    }

    useEffect(() => {
        getresultinfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleitemClick = (id) => {
        history.push({
            pathname: "/resultdetail",
            state: { id }
        })
    }
    const handlesearch = (e) => {
        var str = e.target.value;
        if (!str) {
            setSearch(e.target.value);
        }
        if (((str.charCodeAt(str.length - 1)) >= 97 && (str.charCodeAt(str.length - 1)) <= 122) || ((str.charCodeAt(str.length - 1)) >= 65 && (str.charCodeAt(str.length - 1)) <= 90)) {
            setSearch(e.target.value);
        }
        if (str === " ") {
            setSearch(e.target.value);
        }
        if ((str.charCodeAt(str.length - 1)) >= 48 && (str.charCodeAt(str.length - 1)) <= 57) {
            setSearch(e.target.value);
        }
        if (str.charCodeAt(str.length - 1) === 32) {
            setSearch(e.target.value);
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(search);
    }
    return ((!loading) ?
        <div>
            <Grid container spacing={3} style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                <Grid item xs={12} md={6} sm={12} style={{ backgroundColor: "white" }} >
                    <Paper component="form" onSubmit={handleSubmit} className={classes.root} style={{ width: "100%", marginTop: "10px" }}>
                        <InputBase
                            className={classes.input}
                            placeholder="Search.."
                            inputProps={{ 'aria-label': 'search google maps' }}
                            onChange={handlesearch}
                            value={search}
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3} style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                <Grid item xs={12} md={6} sm={12}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow >
                                    <TableCell>Paper</TableCell>
                                    <TableCell >Batch</TableCell>
                                    <TableCell >Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data &&
                                    (search ? (data.filter((q) => {

                                        if ((q.paper.name.toLowerCase()).search(search.toLowerCase()) === -1)
                                            return false;
                                        else
                                            return true;
                                    })) : data).map((item, index) =>
                                        <TableRow onClick={() => handleitemClick(item.id)} style={{ cursor: "pointer" }}>
                                            <TableCell >{item.paper.name}</TableCell>
                                            <TableCell >{item.paper.batch.name}</TableCell>
                                            <TableCell >{formatDate(item.date.split("T")[0])}</TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
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
