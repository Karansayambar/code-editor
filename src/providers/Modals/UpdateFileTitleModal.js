import React, { useContext } from "react";
import { CreateFolderStyle } from "./CreateFolderModel";
import "./CreatePlaygroundModal.scss";
import { ModalContext } from "../ModalProvider";
import { PlaygroundContext } from "../PlaygroundProvider";

const UpdateFileTitleModal = () => {
  const { closeModal, modalPayload } = useContext(ModalContext);
  const { editFileTitle } = useContext(PlaygroundContext);
  const onSubmitModal = (e) => {
    e.preventDefault();
    const fileName = e.target?.fileName?.value;
    console.log(fileName,modalPayload.folderId, modalPayload.fileId)
    editFileTitle(fileName, modalPayload.folderId, modalPayload.fileId);
    closeModal();
  };
  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModal}>
        <span className="material-icons close" onClick={closeModal}>
          close
        </span>
        <h1>Update Card Title</h1>
        <div style={CreateFolderStyle.inputContainer}>
          <input
            style={CreateFolderStyle.input}
            name="fileName"
            type="text"
            required
            placeholder="Enter File Name"
          />
          <button style={CreateFolderStyle.btn} type="submit">
            Update File
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFileTitleModal;
