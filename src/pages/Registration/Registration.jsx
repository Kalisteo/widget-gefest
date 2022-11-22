import {React, useState, useEffect} from 'react';
import {useForm} from "react-hook-form";

const Registration = ({countStep}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const {
    register, getFieldState, formState:
      {errors, isDirty, dirtyFields, isValid},
    handleSubmit
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = data => {
    console.log(data);
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
      <form className="registration__form form" onSubmit={handleSubmit(onSubmit)}>
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
                  }
                })}
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
                  }
                })}
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
                  }
                })}
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
                  }
                })}

                type="text"
                placeholder="Введите ваш email"
              />
            </span>
          </div>
        </div>
        <button type="submit" className="button button__primary" disabled={isButtonDisabled}
                onClick={countStep}>Зарегистрироваться
        </button>
      </form>
    </div>

  );
};

export default Registration;