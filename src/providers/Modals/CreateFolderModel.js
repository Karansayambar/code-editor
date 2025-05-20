import React, { useContext } from "react";
import "../Modals/CreatePlaygroundModal.scss";
import { ModalContext } from "../ModalProvider";
import { PlaygroundContext } from "../PlaygroundProvider";
const CreateFolderModel = () => {
  const modalFeatures = useContext(ModalContext);
  const playgroundFeatures = useContext(PlaygroundContext);
  const closeModal = () => {
    modalFeatures.closeModal();
  };

  const onSubmitModal = (e) => {
    e.preventDefault();
    const folderName = e.target?.folderName?.value;
    playgroundFeatures.createNewFolder(folderName);
    closeModal();

  }
  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModal}>
        <span className="material-icons close" onClick={closeModal}>
          close
        </span>
        <h1>Create New Folder</h1>
        <div style={CreateFolderStyle.inputContainer}>
          <input style={CreateFolderStyle.input} name="folderName" type="text" required />
          <button style={CreateFolderStyle.btn}>Create Folder</button>
        </div>
      </form>
    </div>
  );
};

export default CreateFolderModel;

export const CreateFolderStyle = {
  inputContainer: {
    display: "flex",
    gap: 10,
  },
  input: {
    flexGrow: 1,
    padding: 10,
  },
  btn: {
    backgroundColor: "#241F21",
    borderRadius: 4,
    color: "white",
    padding: "0px 10px",
    border: "none",
  },
};
