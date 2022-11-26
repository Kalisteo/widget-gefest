import React, {useEffect, useState} from 'react';
import ReactCodeInput from "react-code-input";
import {endpoints, postData} from "../../API";

const ConfirmNumber = ({number, countStep}) => {
  const [code, setCode] = useState('')
  const [Error, setError] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [timeLeft, setTimeLeft] = useState(60)
  const [visibleNotice, setVisibleNotice] = useState(90)

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft - minutes * 60;

  useEffect(() => {
    const timer =
      visibleNotice > 0 &&
      setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1)
        }
        setVisibleNotice(visibleNotice - 1)
      }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft, visibleNotice])

  useEffect(() => {
    if (code.trim().length === 4) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }, [code])


  async function sendCode(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append("phone", number)
    formData.append("code", code)
    try {
      const response = await postData(endpoints.checkCode, formData)
      if (response.data.error) {
        setError(response.data.error_text)
      } else {
        localStorage.setItem("token", `Bearer ${response.data.token}`)
        countStep()
      }
    } catch (e) {
      setError("Что-то пошло не так...")
    }
  }

  async function requestCode() {
    const formData = new FormData()
    formData.append("phone", number)
    setTimeLeft(60)
    return await postData(endpoints.getCode, formData)
  }

  return (
    <div className="confirm-number container-secondary">
      <div className="confirm-number__header header">
        <h3>Подтвердите номер телефона</h3>
        <p>На номер {number} поступит
          сообщение с кодом. </p>
      </div>
      <form className="confirm-number__form form" onSubmit={e => sendCode(e)}>
        <div className="form__content">
          <div className="form__field">
            <ReactCodeInput
              className="check-call-input"
              value={code}
              onChange={(e) => setCode(e)}
              type="number"
              fields={4}
              inputMode="numeric"
            />
          </div>

          {Error !== "" ?
            <p className="error">{Error}</p>
            :
            <p className="error"></p>
          }

          {timeLeft ?
            <p className="confirm-number__timer">Запросить код повторно можно через
              0{minutes}:{seconds >= 10 ? `${seconds}` : `0${seconds}`} </p>
            :
            <button type="button" className="confirm-number__request" onClick={() => requestCode()}>Получить код
              повторно</button>
          }

          {visibleNotice === 0 ?
            <p className="confirm-number__notice">Не получили код?<br/>
              Напишите письмо, о возникших проблемах
              по электронному адресу <a href="mailto:info@chekiizapteki.ru">info@chekiizapteki.ru</a>,
              указав номер своего телефона в теме письма.</p> : ' '
          }
        </div>
        <button type="submit" className="button button__primary" disabled={isButtonDisabled}>
          Продолжить
        </button>
      </form>
    </div>
  );
};

export default ConfirmNumber;