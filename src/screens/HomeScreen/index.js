import { useContext } from "react";
import RightContainer from "./RightContainer";
import "./style.scss";
import { ModalContext, modelConstant } from "../../providers/ModalProvider";
import Modal from "../../providers/Modals/Modal";

const HomeScreen = () => {

  const modalFeatures = useContext(ModalContext)

  const openCreatePlaygroundModal = () => {
    modalFeatures.openModal(modelConstant.CREATE_PLAYGROUND);
  }
  return (
    <div className="home-container">
      <div className="left-container">
        <div className="items-container">
          <img src="./logo.png" alt="logo"/>
          <h1>CODE EDITOR</h1>
          <h1>CODE. COMPILE. DEBUG</h1>
          <button onClick={openCreatePlaygroundModal}>
            <span className="material-icons">add</span>
            Create Playground
          </button>
        </div>
      </div>
      <RightContainer/>
      <Modal/>
    </div>
  );
};

export default HomeScreen;
