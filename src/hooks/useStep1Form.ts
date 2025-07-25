import { useEffect, useState } from "react";
import type { IFormData } from "../context/FormContext";

export const typeOptions = ["apartment", "villa", "house"];

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

export const useStep1Form = (checkStepValidation: (valid: boolean) => void, updateFormData: (info: IFormData) => void, formData: IFormData) => {
  const [error, setError] = useState(initialError);
  const [formValidation, setFormValidation] = useState(initialFormValidation);
  const [photosPreview, setPhotosPreview] = useState<string[]>([]);

  const updateValidation = (field: keyof typeof formData.accommodation, valid: boolean, message = "") => {
    setError((prev) => ({ ...prev, [field]: message }));
    setFormValidation((prev) => ({ ...prev, [field]: valid }));
  };

  const validate = async (field: keyof typeof formData.accommodation, value: string | File[] | string[]) => {
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
        return;
      } else if (value.length > 0) {
        const dimensionChecks = await Promise.all(
          value.map((file) => new Promise<boolean>((resolve) => {
            if (!(file instanceof File)) {
              return resolve(false);
            }
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
      }
      updateValidation(field, true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData, accommodation: {
        ...formData.accommodation,
        [name]: value,
      },
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = e.target.name as keyof typeof formData.accommodation;
    if (!formData.accommodation) return;
    validate(name, formData.accommodation[name]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const updated = [...formData.accommodation.photos, ...files];
    const newPreviews = files.map(file => URL.createObjectURL(file));
    const allPreviews = [
      ...(formData.accommodation.photosPreviews || []),
      ...newPreviews,
    ];

    setPhotosPreview(allPreviews);
    updateFormData({
      ...formData, accommodation: {
        ...formData.accommodation,
        photos: updated,
        photosPreviews: allPreviews,
      },
    });
    if (e.target) e.target.value = "";
    validate("photos", updated);
  };

  const handleDeleteImg = (index: number) => {
    const photosUpdated = formData.accommodation.photos.filter((_, i) => i !== index);
    const previewsUpdated = formData.accommodation.photosPreviews.filter((_, i) => i !== index);

    setPhotosPreview(previewsUpdated)
    updateFormData({
      ...formData, accommodation: {
        ...formData.accommodation,
        photos: photosUpdated,
        photosPreviews: previewsUpdated
      },
    });
    validate("photos", photosUpdated);
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
