import React, {useEffect, useState} from 'react';
import InputMask from "react-input-mask"
import {endpoints, postData} from "../../API";

const EnterNumber = ({number, responseCode, setResponseCode, setNumber, countStep}) => {

  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [Error, setError] = useState('')

  function sendNumber(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append("phone", number)
    postData(endpoints.getCode, formData)
      .then((response) => {
        setResponseCode(response.data.code)
        countStep()
      })
      .catch((e) => {
        setError(e.response.data.error_text)
      })
  }

  useEffect(() => {
    if (number.trim().length === 16) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }, [number])

  return (
    <div className="enter-number container-secondary">
      <div className="enter-number__header header">
        <h3>Введите номер телефона</h3>
        <p>чтобы войти или зарегестрироваться</p>
      </div>
      <form className="enter-number__form form" onSubmit={e => sendNumber(e)}>
        <div className="form__content">
          <div className="form__field">
            <p>Номер телефона</p>
            <span className="form__input">
              <InputMask
                type="text"
                mask="+7\ 999 999 99 99"
                maskChar={null}
                inputMode="numeric"
                value={number}
                onChange={e => setNumber(e.target.value)}
              />
            </span>
          </div>
        </div>
        {Error != "" ?
          <p className="error">{Error}</p>
          :
          null
        }
        <button type="submit" className="button button__primary" disabled={isButtonDisabled} >
          Продолжить
        </button>
      </form>

      <p className="enter-number__terms">Нажимая “Продолжить”, я даю согласие на обработку<br/> указанных данных на
        условиях, определенных<br/>
        в <a href="#">Правилах проведения Акции</a></p>
    </div>
  );
};

export default EnterNumber;