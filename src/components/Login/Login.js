/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link href="/" color="inherit">
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const [checkmobile, setcheckmobile] = useState(false);
    const [checkpassword, setcheckpassword] = useState(false);
    const classes = useStyles();
    const [mobilenumber, setMobilenumber] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [mobilehelper, setmobilehelper] = useState('');
    const [passwordhelper, setpasswordhelper] = useState('');
    var token;

    const check = () => {
        token = localStorage.getItem("token");
        if (token != null) {
            history.push("/")
        }
    }

    const login = () => {
        Axios.post("/api/AccountApi/login", {

            mobileNumber: mobilenumber,
            password
        }).then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("log", "true");
            setTimeout(() => { history.push("/") }, 2000);
        }).catch(error => {
            setcheckmobile(true);
            setcheckpassword(true);
            setpasswordhelper("Invalid Credentials. Try again!");
        })

    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!mobilenumber.localeCompare("")) {
            setmobilehelper("Please enter mobile number.");
            setcheckmobile(true);
            if (!password.localeCompare('')) {
                setpasswordhelper("Please enter password.");
                setcheckpassword(true);
                return;
            }
            setcheckpassword(false);
            setpasswordhelper('');
            return;

        }
        if (!password.localeCompare('')) {
            setpasswordhelper("Please enter password.");
            setcheckpassword(true);
            setcheckmobile(false);
            setmobilehelper('');
            return;
        }
        setcheckmobile(false);
        setmobilehelper('');
        setcheckpassword(false);
        setpasswordhelper('');
        login();

    }
    const handlePassword = (e) => {
        setPassword(e.target.value);


    }
    const handleMobile = (e) => {
        if (!isNaN(e.target.value))
            if (e.target.value.length <= 10)
                setMobilenumber(e.target.value);

    }

    useEffect(() => {
        check();
    }, [])


    return (
        <div style={{ backgroundColor: "white", width: "100%", height: "100%", position: "fixed", top: "0" }}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit} noValidate >
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            error={checkmobile}
                            helperText={mobilehelper}
                            id="mobilenumber"
                            onChange={handleMobile}
                            value={mobilenumber}
                            type="mobilenumber"
                            label="Mobile Number"
                            name="mobilenumber"
                            autoFocus
                        />

                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            error={checkpassword}
                            helperText={passwordhelper}
                            value={password}
                            onChange={handlePassword}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password" />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/forgotPassword" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container >
        </div>
    );
}