import React from "react";
import {
  ListItem,
  List,
  Button,
  makeStyles,
  Typography,
  ListSubheader,
} from "@material-ui/core";
import { withRouter } from "react-router";
import { MdDashboard, MdLanguage } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { BsFillGrid3X3GapFill, BsFileRichtext } from "react-icons/bs";
import {
  FaUserTie,
  FaUser,
  FaUserCog,
  FaUserPlus,
  FaHourglassHalf,
  FaPercent,
} from "react-icons/fa";
import { GiPriceTag } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { USER_STATUS_OUT } from "../Redux/Actions/Actions";
const styles = makeStyles({
  SideBarBtn: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    width: "100%",
    fontSize: 14,
    justifyContent: "flex-start",
  },
});

const SideBar = (props) => {
  const classes = styles();
  const dispatch = useDispatch();
  const list = [
    {
      name: "Dashboard",
      variant: props.var.main,
      icon: <MdDashboard fontSize={18} />,
      path: "",
    },
    {
      name: "Categories",
      variant: props.var.categories,
      icon: <BsFillGrid3X3GapFill fontSize={18} />,
      path: "categories",
    },
    {
      name: "Complaint Box",
      variant: props.var.complaint_box,
      icon: <BsFileRichtext fontSize={18} />,
      path: "complaint-box",
    },
    {
      name: "Worker Details",
      variant: props.var.worker_details,
      icon: <FaUserTie fontSize={18} />,
      path: "worker-details",
    },
    {
      name: "Pending Request",
      variant: props.var.pending_request,
      icon: <FaHourglassHalf fontSize={18} />,
      path: "pending-request",
    },
    {
      name: "Users Details",
      variant: props.var.users_details,
      icon: <FaUser fontSize={18} />,
      path: "users-details",
    },
    {
      name: "Language",
      variant: props.var.language,
      icon: <MdLanguage fontSize={18} />,
      path: "language",
    },
    {
      name: "Create Promos",
      variant: props.var.create_promos,
      icon: <GiPriceTag fontSize={18} />,
      path: "create-promos",
    },
    {
      name: "Add Admin",
      variant: props.var.add_admin,
      icon: <FaUserPlus fontSize={18} />,
      path: "add-admin",
    },
    {
      name: "Add Commission",
      variant: props.var.add_commission,
      icon: <FaPercent fontSize={18} />,
      path: "add-commission",
    },
    {
      name: "Setting",
      variant: props.var.setting,
      icon: <FaUserCog fontSize={18} />,
      path: "setting",
    },
    {
      name: "Log Out",
      variant: props.var.settings,
      icon: <AiOutlineLogout fontSize={18} />,
      path: "",
    },
  ];
  return (
    <div style={{ padding: 10 }} className="sidebar">
      <>
        <List>
          <Typography
            align="center"
            variant="h5"
            style={{ marginBlock: 10, color: "#fff" }}
          >
            Admin Panel
          </Typography>
          <List
            subheader={
              <ListSubheader style={{ color: "#bdbdbd" }}>
                Options
              </ListSubheader>
            }
          ></List>
          {list.map((item, i) => (
            <ListItem key={i}>
              <Button
                color="secondary"
                variant={item.variant}
                className={classes.SideBarBtn}
                size="small"
                onClick={() => {
                  if (item.name === "Log Out") {
                    dispatch(USER_STATUS_OUT());
                    props.history.push("/");
                  } else props.history.push("/dashboard/" + item.path);
                }}
              >
                <span style={{ marginRight: 7 }}>{item.icon}</span>
                <span>{item.name}</span>
              </Button>
            </ListItem>
          ))}
        </List>
      </>
    </div>
  );
};

export default withRouter(SideBar);
