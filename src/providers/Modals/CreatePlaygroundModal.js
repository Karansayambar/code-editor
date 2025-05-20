import React, { useContext } from "react";
import "../Modals/CreatePlaygroundModal.scss";
import { ModalContext, modelConstant } from "../ModalProvider";
import { PlaygroundContext } from "../PlaygroundProvider";
const CreatePlaygroundModal = () => {
  const modalFeatures = useContext(ModalContext);
  const playgroundFeatures = useContext(PlaygroundContext);

  const closeModal = () => {
    modalFeatures.closeModal(modelConstant.CREATE_FOLDER);
  };

  const onSubmitModel = (e) => {
    e.preventDefault();
    const folderName = e.target?.folderName?.value;
    const fileName = e.target?.fileName?.value;
    const language = e.target?.language?.value;
    playgroundFeatures.createnewPlayground({
      folderName,
      fileName,
      language,
    });
    closeModal();
  };

  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModel}>
        <span className="material-icons close" onClick={closeModal}>
          close
        </span>
        <h1>Create New Playground</h1>
        <div className="item">
          <p>Enter FolderName</p>
          <input type="text" name="folderName" required />
        </div>
        <div className="item">
          <p>Enter FolderName</p>
          <input type="text" name="fileName" required />
        </div>
        <div className="item" required>
          <select name="language">
            <option>cpp</option>
            <option>javascript</option>
            <option>java</option>
          </select>
          <button type="submit">create playground</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlaygroundModal;
