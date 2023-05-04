import { Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { GET_COMPLAINT } from "../../Redux/Actions/Actions";
import ComplaintsList from "../Card/ComplaintsList";
import Loading from "../Loading";

const ComplaintBox = ({ history }) => {
  const IS_LOGGED = useSelector((state) => state.User.IS_LOGGED);
  if (!IS_LOGGED) {
    history.push("/");
  }
  const [loading, setLoading] = useState(false);
  const allComplaint = useSelector((state) => state.User.allComplaint);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      GET_COMPLAINT(() => {
        setTimeout(() => {
          setLoading(true);
        }, 3000);
      })
    );
  }, [dispatch]);

  if (!loading) {
    return <Loading />;
  } else
    return (
      <div style={{ padding: 20 }}>
        <Typography align="center" variant="h3" style={{ marginBlock: 20 }}>
          Complaint Box
        </Typography>
        <Paper elevation={8} style={{ padding: 20, marginBlock: 20 }} square>
          <ComplaintsList data={allComplaint} />
        </Paper>
      </div>
    );
};

export default withRouter(ComplaintBox);
