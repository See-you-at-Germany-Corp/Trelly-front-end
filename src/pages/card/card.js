import React, { useState } from "react";
import Modal from "react-modal";
import "./cardStyle.css";
import CardHeader from "../../components/card/CardHeader";
import CardMain from "../../components/card/CardMain";
import CardSide from "../../components/card/CardSide";
const Card = () => {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [
    state = {
      cardName:"",
    },
    setState,
  ] = React.useState();

  const activeStatus = () => {
    setState({ status: " active" });
  };
  return (
    <div>
      <button onClick={() => setmodalIsOpen(true)}>open modal</button>
      <Modal isOpen={modalIsOpen}>
        <button
          class="icon-md icon-close dialog-close-button js-close-window"
          onClick={() => setmodalIsOpen(false)}
        ></button>
        <div>
          <CardHeader />
          <CardMain />
          <CardSide />
        </div>
      </Modal>
    </div>
  );
};

export default Card;
