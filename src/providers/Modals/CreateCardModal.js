import React, { useContext } from "react";
import "../Modals/CreatePlaygroundModal.scss";
import { ModalContext } from "../ModalProvider";
import { defaultCodes, PlaygroundContext } from "../PlaygroundProvider";
import { v4 } from "uuid";

const CreateCardModal = () => {
  const { closeModal, modalPayload } = useContext(ModalContext);
  const {createPlayground} = useContext(PlaygroundContext);

  const onSubmitModel = (e) => {
    e.preventDefault();
    const fileName = e.target?.fileName?.value;
    const language = e.target?.language?.value;
    const file = {
        id : v4(),
        title : fileName,
        language,
        code : defaultCodes[language]
    }
    createPlayground(modalPayload, file);
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
          <input type="text" name="fileName" placeholder="Enter Card Title" required />
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

export default CreateCardModal;
