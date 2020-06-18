import React from "react";

const Alert = ({ alertMsg }) => {
  return (
    alertMsg !== null && (
      <div className={`alert alert-${alertMsg.type}`}>
        <i className="fas fa-info-circle"></i>
        {alertMsg.msg}
      </div>
    )
  );
};

export default Alert;
