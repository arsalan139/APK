import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Backdrop,
  Button,
  IconButton,
  Paper,
  TextField,
} from "@material-ui/core";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { USER_CONTACT } from "../../Redux/Actions/Actions";
import Saving from "../Saving";
import { toast } from "react-toastify";
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
const ComplaintsList = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [model, setModel] = useState(false);
  const initial = {
    to: "",
    subject: "",
    text: "",
    msg: "",
    order_id: "",
  };
  const [form, setForm] = useState(initial);
  const schema = yup.object().shape({
    to: yup.string().email().required(),
    subject: yup.string().required(),
    msg: yup.string().required(),
    order_id: yup.string().required(),
  });
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
      <Saving visible={model} title="Sending Mail" />
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
            <Typography className={classes.heading}>Complaint</Typography>
            <Typography className={classes.heading}>{item.category}</Typography>
            <Typography className={classes.secondaryHeading}>
              {new Date(item.date).toDateString()}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Typography
                className={classes.secondaryHeading}
                style={{ marginInline: 12 }}
              >
                From:
              </Typography>
              <Typography>{item.from?.name} </Typography>
              <Typography
                style={{ marginInline: 12 }}
                className={classes.secondaryHeading}
              >
                &lt;{item.from?.email})&gt;
              </Typography>
              <Typography
                className={classes.secondaryHeading}
                style={{ marginInline: 12 }}
              >
                To:
              </Typography>
              <Typography>{item.to?.name}</Typography>
              <Typography
                style={{ marginInline: 12 }}
                className={classes.secondaryHeading}
              >
                &lt;{item.to?.email})&gt;
              </Typography>
            </div>
            <div>
              <Typography style={{ margin: 12 }} variant="h5">
                Order
              </Typography>
              <Typography style={{ margin: 12 }} variant="body2">
                Status: {item.order.status}
              </Typography>
              <Typography style={{ margin: 12 }} variant="body2">
                Category: {item.order.category}
              </Typography>
              <Typography style={{ margin: 12 }} variant="body2">
                amount: {item.order.amount}
              </Typography>
              <Typography style={{ margin: 12 }} variant="body2">
                Company Commission: {item.order.company_commission}%
              </Typography>
              <Typography style={{ margin: 12 }} variant="body2">
                Working Hour: {item.order.working_hour}
              </Typography>
              <Typography style={{ margin: 12 }} variant="body2">
                Date: {new Date(item.order.date).toDateString()}
              </Typography>
              <Typography style={{ margin: 12 }} variant="body2">
                Message:
              </Typography>
              <Typography style={{ margin: 12 }} variant="subtitle1">
                {item.message}
              </Typography>
            </div>
            <div style={{ marginBlock: 12, alignSelf: "flex-end" }}>
              <Button
                color="primary"
                style={{ marginInline: 12 }}
                variant="contained"
                size="large"
                onClick={() => {
                  setVisible(true);
                  let a = { ...form };
                  a.to = item.to.email;
                  a.order_id = item.order._id;
                  setForm(a);
                }}
              >
                Contact to {item.to?.name}
              </Button>
              <Button
                color="primary"
                style={{ marginInline: 12 }}
                variant="contained"
                size="large"
                onClick={() => {
                  setVisible(true);
                  let a = { ...form };
                  a.to = item.from.email;
                  a.order_id = item.order._id;
                  setForm(a);
                }}
              >
                Contact to {item.from?.name}
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
      <Backdrop className={classes.backdrop} open={visible}>
        <Paper
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            width: "40%",
          }}
        >
          <IconButton onClick={handleClose} style={{ alignSelf: "flex-end" }}>
            <MdClose />
          </IconButton>
          <Typography align="left">To: {form?.to}</Typography>
          <Typography align="left">Order No#: {form.order_id}</Typography>
          <TextField
            label="Subject"
            placeholder="Enter Subject"
            onChange={(e) => {
              setForm({ ...form, subject: e.target.value });
            }}
            variant="outlined"
            style={{ width: "100%", marginBlock: 12 }}
            size="medium"
            value={form.subject}
          />
          <TextField
            multiline={true}
            label="Message"
            placeholder="Enter Message"
            onChange={(e) => {
              setForm({ ...form, msg: e.target.value });
            }}
            variant="outlined"
            style={{ width: "100%", marginBlock: 12 }}
            size="medium"
            value={form.msg}
          />
          <Button
            color="primary"
            style={{ marginInline: 12, alignSelf: "flex-end" }}
            variant="contained"
            size="large"
            onClick={() => {
              setModel(true);
              schema
                .validate(form, { abortEarly: false })
                .then((v) => {
                  dispatch(
                    USER_CONTACT(
                      v,
                      () => {
                        setTimeout(() => {
                          setModel(false);
                          handleClose();
                        }, 3000);
                      },
                      () => {
                        setModel(false);
                      }
                    )
                  );
                })
                .catch((e) => {
                  toast.error(e.errors[0]);
                });
            }}
          >
            Send mail
          </Button>
        </Paper>
      </Backdrop>
    </div>
  );
};

export default ComplaintsList;
