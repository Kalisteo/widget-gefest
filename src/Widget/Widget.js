import React, {useState} from 'react';
import Registration from "../pages/Registration/Registration";
import closeImg from "../assets/img/close.svg"
import openWidgetImg from "../assets/img/open-widget.svg"
import style from '../styles/style.scss'
import Download from "../pages/Download/Download";
import Success from "../pages/Success/Success";
import Data from "../pages/Data/Data";


const Widget = () => {

  const [isVisible, setIsVisible] = useState(false)
  const [step, setStep] = useState(1)


  const countStep = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      setStep(1)
      setIsVisible(false)
    }
  }

  const steps = {
    "1": <Registration countStep={countStep}/>,
    "2": <Download countStep={countStep}/>,
    "3": <Data countStep={countStep}/>,
    "4": <Success setStep={setStep} countStep={countStep}/>
  }


  return (
    <div>
      <div className="open-gefest" onClick={() => setIsVisible(!isVisible)}>
        <img src={openWidgetImg} alt=""/>
      </div>

      {isVisible && (
        <section className="gefest">
          <div className="gefest__wrapper">
        <span className="gefest__close">
        <img src={closeImg} onClick={() => setIsVisible(!isVisible)} alt=""/>
        </span>
            {steps[step]}
          </div>
        </section>
      )}

    </div>

  );
};

export default Widget;