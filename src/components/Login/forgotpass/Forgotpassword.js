/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';


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

export default function Forgotpassword() {
    const classes = useStyles();
    const history = useHistory();
    const [mobile, setMobile] = useState('');
    const [helper, sethelper] = useState('');
    const [error, seterror] = useState(false);

    const handleChange = (e) => {
        if (!isNaN(e.target.value))
            if (e.target.value.length <= 10)
                setMobile(e.target.value);
    }
    const handleSubmit = (e) => {
        seterror(false);
        sethelper("");
        e.preventDefault();
        if (!mobile.localeCompare("")) {
            seterror(true);
            sethelper("Enter the mobile Number");
        } else
            if (mobile.length !== 10) {
                seterror(true);
                sethelper("Invalid Mobile Number!");
            } else {
                history.push({
                    pathname: "/OtpVerification",
                    state: { mobile }
                })
            }
    }

    return (
        <div style={{ backgroundColor: "white", paddingTop: "50px", width: "100%", height: "100%", position: "fixed", top: "0" }}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Forgot Password
                    </Typography>
                    <form onSubmit={handleSubmit} className={classes.form} noValidate style={{ marginTop: "40px" }}>
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            error={error}
                            helperText={helper}
                            name="mobile number"
                            label="Enter mobile number"
                            type="mobilenumber"
                            onChange={handleChange}
                            id="password"
                            value={mobile}
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

                    </form>
                </div>
            </Container >
        </div>
    );
}