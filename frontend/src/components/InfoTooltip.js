import React from "react";
import successImage from "../images/popup/Success.svg";
import failImage from "../images/popup/Fail.svg";
import { usePopupClose } from '../hooks/usePopupClose';


function InfoTooltip({isOpen, onClose, isSuccess}){
  const openClassName = isOpen ? 'popup_opened' : ''
  const title = isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."
  const imageObj = isSuccess ? successImage : failImage;
  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup ${openClassName}`}>
    <div className="popup__content">
      <button className="popup__close" type="button" onClick={onClose} />
      <img className="popup__image-middle" alt={`фотография`} src={imageObj}/>
      <h2 className="popup__title-middle">{title}</h2>
    </div>
    </div>
  )
};

export default InfoTooltip;