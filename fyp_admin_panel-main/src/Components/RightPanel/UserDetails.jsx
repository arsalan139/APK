import {
  Button,
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import Loading from "../Loading";
import Saving from "../Saving";
import { MdDeleteForever } from "react-icons/md";
import {
  GET_USERS_LIST,
  DELETE_USER,
  RESTRICTS_USER,
  REMOVE_USER_RESTRICTION,
  GET_USERS_PDF,
} from "../../Redux/Actions/Actions";
import Details from "../Card/Details";
const UserDetails = ({ history }) => {
  const IS_LOGGED = useSelector((state) => state.User.IS_LOGGED);
  if (!IS_LOGGED) {
    history.push("/");
  }
  const allUsers = useSelector((state) => state.User.allUsers);
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [model, setModel] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      GET_USERS_LIST(() => {
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
          User Details
        </Typography>
        <Paper elevation={8} style={{ padding: 20, marginBlock: 20 }} square>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allUsers.map((item, i) => (
                  <TableRow key={i} style={{ cursor: "pointer" }}>
                    <TableCell
                      onClick={() => {
                        setData(item);
                        setShow(true);
                      }}
                    >
                      {item.name}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        setData(item);
                        setShow(true);
                      }}
                    >
                      {item.email}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        setData(item);
                        setShow(true);
                      }}
                    >
                      {item.phone}
                    </TableCell>
                    <TableCell>
                      <div>
                        <Button
                          color="secondary"
                          style={{ marginInline: 12 }}
                          variant="contained"
                          size="large"
                          onClick={() => {
                            setTitle("Deleting");
                            setModel(true);
                            dispatch(
                              DELETE_USER(
                                item._id,
                                "User",
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
                          Delete
                        </Button>
                        {item.restrict ? (
                          <Button
                            color="secondary"
                            style={{ marginInline: 12 }}
                            variant="contained"
                            size="large"
                            onClick={() => {
                              setTitle("Adding Retractions");
                              setModel(true);
                              dispatch(
                                REMOVE_USER_RESTRICTION(
                                  item._id,
                                  "User",
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
                            Remove Retraction
                          </Button>
                        ) : (
                          <Button
                            color="secondary"
                            style={{ marginInline: 12 }}
                            variant="contained"
                            size="large"
                            onClick={() => {
                              setTitle("Adding Retractions");
                              setModel(true);
                              dispatch(
                                RESTRICTS_USER(
                                  item._id,
                                  "User",
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
                            Restrict
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Fab
          color="primary"
          aria-label="download"
          style={{ position: "fixed", right: 20, bottom: 20 }}
          onClick={() => {
            dispatch(GET_USERS_PDF());
          }}
        >
          <HiOutlineDocumentDownload fontSize={24} />
        </Fab>
        <Saving visible={model} title={title} />
        <Details
          visible={show}
          handelClose={() => {
            setShow(false);
          }}
          data={data}
        />
      </div>
    );
};

export default withRouter(UserDetails);
