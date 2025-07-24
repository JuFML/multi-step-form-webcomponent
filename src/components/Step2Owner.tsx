import { useStep2Form } from "../hooks/useStep2Form"
import Input from "./Input"

interface Step2OwnerProps {
  checkStepValidation: (isStepValid: boolean) => void
}

const Step2Owner = ({ checkStepValidation }: Step2OwnerProps) => {
  const { formData, error, handleChange, handleBlur } = useStep2Form(checkStepValidation)
  return (

    <div className="space-y-6">
      <Input inputType="input" label="Name" name="name" onChange={handleChange} onBlur={handleBlur} value={formData.name} error={error.name} />
      <Input inputType="input" label="Email" name="email" type="email" onChange={handleChange} onBlur={handleBlur} value={formData.email} error={error.email} />
      <Input inputType="input" label="Phone" name="phone" onChange={handleChange} onBlur={handleBlur} value={formData.phone} error={error.phone} />
    </div>
  )
}

export default Step2Owner