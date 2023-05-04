import { Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { GET_PENDING_REQUEST } from "../../Redux/Actions/Actions";
import VerificationCard from "../Card/VerificationCard";
import Loading from "../Loading";

const PendingRequest = ({ history }) => {
  const IS_LOGGED = useSelector((state) => state.User.IS_LOGGED);
  if (!IS_LOGGED) {
    history.push("/");
  }
  const allPendingRequest = useSelector(
    (state) => state.User.allPendingRequest
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(
      GET_PENDING_REQUEST(() => {
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
      <div style={{ padding: 20, display: "flex", flexDirection: "column" }}>
        <Typography align="center" variant="h3" style={{ marginBlock: 20 }}>
          Pending Request
        </Typography>
        <Paper
          elevation={8}
          style={{
            padding: 20,
            marginBlock: 20,
            width: "100%",
            alignSelf: "center",
          }}
          square
        >
          <VerificationCard data={allPendingRequest} />
        </Paper>
      </div>
    );
};

export default withRouter(PendingRequest);
