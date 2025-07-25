import { useRef } from "react";

interface InputFieldProps {
  label: string;
  inputImgLabel: string;
  name: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (index: number) => void;
  photosPreview: string[]
  requirementsMsgs: RequirementsMsgs
}

export type RequirementsMsgs = {
  quantity: string;
  dimension: string;
};



const PhotosInput = ({ label, inputImgLabel, name, error, onChange, onClick, photosPreview, requirementsMsgs }: InputFieldProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const uploadBoxClass = "relative w-32 h-32 rounded-lg border border-gray-300 bg-white"
  const labelClass = "flex justify-center items-center cursor-pointer px-4 py-2 text-gray-500 w-full h-full absolute text-center"

  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-2">
        {photosPreview && photosPreview.map((src: string, i: number) => (
          <img
            key={src}
            src={src}
            alt={`Preview ${src}`}
            className="w-32 h-32 object-cover rounded border"
            onClick={() => onClick(i)}
          />))}
        <div className={uploadBoxClass}>
          <label className={labelClass}>
            <p>{inputImgLabel}</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              name={name}
              onChange={(e) => onChange(e)}
              className="w-full h-full hidden"
            />
          </label>
        </div>
      </div>



      {error ?
        <p className="text-red-500">{error}</p> :
        <p className="text-gray-500 text-sm">
          {requirementsMsgs.quantity}<br />
          {requirementsMsgs.dimension}
        </p>}
    </div>
  );
};

export default PhotosInput;
