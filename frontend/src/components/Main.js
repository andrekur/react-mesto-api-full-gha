import React, { useContext } from 'react';

import Card from './Card';

import CurentUserContext from "../contexts/CurentUserContext";


function Main({ cards, onEditAvatar, onAddPlace, onEditProfile, onCardClick, onCardDelete, onCardLike }) {
  const curentUser = useContext(CurentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-block" onClick={onEditAvatar}>
          <img className="profile__avatar-img" alt="Аватарка пользователя" src={curentUser?.avatar} />
        </div>
        <div className="profile__info">
          <div className="profile__content">
            <h1 className="profile__name">{curentUser?.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__about">{curentUser?.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="photos">
        <ul className="photos__items">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                onCardClick={onCardClick}
                key={card._id}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  )
}

export default Main