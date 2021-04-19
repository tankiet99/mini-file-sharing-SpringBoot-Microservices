import React, { useState, useEffect } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import axios from "../../utils/axios";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";
import { green, blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
  wrapper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    position: "relative",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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

const SignIn = withRouter((props) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  function submitHandler(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      axios
        .post("/auth/signin", { username, password })
        .then((res) => {
          localStorage.setItem("token", res.data);
          localStorage.setItem("username", username);
          window.location.href =
            "http://" + window.location.host + "/dashboard";
          // window.location.reload();
          setLoading(false);
          setSuccess(true);
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status == 500) {
            alert("Invalid username/password supplied \nOr your accout is blocked");
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
          Sign in
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
            autoFocus
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
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <div className={classes.wrapper}>
            <Button
              variant="contained"
              color="primary"
              className={buttonClassname}
              disabled={loading}
              onClick={submitHandler}
              style={{ width: "100%" }}
            >
              Sign In
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
          <Grid container>
            <Grid item>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
});

export default SignIn;
