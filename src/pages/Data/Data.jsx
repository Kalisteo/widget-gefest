import React, {useState} from 'react';
import arrow from "../../assets/img/arrow.svg";
import {useForm} from "react-hook-form";
import DatePicker, {registerLocale} from "react-datepicker";
import ru from "date-fns/locale/ru/index.js";
import {endpoints, postData} from "../../API";

registerLocale('ru', ru)

const Data = ({countStep, setStep}) => {

  const [dateField, setDateField] = useState(new Date());
  const [Error, setError] = useState('')
  const [valueFields, setValueFields] = useState({
    "date": "",
    "sum": "",
    "fn": "",
    "fd": "",
    "fp": ""
  })

  const date = dateField.getFullYear() + "-" + (dateField.getMonth() + 1) + "-" + dateField.getDate() + " "
    + dateField.getHours() + ":" + dateField.getMinutes() + ":00"
  const {
    register, getFieldState, formState:
      {errors, isDirty, dirtyFields, isValid},
    handleSubmit
  } = useForm({
    mode: "onChange",
  });

  const changeHandler = (e) => {
    const value = e.target.value
    e.target.value = value.replace(/[^\d\,]/g, "")
    const data = {...valueFields}
    data[e.target.id] = e.target.value
    setValueFields(data)
  }

  async function sendCheck(e) {
    const formData = new FormData()
    formData.append("t", date)
    formData.append("s", valueFields.sum)
    formData.append("fn", valueFields.fn)
    formData.append("fd", valueFields.fd)
    formData.append("fp", valueFields.fp)

    try {
      const response = await postData(endpoints.create, formData)
      if (response.data.error !== 1) {
        countStep()
      }
    } catch (e) {
      setError(e.response.data.error_text)
    }
  }

  return (
    <>
      <span className="gefest__back">
        <img src={arrow} onClick={() => setStep(4)} alt=""/>
      </span>
      <div className="data container-primary">
        <h3>Введите данные чека</h3>
        <form className="data__form form" onSubmit={handleSubmit(sendCheck)}>
          <div className="form__content">
            <div className="form__field">
              <p>Дата и время покупки (Указаны в начале или конце чека)</p>
              <span
                className={`form__input ${errors.date ? "form__input--error" : !getFieldState("date").isDirty ? "" : "form__input--success"}`}
              >
                <DatePicker
                  locale="ru"
                  dateFormat="dd.MM.yyyy HH:mm"
                  selected={dateField}
                  timeInputLabel="Время:"
                  showTimeInput
                  onChange={(date) => setDateField(date)}
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
                  onChange: e => changeHandler(e)
                })}
                id="sum"
                type="text"
                placeholder="Сумм чека"
                inputMode="numeric"
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
                  maxLength: 16,
                  onChange: e => changeHandler(e)
                })}
                id="fn"
                type="text"
                placeholder="ФН"
                inputMode="numeric"
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
                  maxLength: 5,
                  onChange: e => changeHandler(e)
                })}
                id="fd"
                type="text"
                placeholder="ФД"
                inputMode="numeric"
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
                  maxLength: 10,
                  onChange: e => changeHandler(e)
                })}
                id="fp"
                type="text"
                placeholder="ФП или ФПД"
                inputMode="numeric"
              />
            </span>
            </div>

            <span className="data__help" onClick={() => setStep(7)}>Как найти информацию о чеке</span>

            {Error !== "" ?
              <p className="error">{Error}</p>
              :
              <p className="error"></p>
            }

          </div>
          <button className="button button__primary">
            Отправить данные чека
          </button>
        </form>
      </div>
    </>
  );
};

export default Data;