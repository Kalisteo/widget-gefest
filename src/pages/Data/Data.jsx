import React from 'react';

const Data = ({countStep}) => {
  return (


    <div className="data container">
      <h3>Введите данные чека</h3>
      <form className="data__form form">
        <div className="form__content">
          <div className="form__field">
            <p>Дата и время покупки (Указаны в начале или конце чека)</p>
            <span className="form__input">
              <input
                type="text"
                placeholder="дд.мм.ггг --:--"
              />
            </span>
          </div>
          <div className="form__field">
            <p>Сумма чека (Укажите с копейками, например: 78,90)</p>
            <span className="form__input">
              <input
                type="text"
                placeholder="Сумм чека"
              />
            </span>
          </div>
          <div className="form__field">
            <p>16 цифр, в начале или конце чека</p>
            <span className="form__input">
              <input
                type="text"
                placeholder="ФН"
              />
            </span>
          </div>
          <div className="form__field">
            <p>Обычно 3-5 цифр, в конце чека</p>
            <span className="form__input">
              <input
                type="text"
                placeholder="ФД"
              />
            </span>
          </div>
          <div className="form__field">
            <p>Обычно 8-10 цифр, в конце чека</p>
            <span className="form__input">
              <input
                type="text"
                placeholder="ФП или ФПД"
              />
            </span>
          </div>
        </div>
        <div className="buttons-group">
          <button className="button button__primary" onClick={countStep}>
            Отправить данные чека
          </button>
        </div>

      </form>
    </div>
  );
};

export default Data;