import PropTypes from 'prop-types';
import { useFormTable } from '../pages/FormTable';
import FormInput from '../hooks/useInputs';

const LoginForm = ({ handleSubmit, navigate }) => {
  const { loginInputs } = useFormTable();

  return (
    <form method="post" onSubmit={handleSubmit} className="m-5 mt-20 md:m-20">
      {loginInputs.map(({ id, name, type, label, placeholder, required }) => (
        <div key={id}>
          <FormInput
            id={id}
            name={name}
            type={type}
            label={label}
            placeholder={placeholder}
            required={required}
          />
        </div>
      ))}

      <div className="flex flex-row-reverse gap-6 justify-between">
        <div className=" w-52">
          <button
            type="submit"
            className="text-white text-lg font-bold font-indie bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg w-full  px-5 py-2.5 text-center  "
          >
            Submit
          </button>
        </div>
        <div className=" w-52 ">
          <button
            onClick={() => navigate('/register')}
            className="text-white bg-[rgb(53,175,53)] hover:bg-[rgb(108,172,108)]  focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg  w-full  px-5 py-2.5 text-center text-lg font-bold font-indie "
          >
            Register
          </button>
        </div>
      </div>
    </form>
  );
};
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};
export default LoginForm;
