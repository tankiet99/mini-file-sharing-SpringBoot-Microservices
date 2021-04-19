import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import LinearProgress from "@material-ui/core/LinearProgress";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid } from "@material-ui/core";
import axios from "../../utils/axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  formControl: {
    minWidth: 120,
  },
}));

export default function Search(props) {
  const classes = useStyles();
  const { handleDisplaySearchResult } = props;
  const [valueSearch, setValueSearch] = useState();
  const [category, setCategory] = useState();
  const [size, setSize] = useState();
  const [loading, setLoading] = React.useState(false);

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };

  const handleSearchFile = () => {
    let criteria = "?name=" + valueSearch;
    if (category) {
      criteria += "&category=" + category;
    }
    if (size) {
      criteria += returnSearchSizeCriteria(size);
    }
    console.log(criteria);
    if (!loading) {
      setLoading(true);
      axios
        .get("/files/search" + criteria)
        .then((res) => {
          setLoading(false);
          handleDisplaySearchResult(res.data);
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status == 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            window.location.href = "http://" + window.location.host;
          }
        });
    }
  };

  const returnSearchSizeCriteria = (size) => {
    switch (size) {
      case 5:
        return "&minSize=0&maxSize=5";
      case 10:
        return "&minSize=5&maxSize=10";
      case 20:
        return "&minSize=10&maxSize=20";
      case -1:
        return "&minSize=20&maxSize=100";
      default:
        break;
    }
  };

  return (
    <div className={classes.paper}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {loading ? <LinearProgress /> : null}
        </Grid>
        <Grid item xs={6}>
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Search any file here..."
              inputProps={{ "aria-label": "search file" }}
              value={valueSearch}
              onChange={(e) => {
                setValueSearch(e.target.value);
              }}
            />
            <IconButton
              // type="submit"
              className={classes.iconButton}
              color="primary"
              aria-label="search"
              onClick={handleSearchFile}
              disabled={!valueSearch}
            >
              <SearchIcon />
            </IconButton>
            {/* <Divider className={classes.divider} orientation="vertical" /> */}
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <FormControl
            className={classes.formControl}
            style={{ minWidth: "130px" }}
          >
            <InputLabel id="demo-simple-select-label">
              Choose category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              onChange={handleChangeCategory}
            >
              <MenuItem value={"AUDIO"}>AUDIO</MenuItem>
              <MenuItem value={"COMPRESSED"}>COMPRESSED</MenuItem>
              <MenuItem value={"VIDEO"}>VIDEO</MenuItem>
              <MenuItem value={"DATA"}>DATA</MenuItem>
              <MenuItem value={"IMAGE"}>IMAGE</MenuItem>
              <MenuItem value={"OTHER"}>OTHER</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl
            className={classes.formControl}
            style={{ minWidth: "130px" }}
          >
            <InputLabel id="demo-simple-select-label">Size Range</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={size}
              onChange={handleChangeSize}
            >
              <MenuItem value={5}>Less than 5MB</MenuItem>
              <MenuItem value={10}>5MB to 10MB</MenuItem>
              <MenuItem value={20}>10MB to 20MB</MenuItem>
              <MenuItem value={-1}>Greater than 20MB</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}
