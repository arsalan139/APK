import { CircularProgress } from "@material-ui/core";
import React from "react";

const Loading = ({ size }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: size ? "unset" : "100vh",
        margin: 20,
      }}
    >
      <CircularProgress size={size ? size : 100} thickness={2} />
    </div>
  );
};

export default Loading;
