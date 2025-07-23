import { useState } from 'react'
import Step1Accommodation from './Step1Accommodation'
import Step2Owner from './Step2Owner'
import Step3Summary from './Step3Summary'

const AccommodationForm = ({ element }: { element: HTMLElement }) => {
  const [step, setStep] = useState(1)
  const handleclickBtn = () => {
    if (step === 3) {
      const customEvent = new CustomEvent('custom-react-submit', {
        detail: "haha"
      })
      element.dispatchEvent(customEvent)
    } else {
      setStep(step + 1)
    }
  }
  return (

    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-8">
      {step === 1 && <Step1Accommodation />}
      {step === 2 && <Step2Owner />}
      {step === 3 && <Step3Summary />}

      <button onClick={handleclickBtn} className="w-full px-6 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition">
        {step === 1 ? 'Next' : 'Submit'}
      </button>
    </div>
  )
}

export default AccommodationForm