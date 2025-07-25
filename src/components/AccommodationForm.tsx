import { useContext, useState } from 'react'
import Step1Accommodation from './Step1Accommodation'
import Step2Owner from './Step2Owner'
import Step3Summary from './Step3Summary'
import { FormContext } from '../context/FormContext'
import Step4SuccessPage from './Step4SuccessPage'

const initialStepsValidation = {
  step1: false,
  step2: false,
  step3: true
}

const steps = [
  { id: 1, label: "Accommodation" },
  { id: 2, label: "Owner" },
  { id: 3, label: "Summary" },
];

const AccommodationForm = ({ element }: { element: HTMLElement }) => {
  const [step, setStep] = useState(1)
  const [stepsValidation, setStepsValidation] = useState(initialStepsValidation)
  const currentStep: string = `step${step}`
  const { updateFormData, formData, resetForm } = useContext(FormContext)

  const checkStepValidation = (isStepValid: boolean) => {
    setStepsValidation((prev) => ({ ...prev, [currentStep]: isStepValid }));
  }

  const handleclickBtn = () => {
    setStep(step + 1)
    if (step === 3) {
      const customEvent = new CustomEvent('custom-react-submit', { detail: formData })
      element.dispatchEvent(customEvent)

      setTimeout(() => {
        resetForm()
        setStep(1)
      }, 1500)
    }
  }
  return (
    <div className="w-full max-w-xl min-w-[320px] px-4 mx-auto mb-6">

      <div className=" min-w-[320px] px-4 mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-8">
        {step === 1 && <Step1Accommodation title={steps[0].label} checkStepValidation={checkStepValidation} updateFormData={updateFormData} formData={formData} />}
        {step === 2 && <Step2Owner title={steps[1].label} checkStepValidation={checkStepValidation} updateFormData={updateFormData} formData={formData} />}
        {step === 3 && <Step3Summary stepsTitles={[steps[0].label, steps[1].label]} formData={formData} />}
        {step === 4 && <Step4SuccessPage />}

        {step != 4 && <button disabled={!stepsValidation[currentStep as keyof typeof stepsValidation]} onClick={handleclickBtn} className="w-full px-6 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition disabled:bg-gray-300">
          {step < 3 ? 'Next' : 'Submit'}
        </button>}
      </div>

    </div>
  )
}

export default AccommodationForm
