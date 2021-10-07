/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { changePassword } from '../../service/loginApi';


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

export default function SignIn() {
    const classes = useStyles();
    const history = useHistory();
    const [current, setCurrent] = useState('');
    const [newpassword, setnewpassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [helper, sethelper] = useState('');
    const [errorcurrent, seterrorcurrent] = useState(false);
    const [errornew, seterrornew] = useState(false);
    const [errorconfirm, seterrorconfirm] = useState(false);

    const handlecurrentChange = (e) => {
        setCurrent(e.target.value);
    }
    const handleconfirmChange = (e) => {
        setConfirm(e.target.value);
    }
    const handlenewChange = (e) => {
        setnewpassword(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        seterrornew(false);
        seterrorconfirm(false);
        seterrorcurrent(false);
        sethelper("");
        if (!newpassword.localeCompare("")) {
            seterrornew(true);
            sethelper("Fill all the columns!");
            if (!confirm.localeCompare("")) {
                seterrorconfirm(true);
            }
            if (!current.localeCompare("")) {
                seterrorcurrent(true);
            }
        } else if (!confirm.localeCompare("")) {
            sethelper("Fill all the columns!");
            seterrorconfirm(true);
            if (!newpassword.localeCompare("")) {
                seterrornew(true);
            }
            if (!current.localeCompare("")) {
                seterrorcurrent(true);
            }
        } else if (!current.localeCompare("")) {
            sethelper("Fill all the columns!");
            seterrorcurrent(true);
            if (!newpassword.localeCompare("")) {
                seterrornew(true);
            }
            if (!confirm.localeCompare("")) {
                seterrorconfirm(true);
            }
        } else if (newpassword !== confirm) {
            seterrornew(true);
            seterrorconfirm(true);
            sethelper("Password Doesn't match,Retry!");
        } else if (newpassword === current) {
            seterrornew(true);
            seterrorconfirm(true);
            seterrorcurrent(true);
            sethelper("Please set different Password!");
        }
        else if (newpassword.length < 6) {
            seterrornew(true);
            seterrorconfirm(true);
            sethelper("Password must be of atleast 6 characters!");
        } else {
            sethelper("");
            changePassword(current, newpassword).then((response) => {
                localStorage.removeItem("token");
                localStorage.removeItem("mobile");
                localStorage.removeItem("email");
                localStorage.removeItem("name");
                history.push({
                    pathname: "/login"
                })

            }).catch((error) => {
                seterrornew(true);
                seterrorconfirm(true);
                seterrorcurrent(true);
                sethelper("Invalid Current Password! Retry");
            })
        }
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
                        Change Password
                    </Typography>
                    <form onSubmit={handleSubmit} className={classes.form} noValidate >
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            error={errorcurrent}
                            name="current password"
                            label="Current Password"
                            type="password"
                            onChange={handlecurrentChange}
                            id="password"
                            autoComplete="current-password" />

                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            error={errornew}
                            name="new password"
                            onChange={handlenewChange}
                            label="New Password"
                            type="password"
                            id="password"
                            autoComplete="current-password" />
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            error={errorconfirm}
                            helperText={helper}
                            name="Confirm Password"
                            label="Confirm Password"
                            onChange={handleconfirmChange}
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
                            Submit
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/forgotPassword" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container >
        </div>
    );
}