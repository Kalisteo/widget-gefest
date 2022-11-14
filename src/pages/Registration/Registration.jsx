import React from 'react';

const Registration = ({countStep}) => {

  return (
    <div className="registration container">
      <h3>Регистрация</h3>
      <form className="registration__form form">
        <div className="form__content">
          <div className="form__field">
            <p>Фамилия</p>
            <span className="form__input">
              <input
                type="text"
                placeholder="Введите вашу фамилию"
              />
            </span>
          </div>
          <div className="form__field">
            <p>Имя</p>
            <span className="form__input">
              <input
                type="text"
                placeholder="Введите ваше имя"
              />
            </span>

          </div>
          <div className="form__field">
            <p>Отчество</p>
            <span className="form__input form__input--success">
              <input
                type="text"
                placeholder="Введите ваше отчество"
              />
            </span>


          </div>
          <div className="form__field">
            <p>Телефон</p>
            <span className="form__input">
             <input
               type="text"
               placeholder="+7 (___) ___-__-__"
               maxLength="11"
             />
            </span>

          </div>
          <div className="form__field">
            <p>Email</p>
            <span className="form__input form__input--error">
              <input
                type="text"
                placeholder="Введите ваш email"
              />
            </span>
          </div>

          <div className="form__field checkbox__field">
            <input type="checkbox" id="checkbox"/>
            <label htmlFor="checkbox"
            >Даю согласие на обработку указанных данных на условиях,
              определенных в <a href="#">Правилах проведения Акции</a>
            </label>
          </div>
        </div>
        <div className="buttons-group">
          <button type="submit" className="button button__primary" onClick={countStep}>Зарегистрироваться</button>
        </div>
      </form>
    </div>

  );
};

export default Registration;