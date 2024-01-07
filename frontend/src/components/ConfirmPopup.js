import React from "react";
import PopupWithForm from "./PopupWithForm";


function ConfirmPopup({isOpen, onSubmit, inProgress, onClose}) {

  function _onSubmit(e) {
    e.preventDefault();

    onSubmit();
  }

  return (
    <PopupWithForm
      title="Вы уверены ?"
      saveButtonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={_onSubmit}
      inProgress={inProgress}
      saveButtonTextInProcress='В процессе...'
      isValid={true}
    />
  )
}

export default ConfirmPopup;