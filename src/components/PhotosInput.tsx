import { useRef } from "react";

interface InputFieldProps {
  label: string;
  inputImgLabel: string;
  name: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (index: number) => void;
  photosPreview: string[]
}

const PhotosInput = ({ label, inputImgLabel, name, error, onChange, onClick, photosPreview }: InputFieldProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
        <div className="relative w-32 h-32 rounded-lg border border-gray-300 bg-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
          <label
            className="flex justify-center items-center cursor-pointer px-4 py-2 text-gray-500 w-full h-full absolute text-center"
          >
            {inputImgLabel}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              name={name}
              onChange={(e) => {
                onChange(e)
                if (fileInputRef && fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
              className="w-full h-full hidden"
            />
          </label>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default PhotosInput;
