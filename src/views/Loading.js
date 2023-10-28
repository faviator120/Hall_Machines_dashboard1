import React from "react";
import { BeatLoader
} from "react-spinners";

function Loading() {
  const loaderStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  };

  return (
    <div style={loaderStyle}>
      <h1 style={{ textAlign: "center" }}>Authenticating User</h1>
      <div className="sweet-loading">
        <BeatLoader
            color={'#36D7B7'} loading={true} size={15} />
      </div>
    </div>
  );
}

export default Loading;
