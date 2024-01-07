import React from 'react';
import { usePopupClose } from '../hooks/usePopupClose';


function PopupWithForm({isOpen, title, name, children, onClose, saveButtonText='Сохранить', onSubmit, inProgress, saveButtonTextInProcress='Сохранение...', isValid}) {
  const openClassName = isOpen ? 'popup_opened' : ''
  const blockedSubmitClassName = inProgress || !isValid ? 'popup__save_disabled' : '';
  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_type_${name} ${openClassName}`}>
      <div className="popup__content">
        <button className="popup__close" type="button" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          { children }
          <button className={`popup__save ${blockedSubmitClassName}` } type="submit">{inProgress ? saveButtonTextInProcress : saveButtonText}</button>
        </form>
      </div>
  </div>
  )
}

export default PopupWithForm