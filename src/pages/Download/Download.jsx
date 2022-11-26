import React, {useRef, useState} from 'react';
import qrImg from '../../assets/img/qr.svg'
import QrReader from 'qr-reader-react';
import {endpoints, postData} from "../../API";

const Download = ({countStep, setStep}) => {
  const [data, setData] = useState('');
  const qrRef = useRef(null)
  const [isSuccess, setIsSuccess] = useState()
  const [Error, setError] = useState('')

  function sendQr (e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append("qr", data)

    postData(endpoints.scan, {
      qr:"t=20221125T156720&s=579.00&fn=9960440302139282&i=18459&fp=2447827354&n=1"
    }, `${localStorage.getItem("token")}`)
      .then((response) => {
        if (response.data.error === 0) {
          setError("")
          setStep(6)
        }
        setError(response.data.error_text)
      })
      .catch((e) => {
        setError(e.response.data.error_text)
      })
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
          // onError={handleErrorFile}
          onScan={handleScanFile}
          legacyMode="true"
          style={{display: 'none'}}
        />

        {Error != "" ?
          <p style={{marginTop:"15px"}} className="error">{Error}</p>
          :
          <p style={{marginTop:"15px", height:"20px"}} className="error"></p>
        }

        {/*{setError === false ?*/}
        {/*  <p className="error">QR Code не распознан</p>*/}
        {/*  :*/}
        {/*  null*/}
        {/*}*/}
        <div className="buttons-group">
          <button className="button button__secondary" onClick={countStep}>
            Ввести чек вручную
          </button>
          {isSuccess ?
            <button className="button button__primary" >Продолжить</button>
            :
            <button className="button button__primary" onClick={onScanFile}>Выбрать фотографию</button>
          }
        </div>
      </form>
    </div>
  );
};

export default Download;