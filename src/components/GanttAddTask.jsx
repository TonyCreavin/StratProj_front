import PropTypes from 'prop-types';
import GanttInput from './GanttInput';

const GanttAddTask = ({ newTask, handleInputChange, handleAddTask }) => {
  const inputNames = ['name', 'start_date', 'end_date', 'progress'];
  const type = ['text', 'date', 'date', 'number'];
  const placeholder = ['Task Name', '2021-12-31', '2021-12-31', '0'];
  const labels = [
    'Task Name',
    'Start Date',
    'End Date',
    'Progress ( 1 - 100 )',
  ];

  return (
    <div className="border-2 ">
      <h3 className="font-indie text-2xl font-bold">Add New Task</h3>
      <div className="p-2 border rounded flex flex-row gap-2 justify-between flex-wrap">
        {inputNames.map((name, index) => {
          return (
            <div key={index} className="flex flex-col">
              <label htmlFor={name} className="font-indie test-2xl font-bold">
                {labels[index]}
              </label>
              <GanttInput
                type={type[index]}
                name={name}
                value={newTask[name]}
                onChange={handleInputChange}
                placeholder={placeholder[index]}
                className="p-2 border rounded"
              />
            </div>
          );
        })}

        <div className="mt-6 ">
          <button
            onClick={handleAddTask}
            className="p-2 bg-green-500 text-white rounded font-indie text-xl font-bold mr-20"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};
GanttAddTask.propTypes = {
  newTask: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleAddTask: PropTypes.func.isRequired,
};
export default GanttAddTask;
