import { useContext, useState } from 'react'
import { FormContext } from '../context/FormContext'
import Step1Accommodation from './Step1Accommodation'
import Step2Owner from './Step2Owner'
import Step3Summary from './Step3Summary'
import SubmissionFeedback from './SubmissionFeedback'
import StepProgress from './StepProgress'

const initialStepsValidation = {
  step1: false,
  step2: false,
  step3: true
}

export type Step = {
  id: number;
  label: string;
};

const steps: Step[] = [
  { id: 1, label: "Accommodation" },
  { id: 2, label: "Owner" },
  { id: 3, label: "Summary" },
];

export interface IFormData {
  accommodation: {
    name: string;
    address: string;
    description: string;
    type: string;
    photos: File[];
    photosPreviews: string[];
  };
  owner: {
    name: string;
    email: string;
    phone: string;
  }
};

export type FieldRequirementsMsgs = {
  accommodation: {
    name: string;
    address: string;
    description: string;
    type: string;
    photos: {
      quantity: string;
      dimension: string;
    };
  };
  owner: {
    name: string;
    email: string;
    phone: string;
  }
};

const fieldRequirementsMsgs: FieldRequirementsMsgs = {
  accommodation: {
    name: "Required. Must be 4–128 characters, no numbers allowed.",
    address: "Required. Must be 4–128 characters.",
    description: "Optional. Must be 128–2048 characters.",
    type: "Required. Must be one of: apartment, villa, or house.",
    photos: {
      quantity: "Optional. Maximum of 2 photos allowed.",
      dimension: "Each photos must be 500x500px or smaller."
    }
  },
  owner: {
    name: "Required. Must be 4–64 characters.",
    email: "Required. Must be a valid email address.",
    phone: "Optional. Must be numbers only and up to 9 digits."
  }
}

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

  const handleClickBtn = () => {
    setStep(step + 1)
    if (step === 3) {

      simulateFormSubmission()
    }
  }
  return (
    <div className="w-full max-w-xl min-w-[320px] p-4 mx-auto mb-6">

      <StepProgress step={step} steps={steps} />

      <div className=" min-w-[320px] px-4 mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-8">
        {step === 1 && <Step1Accommodation title={steps[0].label} checkStepValidation={checkStepValidation} updateFormData={updateFormData} formData={formData} requirementsMsgs={fieldRequirementsMsgs} />}
        {step === 2 && <Step2Owner title={steps[1].label} checkStepValidation={checkStepValidation} updateFormData={updateFormData} formData={formData} requirementsMsgs={fieldRequirementsMsgs} />}
        {step === 3 && <Step3Summary stepsTitles={[steps[0].label, steps[1].label]} formData={formData} />}
        {submissionFeedback && <SubmissionFeedback submissionFeedback={submissionFeedback} />}

        {step !== 4 && <button disabled={!stepsValidation[currentStep as keyof typeof stepsValidation]} onClick={handleClickBtn} className="w-full px-6 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition disabled:bg-gray-300">
          {step < 3 ? 'Next' : 'Submit'}
        </button>}
      </div>

    </div>
  )
}

export default AccommodationForm
