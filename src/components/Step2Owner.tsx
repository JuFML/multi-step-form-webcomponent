import type { IFormData } from "../context/FormContext";
import { useStep2Form } from "../hooks/useStep2Form"
import type { FieldRequirementsMsgs } from "./AccommodationForm";
import Input from "./Input"

interface Step2OwnerProps {
  checkStepValidation: (isStepValid: boolean) => void;
  updateFormData: (info: IFormData) => void;
  formData: IFormData;
  title: string
  requirementsMsgs: FieldRequirementsMsgs
}

const Step2Owner = ({ checkStepValidation, updateFormData, formData, title, requirementsMsgs }: Step2OwnerProps) => {
  const { error, handleChange, handleBlur } = useStep2Form(checkStepValidation, updateFormData, formData)
  return (

    <div className="space-y-5 min-h-[80vh]">
      <h1 className="text-3xl">{title}</h1>
      <Input inputType="input" label="Name" name="name" onChange={handleChange} onBlur={handleBlur} value={formData.owner.name} error={error.name} requirementsMsgs={requirementsMsgs.owner.name} />
      <Input inputType="input" label="Email" name="email" type="email" onChange={handleChange} onBlur={handleBlur} value={formData.owner.email} error={error.email} requirementsMsgs={requirementsMsgs.owner.email} />
      <Input inputType="input" label="Phone" name="phone" onChange={handleChange} onBlur={handleBlur} value={formData.owner.phone} error={error.phone} requirementsMsgs={requirementsMsgs.owner.phone} />
    </div>
  )
}

export default Step2Owner