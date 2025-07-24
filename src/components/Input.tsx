interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  type?: 'input' | 'textarea' | 'select';
  options?: string[];
}

const Input = ({ label, name, value, error, onChange, onBlur, type = 'input', options }: InputFieldProps) => {

  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>

      {type === 'textarea' ? (
        <textarea
          className="rounded-lg border border-gray-300 px-4 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-green-300"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      ) : type === 'select' ? (
        <select
          className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
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
          className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300" type="text"
          name={name}
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
