import { useState } from "react";

function Login({ onLogin }) {

  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values);
  }

  return (
    <div className="register">
      <div className="register__content">
        <p className="register__title">Вход</p>
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
          <button
            className="register__button button-hover"
            //disabled={!values.formValid}
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
