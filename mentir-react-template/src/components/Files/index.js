import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CommentDailog from "../../components/Comments";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "../../utils/axios";
import "./Files.css";

const initColumns = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "category", headerName: "Category", width: 130 },
  { field: "uploader", headerName: "Uploader", width: 150, hide: true },
  { field: "size", headerName: "Size", width: 80 },
  { field: "type", headerName: "Type", width: 130 },
  {
    field: "uploadDate",
    headerName: "Upload Date",
    sortable: true,
    width: 180,
    valueFormatter: (params) => new Date(params.value).toLocaleString(),
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    sortable: false,
    renderCell: (params) => {
      function handleDelete() {
        params.api.componentsProps.handleClickDelete(params.row.id);
      }

      function handleDownload() {
        axios.post(`/users/checklimitdownload?username=${localStorage.getItem("username")}&size=${params.row.size}` , null, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          window.open(
            "http://20.75.217.30/files/download/" + params.row.id + "?username=" + localStorage.getItem("username"),
            "_blank"
          );
        })
        .catch(err => {
          if (err.response.status == 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            window.location.href = "http://" + window.location.host;
          }
          params.api.componentsProps.handleClickAlert(err.message);
        })
        
      }

      function handleViewComment() {
        params.api.componentsProps.handleClickOpenComment(
          params.row.comments,
          params.row.id
        );
      }
      return (
        <React.Fragment>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleDownload}
            style={{ marginLeft: "10px" }}
            startIcon={<CloudDownloadIcon/>}
            // style={}
          >
            Download
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleViewComment}
            style={{ marginLeft: "10px" }}
          >
            View Comment
          </Button>

          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleDelete}
            style={{ marginLeft: "10px" }}
            startIcon={<DeleteIcon />}
            // style={}
          >
            Delete
          </Button>
        </React.Fragment>
      );
    },
  },
];

export default function Files(props) {
  const [rows, setRows] = useState([]);
  const [numRows, setNumRows] = useState(2);
  const [columns, setColumns] = useState(initColumns);
  const [page, setPage] = React.useState(0);
  const [totalRow, setTotalRow] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const { updateList } = props;
  const [openComment, setOpenComment] = React.useState(false);
  const [comments, setComments] = useState([]);
  const [fileId, setFileId] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [currentDeleteFileId, setCurrentDeleteFileId] = useState();

  const handlePageChange = (params) => {
    setPage(params.page);
  };

  useEffect(() => {
    axios
      .get("/files/count/" + localStorage.getItem("username"), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTotalRow(res.data);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          window.location.href = "http://" + window.location.host;
        }
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    let postfix = "?_start=" + page*numRows + "&_end=" + (page+1)*numRows;
    axios
      .get("/files/" + localStorage.getItem("username") + postfix, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setRows(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          window.location.href = "http://" + window.location.host;
        }
      });
  }, [updateList, page]);

  const handleClickOpenComment = (currentComments, currentFileId) => {
    setFileId(currentFileId);
    setComments(currentComments);
    setOpenComment(true);
  };

  const handleCloseComment = () => {
    setOpenComment(false);
  };

  const handleClickAlert = (msg) => {
    setMessageAlert(msg);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  }

  const handleClickDelete = (fileId) => {
    setCurrentDeleteFileId(fileId);
    setOpenDelete(true);
  }

  const handleDeleteFile = () => {
    setOpenDelete(false);
    axios
          .post("/files/delete/" + currentDeleteFileId + `?username=${localStorage.getItem("username")}`, null, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            alert("delete success!");
            window.location.reload();
          })
          .catch((err) => {
            if (err.response.status == 401) {
              localStorage.removeItem("token");
              localStorage.removeItem("username");
              window.location.href = "http://" + window.location.host;
            } else {
              alert("Can not delete: err: " + err);
            }
          });
  }

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Your uploaded files
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={numRows}
        pagination
        componentsProps={{ handleClickOpenComment, handleClickAlert, handleClickDelete }}
        rowCount={totalRow}
        paginationMode="server"
        onPageChange={handlePageChange}
        loading={loading}
      />
      <CommentDailog
        open={openComment}
        onClose={handleCloseComment}
        comments={comments}
        fileId={fileId}
        isSignin={true}
      />
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"You have reached limit download today"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {messageAlert}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Do you want delete this file?"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Disagree
          </Button>
          <Button onClick={handleDeleteFile} color="secondary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
