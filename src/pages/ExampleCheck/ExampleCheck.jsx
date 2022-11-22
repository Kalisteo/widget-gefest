import React from 'react';
import InputMask from "react-input-mask";
import exampleCheck from "../../assets/img/example-check.png"
import arrow from "../../assets/img/arrow.svg";


const ExampleCheck = ({setStep}) => {
  return (
    <>
      <span className="gefest__back">
         <img src={arrow} onClick={() => setStep(5)} alt=""/>
      </span>

      <div className="example-check container-primary">
        <h3>Информация о чеке</h3>
        <div className="example-check__content">
          <div className="example-check__img">
            <img src={exampleCheck} alt=""/>
          </div>
          <div className="example-check__notice">
            <p>
              Внимание!<br/>
              Ваш чек может отличаться от примера
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExampleCheck;