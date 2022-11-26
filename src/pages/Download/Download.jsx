import React, {useRef, useState} from 'react';
import qrImg from '../../assets/img/qr.svg'
import QrReader from 'qr-reader-react';
import {endpoints, postData} from "../../API";

const Download = ({countStep, setStep}) => {
  const [data, setData] = useState('');
  const qrRef = useRef(null)
  const [isSuccess, setIsSuccess] = useState()
  const [Error, setError] = useState('')

  async function sendQr(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append("qr", data)

    try {
      const response = await postData(endpoints.scan, formData)
      if (response.data.error === 1) {
        setError(response.data.error_text)
      } else {
        setError("")
        setStep(6)
      }
    } catch (e) {
      setError(e.response.data.error_text)
    }
  }

  const handleScanFile = (result) => {
    if (result) {
      setIsSuccess(true)
      setData(result)
      setError("")
    } else {
      setError("QR Code не распознан")
      setIsSuccess(false)
    }
  }

  const onScanFile = (e) => {
    e.preventDefault()
    qrRef.current.openImageDialog()
  }

  return (
    <div className="download container-primary">
      <h3>Загрузка чека</h3>
      <form className="download__form form" onSubmit={sendQr}>
        <div className="form__content">
          <div className="download-file" onClick={onScanFile}>
								<span className="download-file__img">
									<img src={qrImg} alt=""/>
								</span>
            <p className="download-file__title">
              Загрузите фотографию QR-кода на чеке или перетащите его сюда
            </p>
            <p className="download-file__desc">
              На фотографии должен быть хорошо видео QR-код. Формат фото PNG,
              JPEG, максимальный размер – 10 Мб
            </p>
          </div>
        </div>
        <QrReader
          ref={qrRef}
          delay="300"
          onScan={handleScanFile}
          legacyMode="true"
          style={{display: 'none'}}
        />

        {Error !== "" ?
          <p className="error">{Error}</p>
          :
          <p className="error"></p>
        }

        <div className="buttons-group">
          <button className="button button__secondary" onClick={countStep}>
            Ввести чек вручную
          </button>
          {isSuccess ?
            <button className="button button__primary">Продолжить</button>
            :
            <button className="button button__primary" onClick={onScanFile}>Выбрать фотографию</button>
          }
        </div>
      </form>
    </div>
  );
};

export default Download;