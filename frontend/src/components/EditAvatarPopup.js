import React, {useRef, useEffect} from "react";

import PopupWithForm from "./PopupWithForm"


function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, inProgress}) {
  const avatartRef = useRef();

  useEffect(() => {
    avatartRef.current.value = '';
  }, [isOpen])

  function handleOnSubmit(e) {
    e.preventDefault()

    onUpdateAvatar({avatar: avatartRef.current.value});
  }

  return (
    <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose} onSubmit={handleOnSubmit} inProgress={inProgress}>
      <input className="popup__input" id="avatar" ref={avatartRef} type="url" name="url" placeholder="Ссылка новый аватар" required/>
      <span className="avatar-error popup__input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup