import { Chip, Container, Divider, Paper, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "../../utils/axios";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    //   '& > *': {
    //     margin: theme.spacing(5),
    //     width: theme.spacing(16),
    //     height: theme.spacing(16),
    //   },
  },
  title: {
    marginTop: theme.spacing(4),
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    width: "100%",
    height: "100%",
    display: "block",
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

const UserInfo = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get("/users/" + localStorage.getItem("username"), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          window.location.href = "http://" + window.location.host;
        }
      });
  }, []);

  return (
    <Container component="main" maxWidth="sm" className={classes.root}>
      <Typography variant="h4" gutterBottom className={classes.title} color="primary">
        Your Account
      </Typography>
      <Paper variant="outlined" className={classes.paper}>
        <Typography gutterBottom>
          Username: {" "} 
          <Chip
            variant="outlined"
            color="primary"
            label={user ? user.username : "undefined"}
          />
        </Typography>
        <Divider />
        <Typography gutterBottom>
          Level: {" "}
          <Chip
            variant="outlined"
            color="primary"
            label={user ? user.level : "undefined"}
          />
        </Typography>
        <Divider />
        <Typography gutterBottom>
          Full Name: {" "}
          <Chip
            variant="outlined"
            color="primary"
            label={user ? user.fullName : "undefined"}
          />
        </Typography>
        <Divider />
        <Typography gutterBottom>
          Daily Uploading Quota:{" "}
          <Chip
            variant="outlined"
            color="primary"
            label={user ? user.dailyDownloadingQuota : "undefined"}
          />
        </Typography>
        <Divider />
        <Typography gutterBottom>
          Total Uploaded File: {" "}
          <Chip
            variant="outlined"
            color="primary"
            label={user ? user.totalUploadedFileSize : "undefined"}
          />
        </Typography>
      </Paper>
    </Container>
  );
};

export default UserInfo;
