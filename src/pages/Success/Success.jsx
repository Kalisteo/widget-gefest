import React from 'react';
import successImg from '../../assets/img/success.svg'
import rubImg from '../../assets/img/rub.svg'

const Success = ({setStep, countStep}) => {
  return (
    <div className="success container-primary">
      <div className="success__header">
            <span>
              <img src={successImg} alt=""/>
            </span>
        <h3>Чек успешно загружен</h3>
        <p>Обычно проверка занимает до 3 дней</p>
      </div>

      <div className="success__content">
            <span>
              <img src={rubImg} alt=""/>
            </span>
        <p className="success__text">
          Вы получите <span>20%</span> <br/>
          Кэшбэка от суммы чека
        </p>
        <p className="success__subtext">отправим на карту с которой производилась оплата</p>
      </div>

      <div className="buttons-group">
        <button className="button button__secondary" onClick={countStep}>Спасибо</button>
        <button className="button button__primary" onClick={() => setStep(4)}>
          Добавить еще один чек
        </button>
      </div>
    </div>
  );
};

export default Success;