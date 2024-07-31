export const useGanttTable = () => {
  const gantInputs = [
    {
      id: 'name',
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'John Doe',
      required: true,
    },
    {
      id: 'start_date',
      name: 'start_date',
      type: 'date',
      label: 'Start Date',
      placeholder: '2021-12-31',
      required: true,
    },
    {
      id: 'end_date',
      name: 'end_date',
      type: 'date',
      label: 'End Date',
      placeholder: '2021-12-31',
      required: true,
    },
    {
      id: 'progress',
      name: 'progress',
      type: 'number',
      label: 'Progress',
      placeholder: '0',
      required: true,
    },
  ];
  return { gantInputs };
};
