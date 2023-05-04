import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar, Backdrop, Button, IconButton, Paper } from "@material-ui/core";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { VERIFY_PENDING_REQUEST } from "../../Redux/Actions/Actions";
import Saving from "../Saving";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const VerificationCard = ({ data }) => {
  const [pic, setPic] = useState(null);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [model, setModel] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleClose = () => {
    setVisible(false);
  };
  return (
    <div className={classes.root}>
      <Saving visible={model} title={title} />
      {data.map((item, i) => (
        <Accordion
          expanded={expanded === "panel" + i}
          onChange={handleChange("panel" + i)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>
              {item.user?.name}
            </Typography>
            <Typography className={classes.heading}>
              {item.user?.email}
            </Typography>
            <Typography className={classes.heading}>{item.category}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ flexGrow: 0.6 }}>
              <Typography
                style={{
                  marginBlock: 12,
                }}
              >
                Worker Picture:
              </Typography>
              <Avatar
                src={item.pic}
                alt={item.user.name}
                style={{
                  height: 80,
                  width: 80,
                  backgroundColor: "#bbdefb",
                  padding: 7,
                }}
                onClick={() => {
                  setPic(item.pic);
                  setVisible(true);
                }}
                variant="rounded"
              />
              <Typography
                style={{
                  marginBlock: 12,
                }}
              >
                Parent Cinc: {item.parent_cinc}
              </Typography>
              <Typography
                style={{
                  marginBlock: 12,
                }}
              >
                Cinc: {item.cnic.number}
              </Typography>
              <Typography
                style={{
                  marginBlock: 12,
                }}
              >
                Cinc Picture:
              </Typography>
              <div
                style={{
                  marginBlock: 12,
                  display: "flex",
                }}
              >
                <Avatar
                  src={item.cnic.front_pic}
                  alt={item.user.name}
                  style={{
                    height: 80,
                    width: 80,
                    padding: 7,
                    margin: 12,
                  }}
                  onClick={() => {
                    setPic(item.cnic.front_pic);
                    setVisible(true);
                  }}
                  variant="rounded"
                />
                <Avatar
                  src={item.cnic.back_pic}
                  alt={item.user.name}
                  style={{
                    height: 80,
                    width: 80,
                    padding: 7,
                    margin: 12,
                  }}
                  onClick={() => {
                    setPic(item.cnic.back_pic);
                    setVisible(true);
                  }}
                  variant="rounded"
                />
              </div>
            </div>
            <div>
              <Typography
                style={{
                  marginBlock: 12,
                }}
                align="center"
                variant="h5"
              >
                Worker Details:
              </Typography>
              <Typography
                style={{
                  marginBlock: 12,
                }}
              >
                name: {item.user.name}
              </Typography>
              <Typography
                style={{
                  marginBlock: 12,
                }}
              >
                Email: {item.user.email}
              </Typography>
              <Typography
                style={{
                  marginBlock: 12,
                }}
              >
                Date of Birth: {new Date(item.user?.dob).toDateString()}
              </Typography>
              <Typography
                style={{
                  marginBlock: 12,
                }}
              >
                Gender: {item.user.gender}
              </Typography>
              <Typography
                style={{
                  marginBlock: 12,
                }}
              >
                Category: {item.category}
              </Typography>
              <Typography
                style={{
                  marginBlock: 12,
                }}
              >
                Restriction: {item.user.restrict}
              </Typography>
              <Button
                color="primary"
                style={{ marginInline: 12 }}
                variant="contained"
                size="large"
                onClick={() => {
                  setTitle("Updating");
                  setModel(true);
                  dispatch(
                    VERIFY_PENDING_REQUEST(
                      item._id,
                      () => {
                        setTimeout(() => {
                          setModel(false);
                        }, 3000);
                      },
                      () => {
                        setModel(false);
                      }
                    )
                  );
                }}
              >
                Verify
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
      <Backdrop
        className={classes.backdrop}
        open={visible}
        onClick={handleClose}
      >
        <Paper
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "40%",
          }}
        >
          <IconButton onClick={handleClose} style={{ alignSelf: "flex-end" }}>
            <MdClose />
          </IconButton>
          <Avatar
            src={pic}
            alt="Image"
            style={{
              height: 700,
              width: 700,
              padding: 7,
            }}
            variant="rounded"
          />
        </Paper>
      </Backdrop>
    </div>
  );
};
export default VerificationCard;
