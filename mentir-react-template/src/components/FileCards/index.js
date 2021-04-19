import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Search from "../Search";
import CommentDailog from "../Comments";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
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

const FileCards = (props) => {
  const {isSignin} = props;
  const classes = useStyles();
  const [resultSearch, setResultSearch] = useState([]);
  const [openComment, setOpenComment] = React.useState(false);
  const [comments, setComments] = useState([]);
  const [fileId, setFileId] = useState("");
  const [isSearchResult, setIsSearchResult] = useState(false);

  const handleDisplaySearchResult = (data) => {
    setIsSearchResult(true);
    setResultSearch(data);
  };

  const handleCloseComment = () => {
    setOpenComment(false);
  };

  return (
    <main>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h3"
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
            color="primary"
          >
            Search File
          </Typography>
          <div className={classes.heroButtons}>
            <Search handleDisplaySearchResult={handleDisplaySearchResult} />
          </div>
        </Container>
      </div>
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
                    <CardContent className={classes.cardContent}>
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
                        <i>{new Date(file.uploadDate).toLocaleString()}</i>
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
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </React.Fragment>
          ) : isSearchResult ? ((
            <Typography color="secondary" variant="h4" style={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
              No results found 
            </Typography>
          )) : null}
        </Grid>
      </Container>
      <CommentDailog
        open={openComment}
        onClose={handleCloseComment}
        comments={comments}
        fileId={fileId}
        isSignin={isSignin}
      />
    </main>
  );
};

export default FileCards;
