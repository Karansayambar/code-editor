import "./style.scss";
import { useContext } from "react";
import { PlaygroundContext } from "../../../providers/PlaygroundProvider";
import { ModalContext, modelConstant } from "../../../providers/ModalProvider";
import { useNavigate } from "react-router-dom";

const Folders = ({ folderTitle, cards, folderId }) => {
  const { deleteFolder, deleteFile } = useContext(PlaygroundContext);
  const { openModal, setModalPayload } = useContext(ModalContext);
  const navigate = useNavigate();
  const onDeleteHandler = () => {
    deleteFolder(folderId);
  };

  const onEditFolderTitle = () => {
    setModalPayload(folderId);
    openModal(modelConstant.UPDATE_FOLDER_TITLE);
  };

  const openCreateCardModale = () => {
    setModalPayload(folderId)
    openModal(modelConstant.CREATE_CARD);
  }
  return (
    <div className="folder-container">
      <div className="folder-header">
        <div className="folder-header-item">
          <span className="material-icons" style={{ color: "#FFCA29" }}>
            folder
          </span>
          <span>{folderTitle}</span>
        </div>
        <div className="folder-header-item">
          <span className="material-icons" onClick={onDeleteHandler}>
            delete
          </span>
          <span className="material-icons" onClick={onEditFolderTitle}>
            edit
          </span>
          <button onClick={openCreateCardModale}>
            <span class="material-icons">add</span>
            New Playground
          </button>
        </div>
      </div>
      <div className="cards-container">
        {cards?.map((file, index) => {
          const onEditFile = () => {
            if (file.id && folderId) {
              setModalPayload({ fileId: file.id, folderId: folderId });
            } else {
              console.error("file or folderId is undefined");
            }
            openModal(modelConstant.UPDATE_FILE_TITLE);
          };

          const onDeleteFile = () => {
            deleteFile(folderId, file.id)
          }

          const openPlaygroundPage = () => {
            navigate(`playground/${file.id}/${folderId}`)
          }

          return (
            <div className="card" key={index}>
              <img src="./code.png" alt="codeLogo" />
              <div className="title-container" onClick={openPlaygroundPage}>
                <span>{file?.title}</span>
                <span>Language {file?.language} </span>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <span className="material-icons" onClick={onDeleteFile}>delete</span>
                <span className="material-icons" onClick={onEditFile}>
                  edit
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RightContainer = () => {
  const { folders } = useContext(PlaygroundContext);
  const modalFeatures = useContext(ModalContext);

  const openCreateNewFolderModel = () => {
    modalFeatures.openModal(modelConstant.CREATE_FOLDER);
  };
  return (
    <div className="right-container">
      <div className="header">
        <div className="title">
          My<span> Playground</span>
        </div>
        <button onClick={openCreateNewFolderModel}>
          <span className="material-icons">add</span>New Folder
        </button>
      </div>
      {folders?.map((folder, index) => (
        <Folders
          folderTitle={folder?.title}
          cards={folder?.files}
          key={index}
          folderId={folder.id}
        />
      ))}
    </div>
  );
};

export default RightContainer;
