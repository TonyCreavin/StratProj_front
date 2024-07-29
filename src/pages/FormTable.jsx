export const useFormTable = () => {
  const registerInputs = [
    {
      id: 'name',
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'John Doe',

      required: true,
    },
    {
      id: 'email',
      name: 'email',
      type: 'email',
      label: 'Email address',
      placeholder: '',

      required: true,
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      label: 'password',
      placeholder: '++++++++',

      required: true,
    },
    {
      id: 'passwordConfirm',
      name: 'passwordConfirm',
      type: 'password',
      label: 'Confirm Password',
      placeholder: '',

      required: true,
    },
  ];

  const loginInputs = [
    {
      id: 'email',
      name: 'email',
      type: 'email',
      label: 'Email address',
      placeholder: 'johsmith@email.com',
      required: true,
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: '********',
      required: true,
    },
  ];

  return { registerInputs, loginInputs };
};
