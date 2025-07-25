import type { IFormData } from "../context/FormContext";
import { typeOptions, useStep1Form } from "../hooks/useStep1Form";
import type { FieldRequirementsMsgs } from "./AccommodationForm";
import Input from "./Input";
import PhotosInput from "./PhotosInput";
interface Step1AccommodationProps {
  checkStepValidation: (isStepValid: boolean) => void;
  updateFormData: (info: IFormData) => void;
  formData: IFormData;
  title: string;
  requirementsMsgs: FieldRequirementsMsgs
}

const Step1Accommodation = ({ checkStepValidation, updateFormData, formData, title, requirementsMsgs }: Step1AccommodationProps) => {
  const {
    error,
    photosPreview,
    handleChange,
    handleBlur,
    handleFileUpload,
    handleDeleteImg
  } = useStep1Form(checkStepValidation, updateFormData, formData)

  return (
    <div className="space-y-5 min-h-[80vh]">
      <h1 className="text-3xl">{title}</h1>
      <Input inputType="input" label="Name" name="name" onChange={handleChange} onBlur={handleBlur} value={formData.accommodation.name} error={error.name} requirementsMsgs={requirementsMsgs.accommodation.name} />
      <Input inputType="input" label="Address" name="address" onChange={handleChange} onBlur={handleBlur} value={formData.accommodation.address} error={error.address} requirementsMsgs={requirementsMsgs.accommodation.address} />
      <Input inputType="textarea" label="Description" name="description" onChange={handleChange} onBlur={handleBlur} value={formData.accommodation.description} error={error.description} requirementsMsgs={requirementsMsgs.accommodation.description} />
      <Input inputType="select" label="Type" name="type" onChange={handleChange} onBlur={handleBlur} value={formData.accommodation.type} error={error.type} options={typeOptions} requirementsMsgs={requirementsMsgs.accommodation.type} />
      <PhotosInput label="Photos" inputImgLabel="Add Photo" name="photos" error={error.photos} onChange={handleFileUpload} onClick={handleDeleteImg} photosPreview={photosPreview} requirementsMsgs={requirementsMsgs.accommodation.photos} />
    </div>
  );
};

export default Step1Accommodation;
