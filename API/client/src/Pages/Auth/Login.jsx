import {
  Avatar,
  Button,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import Saving from "../../Components/Saving";
import { LOGIN } from "../../Redux/Actions/Actions";
import "./Auth.css";
const Login = (props) => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [model, setModel] = useState(false);
  const dispatch = useDispatch();

  let schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });

  const handelLogin = () => {
    schema
      .validate(login, { abortEarly: false })
      .then((valid) => {
        setModel(true);
        dispatch(
          LOGIN(
            valid,
            () => {
              setTimeout(() => {
                setModel(false);
                props.history.push("/dashboard");
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
  };
  return (
    <div className="login" style={{ height: "100vh" }}>
      <Saving visible={model} title="Authenticating" />
      <div className="image"></div>
      <Paper className="login-div">
        <Avatar
          alt="Admin"
          src="/images/admin.png"
          style={{
            height: 120,
            width: 120,
            boxShadow: "0px 0px 8px 1px grey",
          }}
        />
        <Typography align="center" variant="h4" style={{ marginBlock: 12 }}>
          Admin Portal
        </Typography>
        <TextField
          label="Email"
          placeholder="Enter Email"
          value={login.email}
          variant="outlined"
          style={{ marginBlock: 12, width: "100%" }}
          onChange={(e) => {
            e.persist();
            setLogin({ ...login, email: e.target.value });
          }}
        />
        <TextField
          label="Password"
          placeholder="Enter Password"
          type="password"
          value={login.password}
          variant="outlined"
          style={{ marginBlock: 12, width: "100%" }}
          onChange={(e) => {
            e.persist();
            setLogin({ ...login, password: e.target.value });
          }}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginBlock: 12 }}
          onClick={handelLogin}
        >
          Login
        </Button>
      </Paper>
    </div>
  );
};

export default Login;
