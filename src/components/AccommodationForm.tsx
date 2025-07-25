import { useContext, useState } from 'react'
import { FormContext } from '../context/FormContext'
import Step1Accommodation from './Step1Accommodation'
import Step2Owner from './Step2Owner'
import Step3Summary from './Step3Summary'
import SubmissionFeedback from './SubmissionFeedback'

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
  const [submissionFeedback, setSubmissionFeedback] = useState<"success" | "fail" | null>(null);

  const currentStep: string = `step${step}`
  const { updateFormData, formData, resetForm } = useContext(FormContext)

  const checkStepValidation = (isStepValid: boolean) => {
    setStepsValidation((prev) => ({ ...prev, [currentStep]: isStepValid }));
  }

  const simulateFormSubmission = () => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5;
      setSubmissionFeedback(isSuccess ? "success" : "fail")

      setTimeout(() => {
        if (isSuccess) {
          const customEvent = new CustomEvent('custom-react-submit', { detail: formData })
          element.dispatchEvent(customEvent)
        }

        resetForm()
        setStep(1)
        setSubmissionFeedback(null)
      }, 2000)

    }, 1000);
  }

  const handleclickBtn = () => {
    setStep(step + 1)
    if (step === 3) {

      simulateFormSubmission()
    }
  }
  return (
    <div className="w-full max-w-xl min-w-[320px] px-4 mx-auto mb-6">

      <div className="flex w-full px-4 justify-center items-start sm:items-center gap-4">
        {steps.map((item, index) => (
          <div key={item.id} className={`flex items-center  ${index < steps.length - 1 ? "w-full" : "w-auto"}`}>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold 
          ${step === item.id ? "bg-orange-600 text-white" :
                step > item.id ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}>
              {item.id}
            </div>
            {index < steps.length - 1 && (
              <div className="flex flex-1 h-1 bg-gray-300 mx-2 relative">
                <div className={`h-1 absolute top-0 left-0 transition-all duration-300 ${step > item.id ? "bg-green-500 w-full" : "bg-gray-300 w-0"}`} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className=" min-w-[320px] px-4 mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-8">
        {step === 1 && <Step1Accommodation title={steps[0].label} checkStepValidation={checkStepValidation} updateFormData={updateFormData} formData={formData} />}
        {step === 2 && <Step2Owner title={steps[1].label} checkStepValidation={checkStepValidation} updateFormData={updateFormData} formData={formData} />}
        {step === 3 && <Step3Summary stepsTitles={[steps[0].label, steps[1].label]} formData={formData} />}
        {submissionFeedback && <SubmissionFeedback submissionFeedback={submissionFeedback} />}

        {step !== 4 && <button disabled={!stepsValidation[currentStep as keyof typeof stepsValidation]} onClick={handleclickBtn} className="w-full px-6 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition disabled:bg-gray-300">
          {step < 3 ? 'Next' : 'Submit'}
        </button>}
      </div>

    </div>
  )
}

export default AccommodationForm
