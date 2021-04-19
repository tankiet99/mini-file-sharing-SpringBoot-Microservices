import React, { useState, useEffect } from "react";

import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
// import Link from "@material-ui/core/Link";
import axios from "../../utils/axios";
import history from "../../utils/history";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { green, blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  wrapper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    position: "relative",
  },
  loginOther: {
    margin: theme.spacing(2, 0),
  },
  buttonSuccess: {
    backgroundColor: blue[500],
    "&:hover": {
      backgroundColor: blue[700],
    },
  },
  buttonProgress: {
    color: blue[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  function submitHandler(e) {
    e.preventDefault();
    const fullName = document.getElementById("fullName").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    // { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} }
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      axios
        .post("users", { fullName, password, username })
        .then((res) => {
          console.log(res);
          setLoading(false);
          setSuccess(true);
          alert("Create account success!");
          window.location.href = "http://" + window.location.host;
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status == 400) {
            alert("username is exist");
          }
        });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={(e) => submitHandler(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoComplete="fullName"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <div className={classes.wrapper}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              className={buttonClassname}
              disabled={loading}
              onClick={submitHandler}
              style={{ width: "100%" }}
            >
              Sign Up
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
          <Grid container>
            <Grid item xs>
              <Link to="/signin" style={{ textDecoration: "none" }}>
                I already have an account
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
