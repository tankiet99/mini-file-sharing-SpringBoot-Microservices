import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  Box,
  Typography,
  Button,
  ListItem,
  withStyles,
  DialogContent,
} from "@material-ui/core";
import UploadService from "../../utils/upload-file.service";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios from '../../utils/axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const BYTE_CONSTANT = 1000000;

const permitSizeUpload = {
  'BRONZE': 5*BYTE_CONSTANT,
  'SILVER': 10*BYTE_CONSTANT,
  'GOLD': 20*BYTE_CONSTANT,
}

function UploadDialog(props) {
  const classes = useStyles();
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [fileInfos, setFileInfos] = useState([]);
  const [category, setCategory] = useState(null);
  const { onClose, open } = props;
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

  const handleClose = () => {
    setSelectedFiles(undefined);
    setCurrentFile(undefined);
    setCategory(null);
    setMessage("");
    onClose();
  };

  function selectFile(event) {
    setSelectedFiles(event.target.files);
    console.log(event.target.files[0].size, permitSizeUpload[user.level])
    if (event.target.files[0].size > permitSizeUpload[user.level]) {
      setMessage(`Error: Your file is over ${permitSizeUpload[user.level]/BYTE_CONSTANT}MB`);
      setIsError(true);
      return;
    } else {
      setMessage('');
      setIsError(false);
    }
  }

  function upload() {
    let current = selectedFiles[0];
    setProgress(0);
    setCurrentFile(current);

    UploadService.upload(current, category, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setSelectedFiles(undefined);
        setCurrentFile(undefined);
        setMessage("upload success");
        setIsError(false);
        setCategory(null);
        onClose();
        window.location.reload();
      })
      .catch((err) => {
        setMessage(err.message);
        setIsError(true);
      });

    setSelectedFiles(undefined);
  }

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        Please choose file to upload
      </DialogTitle>
      <DialogContent>
        <div className={classes.paper}>
          <div>
            {currentFile && <LinearProgress color="secondary" />}
            <label htmlFor="btn-upload">
              <input
                id="btn-upload"
                name="btn-upload"
                style={{ display: "none" }}
                type="file"
                onChange={selectFile}
              />
              <Button
                className="btn-choose"
                variant="outlined"
                color="primary"
                component="span"
              >
                Choose Files
              </Button>
            </label>
            {selectedFiles && selectedFiles.length > 0 ? (
              <React.Fragment>
                <Typography variant="h6" style={{ color: "red" }}>
                  {selectedFiles[0].name}
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography>No file choosen</Typography>
              </React.Fragment>
            )}
            <br />
            {selectedFiles && selectedFiles.length > 0 && !isError ? (
              <React.Fragment>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    onChange={handleChange}
                  >
                    <MenuItem value={"AUDIO"}>AUDIO</MenuItem>
                    <MenuItem value={"COMPRESSED"}>COMPRESSED</MenuItem>
                    <MenuItem value={"VIDEO"}>VIDEO</MenuItem>
                    <MenuItem value={"DATA"}>DATA</MenuItem>
                    <MenuItem value={"IMAGE"}>IMAGE</MenuItem>
                    <MenuItem value={"OTHER"}>OTHER</MenuItem>
                  </Select>
                  <FormHelperText>Choose category of file</FormHelperText>
                </FormControl>
                <br />
              </React.Fragment>
            ) : null}
            <Typography
              variant="subtitle2"
              className={`upload-message ${isError ? "error" : ""}`}
            >
              {message}
            </Typography>
          </div>
        </div>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!selectedFiles || !category || isError}
            color="primary"
            onClick={upload}
          >
            Upload
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default function Upload(props) {
  const [open, setOpen] = React.useState(false);
  const { updateFilesList } = props;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        startIcon={<CloudUploadIcon />}
        style={{ width: "100%", marginTop: "10px" }}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Upload File
      </Button>
      <UploadDialog open={open} onClose={handleClose} />
    </div>
  );
}
