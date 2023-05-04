import { Toast } from "native-base";

export default Success = (msg, show = false) => {
  return (
    show &&
    Toast.show({
      text: msg,
      style: { margin: 10, borderRadius: 7 },
      textStyle: { textAlign: "center" },
      type: "success",
    })
  );
};
