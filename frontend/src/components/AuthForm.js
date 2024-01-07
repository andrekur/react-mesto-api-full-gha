import React from "react";
import { useNavigate } from "react-router-dom";

function AuthForm({title, inProgress, children, onSubmit, submitButtonText, subTitleText, isValid}){
  const blockedSubmitClassName = inProgress || !isValid ? 'popup__save_disabled' : '';
  const saveButtonTextInProcress = 'Сохранение...';

  const navigate = useNavigate();
  function routeChange(e) {
    navigate('/signup')
  }

  return (
    <main className="auth__content">
      <h2 className="popup__title-middle popup__title-middle_white">{title}</h2>
      <form className="popup__form" onSubmit={onSubmit}>
        { children }
        <button className={`popup__save popup__save_white ${blockedSubmitClassName}` } type="submit">{inProgress ? saveButtonTextInProcress : submitButtonText}</button>
      </form>
      { subTitleText && <a className="auth__sub-title" onClick={routeChange}>{subTitleText}</a> }
    </main>
  )
}

export default AuthForm;
