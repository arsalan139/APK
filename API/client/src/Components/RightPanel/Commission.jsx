import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import { GET_COMMISSION, UPDATE_COMMISSION } from "../../Redux/Actions/Actions";
import Saving from "../Saving";
import * as yup from "yup";
import Loading from "../Loading";
const Commission = ({ history }) => {
  const User = useSelector((state) => state.User.TOKEN);
  const commission = useSelector((state) => state.User.commission);
  const dispatch = useDispatch();
  const IS_LOGGED = useSelector((state) => state.User.IS_LOGGED);
  const [loading, setLoading] = useState(false);
  if (!IS_LOGGED) {
    history.push("/");
  }
  const [model, setModel] = useState(false);
  const [text, setText] = useState("");
  const schema = yup.object().shape({
    amount: yup.number().required(),
  });
  useEffect(() => {
    dispatch(
      GET_COMMISSION(() => {
        setTimeout(() => {
          setLoading(true);
        }, 3000);
      })
    );

    // eslint-disable-next-line
  }, [dispatch]);

  const handelButton = () => {
    schema
      .validate({ amount: parseInt(text) })
      .then((v) => {
        setModel(true);
        console.log({ user: User.id, amount: parseInt(text) });
        dispatch(
          UPDATE_COMMISSION(
            { user: User.id, amount: parseInt(text) },
            () => {
              setModel(false);
              setText("");
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
  };

  if (!loading) {
    return <Loading />;
  } else
    return (
      <div style={{ padding: 20, display: "flex", flexDirection: "column" }}>
        <Typography align="center" variant="h3" style={{ marginBlock: 20 }}>
          Add Commission
        </Typography>
        <Paper
          elevation={8}
          style={{
            padding: 20,
            width: "40%",
            alignSelf: "center",
          }}
          square
        >
          <Typography align="center" variant="h5" style={{ marginBlock: 10 }}>
            Current Rate: {commission?.current}%
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextField
              label="Commission"
              placeholder="Enter New Commission"
              onChange={(e) => {
                setText(e.target.value);
              }}
              variant="outlined"
              style={{ flexGrow: 1 }}
              size="medium"
              value={text}
            />
            <Button
              color="primary"
              style={{ marginInline: 12 }}
              variant="contained"
              size="large"
              onClick={handelButton}
            >
              <FiSave fontSize={24} />
              Save
            </Button>
          </div>
        </Paper>
        <Saving visible={model} title="Updating" />
      </div>
    );
};

export default withRouter(Commission);
