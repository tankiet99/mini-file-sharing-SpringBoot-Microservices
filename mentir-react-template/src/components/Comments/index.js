import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, DialogContent } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import axios from "../../utils/axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minWidth: "50ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function CommentDailog(props) {
  const classes = useStyles();
  const { onClose, open, comments, fileId, isSignin } = props;
  const [currentComments, setCurrentComments] = useState([]);
  const [content, setContent] = useState();

  useEffect(() => {
      setCurrentComments(comments);
  }, [comments]);

  const handleClose = () => {
    setContent("");
    onClose();
  };

  const handleAddComment = () => {
    const comment = {
      username: localStorage.getItem("username"),
      content: content,
      commentDate: Date.now(),
    };
    axios
      .post("/files/" + fileId + "/comment", comment, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setContent("");
        setCurrentComments(currentComments.concat(comment));
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status == 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          window.location.href = "http://" + window.location.host;
        }
      });
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Comment Of File</DialogTitle>
      <DialogContent>
        <List className={classes.root}>
          {currentComments.length > 0 ? (
            currentComments.map((comment) => (
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={comment.username}
                    src="https://static2.yan.vn/YanNews/2167221/202003/dan-mang-du-trend-thiet-ke-avatar-du-kieu-day-mau-sac-tu-anh-mac-dinh-b0de2bad.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.content}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {comment.username ? comment.username : "No Name"}
                      </Typography>
                      {" — " + new Date(comment.commentDate).toLocaleString()}
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))
          ) : (
            <Typography>No comment</Typography>
          )}
          <Divider variant="inset" component="li" />
          {isSignin ? (
            <ListItem alignItems="flex-start">
              <TextField
                placeholder="Add new comment"
                multiline
                fullWidth
                rowsMax={4}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                value={content}
              />
            </ListItem>
          ) : null}
        </List>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {isSignin ? (
            <Button
              disabled={!content}
              onClick={handleAddComment}
              color="primary"
            >
              Add Comment
            </Button>
          ) : null}
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
