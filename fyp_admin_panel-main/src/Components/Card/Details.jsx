import {
  Avatar,
  Backdrop,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { MdClose } from "react-icons/md";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));
const Details = ({ data, handelClose, visible }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <Backdrop className={classes.backdrop} open={visible}>
        <Paper
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            width: "40%",
          }}
        >
          <IconButton onClick={handelClose} style={{ alignSelf: "flex-end" }}>
            <MdClose />
          </IconButton>
          <Typography align="center" variant="h4" style={{ marginInline: 12 }}>
            Details
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBlock: 12,
            }}
          >
            <Avatar
              src="/images/userprofile.png"
              alt="User Profile"
              style={{
                height: 80,
                width: 80,
                backgroundColor: "#bbdefb",
                padding: 7,
              }}
              variant="rounded"
            />
            <Typography align="left" style={{ marginInline: 12 }}>
              {data?.email}
            </Typography>
          </div>
          <Typography align="left" style={{ marginInline: 12 }}>
            Name: {data?.name}
          </Typography>
          <Typography align="left" style={{ marginInline: 12 }}>
            Phone: {data?.phone}
          </Typography>
          <Typography align="left" style={{ marginInline: 12 }}>
            Date of Birth: {data?.dob}
          </Typography>
          <Typography align="left" style={{ marginInline: 12 }}>
            Gender: {data?.gender}
          </Typography>
          <Typography align="left" style={{ marginInline: 12 }}>
            Language: {data?.language}
          </Typography>
        </Paper>
      </Backdrop>
    </div>
  );
};

export default Details;
