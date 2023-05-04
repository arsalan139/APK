import {
  Backdrop,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 5,
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));
const Message = ({ visible, Message, handleButton, handleClose }) => {
  const classes = useStyles();
  return (
    <div>
      <Backdrop
        className={classes.backdrop}
        open={visible}
        onClick={handleClose}
      >
        <div
          style={{
            padding: 20,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Confirmation
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {Message}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                variant="text"
                onClick={handleButton}
              >
                Ok
              </Button>
              <Button
                size="small"
                color="primary"
                variant="text"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </CardActions>
          </Card>
        </div>
      </Backdrop>
    </div>
  );
};

export default Message;
