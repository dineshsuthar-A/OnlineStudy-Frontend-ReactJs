import React, { useState } from 'react';
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
import { register } from '../Test/signUp';
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

export default function SignUp() {
    const classes = useStyles();
    const [emailhelp, setemailhelp] = useState("");
    const [emailerror, setemailerror] = useState(false);
    const [email, setemail] = useState('');
    const [mobilehelp, setmobilehelp] = useState("");
    const [mobileerror, setmobileerror] = useState(false);
    const [mobile, setmobile] = useState('');
    const [passwordhelp, setpasswordhelp] = useState("");
    const [passworderror, setpassworderror] = useState(false);
    const [password, setpassword] = useState('');
    const [err, seterr] = useState('');
    const history = useHistory();

    const check = (e) => {
        seterr("");
        e.preventDefault();
        if (email === '') {
            setemailerror(true);
            setmobilehelp("");
            setpassworderror(false);
            setmobileerror(false);
            setpasswordhelp("");
            setemailhelp("Enter the mail id.");
            if (mobile === '') {
                setmobileerror(true);
                setmobilehelp("Enter the mobile number.");
            }
            if (password === '') {
                setpassworderror(true);
                setpasswordhelp("Enter the Password.");
            }
        } else if (mobile === '') {
            setemailerror(false);
            setemailhelp("");
            setpasswordhelp("");
            setpassworderror(false)
            setmobileerror(true);
            setmobilehelp("Enter the mobile number.");
            if (password === '') {
                setpassworderror(true);
                setpasswordhelp("Enter the Password.");
            }
            if (email === '') {
                setemailerror(true);
                setemailhelp("Enter the mail id.");
            }
        } else if (password === '') {
            setemailerror(false);
            setemailhelp("");
            setmobileerror(false);
            setmobilehelp("");
            setpassworderror(true);
            setpasswordhelp("Enter the Password.");
            if (mobile === '') {
                setmobileerror(true);
                setmobilehelp("Enter the mobile number.");
            }
            if (email === '') {
                setemailerror(true);
                setemailhelp("Enter the mail id.");
            }
        } else {
            register(email, mobile, password).then((response) => {
                history.push({
                    pathname: "/registration",
                    state: {
                        email,
                        token: response.data.token
                    }
                })
            }).catch(errors => {
                seterr("Please check all your credentials. Try again!!");

            })
        }
    }

    const passwordset = (e) => {
        setpassword(e.target.value);
    }
    const mailset = (e) => {
        setemail(e.target.value);
    }
    const mobileset = (e) => {
        if (!isNaN(e.target.value))
            if (e.target.value.length <= 10)
                setmobile(e.target.value);
    }


    return (
        <div style={{ backgroundColor: "white", width: "100%", height: "100%", position: "fixed", top: "0" }}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} onSubmit={check} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="email"
                                    name="email"
                                    error={emailerror}
                                    helperText={emailhelp}
                                    variant="standard"
                                    required
                                    fullWidth
                                    id="email"
                                    onChange={mailset}
                                    label="Email"
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="standard"
                                    error={mobileerror}
                                    helperText={mobilehelp}
                                    required
                                    value={mobile}
                                    fullWidth
                                    id="mobile"
                                    label="Mobile Number"
                                    name="mobile"
                                    onChange={mobileset}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="standard"
                                    required
                                    fullWidth
                                    onChange={passwordset}
                                    error={passworderror}
                                    helperText={passwordhelp}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <p style={{ color: "red", textAlign: "center" }}>{err}</p>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </div>

    );
}