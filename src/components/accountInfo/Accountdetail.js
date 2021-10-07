import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid'
import { Avatar, TextField, Button } from '@material-ui/core';
import './accountdetail.css';
import { getAccountdetails, uploadDP } from '../../service/accountAPI';
import Axios from 'axios';
import { baseImageUrl } from '../../config';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { useHistory } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function Accountdetail() {
    const history = useHistory();
    const [loading, setloading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = useState(true);
    const [image, setimage] = useState(null);
    const [name, setname] = useState();
    const [whats, setwhats] = useState();
    const [mobile, setmobile] = useState();
    const [email, setemail] = useState();
    const [address, setaddress] = useState();
    const [tehsil, settehsil] = useState();
    const [district, setdistrict] = useState();
    const [state, setstate] = useState();
    const [pin, setpin] = useState();
    const [openerror, setOpenerror] = React.useState(false);

    const handleChangePassword = () => {
        history.push({
            pathname: "/changePassword"
        })
    }

    const handlesnackerrorClick = () => {
        setOpenerror(true);
    };
    const handlesnackerrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenerror(false);
    };
    const handlesnackClick = () => {
        setOpen(true);
    };

    const handlesnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const handleState = () => {
        setEdit(!edit);
    }
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            let formData = new FormData();

            formData.append("photo", img);
            uploadDP(formData).then((response) => {
                console.log(response);
                getacdp();
                handlesnackClick();
            }).catch((error) => {
                handlesnackerrorClick();
            })
        }
    };

    const saveChanges = () => {
        var token = localStorage.getItem("token");
        Axios.post("/api/AccountApi/updateinfo", {
            name: name,
            whatsAppNumber: whats,
            state: state,
            district: district,
            tehsil: tehsil,
            town: address,
            pinCode: pin,
            email: email
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        ).then((response) => {
            handlesnackClick();
            handleState();
        }).catch((error) => {
            handlesnackerrorClick();
        })
    }

    const getacdp = () => {
        getAccountdetails().then((response) => {

            if (response.data.personalInfo) {
                setname(response.data.personalInfo.name);
                setpin(response.data.personalInfo.pinCode);
                settehsil(response.data.personalInfo.tehsil);
                setstate(response.data.personalInfo.state);
                setemail(response.data.email);
                setwhats(response.data.personalInfo.whatsAppNumber);
                setdistrict(response.data.personalInfo.district);
                setaddress(response.data.personalInfo.town);
                setmobile(response.data.phoneNumber);
                setloading(false);
                if (response.data.personalInfo.photo != null)
                    setimage(baseImageUrl + response.data.personalInfo.photo);
            }
        })
    }

    const handlenameChange = (e) => {
        setname(e.target.value);

    }

    const handlemobileChange = (e) => {
        if (!isNaN(e.target.value))
            if (e.target.value.length <= 10)
                setmobile(e.target.value);

    }

    const handlewhatsChange = (e) => {
        if (!isNaN(e.target.value))
            if (e.target.value.length <= 10)
                setwhats(e.target.value);
    }

    const handleemailChange = (e) => {
        setemail(e.target.value);

    }

    const handleaddressChange = (e) => {
        setaddress(e.target.value);

    }

    const handletehsilChange = (e) => {
        settehsil(e.target.value);

    }

    const handledistrictChange = (e) => {
        setdistrict(e.target.value);

    }

    const handlestateChange = (e) => {
        setstate(e.target.value);

    }

    const handlepinChange = (e) => {
        setpin(e.target.value);

    }



    useEffect(() => {
        getacdp();
    }, [])

    return ((!loading)?
        <div>
            <Grid container spacing={3} style={{ paddingTop: "40px" }}>
                <Grid item xs={12} md={4} xl={4} style={{
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    padding: "100px"
                }}>
                    <Avatar src={image} style={{
                        width: "200px",
                        height: "200px",
                        border: "1px solid black"
                    }} />
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        single="true"
                        type="file"
                        onChange={onImageChange}
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" component="span" className="save" style={{ color: "white", backgroundColor: "red", marginTop: "20px" }}>
                            Upload
                        </Button>
                    </label>
                    <Button size="small" style={{ color: "#4285f4", marginTop: "30px" }} onClick={handleChangePassword} startIcon={<VpnKeyIcon />} >
                        Change Password
                    </Button>
                </Grid>
                <Grid container xs={12} md={6} style={{ paddingLeft: "40px" }} >
                    <Grid item xs={12} md={12} sm={12} xl={12} style={{ paddingTop: '10px' }}>
                        <TextField
                            required
                            className="txtfield"
                            id="outlined-required"
                            label="Name"
                            value={name ?? ""}
                            onChange={handlenameChange}
                            variant="standard"
                            InputProps={{
                                readOnly: edit,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            required
                            className="txtfield"
                            id="outlined-required"
                            label="Mobile no"
                            variant="standard"
                            onChange={handlemobileChange}
                            value={mobile ?? ""}
                            InputProps={{
                                readOnly: true,
                            }}
                        /></Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            required
                            className="txtfield"
                            id="outlined-required"
                            label="What's App Number"
                            variant="standard"
                            value={whats ?? ""}
                            onChange={handlewhatsChange}
                            InputProps={{
                                readOnly: edit,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            required
                            id="outlined-required"
                            className="txtfield"
                            label="Email"
                            variant="standard"
                            value={email ?? ""}
                            onChange={handleemailChange}
                            InputProps={{
                                readOnly: edit,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Address"
                            className="txtfield-Address"
                            variant="standard"
                            value={address ?? ""}
                            onChange={handleaddressChange}
                            InputProps={{
                                readOnly: edit,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} style={{ paddingTop: '10px' }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Tehsil"
                            className="txtfield"
                            variant="standard"
                            value={tehsil ?? ""}
                            onChange={handletehsilChange}
                            InputProps={{
                                readOnly: edit,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} style={{ paddingTop: '10px' }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="District"
                            className="txtfield"
                            variant="standard"
                            value={district ?? ""}
                            onChange={handledistrictChange}
                            InputProps={{
                                readOnly: edit,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} style={{ paddingTop: '10px' }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="State"
                            className="txtfield"
                            variant="standard"
                            value={state ?? ""}
                            onChange={handlestateChange}
                            InputProps={{
                                readOnly: edit,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sm={12} style={{ paddingTop: '10px' }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Pin Code"
                            className="txtfield"
                            variant="standard"
                            value={pin ?? ""}
                            onChange={handlepinChange}
                            InputProps={{
                                readOnly: edit,
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12} className="buttons">
                    <Button variant="contained" disabled={!edit} color="primary" onClick={handleState} className="edit" >
                        Edit
                    </Button>
                    <Button variant="contained" disabled={edit} onClick={saveChanges} color="secondary" className="save" >
                        Save
                    </Button>
                </Grid>
            </Grid>
            <div>
                <Snackbar open={open} autoHideDuration={6000} onClose={handlesnackClose}>
                    <Alert onClose={handlesnackClose} severity="success">
                        Successfully updated
                    </Alert>
                </Snackbar>
                <Snackbar open={openerror} autoHideDuration={6000} onClose={handlesnackerrorClose}>
                    <Alert onClose={handlesnackerrorClose} severity="error">
                        Not updated, Please check your details!
                    </Alert>
                </Snackbar>
            </div>
        </div >
        :
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
            backgroundColor: "white"
        }} >
            <CircularProgress />
        </div>
    )
}
