import React, { useContext } from 'react';
import CurentUserContext from "../contexts/CurentUserContext";


function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const curentUser = useContext(CurentUserContext);

  const isLiked = card.likes.some(user => user._id === curentUser._id);
  const cardLikeButtonClassName = (
    `photo-container__like-button ${isLiked && 'photo-container__like-button_active'}`
  );
  const isOwn = card.owner._id === curentUser._id;

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="photo-container">
      {isOwn && <button className="photo-container__delete-button" onClick={handleDeleteClick}></button>}
      <img className="photo-container__image" alt={`фотография ${card.name}`} src={card.link} onClick={handleClick}/>
      <div className="photo-container__content">
        <h2 className="photo-container__title">{card.name}</h2>
        <div className="photo-container__like-block">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <span className="photo-container__like-count" href='/'>{Array.from(card.likes).length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;