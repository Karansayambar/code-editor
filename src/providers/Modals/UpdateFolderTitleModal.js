import React, { useContext } from "react";
import "../Modals/CreatePlaygroundModal.scss";
import { CreateFolderStyle } from "./CreateFolderModel";
import { ModalContext } from "../ModalProvider";
import { PlaygroundContext } from "../PlaygroundProvider";

const UpdateFolderTitleModal = () => {
    const {closeModal, modalPayload} = useContext(ModalContext);
    const {editFolderTitle} = useContext(PlaygroundContext)
    const onSubmitModal = (e) => {
        e.preventDefault();
        const folderName = e.target?.folderName?.value;
        editFolderTitle(folderName, modalPayload);
        closeModal();
    }
  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModal}>
        <span className="material-icons close" onClick={closeModal}>
          close
        </span>
        <h1>Update Folder Title</h1>
        <div style={CreateFolderStyle.inputContainer}>
          <input style={CreateFolderStyle.input} name="folderName" type="text" required placeholder="Enter Folder Name"/>
          <button style={CreateFolderStyle.btn} type="submit">Create Folder</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFolderTitleModal;
