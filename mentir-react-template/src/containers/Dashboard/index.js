import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { mainListItems } from "./ListItem";
import Files from "../../components/Files";
import Upload from "../../components/Upload";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Search from "../../components/Search";
import CommentDailog from "../../components/Comments";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import UserInfo from "../../components/UserInfo";
import axios from '../../utils/axios';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const openAccount = Boolean(anchorEl);
  const [updateList, setUpdateList] = useState(0);
  const [resultSearch, setResultSearch] = useState([]);
  const [isSearchResult, setIsSearchResult] = useState(false);
  const [openComment, setOpenComment] = React.useState(false);
  const [comments, setComments] = useState([]);
  const [fileId, setFileId] = useState("");

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  function updateFilesList() {
    setUpdateList(Math.random());
  }

  const handleDisplaySearchResult = (data) => {
    setIsSearchResult(true);
    setResultSearch(data);
  };

  const handleCloseComment = () => {
    setOpenComment(false);
  };

  const downloadFile = (file) => {
    axios.post(`/users/checklimitdownload?username=${localStorage.getItem("username")}&size=${file.size}` , null, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then(() => {
      window.open(
        "http://20.75.217.30/files/download/" + file.id + "?username=" + localStorage.getItem("username"),
        "_blank"
      );
    })
    .catch(err => {
      if (err.response.status == 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "http://" + window.location.host;
      }
      alert(err.response.data);
    })
  }

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Switch>
            <Route exact path="/dashboard">
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                  {isSearchResult ? (
                    <Grid item xs={12} md={4} lg={3}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        style={{ width: "100%", marginTop: "10px" }}
                        onClick={() => {
                          setIsSearchResult(false);
                          setUpdateList(Math.random());
                        }}
                        startIcon={<ArrowBackIcon />}
                      >
                        Your Uploaded File
                      </Button>
                    </Grid>
                  ) : null}
                  <Grid item xs={12} md={8} lg={9}>
                    <Search
                      handleDisplaySearchResult={handleDisplaySearchResult}
                    />
                  </Grid>
                  {/* Recent Deposits */}
                  {isSearchResult ? null : (
                    <Grid item xs={12} md={4} lg={3}>
                      <Upload updateFilesList={updateFilesList} />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    {isSearchResult ? (
                      <Container className={classes.cardGrid} maxWidth="md">
                        {/* End hero unit */}
                        <Grid container spacing={4}>
                          {resultSearch.length > 0 ? (
                            <React.Fragment>
                              {resultSearch.map((file) => (
                                <Grid item key={file.id} xs={12} sm={6} md={4}>
                                  <Card className={classes.card}>
                                    <CardMedia
                                      className={classes.cardMedia}
                                      image="https://www.apkmirror.com/wp-content/uploads/2019/07/5d387e5b2be3d.png"
                                      title="Image title"
                                    />
                                    <CardContent
                                      className={classes.cardContent}
                                    >
                                      <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                        color="primary"
                                      >
                                        {file.name}
                                      </Typography>
                                      <Typography color="primary">
                                        Category: <i>{file.category}</i>
                                      </Typography>
                                      <Typography color="primary">
                                        Size: <i>{file.size}</i>
                                      </Typography>
                                      <Typography color="primary">
                                        Type: <i>{file.type}</i>
                                      </Typography>
                                      <Typography color="primary">
                                        Uploader: <i>{file.uploader}</i>
                                      </Typography>
                                      <Typography color="primary">
                                        Upload Date:{" "}
                                        <i>
                                          {new Date(
                                            file.uploadDate
                                          ).toLocaleString()}
                                        </i>
                                      </Typography>
                                    </CardContent>
                                    <CardActions>
                                      <Button
                                        size="small"
                                        color="primary"
                                        onClick={() => {
                                          setFileId(file.id);
                                          setComments(file.comments);
                                          setOpenComment(true);
                                        }}
                                      >
                                        View Comment
                                      </Button>
                                      <Button
                                        size="small"
                                        color="primary"
                                        onClick={() => downloadFile(file)}
                                      >
                                        Download
                                      </Button>
                                    </CardActions>
                                  </Card>
                                </Grid>
                              ))}
                            </React.Fragment>
                          ) : <Typography variant="h4" color="secondary">No match result</Typography>}
                        </Grid>
                      </Container>
                    ) : (
                      <Files updateList={updateList} />
                    )}
                  </Grid>
                </Grid>
              </Container>
            </Route>
            <Route path="/dashboard/user" component={UserInfo} />
          </Switch>
        </main>
        <CommentDailog
          open={openComment}
          onClose={handleCloseComment}
          comments={comments}
          fileId={fileId}
          isSignin={true}
        />
      </div>
    </Router>
  );
}
