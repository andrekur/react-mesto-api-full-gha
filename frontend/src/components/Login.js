import React from "react";

import { useFormAndValidation } from "../hooks/useFormAndValidation";
import AuthForm from "./AuthForm";


function Login({inProgress, onSubmit}){
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation()

  function handleSubmit(e){
    e.preventDefault()

    onSubmit(values);
    resetForm();
  }

  return (
    <AuthForm
      title='Вход'
      submitButtonText='Войти'
      subTitle='Уже зарегистрированы? Войти'
      inProgress={inProgress}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input className="popup__input popup__input_dark" onChange={handleChange} value={values.email || ''} id="email" type="email" name="email" placeholder="Email" minLength="2" maxLength="30" required/>
      <span className="popup__input-error">{errors.email || ''}</span>
      <input className="popup__input popup__input_dark" onChange={handleChange} value={values.password || ''} id="password" type="password" name="password" placeholder="Пароль" required/>
      <span className="popup__input-error">{errors.password || ''}</span>
    </AuthForm>
  )
}

export default Login;