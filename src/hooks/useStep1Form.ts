import { useEffect, useState } from "react";

const typeOptions = ["apartment", "villa", "house"];

const errorMsgs = {
  name: "Name is required, 4–128 chars, no numbers.",
  address: "Address is required, 4–128 chars.",
  description: "If present, description must be 128–2048 chars.",
  type: "Type must be apartment, villa, or house.",
  photos: {
    quantity: "Maximum of 2 photos allowed.",
    dimension: "Photos must be 500x500px or smaller."
  }
};

const initialFormData = {
  name: "",
  address: "",
  description: "",
  type: "",
  photos: [] as File[],
};

const initialError = {
  name: "",
  address: "",
  description: "",
  type: "",
  photos: "",
};

const initialFormValidation = {
  name: false,
  address: false,
  description: true,
  type: false,
  photos: true,
};

export const useStep1Form = (checkStepValidation: (valid: boolean) => void) => {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(initialError);
  const [formValidation, setFormValidation] = useState(initialFormValidation);
  const [photosPreview, setPhotosPreview] = useState<string[]>([]);

  console.log("formData", formData)

  const updateValidation = (field: keyof typeof formData, valid: boolean, message = "") => {
    setError((prev) => ({ ...prev, [field]: message }));
    setFormValidation((prev) => ({ ...prev, [field]: valid }));
  };

  const generatePhotoPreviews = (files: File[]) => {
    const previews = files.map(file => URL.createObjectURL(file));
    setPhotosPreview(previews);
  };

  const validate = async (field: keyof typeof formData, value: string | File[]) => {
    if (field === "name" && typeof value === "string") {
      if (!value || value.length < 4 || value.length > 128 || /\d/.test(value)) {
        updateValidation(field, false, errorMsgs[field]);
      } else {
        updateValidation(field, true);
      }
    }
    if (field === "address" && typeof value === "string") {
      if (!value || value.length < 4 || value.length > 128) {
        updateValidation(field, false, errorMsgs[field]);
      } else {
        updateValidation(field, true);
      }
    }
    if (field === "description" && typeof value === "string") {
      if (value && (value.length < 128 || value.length > 2048)) {
        updateValidation(field, false, errorMsgs[field]);
      } else {
        updateValidation(field, true);
      }
    }
    if (field === "type" && typeof value === "string") {
      if (!typeOptions.includes(value)) {
        updateValidation(field, false, errorMsgs[field]);
      } else {
        updateValidation(field, true);
      }
    }
    if (field === "photos" && Array.isArray(value)) {
      if (value.length > 2) {
        updateValidation(field, false, errorMsgs.photos.quantity);
        generatePhotoPreviews(value);
        return;
      }
      if (value.length > 0) {
        const dimensionChecks = await Promise.all(
          value.map((file) => new Promise<boolean>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img.width <= 500 && img.height <= 500);
            img.onerror = () => resolve(false);
            img.src = URL.createObjectURL(file);
          }))
        );
        if (!dimensionChecks.every(Boolean)) {
          updateValidation(field, false, errorMsgs.photos.dimension);
          return;
        }
        updateValidation(field, true);
        generatePhotoPreviews(value);
      } else {
        updateValidation(field, true);
        generatePhotoPreviews(value);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = e.target.name as keyof typeof formData;
    validate(name, formData[name]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const updated = [...formData.photos, ...files];
    setFormData((prev) => ({ ...prev, photos: updated }));
    validate("photos", updated);
  };

  const handleDeleteImg = (index: number) => {
    const updated = formData.photos.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, photos: updated }));
    validate("photos", updated);
  };

  useEffect(() => {
    const allValid = Object.values(formValidation).every((v) => v);
    checkStepValidation(allValid);
  }, [formValidation]);

  return {
    formData,
    error,
    photosPreview,
    handleChange,
    handleBlur,
    handleFileUpload,
    handleDeleteImg
  };
};
