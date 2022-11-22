import React, {useState} from 'react';
import InputMask from "react-input-mask"
import arrow from "../../assets/img/arrow.svg";
import {useForm} from "react-hook-form";
import DatePicker, {registerLocale} from "react-datepicker";
import ru from "date-fns/locale/ru/index.js";

registerLocale('ru', ru)


const Data = ({countStep, setStep}) => {

  const [startDate, setStartDate] = useState(new Date());

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

  return (
    <>
      <span className="gefest__back">
        <img src={arrow} onClick={() => setStep(4)} alt=""/>
      </span>
      <div className="data container-primary">
        <h3>Введите данные чека</h3>
        <form className="data__form form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__content">
            <div className="form__field">
              <p>Дата и время покупки (Указаны в начале или конце чека)</p>
              <span
                className={`form__input ${errors.date ? "form__input--error" : !getFieldState("date").isDirty ? "" : "form__input--success"}`}
              >
                <DatePicker
                  locale="ru"
                  dateFormat="dd.MM.yyyy HH:mm"
                  selected={startDate}
                  timeInputLabel="Время:"
                  showTimeInput
                  onChange={(date) => setStartDate(date)}
                />
            </span>
            </div>
            <div className="form__field">
              <p>Сумма чека (Укажите с копейками, например: 78,90)</p>
              <span
                className={`form__input ${errors.sum ? "form__input--error" : !getFieldState("sum").isDirty ? "" : "form__input--success"}`}
              >
              <input
                {...register('sum', {
                  required: true,
                })}
                type="text"
                placeholder="Сумм чека"
                inputmode="numeric"
              />
            </span>
            </div>
            <div className="form__field">
              <p>16 цифр, в начале или конце чека</p>
              <span
                className={`form__input ${errors.fn ? "form__input--error" : !getFieldState("fn").isDirty ? "" : "form__input--success"}`}
              >
              <input
                {...register('fn', {
                  required: true,
                  minLength: 16,
                  maxLength: 16
                })}
                type="text"
                placeholder="ФН"
                inputmode="numeric"
              />
            </span>
            </div>
            <div className="form__field">
              <p>Обычно 3-5 цифр, в конце чека</p>
              <span
                className={`form__input ${errors.fd ? "form__input--error" : !getFieldState("fd").isDirty ? "" : "form__input--success"}`}
              >
              <input
                {...register('fd', {
                  required: true,
                  minLength: 3,
                  maxLength: 5
                })}
                type="text"
                placeholder="ФД"
                inputmode="numeric"
              />
            </span>
            </div>
            <div className="form__field">
              <p>Обычно 8-10 цифр, в конце чека</p>
              <span
                className={`form__input ${errors.fp ? "form__input--error" : !getFieldState("fp").isDirty ? "" : "form__input--success"}`}
              >
              <input
                {...register('fp', {
                  required: true,
                  minLength: 8,
                  maxLength: 10
                })}
                type="text"
                placeholder="ФП или ФПД"
                inputmode="numeric"
              />
            </span>
            </div>

            <span className="data__help" onClick={() => setStep(7)}>Как найти информацию о чеке</span>
          </div>
          <button className="button button__primary" onClick={isValid ? countStep : null}>
            Отправить данные чека
          </button>
        </form>
      </div>
    </>
  );
};

export default Data;