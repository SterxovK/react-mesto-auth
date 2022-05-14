import React from "react";
//sign-up

function Login({onLogin}) {
 const [email, setEmail] = React.useState("");
 const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({
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
        <p className="register__title">Вход</p>
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
            Войти
          </button>
        </form>
        
      </div>
    </div>
  );
}

export default Login;
