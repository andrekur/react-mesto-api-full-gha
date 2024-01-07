import React, {useEffect, useContext} from "react";
import CurentUserContext from "../contexts/CurentUserContext";
import PopupWithForm from "./PopupWithForm"
import { useFormAndValidation } from "../hooks/useFormAndValidation";


function EditProfilePopup({isOpen, onClose, onUpdateUser, inProgress}) {
  const curentUser = useContext(CurentUserContext);
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation()

  useEffect(() => {
    if (curentUser) {
      setValues({'name': curentUser.name, 'about': curentUser.about})
    }
  }, [curentUser, isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(values);
    resetForm();
  }


  return (
    <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} inProgress={inProgress} isValid={isValid}>
      <input className="popup__input popup__input_field_name" id="name" value={values.name || ''} onChange={handleChange} type="text" name="name" placeholder="Имя" minLength="2" maxLength="40" required/>
      <span className="popup__input-error">{errors.name || ''}</span>
      <input className="popup__input popup__input_field_about"  id="about" value={values.about || ''} onChange={handleChange} type="text" name="about" placeholder="Описание" minLength="2" maxLength="200" required/>
      <span className="popup__input-error">{errors.about || ''}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup