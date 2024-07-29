import PropTypes from 'prop-types';

export const FormInput = ({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="relative z-0 mb-6 w-full mt-5">
      <label
        htmlFor={id}
        className="block mb-2 text-gray-900 dark:text-white font-indie font-bold text-xl"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange || null}
        required={required}
      />
    </div>
  );
};

const useInputs = ({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="relative z-0 mb-6 w-full mt-5">
      <label
        htmlFor={id}
        className="block mb-2 text-gray-900 dark:text-white font-indie font-bold text-xl"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

FormInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};
export default useInputs;
