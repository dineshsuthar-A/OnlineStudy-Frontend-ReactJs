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

export default function Validatepassword(props) {
    const classes = useStyles();
    const history = useHistory();
    const [otp, setOtp] = useState('');
    const [helperotp, sethelperotp] = useState('');
    const [newPass, setnewPass] = useState('');
    const [helpernew, sethelpernew] = useState('');
    const [confirm, setConfirm] = useState('');
    const [helper, setHelper] = useState('');
    const [error, seterror] = useState(false);
    const [errornew, seterrornew] = useState(false);
    const [errorconfirm, seterrorconfirm] = useState(false);

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    }
    const handlenewChange = (e) => {
        setnewPass(e.target.value);
    }
    const handleconfirmChange = (e) => {
        setConfirm(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        seterror(false);
        sethelpernew("");
        seterrornew(false);
        sethelperotp('');
        setHelper("");
        seterrorconfirm(false);
        if (!otp.localeCompare("")) {
            seterror(true);
            sethelperotp("Enter the OTP.");
            if (!newPass.localeCompare("")) {
                seterrornew(true);
                sethelpernew("Enter the password");
            } if (!confirm.localeCompare("")) {
                seterrorconfirm(true);
                setHelper("Enter the Confirm Password");
            }
        } else if (!newPass.localeCompare("")) {
            seterrornew(true);
            sethelpernew("Enter the password");
            if (!confirm.localeCompare("")) {
                setHelper(true);
                seterrorconfirm("Enter the Confirm Password");
            } if (!otp.localeCompare("")) {
                seterror(true);
                sethelperotp("Enter the OTP.");
            }
        } else if (!confirm.localeCompare("")) {
            seterrorconfirm(true);
            seterrorconfirm("Enter the Confirm Password");
            if (!newPass.localeCompare("")) {
                seterrornew(true);
                sethelpernew("Enter the password");
            }
            if (!otp.localeCompare("")) {
                seterror(true);
                sethelperotp("Enter the OTP.");
            }
        } else
            if (newPass !== confirm) {
                seterrornew(true);
                seterrorconfirm(true);
                setHelper("Password doesn't match!");
            } else if (newPass.length < 6) {
                seterrornew(true);
                seterrorconfirm(true);
                setHelper("Password must be of atleast 6 characters!");
            } else {
                history.push({
                    pathname: "/login"
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
                        OTP Verification
                    </Typography>
                    <form onSubmit={handleSubmit} className={classes.form} noValidate >
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            name="mobile number"
                            label="Mobile Number"
                            type="numberformat"
                            disabled
                            value={props.location.state.mobile} />
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            error={error}
                            onChange={handleOtpChange}
                            helperText={helperotp}
                            name="otp"
                            label="Enter OTP"
                            type="text"
                            id="mobile" />

                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            error={errornew}
                            name="new password"
                            helperText={helpernew}
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
                            className={classes.submit}>
                            Submit
                        </Button>

                    </form>
                </div>
            </Container >
        </div>
    );
}