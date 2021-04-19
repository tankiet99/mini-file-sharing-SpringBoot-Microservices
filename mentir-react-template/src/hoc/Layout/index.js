import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  Link,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  Toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },

  footer: {
    bottom: 0,
    textAlign: "center",
    marginTop: "50px",
    width: "100%",
  },
  customLink: {
    marginRight: "20px",
    textDecoration: "none",
    color: "white",
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar className={classes.Toolbar}>
          <Typography variant="h5" color="inherit" noWrap>
            <Link to={"/"} className={classes.customLink}>
              File Share
            </Link>
          </Typography>
          <Link to={"/signin"}>
            <Button variant="contained" color="primary">Log in</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <main>{props.children}</main>
      {/* Footer */}
      {/* End footer */}
    </React.Fragment>
  );
};

export default Layout;
