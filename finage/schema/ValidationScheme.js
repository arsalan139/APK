import * as yup from "yup";
import Errors from "../messages/Errors";

export const registrationSchema = yup.object().shape({
  user: yup.string().required(),
  category: yup.string().required(),
  pic: yup.string().required("Picture is Required!"),
  cnic: yup.object().shape({
    number: yup.string().required("Cnic Number is required!"),
    front_pic: yup.string().required("Your Cnic Front picture is required!"),
    back_pic: yup.string().required("Your Cnic Back picture is required!"),
  }),
  address: yup.object().shape({
    lat: yup.number().required("Your Address latitude is required!"),
    lng: yup.number().required("Your Address longitude is required!"),
    place: yup.string().required("Your Address is required!"),
  }),
  parent_cinc: yup.string().required("Parent Cnic Number is required!"),
});

export const orderSchema = yup.object().shape({
  user: yup.string().required(),
  worker: yup.string().required(),
  category: yup.string().required(),
  gender: yup.string().required(),
  description: yup.string().required(),
  location: yup
    .object()
    .shape({
      address: yup.string().required("Your Address is Required"),
      lat: yup
        .number()
        .notOneOf([0], "Pick Your Place in map!")
        .required("Your latitude is Required"),
      lng: yup
        .number()
        .notOneOf([0], "Pick Your Place in map!")
        .required("Your longitude is Required"),
    })
    .required(),
});

export const Validation = (schema, values, event) =>
  schema
    .validate(values, { abortEarly: false })
    .then(event)
    .catch(({ errors }) => Errors(errors[0], true));
