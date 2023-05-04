import {
  Backdrop,
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 5,
  },
}));
const Saving = ({ visible, title }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Backdrop className={classes.backdrop} open={visible}>
        <Paper
          style={{
            padding: 20,
            display: "flex",
            alignItems: "center",
          }}
        >
          <CircularProgress color="secondary" />
          <Typography align="right" style={{ marginInline: 12 }}>
            {title}...
          </Typography>
        </Paper>
      </Backdrop>
    </div>
  );
};

export default Saving;
