import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

function MyToast(props) {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast bg={props.type === "success" ? "success" : "danger"}>
        <Toast.Header closeButton={false}>
          <strong className="me-auto">{props.title}</strong>
        </Toast.Header>
        <Toast.Body className="text-white">
          {props.message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default MyToast;