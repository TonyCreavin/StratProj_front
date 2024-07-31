import PropTypes from 'prop-types';
import { FormInput } from '../hooks/useInputs';
import { useFormTable } from '../pages/FormTable';

const RegistrationForm = ({
  handleReturn,
  handleChange,
  handleSubmit,
  formData,
}) => {
  const { registerInputs } = useFormTable(handleChange, formData);

  return (
    <div>
      {' '}
      <form
        method="post"
        onSubmit={handleSubmit}
        className="mx-5 mt-20 md:m-20"
      >
        {registerInputs.map(
          ({
            id,
            name,
            type,
            label,
            placeholder,

            required,
          }) => (
            <div key={id} className="mb-6 flex-1">
              <FormInput
                id={id}
                name={name}
                type={type}
                label={label}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                required={required}
              />{' '}
            </div>
          )
        )}
        <div className="flex flex-row-reverse gap-6 justify-between">
          <div className="w-52">
            <button
              type="submit"
              className="text-white text-lg font-bold font-indie bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg w-full  px-5 py-2.5 text-center  "
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>{' '}
          <div className="w-52">
            <button
              type="button"
              onClick={handleReturn}
              className="text-white text-lg font-bold font-indie bg-[rgb(53,175,53)] hover:bg-[rgb(108,172,108)] focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg w-full  px-5 py-2.5 text-center  "
            >
              Return to Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
RegistrationForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleReturn: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
};
export default RegistrationForm;
