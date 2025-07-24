import type { IFormData } from "../context/FormContext";
import { useStep1Form } from "../hooks/useStep1Form";
import Input from "./Input";
import PhotosInput from "./PhotosInput";

const typeOptions: string[] = ["apartment", "villa", "house"]
interface Step1AccommodationProps {
  checkStepValidation: (isStepValid: boolean) => void;
  updateFormData: (info: IFormData) => void;
  formData: IFormData
}

const Step1Accommodation = ({ checkStepValidation, updateFormData, formData }: Step1AccommodationProps) => {
  const {
    error,
    photosPreview,
    handleChange,
    handleBlur,
    handleFileUpload,
    handleDeleteImg
  } = useStep1Form(checkStepValidation, updateFormData, formData)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Accommodation</h1>
      <Input inputType="input" label="Name" name="name" onChange={handleChange} onBlur={handleBlur} value={formData.accommodation.name} error={error.name} />
      <Input inputType="input" label="Address" name="address" onChange={handleChange} onBlur={handleBlur} value={formData.accommodation.address} error={error.address} />
      <Input inputType="textarea" label="Description" name="description" onChange={handleChange} onBlur={handleBlur} value={formData.accommodation.description} error={error.description} />
      <Input inputType="select" label="Type" name="type" onChange={handleChange} onBlur={handleBlur} value={formData.accommodation.type} error={error.type} options={typeOptions} />
      <PhotosInput label="Photos" inputImgLabel="Add Photo" name="photos" error={error.photos} onChange={handleFileUpload} onClick={handleDeleteImg} photosPreview={photosPreview} />
    </div>
  );
};

export default Step1Accommodation;
