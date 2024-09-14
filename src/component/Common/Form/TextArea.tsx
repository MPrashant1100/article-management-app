import { TextAreaFieldProps } from '@/interfaces';
import { Text } from '@/component';

const TextArea = ({
  label,
  value,
  onChange,
  className,
  rows = 3,
  disabled = false,
}: TextAreaFieldProps) => {
  return (
    <div className='flex flex-col'>
      <Text level='label' className='label'>
        {label}
      </Text>
      <textarea
        className={`block w-full rounded focus:outline-primary focus:border-none ${className}`}
        value={value}
        rows={rows}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default TextArea;
