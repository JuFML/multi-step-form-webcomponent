import { useEffect, useState } from "react";

const errorMsgs = {
  name: "Name is required, 4–64 chars.",
  email: "Email is required and must be valid (e.g. user@domain.com).",
  phone: "Phone number must contain only numbers, up to 9 digits."
};

const initialFormData = {
  name: "",
  email: "",
  phone: ""
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

export const useStep2Form = (checkStepValidation: (valid: boolean) => void) => {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(initialError);
  const [formValidation, setFormValidation] = useState(initialFormValidation);

  console.log("formData", formData)

  const updateValidation = (field: keyof typeof formData, valid: boolean, message = "") => {
    setError((prev) => ({ ...prev, [field]: message }));
    setFormValidation((prev) => ({ ...prev, [field]: valid }));
  };

  const validate = async (field: keyof typeof formData, value: string | File[]) => {
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = e.target.name as keyof typeof formData;
    validate(name, formData[name]);
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
