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
import LanguageFields from "../LanguageFields";

const initialState = {
  home: {
    title: "",
    subheading: "",
  },
  selected_category: {
    order: "",
  },
  drawer: {
    home: "",
    language: "",
    application: "",
    profile: "",
    sign_out: "",
  },
  language: {
    title: "",
    subheading: "",
  },
  application: {
    title: "",
    category: "",
    upload_image: "",
    upload_cnic_front: "",
    upload_cnic_back: "",
    cnic_number: "",
    parent_cinc: "",
    address: "",
    submit_form: "",
    city: "",
    working_rate: "",
  },
  profile: {
    placed_task: "",
    wallet: "",
    history: "",
    reviews: "",
    online_training: "",
    notification: "",
    setting: "",
    sign_out: "",
    promo: "",
    favorites: "",
  },
  promo: {
    title: "",
    expires: "",
    status: "",
    used: "",
    not_used: "",
    expired: "",
    not_expired: "",
  },
  placedTask: {
    title: "",
    my_task: "",
    assigned_task: "",
    view_details: "",
    accept: "",
    reject: "",
    cancel: "",
    price: "",
    hours: "",
  },
  task_details: {
    title: "",
    subheading: "",
    order_from: "",
    order_to: "",
    phone: "",
    gender: "",
    chat: "",
    complain: "",
    price: "",
    hours: "",
    status: "",
    worker_status: "",
    commission: "",
    address: "",
    description: "",
    completed: "",
  },
  complaint: {
    title: "",
    subheading: "",
    complaint_to: "",
    phone: "",
    gender: "",
    submit: "",
  },
  wallet: {
    title: "",
    current_wallet: "",
    add_wallet: "",
    pending_amount: "",
    amount: "",
    pay: "",
  },
  add_wallet: {
    title: "",
    amount: "",
    add: "",
  },
  history: {
    title: "",
    my_task: "",
    assigned_task: "",
    view_details: "",
    price: "",
    hours: "",
  },
  reviews: {
    title: "",
  },
  online_training: {
    title: "",
  },
  notification: {
    title: "",
  },
  setting: {
    title: "",
    subheading: "",
    name: "",
    email: "",
    phone: "",
    verify: "",
    dob: "",
    update_profile: "",
    new_password: "",
    confirm_password: "",
    change_password: "",
  },
  add_order: {
    title: "",
    subheading: "",
    gender: "",
    male: "",
    female: "",
    price: "",
    working_hour: "",
    address: "",
    place_order: "",
  },
};

