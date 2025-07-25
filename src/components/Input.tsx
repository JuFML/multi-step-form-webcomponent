interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  inputType?: 'input' | 'textarea' | 'select';
  options?: string[];
  type?: string
}



const Input = ({ label, name, value, error, onChange, onBlur, inputType = 'input', options, type = 'text' }: InputFieldProps) => {
  const baseInputClass = "rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"

  return (
    <div className="flex flex-col">
      <label className="mb-1 text-base font-medium text-gray-700">{label}</label>

      {inputType === 'textarea' ? (
        <textarea
          className={`${baseInputClass} min-h-[100px]`}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      ) : inputType === 'select' ? (
        <select
          className={baseInputClass}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        >
          <option value="">Select {label}</option>
          {options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt[0].toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
      ) : (
        <input
          className={baseInputClass}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
