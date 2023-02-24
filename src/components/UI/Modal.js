import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';
import classes from './Modal.module.css';

const Backdrop = props => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = props => {
  return (
    <Card>
      <div className={classes.content}>{props.children}</div>
    </Card>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <>
      {
        ReactDOM.createPortal(
          <Backdrop onConfirm={props.onConfirm} onClose={props.onClose} />,
          portalElement)
      }
      {
        ReactDOM.createPortal(
          <ModalOverlay
            onConfirm={props.onConfirm}
          >{props.children}</ModalOverlay>,
          portalElement)
      }
    </>
  );
};

export default Modal;