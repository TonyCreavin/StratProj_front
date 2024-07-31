import PropTypes from 'prop-types';
import useInputs from '../hooks/useInputs';

const Form = ({ formData, handleChange, handleDelete, handleSubmit }) => {
  const streetInput = useInputs({
    id: 'street',
    name: 'street',
    type: 'text',
    label: 'Street',
    placeholder: '1234 Elm St.',
    value: formData.street,
    onChange: handleChange,
    required: true,
  });
  const cityInput = useInputs({
    id: 'city',
    name: 'city',
    type: 'text',
    label: 'City',
    placeholder: '',
    value: formData.city,
    onChange: handleChange,
    required: true,
  });
  const postcodeInput = useInputs({
    id: 'postcode',
    name: 'postcode',
    type: 'text',
    label: 'Postcode',
    placeholder: '56789',
    value: formData.postcode,
    onChange: handleChange,
  });
  const countryInput = useInputs({
    id: 'country',
    name: 'country',
    type: 'text',
    label: 'Country',
    placeholder: '',
    value: formData.country,
    onChange: handleChange,
    required: true,
  });
  const phoneInput = useInputs({
    id: 'phone',
    name: 'phone',
    type: 'text',
    label: 'Phone',
    placeholder: 123345678,
    value: formData.phone,
    onChange: handleChange,
  });

  return (
    <form method="post" onSubmit={handleSubmit} className="mx-10">
      <div className=" mb-6  mt-5">{streetInput}</div>

      <div className="mb-6">{cityInput}</div>
      <div className="mb-6">{postcodeInput}</div>

      <div className="mb-6">{countryInput}</div>
      <div className="mb-6">{phoneInput}</div>

      <div className="flex-auto lg:space-x-10">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-indie font-bold text-xl rounded-lg  w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div className="flex-auto lg:space-x-10">
        <button
          type="button"
          className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-indie font-bold text-xl rounded-lg w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </form>
  );
};

Form.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
export default Form;
