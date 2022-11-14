import React from 'react';
import qrImg from '../../assets/img/qr.svg'


const Download = ({countStep}) => {
  return (
    <div className="download container">
      <h3>Загрузка чека</h3>
      <form className="download__form form">
        <div className="form__content">
          <div className="download-file">
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
        <div className="buttons-group">
          <button className="button button__secondary">Сканировать чек</button>
          <button className="button button__secondary" onClick={countStep}>
            Ввести чек вручную
          </button>
          <button className="button button__primary">Выбрать фотографию</button>
        </div>
      </form>
    </div>

  );
};

export default Download;