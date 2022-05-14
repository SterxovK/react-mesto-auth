import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//sign-in
function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   setEmail("");
  //   setPassword("");
  // }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (onRegister && email && password) {
      onRegister({
        password,
        email,
      });
    }

    //console.log(email, password);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="register">
      <div className="register__content">
        <p className="register__title">Регистрация</p>
        <form className="register__form" type="submit" onSubmit={handleSubmit}>
          <input
            className="register__form-field"
            type="email"
            placeholder="Email"
            onChange={handleChangeEmail}
            required
          />
          <input
            className="register__form-field"
            type="password"
            placeholder="Пароль"
            onChange={handleChangePassword}
            required
          />
          <button className="register__button button-hover">
            Зарегистрироваться
          </button>
        </form>
        <span className="register__already">
          Уже зарегистрированы?
          <Link to="/sign-in" className="register__log-in button-hover">
            {" "}
            Войти
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
