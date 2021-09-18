import React, { useState, useEffect } from 'react';
import './navbar.css';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import NotesIcon from '@material-ui/icons/Notes';
import book from '../items/book.png';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { Link, NavLink } from 'react-router-dom';
import { FloatingLabel, Form } from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Popover from '@material-ui/core/Popover';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import { IconButton } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import { Tooltip } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { getAccountdetails } from '../../service/accountAPI';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { baseImageUrl } from '../../config';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { getallQueries, getmyQuery, postyouQuery } from '../../service/queryApi';



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '30vw',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },


}));


const ITEM_HEIGHT = 48;
export default function MenuAppBar() {

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
            month[6] = "July";
            month[7] = "Aug";
            month[8] = "Sep";
            month[9] = "Oct";
            month[10] = "Nov";
            month[11] = "Dec";

            var day = date.getDate();

            if (day < 10) {
                day = "0" + day;
            }

            return day + "-" + month[date.getMonth()] + "-" + date.getFullYear();
        }

    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("mobile");
    }
    //imagesetup
    const [img, setimg] = useState();

    const [search, setSearch] = useState();

    const handlechangeSearch = (e) => {
        setSearch(e.target.value)
    }
    const handlesearchsubmit = (e) => {
        e.preventDefault();
        setSearch(search);
    }


    const getdp = () => {
        getAccountdetails().then((response) => {
            if (response.data.personalInfo)
                if (response.data.personalInfo.photo != null)
                    setimg(baseImageUrl + response.data.personalInfo.photo);

            localStorage.setItem("mobile", response.data.phoneNumber);
            localStorage.setItem("email", response.data.email);
            if (response.data.personalInfo)
                localStorage.setItem("name", response.data.personalInfo.name);
        })
    }
    const [message, setMessage] = useState();
    const changeHandle = (e) => {
        setMessage(e.target.value);
    }

    const [query, setquery] = useState();
    const getallquery = () => {
        getallQueries().then((response) => {
            setquery(response.data)
        })
    }
    const [opensnack, setopensnack] = useState(false);
    const [openerror, setopenerror] = useState(false);

    const handlesnackClose = () => {
        setopensnack(false);
    }
    const handlesnackerrorClose = () => {
        setopenerror(false);
    }
    useEffect(() => {
        getdp();
        getallquery();
    }, [img])
    //dialogue box functions
    const [opens, setOpen] = React.useState(false);

    const [querydata, setQuerydata] = useState();

    const [opendetailquery, setOpendetailQuery] = useState(false);
    const handlequerydetailClickOpen = (id) => {
        setOpen(false);
        getmyQuery(id).then((response) => {
            setOpendetailQuery(true);
            setQuerydata(response.data);
        })
    }


    const handledetailQueryClose = () => {
        setOpendetailQuery(false);
    }


    const handledialogueClickOpen = () => {
        setOpen(true);
    };
    const handledialogueClose = () => {
        setOpen(false);
    };

    //Post Query dialogue functions
    const [openquery, setOpenquery] = React.useState(false);

    const handlequerydialogueClickOpen = () => {
        handledialogueClose();
        setOpenquery(true);
    };
    const handlequerypostdialogueClose = () => {
        if (!message) {
            setopenerror(true);
        } else
            postyouQuery(message).then((response) => {
                getallquery();
                setopensnack(true);
                setOpenquery(false);
            });
    }
    const handlequerydialogueClose = () => {
        setOpenquery(false);
    };

    //popover functions Avatar
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    //sidebar functions
    const [sideBar, setSideBar] = useState(false);
    const showSideBar = () => { setSideBar(!sideBar) }
    const classes = useStyles();

    //Notification
    const [anchorNotification, setAnchorNotification] = React.useState(null);

    const handleNotificationClick = (event) => {
        setAnchorNotification(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setAnchorNotification(null);
    };

    const openNotification = Boolean(anchorNotification);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div >
            <nav className="navBar-horizontal">

                <p className="leftp"><Tooltip title="Menu"><IconButton className="sideBarButton" onClick={showSideBar}><MenuIcon style={{
                    color: "white"
                }} /></IconButton></Tooltip><span className="logo"><Link to="/dashboard" className="logo-link">ONLINE STUDY</Link></span></p>
                <div className="menuOptions">
                    <ul className="rightitems">
                        <li className="nav-text-horizontal"><NavLink to="/dashboard" exact activeClassName="active"  ><DashboardIcon /><span className="spanText">Dashboard</span></NavLink></li>
                        <li className="nav-text-horizontal"><NavLink to="/batch" activeClassName="active" ><NotesIcon /><span className="spanText">Batch</span></NavLink></li>
                        <li className="nav-text-horizontal"><NavLink to="/results" activeClassName="active"  ><NotesIcon /><span className="spanText">Results</span></NavLink></li>
                        <li className="nav-text-horizontal" ><NavLink to="/subscription" activeClassName="active"  ><CardMembershipIcon /><span className="spanText">Subscription</span></NavLink></li>
                    </ul>
                    <div className="rightIcon">
                        <Tooltip title="Query">
                            <IconButton onClick={handledialogueClickOpen}>
                                <LiveHelpIcon className="iconquery" />
                            </IconButton>
                        </Tooltip>
                        <Dialog onClose={handledialogueClose} aria-labelledby="customized-dialog-title" open={opens}>
                            <DialogTitle id="customized-dialog-title" onClose={handledialogueClose}>
                                Queries
                            </DialogTitle>
                            <DialogContent dividers>

                                <Paper component="form" onSubmit={handlesearchsubmit} className={classes.root}  >
                                    <InputBase
                                        className={classes.input}
                                        onChange={handlechangeSearch}
                                        placeholder="Search.."
                                        inputProps={{ 'aria-label': 'search google maps' }}
                                    />
                                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Query</TableCell>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Status</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {
                                                query &&
                                                ((search) ? (query.filter((item) => {
                                                    if ((item.message.toLowerCase()).search(search.toLowerCase()) === -1)
                                                        return false;
                                                    else
                                                        return true;

                                                })) : query).map((item) =>
                                                    <TableRow onClick={() => handlequerydetailClickOpen(item.id)} style={{ cursor: "pointer" }}>
                                                        <TableCell>{item.message}</TableCell>
                                                        <TableCell>{formatDate(item.requestDate.split("T")[0])}</TableCell>
                                                        <TableCell>{(item.replyDate) ? "Responded" : "Pending"}</TableCell>
                                                    </TableRow>
                                                )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handlequerydialogueClickOpen} color="primary">
                                    New Query?
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog onClose={handlequerydialogueClose} aria-labelledby="customized-dialog-title" open={openquery}>
                            <DialogTitle id="customized-dialog-title" onClose={handlequerydialogueClose}>
                                Queries
                            </DialogTitle>
                            <DialogContent dividers>

                                <FloatingLabel controlId="floatingTextarea2" label="Query">
                                    <Form.Control
                                        as="textarea"
                                        onChange={changeHandle}
                                        style={{
                                            height: "100px",
                                            width: "350px"
                                        }}
                                    />
                                </FloatingLabel>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handlequerypostdialogueClose} color="primary">
                                    Post
                                </Button>
                            </DialogActions>
                        </Dialog>



                        <Dialog onClose={handledetailQueryClose} aria-labelledby="customized-dialog-title" open={opendetailquery}>
                            <DialogTitle id="customized-dialog-title" onClose={handledetailQueryClose}>
                                Queriey Detail
                            </DialogTitle>
                            <DialogContent dividers>

                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Request Date</TableCell>
                                                <TableCell>{(querydata) ? formatDate(querydata.requestDate.split("T")[0]) : ""}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Message</TableCell>
                                                <TableCell>{(querydata) ? querydata.message : ""}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Response Date</TableCell>
                                                <TableCell>{(querydata) ? (querydata.replyDate) ? formatDate(querydata.replyDate.split("T")[0]) : "" : ""}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Response Message</TableCell>
                                                <TableCell>{(querydata) ? querydata.replyMessage : ""}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handledetailQueryClose} color="primary">
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>




                        <Tooltip title="Notification">
                            <IconButton onClick={handleNotificationClick}>
                                <NotificationsIcon className="iconnotification" style={{
                                    color: "white"
                                }} />
                            </IconButton>
                        </Tooltip>
                        <Popover
                            id={id}
                            open={openNotification}
                            anchorEl={anchorNotification}
                            onClose={handleNotificationClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}


                        >
                            <h4 style={{
                                margin: "10px",
                                marginRight: "100px",
                                fontFamily: "sans-serif"
                            }}>Notifications</h4>
                            <hr />
                            <Typography className={classes.typography} style={{ margin: "10px" }}>No notification to show.</Typography>
                        </Popover>



                        <div className="avatarbuttondiv">
                            <Tooltip title="Account">

                                <Avatar className="iconavatar" aria-label="more"
                                    aria-controls="long-menu"
                                    src={img}
                                    aria-haspopup="true"
                                    onClick={handleClick} style={{
                                        backgrounColor: "black",
                                        marginRight: "20px",
                                        marginLeft: "3px"
                                    }} />
                            </Tooltip>
                            <Menu
                                id="long-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    style: {
                                        marginTop: '50px',
                                        maxHeight: ITEM_HEIGHT * 4.5,
                                        width: '20ch',
                                    },
                                }}
                            ><MenuItem onClick={handleClose}><Link to="/accountInfo" style={{ textDecoration: "none", color: "black", width: '100%' }}>My Account</Link>                              </MenuItem>
                                <MenuItem onClick={handleClose}  >
                                    <Link to="/login" onClick={logout} style={{ textDecoration: "none", color: "black", width: '100%' }}>Logout</Link></MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
            </nav>

            <nav className={sideBar ? 'nav-menu active' : 'nav-menu'}>
                <ul className="nav-menu-items">
                    <li className="navbar-toggle" onClick={showSideBar}>
                        <div className="header">
                            <img src={book} alt="Not loaded" className="imageTag" />
                            <h4>Online Study</h4>
                        </div>
                        <ChevronLeftIcon /></li>
                    <li className="nav-text"><NavLink to="/dashboard" exact activeClassName="active" onClick={showSideBar} ><DashboardIcon /><span className="spanText">Dashboard</span></NavLink></li>
                    <li className="nav-text"><NavLink activeClassName="active" to="/batch" onClick={showSideBar}><NotesIcon /><span className="spanText">Batch</span></NavLink></li>
                    <li className="nav-text"><NavLink activeClassName="active" to="/results" onClick={showSideBar}><NotesIcon /><span className="spanText">Results</span></NavLink></li>
                    <li className="nav-text" ><NavLink activeClassName="active" to="/subscription" onClick={showSideBar}><CardMembershipIcon /><span className="spanText">Subscription</span></NavLink></li>
                </ul>
            </nav>

            <Snackbar open={opensnack} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="success">
                    Successfully Posted :)
                </Alert>
            </Snackbar>
            <Snackbar open={openerror} autoHideDuration={6000} onClose={handlesnackerrorClose}>
                <Alert onClose={handlesnackerrorClose} severity="error">
                    Please Type in Something!
                </Alert>
            </Snackbar>
        </div>
    );
}