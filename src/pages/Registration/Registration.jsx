import {React, useState, useEffect} from 'react';
import {useForm} from "react-hook-form";
import {endpoints, postData} from "../../API";

const Registration = ({countStep}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [Error, setError] = useState('')
  const [valueFields, setValueFields] = useState({
    "surname": "",
    "name": "",
    "patronymic": "",
    "email": ""
  })

  const {
    register, getFieldState, formState:
      {errors, isDirty, dirtyFields, isValid},
    handleSubmit
  } = useForm({
    mode: "onChange",
  });

  const changeHandler = (e) => {
    const data = {...valueFields}
    data[e.target.id] = e.target.value
    setValueFields(data)
  }

  async function sendData(e) {
    const formData = new FormData()
    formData.append("name", valueFields.name + ' ' + valueFields.surname + ' ' + valueFields.patronymic)
    formData.append("email", valueFields.email)

    try {
      const response = await postData(endpoints.user, formData,)
      if (response.data.error === 0) {
        countStep()
      }
    } catch (e) {
      setError(e.response.data.error_text)
    }

  }

  useEffect(() => {
    if (isValid) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }, [isValid])

  return (
    <div className="registration container-primary">
      <h3>Регистрация</h3>
      <form className="registration__form form" onSubmit={handleSubmit(sendData)}>
        <div className="form__content">
          <div className="form__field">
            <p>Фамилия</p>
            <span
              className={`form__input ${errors.surname ? "form__input--error" : !getFieldState("surname").isDirty ? "" : "form__input--success"}`}>
              <input
                {...register('surname', {
                  required: true,
                  pattern: {
                    value: /^[A-Za-zА-Яа-яё]{2,40}$/,
                  },
                  onChange: e => changeHandler(e)
                })}
                id="surname"
                type="text"
                placeholder="Введите вашу фамилию"
              />
            </span>
          </div>
          <div className="form__field">
            <p>Имя</p>
            <span
              className={`form__input ${errors.name ? "form__input--error" : !getFieldState("name").isDirty ? "" : "form__input--success"}`}>
              <input
                {...register('name', {
                  required: true,
                  minLength: 2,
                  pattern: {
                    value: /^[A-Za-zА-Яа-яё]{2,40}$/,
                  },
                  onChange: e => changeHandler(e)
                })}
                id="name"
                type="text"
                placeholder="Введите ваше имя"

              />
            </span>
          </div>
          <div className="form__field">
            <p>Отчество</p>
            <span
              className={`form__input ${errors.patronymic ? "form__input--error" : !getFieldState("patronymic").isDirty ? "" : "form__input--success"}`}>
              <input
                {...register('patronymic', {
                  pattern: {
                    value: /^[A-Za-zА-Яа-яё]+$/,
                  },
                  onChange: e => changeHandler(e)
                })}
                id="patronymic"
                type="text"
                placeholder="Введите ваше отчество"
              />
            </span>
          </div>
          <div className="form__field">
            <p>Email</p>
            <span
              className={`form__input ${errors.email ? "form__input--error" : !getFieldState("email").isDirty ? "" : "form__input--success"}`}
            >
              <input
                {...register('email', {
                  required: true,
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  },
                  onChange: e => changeHandler(e)
                })}
                id="email"
                type="text"
                placeholder="Введите ваш email"
              />
            </span>
          </div>
        </div>

        {Error !== "" ?
          <p style={{marginTop: "15px"}} className="error">{Error}</p>
          :
          <p style={{marginTop: "15px", height: "20px"}} className="error"></p>
        }

        <button type="submit" className="button button__primary" disabled={isButtonDisabled}>
          Зарегистрироваться
        </button>
      </form>
    </div>

  );
};

export default Registration;