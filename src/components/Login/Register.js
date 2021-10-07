import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import { useHistory } from 'react-router';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
                GYAN EDUCATION
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Register(props) {
    const classes = useStyles();
    const [name, setname] = useState();
    const [nameerror, setnameerror] = useState(false);
    const [mobile, setmobile] = useState();
    const [mobileerror, setmobileerror] = useState(false);
    const [address, setaddress] = useState();
    const [addresserror, setaddresserror] = useState(false);
    const [pincode, setpincode] = useState();
    const [pincodeerror, setpincodeerror] = useState(false);
    const [tehsil, settehsil] = useState();
    const [tehsilerror, settehsilerror] = useState(false);
    const [district, setdistrict] = useState();
    const [districterror, setdistricterror] = useState(false);
    const [state, setstate] = useState();
    const [stateerror, setstateerror] = useState(false);
    const [filled, setfilled] = useState(false);
    const history = useHistory();


    const check = (e) => {
        e.preventDefault();
        setnameerror(false);
        setmobileerror(false);
        setaddresserror(false);
        settehsilerror(false);
        setstateerror(false);
        setdistricterror(false);
        setpincodeerror(false);
        setfilled(true);

        if (!name) {
            setnameerror(true);
            setfilled(false);
            if (!mobile) {
                setmobileerror(true);
            }
            if (!address) {
                setaddresserror(true);
            }
            if (!tehsil) {
                settehsilerror(true);
            }
            if (!state) {
                setstateerror(true);
            }
            if (!district) {
                setdistricterror(true);
            }
            if (!pincode) {
                setpincodeerror(true);
            }
        } else if (!mobile) {
            setfilled(false);
            setmobileerror(true);
            if (!address) {
                setaddresserror(true);
            }
            if (!tehsil) {
                settehsilerror(true);
            }
            if (!state) {
                setstateerror(true);
            }
            if (!district) {
                setdistricterror(true);
            }
            if (!pincode) {
                setpincodeerror(true);
            }
            if (!name) {
                setnameerror(true);
            }
        } else if (!address) {
            setfilled(false);
            setaddresserror(true);
            if (!name) {
                setnameerror(true);
            }
            if (!mobile) {
                setmobileerror(true);
            }
            if (!tehsil) {
                settehsilerror(true);
            }
            if (!state) {
                setstateerror(true);
            }
            if (!district) {
                setdistricterror(true);
            }
            if (!pincode) {
                setpincodeerror(true);
            }
        } else if (!tehsil) {
            setfilled(false);
            settehsilerror(true);
            if (!name) {
                setnameerror(true);
            }
            if (!mobile) {
                setmobileerror(true);
            }
            if (!address) {
                setaddresserror(true);
            }
            if (!state) {
                setstateerror(true);
            }
            if (!district) {
                setdistricterror(true);
            }
            if (!pincode) {
                setpincodeerror(true);
            }
        } else if (!state) {
            setfilled(false);
            setstateerror(true);
            if (!name) {
                setnameerror(true);
            }
            if (!mobile) {
                setmobileerror(true);
            }
            if (!address) {
                setaddresserror(true);
            }
            if (!tehsil) {
                settehsilerror(true);
            }
            if (!district) {
                setdistricterror(true);
            }
            if (!pincode) {
                setpincodeerror(true);
            }
        } else if (!district) {
            setfilled(false);
            setdistricterror(true);
            if (!name) {
                setnameerror(true);
            }
            if (!mobile) {
                setmobileerror(true);
            }
            if (!address) {
                setaddresserror(true);
            }
            if (!tehsil) {
                settehsilerror(true);
            }
            if (!state) {
                setstateerror(true);
            }
            if (!pincode) {
                setpincodeerror(true);
            }
        } else if (!pincode) {
            setfilled(false);
            setpincodeerror(true);
            if (!name) {
                setnameerror(true);
            }
            if (!mobile) {
                setmobileerror(true);
            }
            if (!address) {
                setaddresserror(true);
            }
            if (!tehsil) {
                settehsilerror(true);
            }
            if (!state) {
                setstateerror(true);
            }
            if (!district) {
                setdistricterror(true);
            }
        } else {
            setfilled(false);
            Axios.post("/api/AccountApi/updateinfo", {
                name: name,
                whatsAppNumber: mobile,
                state: state,
                district: district,
                tehsil: tehsil,
                town: address,
                pinCode: pincode,
                email: props.location.state.email
            }, {
                headers: {
                    Authorization: "Bearer " + props.location.state.token
                }
            }
            ).then((response) => {
                setfilled(false);
                localStorage.setItem("token", props.location.state.token);
                localStorage.setItem("log", "true");
                history.push({
                    pathname: "/"
                })
            }).catch((error) => {
                alert("Login Failed");
            })
        }

    }
    const tehsilset = (e) => {
        settehsil(e.target.value);
    }
    const districtset = (e) => {
        setdistrict(e.target.value);
    }
    const stateset = (e) => {
        setstate(e.target.value);
    }
    const pinset = (e) => {
        setpincode(e.target.value);
    }

    const addressset = (e) => {
        setaddress(e.target.value);
    }
    const nameset = (e) => {
        setname(e.target.value);
    }
    const mobileset = (e) => {
        if (!isNaN(e.target.value))
            if (e.target.value.length <= 10)
                setmobile(e.target.value);
    }


    return (
        <div style={{ backgroundColor: "white", width: "100%", height: "100%", position: "fixed", top: "0", marginTop: "-50px" }}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <form className={classes.form} onSubmit={check} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    variant="standard"
                                    required
                                    error={nameerror}
                                    fullWidth
                                    id="name"
                                    onChange={nameset}
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="standard"
                                    required
                                    fullWidth
                                    error={mobileerror}
                                    id="whatsmobile"
                                    label="Whats App Number"
                                    name="mobile"
                                    value={mobile}
                                    onChange={mobileset}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="standard"
                                    required
                                    fullWidth
                                    error={addresserror}
                                    onChange={addressset}
                                    name="address"
                                    label="Address"
                                    type="text"
                                    id="address"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="standard"
                                    required
                                    fullWidth
                                    error={tehsilerror}
                                    name="tehsil"
                                    label="Tehsil"
                                    type="text"
                                    onChange={tehsilset}
                                    id="tehsil"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="standard"
                                    required
                                    error={districterror}
                                    fullWidth
                                    name="district"
                                    label="District"
                                    onChange={districtset}
                                    type="text"
                                    id="district"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="standard"
                                    required
                                    error={stateerror}
                                    fullWidth
                                    name="state"
                                    onChange={stateset}
                                    label="State"
                                    type="text"
                                    id="state"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="standard"
                                    required
                                    fullWidth
                                    error={pincodeerror}
                                    name="pincode"
                                    onChange={pinset}
                                    label="Pin Code"
                                    type="number"
                                    id="pincode"
                                />
                            </Grid>

                        </Grid>
                        <p style={{ color: "red", textAlign: "center", display: (!filled) ? "none" : "block" }}>Fill all the columns!</p>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                            Register
                        </Button>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </div>

    );
}