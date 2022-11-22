import React, {useRef, useState} from 'react';
import qrImg from '../../assets/img/qr.svg'
import QrReader from 'qr-reader-react';

const Download = ({countStep, setStep}) => {
  const [data, setData] = useState('');
  const qrRef = useRef(null)
  const [isSuccess, setIsSuccess] = useState()

  const handleErrorFile = (error) => {
    console.log(error)
  }

  const handleScanFile = (result) => {
    if (result) {
      setIsSuccess(true)
      setData(result)
    } else (
      setIsSuccess(false)
    )
  }

  const onScanFile = (e) => {
    e.preventDefault()
    qrRef.current.openImageDialog()
  }

  return (
    <div className="download container-primary">
      <h3>Загрузка чека</h3>
      <form className="download__form form">
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
          onError={handleErrorFile}
          onScan={handleScanFile}
          legacyMode="true"
          style={{display: 'none'}}
        />
        {isSuccess === false ?
          <p className="download-file__error">QR Code не распознан</p>
          :
          null
        }
        <div className="buttons-group">
          <button className="button button__secondary" onClick={countStep}>
            Ввести чек вручную
          </button>
          {isSuccess ?
            <button className="button button__primary" onClick={() => setStep(6)}>Продолжить</button>
            :
            <button className="button button__primary" onClick={onScanFile}>Выбрать фотографию</button>
          }
        </div>
      </form>
    </div>
  );
};

export default Download;