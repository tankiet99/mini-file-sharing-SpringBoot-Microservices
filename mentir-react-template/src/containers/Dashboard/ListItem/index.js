import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FolderIcon from "@material-ui/icons/Folder";
import SearchIcon from "@material-ui/icons/Search";
import AttachmentIcon from "@material-ui/icons/Attachment";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export const mainListItems = (
  <div>
    <ListItem button>
      <Link to="/dashboard">
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
      </Link>
      <ListItemText primary="Manage File" />
    </ListItem>
    <ListItem button>
      <Link to="/dashboard/user">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
      </Link>
      <ListItemText primary="Account Info" />
    </ListItem>
    <Divider />
    <ListItem button>
      <Link
        to="/"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          window.location.href = "http://" + window.location.host;
        }}
      >
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
      </Link>
      <ListItemText primary="Logout" />
    </ListItem>
    {/* <ListItem button>
      <Link to="/dashboard/search">
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
      </Link>
      <ListItemText primary="Search File" />
    </ListItem>
    <ListItem button>
      <Link to="/dashboard/upload">
        <ListItemIcon>
          <AttachmentIcon />
        </ListItemIcon>
      </Link>
      <ListItemText primary="Upload File" />
    </ListItem> */}
  </div>
);
