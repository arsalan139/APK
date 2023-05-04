import {
  Button,
  Chip,
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
import { MdAdd, MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_LANGUAGE,
  DELETE_LANGUAGE,
  GET_LANGUAGE_LIST,
} from "../../Redux/Actions/Actions";
import Loading from "../Loading";
import Saving from "../Saving";
import * as yup from "yup";
import { toast } from "react-toastify";
import { withRouter } from "react-router";
const Language = ({ history }) => {
  const User = useSelector((state) => state.User.TOKEN);
  const IS_LOGGED = useSelector((state) => state.User.IS_LOGGED);
  if (!IS_LOGGED) {
    history.push("/");
  }
  const initial = {
    name: "",
    terms: [],
    user: User?.id,
  };
  const allLanguage = useSelector((state) => state.User.allLanguage);

  const [title, setTitle] = useState("");
  const [text, setText] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(false);
  const [terms, setTerms] = useState("");
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    name: yup.string().required(),
    terms: yup.array().min(1).required(),
  });
  useEffect(() => {
    dispatch(
      GET_LANGUAGE_LIST(() => {
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
        <Typography align="center" variant="h3" style={{ marginBlock: 20 }}>
          Language
        </Typography>
        <Paper
          elevation={8}
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            width: "50%",
            alignSelf: "center",
          }}
          square
        >
          <TextField
            label="Language"
            placeholder="Add Category"
            onChange={(e) => {
              setText({ ...text, name: e.target.value });
            }}
            variant="outlined"
            style={{ flex: 1 }}
            size="medium"
            value={text.name}
          />
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              marginBlock: 12,
            }}
          >
            <TextField
              label="Terms"
              placeholder="Add Terms"
              onChange={(e) => {
                setTerms(e.target.value);
              }}
              variant="outlined"
              style={{ flex: 1 }}
              size="medium"
              value={terms}
            />
            <Button
              color="primary"
              style={{ marginInline: 12 }}
              variant="contained"
              size="large"
              onClick={() => {
                if (!text.terms.includes(text)) {
                  // let a={...text};
                  // a.terms.push(terms)
                  setText({ ...text, terms: [...text.terms, terms] });
                  setTerms("");
                }
              }}
            >
              <MdAdd fontSize={24} />
              Terms
            </Button>
          </div>
          <Typography align="center" variant="h3" style={{ marginBlock: 20 }}>
            Terms
          </Typography>
          <div style={{ justifyContent: "space-evenly", marginBlock: 12 }}>
            {text.terms.map((item, i) => (
              <Chip
                label={item}
                onDelete={() => {
                  setText({
                    ...text,
                    terms: text.terms.filter((i) => i !== item),
                  });
                }}
                style={{ marginInline: 7 }}
                variant="outlined"
                color="secondary"
              />
            ))}
          </div>
          <Button
            color="primary"
            style={{ marginInline: 12 }}
            variant="contained"
            size="large"
            onClick={() => {
              schema
                .validate(text, { abortEarly: false })
                .then((value) => {
                  setTitle("Adding");
                  setModel(true);
                  dispatch(
                    ADD_LANGUAGE(
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
            <MdAdd fontSize={24} />
            Add Language
          </Button>
        </Paper>

        <Typography align="center" variant="h3" style={{ marginBlock: 20 }}>
          Language List
        </Typography>
        <Paper elevation={8} style={{ padding: 20, marginBlock: 20 }} square>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr.</TableCell>
                  <TableCell>Language</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allLanguage.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <Button
                        color="secondary"
                        style={{ marginInline: 12 }}
                        variant="contained"
                        size="large"
                        onClick={() => {
                          setTitle("Deleting");
                          setModel(true);
                          dispatch(
                            DELETE_LANGUAGE(
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Saving visible={model} title={title} />
      </div>
    );
};

export default withRouter(Language);
