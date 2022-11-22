import React, {useEffect, useState} from 'react';
import Registration from "../pages/Registration/Registration";
import closeImg from "../assets/img/close.svg"
import openWidgetPcImg from "../assets/img/open-widget-pc.svg"
import openWidgetMobileImg from "../assets/img/open-widget-mobile.svg"
import style from '../styles/style.scss'
import Download from "../pages/Download/Download";
import Success from "../pages/Success/Success";
import Data from "../pages/Data/Data";
import EnterNumber from "../pages/EnterNumber/EnterNumber";
import ConfirmNumber from "../pages/ConfirmNumber/ConfirmNumber";
import ExampleCheck from "../pages/ExampleCheck/ExampleCheck";
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size/throttled'

const Widget = () => {

  const [isVisible, setIsVisible] = useState(false)
  const [step, setStep] = useState(1)
  const [number, setNumber] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  const onlyWidth = useWindowWidth()

  useEffect(() => {
    if (onlyWidth < 768) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [onlyWidth])

  const countStep = (e) => {
    e.preventDefault()
    if (step < 6) {
      setStep(step + 1)
    } else {
      setStep(1)
      setIsVisible(false)
    }
  }

  const steps = {
    "1": <EnterNumber number={number} setNumber={setNumber} countStep={countStep}/>,
    "2": <ConfirmNumber number={number} countStep={countStep}/>,
    "3": <Registration countStep={countStep}/>,
    "4": <Download countStep={countStep} setStep={setStep}/>,
    "5": <Data countStep={countStep} setStep={setStep}/>,
    "6": <Success setStep={setStep} countStep={countStep}/>,
    "7": <ExampleCheck setStep={setStep}/>
  }

  return (
    <div>
      <div className="open-gefest" onClick={() => setIsVisible(!isVisible)}>
        <img src={isMobile ? openWidgetMobileImg : openWidgetPcImg} alt=""/>
      </div>

      {isVisible && (
        <section className="gefest">
          <div className="gefest__wrapper">
            <span className="gefest__close">
             <img src={closeImg} onClick={() => setIsVisible(!isVisible)} alt=""/>
            </span>
            {/*<Download/>*/}
            {steps[step]}
          </div>
        </section>
      )}

    </div>

  );
};

export default Widget;