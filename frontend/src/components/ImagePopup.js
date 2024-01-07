import React from 'react';

import { usePopupClose } from '../hooks/usePopupClose';


function ImagePopup({card, onClose}) {
  const openClassName = card ? 'popup_opened' : ''
  usePopupClose(Boolean(card), onClose);

  return (
    <div className={`popup ${openClassName}`}>
      <figure className="popup__figure">
        <button className="popup__close" type="button" onClick={onClose}></button>
        <img className="popup__image" alt={`фотография ${card?.name}`} src={card?.link}/>
        <figcaption className="popup__figcaption">{card?.name}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup