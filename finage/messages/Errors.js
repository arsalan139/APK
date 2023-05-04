import { Toast } from "native-base";

export default Errors = (msg, show = false) => {
  return (
    show &&
    Toast.show({
      text: msg,
      type: "danger",
      style: { margin: 10, borderRadius: 7 },
      textStyle: { textAlign: "center" },
    })
  );
};
