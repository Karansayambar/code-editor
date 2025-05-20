import { useContext } from "react";
import { ModalContext, modelConstant } from "../ModalProvider";
import CreatePlaygroundModal from "./CreatePlaygroundModal";
import CreateFolderModel from "./CreateFolderModel";
import UpdateFolderTitleModal from "./UpdateFolderTitleModal";
import UpdateFileTitleModal from "./UpdateFileTitleModal";
import CreateCardModal from "./CreateCardModal";

const Modal = () => {
  const modalFeatures = useContext(ModalContext);
  return (
    <>
      {modalFeatures.activeModal === modelConstant.CREATE_PLAYGROUND && (
        <CreatePlaygroundModal />
      )}
      {modalFeatures.activeModal === modelConstant.CREATE_FOLDER && (
        <CreateFolderModel />
      )}
      {modalFeatures.activeModal === modelConstant.UPDATE_FOLDER_TITLE && (
        <UpdateFolderTitleModal />
      )}
      {modalFeatures.activeModal === modelConstant.UPDATE_FILE_TITLE && (
        <UpdateFileTitleModal />
      )}
      {modalFeatures.activeModal === modelConstant.CREATE_CARD && (
        <CreateCardModal />
      )}
    </>
  );
};

export default Modal;
