import React from "react";

//sign-up
function Register({ onAddUser }) {
  const [email, setEmail] = React.useState("");
 const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log('hello')
    onAddUser({
      email,
      password,
    });
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
          <button className="register__log-in button-hover">Войти</button>
        </span>
      </div>
    </div>
  );
}

export default Register;
