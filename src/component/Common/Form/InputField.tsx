import { InputFieldProps } from '@/interfaces';

const InputField = ({
  value,
  type,
  onChange,
  className,
  placeholder
}: InputFieldProps) => {
  return (
    <div className='flex flex-col'>
      <input
        className={` w-full border-none ${className}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <div className="border-t border-grayDark"></div>
    </div>
  );
};

export default InputField;
