import { useEffect, useState } from "react";
import type { IFormData } from "../context/FormContext";

const errorMsgs = {
  name: "Name is required, 4–64 chars.",
  email: "Email is required and must be valid (e.g. user@domain.com).",
  phone: "Phone number must contain only numbers, up to 9 digits."
};

const initialError = {
  name: "",
  email: "",
  phone: ""
};

const initialFormValidation = {
  name: false,
  email: false,
  phone: true
};

export const useStep2Form = (checkStepValidation: (valid: boolean) => void, updateFormData: (info: IFormData) => void, formData: IFormData) => {
  const [error, setError] = useState(initialError);
  const [formValidation, setFormValidation] = useState(initialFormValidation);

  const updateValidation = (field: keyof typeof formData.owner, valid: boolean, message = "") => {
    setError((prev) => ({ ...prev, [field]: message }));
    setFormValidation((prev) => ({ ...prev, [field]: valid }));
  };

  const validate = async (field: keyof typeof formData.owner, value: string | File[]) => {
    if (field === "name" && typeof value === "string") {
      if (!value || value.length < 4 || value.length > 64) {
        updateValidation(field, false, errorMsgs[field]);
      } else {
        updateValidation(field, true);
      }
    }
    if (field === "email" && typeof value === "string") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value || !emailRegex.test(value)) {
        updateValidation(field, false, errorMsgs[field]);
      } else {
        updateValidation(field, true);
      }
    }
    if (field === "phone" && typeof value === "string") {
      const isPhoneValid = value === "" || (/^\d{1,9}$/.test(value));
      if (!isPhoneValid) {
        updateValidation(field, false, errorMsgs[field]);
      } else {
        updateValidation(field, true);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData, owner: {
        ...formData.owner,
        [name]: value,
      },
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = e.target.name as keyof typeof formData.owner;
    validate(name, formData.owner[name]);
  };
  useEffect(() => {
    const allValid = Object.values(formValidation).every((v) => v);
    checkStepValidation(allValid);
  }, [formValidation]);

  return {
    formData,
    error,
    handleChange,
    handleBlur
  };
};
