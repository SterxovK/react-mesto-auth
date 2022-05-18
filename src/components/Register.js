import { Link, withRouter } from "react-router-dom";
import { React, useState } from "react";

const Register = ({ onRegister }) => {
  const [values, setValues] = useState({});
  function handleChange(evt) {
    const { name, value } = evt.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values);
  }

  return (
    <div className="register">
      <div className="register__content">
        <h3 className="register__title">Регистрация</h3>
        <form className="register__form" type="submit" onSubmit={handleSubmit}>
          <input
            name="email"
            className="register__form-field"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            className="register__form-field"
            type="password"
            placeholder="Пароль"
            onChange={handleChange}
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
};

export default withRouter(Register);
