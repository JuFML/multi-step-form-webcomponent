import { useStepForm } from "../hooks/useStepForm";
import Input from "./Input";
import PhotosInput from "./PhotosInput";

const typeOptions: string[] = ["apartment", "villa", "house"]
interface Step1AccommodationProps {
  checkStepValidation: (isStepValid: boolean) => void
}

const Step1Accommodation = ({ checkStepValidation }: Step1AccommodationProps) => {
  const {
    formData,
    error,
    photosPreview,
    handleChange,
    handleBlur,
    handleFileUpload,
    handleDeleteImg
  } = useStepForm(checkStepValidation)

  return (
    <div className="space-y-6">
      <Input type="input" label="Name" name="name" onChange={handleChange} onBlur={handleBlur} value={formData.name} error={error.name} />
      <Input type="input" label="Address" name="address" onChange={handleChange} onBlur={handleBlur} value={formData.address} error={error.address} />
      <Input type="textarea" label="Description" name="description" onChange={handleChange} onBlur={handleBlur} value={formData.description} error={error.description} />
      <Input type="select" label="Type" name="type" onChange={handleChange} onBlur={handleBlur} value={formData.type} error={error.type} options={typeOptions} />
      <PhotosInput label="Photos" inputImgLabel="Add Photo" name="photos" error={error.photos} onChange={handleFileUpload} onClick={handleDeleteImg} photosPreview={photosPreview} />
    </div>
  );
};

export default Step1Accommodation;
