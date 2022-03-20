import React from "react";
import styles from "./styles/Modal.module.css";

export interface IModal {
  children: React.ReactNode;
}

export function Modal({ children }: IModal) {
  const closeModal = (e: React.MouseEvent): void => {
    const modal = document.querySelector("#modal");
    modal!.classList.add("hide");
  };
  return (
    <div id="modal" className="hide">
      <div className={styles.fade} onClick={closeModal}></div>
      <div className={styles.modal}>
        <h2>Texto modal</h2>
        {children}
      </div>
    </div>
  );
}
