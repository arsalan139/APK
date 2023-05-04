import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import { MdAdd } from "react-icons/md";
import { IoMdBarcode } from "react-icons/io";
import voucher from "voucher-code-generator";
import * as yup from "yup";
import { toast } from "react-toastify";
import { ADD_PROMO, GET_USER_BY_EMAIL } from "../../Redux/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import SingleUser from "../Card/SingleUser";
import Saving from "../Saving";
import { withRouter } from "react-router";
import { AiOutlineSearch } from "react-icons/ai";
const CreatePromos = ({ history }) => {
  const IS_LOGGED = useSelector((state) => state.User.IS_LOGGED);
  if (!IS_LOGGED) {
    history.push("/");
  }
  const initial = {
    email: "",
    date: new Date(),
    code: "",
    amount: "",
    user: "",
  };
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(false);
  const dispatch = useDispatch();
  const [promo, setPromo] = useState(initial);
  const schema = yup.object().shape({
    email: yup.string().email().required(),
  });
  const schema2 = yup.object().shape({
    endDate: yup.date().required(),
    code: yup.string().required(),
    amount: yup.number().required(),
    user: yup.string().required(),
  });
  return (
    <div
      style={{
        padding: 20,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography align="center" variant="h3" style={{ marginBlock: 20 }}>
        Promo
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
        <div style={{ alignItems: "center", display: "flex" }}>
          <TextField
            label="Email"
            placeholder="Add Email"
            onChange={(e) => {
              setPromo({ ...promo, email: e.target.value });
            }}
            variant="outlined"
            style={{ margin: 12, flexGrow: 1 }}
            size="medium"
            value={promo.email}
          />
          <Button
            color="primary"
            style={{ marginInline: 12 }}
            variant="text"
            size="large"
            onClick={() => {
              let data = { email: promo.email };
              schema
                .validate(data, { abortEarly: false })
                .then((v) => {
                  setLoading(true);
                  dispatch(
                    GET_USER_BY_EMAIL(
                      v,
                      (data) => {
                        setLoading(false);
                        setSearch(data);
                      },
                      () => {
                        setLoading(false);
                      }
                    )
                  );
                })
                .catch((err) => {
                  toast.error(err.errors[0]);
                });
            }}
          >
            <AiOutlineSearch fontSize={44} />
          </Button>
        </div>
        {loading && <Loading size={40} />}
        {search && (
          <SingleUser
            data={search}
            handleButton={() => {
              setPromo({ ...promo, user: search._id });
            }}
          />
        )}
        <TextField
          label="Amount"
          placeholder="Add Amount"
          onChange={(e) => {
            setPromo({ ...promo, amount: e.target.value });
          }}
          variant="outlined"
          style={{ margin: 12 }}
          size="medium"
          value={promo.amount}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            // margin="normal"
            inputVariant="outlined"
            value={promo.date}
            onChange={(event) => {
              setPromo({ ...promo, date: event });
            }}
            style={{ margin: 12 }}
          />
        </MuiPickersUtilsProvider>
        <div style={{ alignItems: "center", display: "flex" }}>
          <TextField
            label="Code"
            placeholder="Add Code"
            onChange={(e) => {
              setPromo({ ...promo, code: e.target.value });
            }}
            variant="outlined"
            style={{ margin: 12, flexGrow: 1 }}
            size="medium"
            value={promo.code}
          />
          <Button
            color="primary"
            style={{ marginInline: 12 }}
            variant="text"
            size="large"
            onClick={() => {
              let code = voucher.generate({ length: 8, count: 1 });
              setPromo({ ...promo, code: code[0] });
            }}
          >
            <IoMdBarcode fontSize={44} />
          </Button>
        </div>

        <Button
          color="primary"
          style={{ marginInline: 12 }}
          variant="contained"
          size="large"
          onClick={() => {
            let data = {
              code: promo.code,
              endDate: promo.date,
              user: promo.user,
              amount: parseInt(promo.amount),
            };
            schema2
              .validate(data, { abortEarly: false })
              .then((v) => {
                setModel(true);
                dispatch(
                  ADD_PROMO(
                    v,
                    () => {
                      setModel(false);
                      setPromo(initial);
                    },
                    () => {
                      setModel(false);
                    }
                  )
                );
              })
              .catch((err) => {
                toast.error(err.errors[0]);
              });
          }}
        >
          <MdAdd fontSize={24} />
          Create Promo
        </Button>
      </Paper>
      <Saving visible={model} title="Saving" />
    </div>
  );
};

export default withRouter(CreatePromos);
