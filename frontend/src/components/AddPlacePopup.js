import React, {useEffect} from "react";

import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function AddPlacePopup({isOpen, onClose, inProgress, onCreateCard}) {
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation()

  useEffect(() => {
    setValues({})
  }, [isOpen, setValues])

  function handleSubmit(e) {
    e.preventDefault()

    onCreateCard({"name": values.title, "link": values.image})
    resetForm()
  }

  return (
    <PopupWithForm name="add-card" title="Новое место" isOpen={isOpen} onClose={onClose} inProgress={inProgress} onSubmit={handleSubmit} isValid={isValid}>
      <input className="popup__input" onChange={handleChange} value={values.title || ''} id="title" type="text" name="title" placeholder="Название" minLength="2" maxLength="30" required/>
      <span className="popup__input-error">{errors.title || ''}</span>
      <input className="popup__input" onChange={handleChange} value={values.image || ''} id="image" type="url" name="image" placeholder="Ссылка на картинку" required/>
      <span className="popup__input-error">{errors.image || ''}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;