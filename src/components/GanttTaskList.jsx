import PropTypes from 'prop-types';
import GanttInput from './GanttInput';

const GanttTaskList = ({
  tasks,
  taskToUpdate,
  handleTaskUpdate,
  handleDeleteTask,
  handleTaskUpdateInputChange,
}) => {
  const inputNames = ['name', 'start_date', 'end_date', 'progress'];
  const inputTypes = ['text', 'date', 'date', 'number'];

  const placeholders = ['Task Name', '2021-12-31', '2021-12-31', '0'];

  return (
    <div className="mt-4">
      <h3 className=" font-bold mb-2 font-indie text-2xl">Tasks List</h3>
      <div className="grid grid-cols-1 gap-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="p-2 border rounded flex flex-row gap-2 justify-between flex-wrap"
          >
            {inputNames.map((name, index) => {
              return (
                <div key={index}>
                  <GanttInput
                    type={inputTypes[index]}
                    name={name}
                    value={taskToUpdate[task._id]?.[name] || task[name]}
                    onChange={(e) => handleTaskUpdateInputChange(task._id, e)}
                    placeholder={placeholders[index]}
                    className="p-2 border rounded"
                  />
                </div>
              );
            })}
            <div className="flex gap-2">
              <button
                onClick={() => handleTaskUpdate(task._id)}
                className="p-2 bg-green-500 text-white rounded font-indie text-xl font-bold"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteTask(task._id)}
                className="p-2 bg-red-500 text-white rounded font-indie text-xl font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
GanttTaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  taskToUpdate: PropTypes.objectOf(PropTypes.object).isRequired,
  handleTaskUpdate: PropTypes.func.isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
  handleTaskUpdateInputChange: PropTypes.func.isRequired,
};
export default GanttTaskList;
