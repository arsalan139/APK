import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_ADMIN,
  GET_ADMIN_LIST,
  DELETE_ADMIN,
} from "../../Redux/Actions/Actions";
import Loading from "../Loading";
import Saving from "../Saving";
import * as yup from "yup";
import { toast } from "react-toastify";
import { withRouter } from "react-router";

const AddAdmin = ({ history }) => {
  const IS_LOGGED = useSelector((state) => state.User.IS_LOGGED);
  if (!IS_LOGGED) {
    history.push("/");
  }
  const initial = {
    name: "",
    email: "",
    password: "",
  };
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });
  const [text, setText] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(false);
  const [title, setTitle] = useState("");
  const allAdmin = useSelector((state) => state.User.allAdmin);
  const User = useSelector((state) => state.User.TOKEN);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      GET_ADMIN_LIST(() => {
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
      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Saving visible={model} title={title} />
        <Typography align="center" variant="h3" style={{ marginBlock: 20 }}>
          Admin Form
        </Typography>
        <Paper
          elevation={8}
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            width: "40%",
            alignSelf: "center",
          }}
          square
        >
          <TextField
            label="Name"
            placeholder="Enter Name"
            onChange={(e) => {
              setText({ ...text, name: e.target.value });
            }}
            variant="outlined"
            style={{ width: "100%", marginBlock: 12 }}
            size="medium"
            value={text.name}
          />
          <TextField
            label="Email"
            placeholder="Enter Email"
            onChange={(e) => {
              setText({ ...text, email: e.target.value });
            }}
            variant="outlined"
            style={{ width: "100%", marginBlock: 12 }}
            size="medium"
            value={text.email}
          />
          <TextField
            label="Password"
            placeholder="Enter Password"
            onChange={(e) => {
              setText({ ...text, password: e.target.value });
            }}
            type="password"
            variant="outlined"
            style={{ width: "100%", marginBlock: 12 }}
            size="medium"
            value={text.password}
          />
          <Button
            color="primary"
            style={{ marginInline: 12, alignSelf: "flex-end" }}
            variant="contained"
            size="large"
            onClick={() => {
              schema
                .validate(text, { abortEarly: false })
                .then((value) => {
                  setTitle("Adding");
                  setModel(true);
                  dispatch(
                    ADD_ADMIN(
                      value,
                      () => {
                        setTimeout(() => {
                          setModel(false);
                          setText(initial);
                        }, 3000);
                      },
                      () => {
                        setModel(false);
                      }
                    )
                  );
                })
                .catch((error) => {
                  toast.error(error.errors[0]);
                });
            }}
          >
            <FaUserPlus fontSize={24} />
            Add Admin
          </Button>
        </Paper>
        <Typography align="center" variant="h3" style={{ marginBlock: 20 }}>
          Admin List
        </Typography>
        <Paper elevation={8} style={{ padding: 20, marginBlock: 20 }} square>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr.</TableCell>
                  <TableCell>Ids</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allAdmin
                  .filter((admin) => admin._id !== User.id)
                  .map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{item._id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>
                        {item.delete && (
                          <Button
                            color="secondary"
                            style={{ marginInline: 12 }}
                            variant="text"
                            size="large"
                            onClick={() => {
                              setTitle("Deleting");
                              setModel(true);
                              dispatch(
                                DELETE_ADMIN(
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
                            <MdDeleteForever fontSize={24} />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
};

export default withRouter(AddAdmin);
