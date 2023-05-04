import {
  Avatar,
  Button,
  Fab,
  IconButton,
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

import { MdDeleteForever, MdPhotoCamera } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import * as yup from "yup";
import {
  ADD_CATEGORIES,
  DELETE_CATEGORIES,
  GET_CATEGORIES_LIST,
  GET_CATEGORIES_PDF,
  UPDATE_CATEGORIES,
} from "../../Redux/Actions/Actions";
import Loading from "../Loading";
import { toast } from "react-toastify";
import Saving from "../Saving";
const Categories = ({ history }) => {
  const IS_LOGGED = useSelector((state) => state.User.IS_LOGGED);
  if (!IS_LOGGED) {
    history.push("/");
  }

  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [pic, setPic] = useState(null);
  const [image, setImage] = useState(null);
  const [model, setModel] = useState(false);
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    name: yup.string().required(),
  });
  const allCategories = useSelector((state) => state.User.allCategories);
  const [data, setData] = useState(allCategories);
  const User = useSelector((state) => state.User.TOKEN);
  useEffect(() => {
    dispatch(
      GET_CATEGORIES_LIST((e) => {
        setData(e);
        setTimeout(() => {
          setLoading(true);
        }, 3000);
      })
    );

    // eslint-disable-next-line
  }, [dispatch]);

  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImage(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  const list_filter = (e) => {
    setData(
      allCategories.filter(
        (item) =>
          item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      )
    );
    setSearch(e.target.value);
  };
  if (!loading) {
    return <Loading />;
  } else
    return (
      <div
        style={{
          padding: 20,
        }}
      >
        <Typography align="center" variant="h3" style={{ marginBlock: 20 }}>
          Categories
        </Typography>
        <Paper
          className="category"
          elevation={8}
          style={{
            padding: 20,
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
          square
        >
          <TextField
            label="Category"
            placeholder="Add Category"
            onChange={(e) => {
              setText(e.target.value);
            }}
            variant="outlined"
            style={{ width: "100%" }}
            size="medium"
            value={text}
          />
          <div style={{ margin: 20, width: "93%", flexDirection: "row" }}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="icon-button-file"
              type="file"
              onChange={(e) => {
                if (e.target.files[0].size / (1024 * 1024) <= 1) {
                  setPic(e.target.files[0]);
                  getBase64(e.target.files[0]);
                } else {
                  toast.error("Image Size is Larger than 1MB");
                }
              }}
            />
            <label htmlFor="icon-button-file" style={{ display: "flex" }}>
              <Typography
                variant="subtitle1"
                align="left"
                style={{ width: 60, paddingTop: 10, marginLeft: 20 }}
              >
                Picture
              </Typography>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <MdPhotoCamera />
              </IconButton>
              {!pic ? null : (
                <Typography
                  variant="subtitle1"
                  style={{ paddingTop: 10 }}
                  color="primary"
                >
                  {pic.name} {(pic.size / (1024 * 1024)).toFixed(2)} MB
                </Typography>
              )}
            </label>
          </div>
          <Button
            color="primary"
            style={{ marginInline: 12 }}
            variant="contained"
            size="large"
            onClick={() => {
              schema
                .validate({ name: text }, { abortEarly: false })
                .then((value) => {
                  setTitle("Adding");
                  setModel(true);
                  console.log({ name: text, user: User.id, pic: image });
                  dispatch(
                    ADD_CATEGORIES(
                      { name: text, user: User.id, pic: image },
                      (d) => {
                        setTimeout(() => {
                          setModel(false);
                          setData(d);
                          setText("");
                          setImage(null);
                          setPic(null);
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
            Add
          </Button>
        </Paper>
        <Typography align="left" variant="h5" style={{ marginBlock: 20 }}>
          Search
        </Typography>
        <Paper
          elevation={8}
          style={{
            padding: 20,
            marginBlock: 20,
            justifyContent: "center",
            display: "flex",
          }}
          square
        >
          <TextField
            label="Search"
            placeholder="Enter Category"
            onChange={list_filter}
            variant="outlined"
            style={{ width: "50%" }}
            size="medium"
            value={search}
          />
        </Paper>
        <Typography align="center" variant="h3" style={{ marginBlock: 20 }}>
          Category List
        </Typography>
        <Paper elevation={8} style={{ padding: 20, marginBlock: 20 }} square>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr.</TableCell>
                  <TableCell>Picture.</TableCell>
                  <TableCell>Categories</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>
                      <Avatar
                        variant="rounded"
                        size="large"
                        alt={item.name}
                        src={item.pic}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={item.name}
                        label="Edit"
                        variant="outlined"
                        onChange={(e) => {
                          let d = [...data];
                          for (var x in d) {
                            if (item._id === d[x]._id) {
                              d[x].name = e.target.value;
                            }
                          }

                          setData(d);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <Button
                          color="secondary"
                          style={{ marginInline: 12 }}
                          variant="text"
                          size="large"
                          onClick={() => {
                            setTitle("Deleting");
                            setModel(true);
                            dispatch(
                              DELETE_CATEGORIES(
                                item._id,
                                (d) => {
                                  setTimeout(() => {
                                    setModel(false);
                                    setData(d);
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
                        <Button
                          color="primary"
                          style={{
                            marginInline: 12,
                          }}
                          variant="text"
                          size="large"
                          onClick={() => {
                            setTitle("Update");
                            setModel(true);
                            dispatch(
                              UPDATE_CATEGORIES(
                                {
                                  id: item._id,
                                  name: item.name,
                                  pic: item.pic,
                                },
                                (d) => {
                                  setTimeout(() => {
                                    setModel(false);
                                    setData(d);
                                    setSearch("");
                                  }, 3000);
                                },
                                () => {
                                  setModel(false);
                                }
                              )
                            );
                          }}
                        >
                          <RiEdit2Fill fontSize={24} color="#00a152" />
                        </Button>
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
            dispatch(GET_CATEGORIES_PDF());
          }}
        >
          <HiOutlineDocumentDownload fontSize={24} />
        </Fab>
        <Saving visible={model} title={title} />
      </div>
    );
};

export default withRouter(Categories);