const Language = ({ history }) => {
  const User = useSelector((state) => state.User.TOKEN);
  const IS_LOGGED = useSelector((state) => state.User.IS_LOGGED);
  if (!IS_LOGGED) {
    history.push("/");
  }
  const initial = {
    name: "",
    terms: initialState,
    user: User?.id,
  };
  const allLanguage = useSelector((state) => state.User.allLanguage);
  const [title, setTitle] = useState("");
  const [text, setText] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(false);
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    name: yup.string().required(),
    terms: yup.object().shape({
      home: yup.object().shape({
        title: yup.string().required("Category is required"),
        subheading: yup.string().required("Total Category is required"),
      }),
      selected_category: yup.object().shape({
        order: yup.string().required("Place Order is required"),
      }),
      drawer: yup.object().shape({
        home: yup.string().required("Home is required"),
        language: yup.string().required("Language is required"),
        application: yup.string().required("Are You A worker? is required"),
        profile: yup.string().required("Profile is required"),
        sign_out: yup.string().required("Sign out is required"),
      }),
      language: yup.object().shape({
        title: yup.string().required("Language is required"),
        subheading: yup.string().required("List of Languages is required"),
      }),
      application: yup.object().shape({
        title: yup.string().required("Application is required"),
        category: yup.string().required("Select a Category is required"),
        upload_image: yup.string().required("Upload Image is required"),
        upload_cnic_front: yup
          .string()
          .required("Upload Cnic Front Side is required"),
        upload_cnic_back: yup
          .string()
          .required("Upload Cnic Back Side is required"),
        cnic_number: yup.string().required("Cnic Number is required"),
        parent_cinc: yup.string().required("Parent Cnic Number is required"),
        address: yup.string().required("Address is required"),
        submit_form: yup.string().required("Submit Form is required"),
        working_rate: yup.string().required("Working Rate is required"),
        city: yup.string().required("City is required"),
      }),
      profile: yup.object().shape({
        placed_task: yup.string().required("Placed Task is required"),
        assigned_task: yup.string().required("Assigned Task is required"),
        wallet: yup.string().required("Wallet is required"),
        history: yup.string().required("History is required"),
        reviews: yup.string().required("Reviews is required"),
        online_training: yup.string().required("Online Training is required"),
        notification: yup.string().required("Notifications is required"),
        setting: yup.string().required("Setting is required"),
        sign_out: yup.string().required("Sign out is required"),
        promo: yup.string().required("Promo is required"),
      }),
      promo: yup.object().shape({
        title: yup.string().required("Title is required"),
        expires: yup.string().required("Expires At is required"),
        status: yup.string().required("Status is required"),
        used: yup.string().required("Used is required"),
        not_used: yup.string().required("Not Used is required"),
        expired: yup.string().required("Expired is required"),
        not_expired: yup.string().required("Not Expired is required"),
      }),
      placedTask: yup.object().shape({
        title: yup.string().required("Placed Task is required"),
        my_task: yup.string().required("My Task is required"),
        assigned_task: yup.string().required("Assigned Task is required"),
        view_details: yup.string().required("View Details is required"),
        accept: yup.string().required("Accept is required"),
        reject: yup.string().required("Reject is required"),
        cancel: yup.string().required("Cancel is required"),
        price: yup.string().required("Price is required"),
        hours: yup.string().required("Hours is required"),
      }),
      task_details: yup.object().shape({
        title: yup.string().required("Order Details is required"),
        subheading: yup.string().required("Order is required"),
        order_from: yup.string().required("Order From is required"),
        order_to: yup.string().required("Order To is required"),
        phone: yup.string().required("Phone is required"),
        gender: yup.string().required("Gender is required"),
        chat: yup.string().required("Chat is required"),
        complain: yup.string().required("Complain is required"),
        price: yup.string().required("Price is required"),
        hours: yup.string().required("Hours is required"),
        status: yup.string().required("Status is required"),
        worker_status: yup.string().required("Worker Status is required"),
        commission: yup.string().required("Commission is required"),
        address: yup.string().required("Address is required"),
        description: yup.string().required("Description is required"),
        completed: yup.string().required("Completed is required"),
      }),
      complaint: yup.object().shape({
        title: yup.string().required("Complaint Box is required"),
        subheading: yup.string().required("Order is required"),
        complaint_to: yup.string().required("Complaint To is required"),
        phone: yup.string().required("Phone is required"),
        gender: yup.string().required("Gender is required"),
        submit: yup.string().required("Submit is required"),
      }),
      wallet: yup.object().shape({
        title: yup.string().required("Wallet is required"),
        current_wallet: yup.string().required("Current Wallet is required"),
        add_wallet: yup.string().required("Add Wallet is required"),
        pending_amount: yup.string().required("Pending Amount is required"),
        amount: yup.string().required("Amount is required"),
      }),
      add_wallet: yup.object().shape({
        title: yup.string().required("Add Wallet is required"),
        amount: yup.string().required("Amount is required"),
        add: yup.string().required("Add is required"),
      }),
      history: yup.object().shape({
        title: yup.string().required("History is required"),
        my_task: yup.string().required("My Task is required"),
        assigned_task: yup.string().required("Assigned Task is required"),
        view_details: yup.string().required("View Details is required"),
        price: yup.string().required("Price is required"),
        hours: yup.string().required("Hours is required"),
      }),
      reviews: yup.object().shape({
        title: yup.string().required("Reviews is required"),
      }),
      online_training: yup.object().shape({
        title: yup.string().required("Online Training is required"),
      }),
      notification: yup.object().shape({
        title: yup.string().required("Notification is required"),
      }),
      setting: yup.object().shape({
        title: yup.string().required("Setting is required"),
        subheading: yup.string().required("Information is required"),
        name: yup.string().required("Name is required"),
        email: yup.string().required("Email is required"),
        phone: yup.string().required("Phone is required"),
        verify: yup.string().required("Verify is required"),
        dob: yup.string().required("Date of Birth is required"),
        update_profile: yup.string().required("Update Profile is required"),
        new_password: yup.string().required("New Password is required"),
        confirm_password: yup.string().required("Confirm Password is required"),
        change_password: yup.string().required("Change Password is required"),
      }),
      add_order: yup.object().shape({
        title: yup.string().required("Add Order is required"),
        subheading: yup.string().required("Order To is required"),
        gender: yup.string().required("Gender is required"),
        male: yup.string().required("Male is required"),
        female: yup.string().required("Female is required"),
        price: yup.string().required("Price is required"),
        working_hour: yup.string().required("Worker Hour is required"),
        address: yup.string().required("Address is required"),
        place_order: yup.string().required("Place the Order is required"),
      }),
    }),
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
            width: "100%",
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
        </Paper>
        <LanguageFields text={text} setText={setText} />
        <Button
          color="primary"
          style={{ margin: 12 }}
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
                        variant="text"
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
