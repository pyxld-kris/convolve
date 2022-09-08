import React from "react";
import ReactModal from "react-modal";

import { customModalStyles, ModalContent } from "./StyledGlobalModal";

export let openGlobalModal;
export let closeGlobalModal;
export let globalModalContent;
export let setGlobalModalContent;

export default function GlobalModal(props) {
  [globalModalContent, setGlobalModalContent] = React.useState(
    props.modalContent
  );

  // Modal functions
  const [globalmodalIsOpen, setGlobalModalIsOpen] = React.useState(
    props.modalIsOpen
  );
  openGlobalModal = (content) => {
    setGlobalModalContent(content);
    setGlobalModalIsOpen(true);
  };
  closeGlobalModal = () => {
    setGlobalModalIsOpen(false);
  };
  const afterOpenGlobalModal = () => {};

  return (
    <ReactModal
      isOpen={props.modalIsOpen ? props.modalIsOpen : globalmodalIsOpen}
      onRequestOpen={props.openModal ? props.openModal : openGlobalModal}
      onRequestClose={props.closeModal ? props.closeModal : closeGlobalModal}
      style={customModalStyles}
      onAfterOpen={afterOpenGlobalModal}
      contentLabel="Template Modal"
    >
      <ModalContent>{globalModalContent}</ModalContent>
    </ReactModal>
  );
}

/*
export default function GlobalModal() {
  // Modal state management
  let [globalModalContentLocal, setGlobalModalContentLocal] =
    React.useState("content");
  let [globalModalIsOpen, setGlobalModalIsOpen] = React.useState(false);
  openGlobalModal = (content) => {
    alert("opening");
    setGlobalModalContentLocal(
      content
      // <div style={globalModalStyle}>
      //   {content}
      //   {Math.random()}
      // </div>
    );
    setGlobalModalIsOpen(true);
  };
  closeGlobalModal = () => {
    setGlobalModalIsOpen(false);
  };

  setGlobalModalContent = setGlobalModalContentLocal;
  React.useEffect(() => {
    alert("globalModalContent: " + globalModalContent);
    globalModalContent = globalModalContentLocal;
    setGlobalModalContent = setGlobalModalContentLocal;
  }, [globalModalContentLocal, setGlobalModalContentLocal]);

  const globalModalStyle = {
    width: "100%",
    height: "100%",
    //display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2rem",
    lineHeight: "2rem",
    backgroundColor: "rgb(255,255,255)",
    fontWeight: "bold",
    textAlign: "center",
  };

  return (
    <div>
      <Modal
        modalContent={globalModalContentLocal}
        modalIsOpen={globalModalIsOpen}
        openModal={openGlobalModal}
        closeModal={closeGlobalModal}
      ></Modal>
    </div>
  );
}
*/
