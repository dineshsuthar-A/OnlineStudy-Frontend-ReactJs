/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Batchitem from '../batch-item/Batchitem';
import './displaybatches.css';
import { Grid } from '@material-ui/core';
import Filter from './Filter';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { getBatch } from '../../service/batch.js'
import Axios from 'axios';
import { getSubscribtions } from '../../service/subscribeApi';
import CircularProgress from '@material-ui/core/CircularProgress';
import { basePaymentUrl } from '../../config';
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);



export default function Displaybatches() {
    function formatDate(d) {
        var date = new Date(d);

        if (isNaN(date.getTime())) {
            return d;
        }
        else {

            var month = [];
            month[0] = "Jan";
            month[1] = "Feb";
            month[2] = "Mar";
            month[3] = "Apr";
            month[4] = "May";
            month[5] = "Jun";
            month[6] = "Jul";
            month[7] = "Aug";
            month[8] = "Sept";
            month[9] = "Oct";
            month[10] = "Nov";
            month[11] = "Dec";

            var day = date.getDate();

            if (day < 10) {
                day = "0" + day;
            }

            return day + " " + month[date.getMonth()] + " " + date.getFullYear();
        }

    }
    const history = useHistory();
    const [data, setData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = useState('');
    const [loading, setloading] = useState(true);
    const [description, setDescription] = useState('');
    const [startingTime, setStarting] = useState('');
    const [closingTime, setClosing] = useState('');
    const [fees, setFees] = useState('');
    const [ids, setIds] = useState('');




    const handleClickOpen = (id) => {
        token = localStorage.getItem("token");
        var subs;
        var flag = 0;
        getSubscribtions().then((response) => {
            subs = response.data;
            for (var i = 0; i < subs.length; i++) {
                if (subs[i].batchId === id) {
                    flag = 1;
                    history.push({
                        pathname: "/demo",
                        state: { id }
                    });
                    break;
                }
            }
            setOpen(true);
        })

        if (flag === 0) {

            Axios.get("/api/BatchApi/get", {
                params: {
                    id
                }
                ,
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((response) => {
                setIds(id);
                setTitle(response.data.name);
                setStarting(formatDate(response.data.startDate.split("T")[0]));
                setClosing(formatDate(response.data.closeDate.split("T")[0]));
                setDescription(response.data.description);
                setFees(response.data.fees);
            });

        }
    };
    const handleClose = () => {
        setOpen(false);
    }
    const handlesubClose = () => {
        window.open(basePaymentUrl + "?batchid=" + ids + "&mobilenumber=" + localStorage.getItem("mobile"), "nw", "height:500,width=600");
        setOpen(false);
    };

    const handleDemoClose = () => {
        history.push({
            pathname: "/demo",
            state: { id: ids }
        })
        setOpen(false);
    }

    var token;
    const check = () => {
        token = localStorage.getItem("token");

        if (token == null) {
            history.push("/login");
        }
        else {
            getdata();
        }
    }

    const getdata = () => {
        getBatch().then((response) => {
            setData(response.data);
            setloading(false);
        });
    };


    const [id, setID] = useState();
    useEffect(() => {
        check();
    }, []);

    return ((!loading) ?
        <>
            <Filter onFilterChange={(Id) => {
                setID(Id);
            }} />
            <div className="displayAll">

                <Grid container spacing={3} justifyContent="flex-start" >
                    {
                        (id ? (data.filter((paper) => paper.batchCategory.id.toString() === id)) : data).map((paper, i) =>
                            < Grid key={i} item xs={12} sm={6} md={4} lg={3} xl={2}  >
                                <Batchitem onClick={handleClickOpen} id={paper.id} title={paper.name} price={paper.fees} img={paper.thumbnail} mrp={paper.mrp} />
                            </Grid>
                        )
                    }
                </Grid>

                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{ width: "550px" }}>
                        {title}
                    </DialogTitle>
                    <DialogContent dividers>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={12}>
                                {description}  </Grid>
                            <Grid item xs={6} md={6} >
                                Start Date
                            </Grid>
                            <Grid item xs={6} md={6} >
                                {startingTime}
                            </Grid>
                            <Grid item xs={6} md={6} >
                                Closing Date
                            </Grid>
                            <Grid item xs={6} md={6} >
                                {closingTime}
                            </Grid>
                            <Grid item xs={6} md={6} >
                                Fees
                            </Grid>
                            <Grid item xs={6} md={6} >
                                {fees}/-
                            </Grid>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleDemoClose} color="primary">
                            Demo
                        </Button>
                        <Button autoFocus onClick={handlesubClose} color="primary">
                            Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        </>
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
