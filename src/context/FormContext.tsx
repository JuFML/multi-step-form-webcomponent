import { createContext, useState, type ReactNode } from "react";

interface FormContextData {
  formData: IFormData;
  updateFormData: (info: IFormData) => void;
  resetForm: () => void
}

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

const initialFormData = {
  accommodation: {
    name: "",
    address: "",
    description: "",
    type: "",
    photos: [],
    photosPreviews: []
  },
  owner: {
    name: "",
    email: "",
    phone: "",
  },
};

interface FormProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FormContext = createContext({} as FormContextData)

export const FormProvider = ({ children }: FormProviderProps) => {
  const [formData, setFormData] = useState<IFormData>(initialFormData)
  console.log("formData!!!!!", formData)

  const updateFormData = (info: IFormData) => {
    console.log(info)
    setFormData(info)
  }

  const resetForm = () => {
    setFormData(initialFormData)
  }


  return (
    <FormContext.Provider value={{ updateFormData, formData, resetForm }}>
      {children}
    </FormContext.Provider>
  )
}