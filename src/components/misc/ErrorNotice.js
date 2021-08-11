import React from "react";
import { Alert, Button, Container } from "react-bootstrap";

export default function ErrorNotice(props) {
  return (
    <Alert
      variant="warning"
      className="d-flex justify-content-between align-self-center p-3"
    >
      <Container className="p-1 m-2">{props.message}</Container>
      <Button
        variant="warning"
        onClick={props.clearError}
        className="ph-2 mb-0 "
      >
        X
      </Button>
    </Alert>
  );
}
