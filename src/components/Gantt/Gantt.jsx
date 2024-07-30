import { useState, useEffect } from 'react';
import axios from 'axios';
import { FrappeGantt } from 'frappe-gantt-react';

const Frappe = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: '',
    start_date: '',
    end_date: '',
    progress: 0,
  });
  const [taskToUpdate, setTaskToUpdate] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mode = 'Day';

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/tasks');
      if (Array.isArray(response.data.data.tasks)) {
        const fetchedTasks = response.data.data.tasks.map((task) => ({
          _id: task._id,
          name: task.name,
          start: task.start_date,
          end: task.end_date,
          progress: task.progress,
        }));
        setTasks(fetchedTasks);
        setLoading(false);
      } else {
        throw new Error('Response data is not an array');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to load tasks');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'progress' ? Number(value) : value;
    setNewTask((prevState) => ({
      ...prevState,
      [name]: value,
      [name]: newValue,
    }));
  };

  const handleAddTask = async () => {
    const { name, start_date, end_date, progress } = newTask;
    if (new Date(end_date) <= new Date(start_date)) {
      setError('End date must be after start date');
      return;
    }

    const taskToAdd = {
      name,
      start_date,
      end_date,
      progress,
    };

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/tasks',
        taskToAdd
      );
      setTasks([...tasks, response.data]);
      setNewTask({ name: '', start_date: '', end_date: '', progress: 0 });
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
      setError('Failed to add task');
    }
  };

  const handleTaskUpdate = async (taskId) => {
    if (!taskToUpdate[taskId]) {
      setError('No task data available for update');
      return;
    }

    const updatedTaskData = taskToUpdate[taskId];

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/tasks/${taskId}`,
        updatedTaskData
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? response.data : task))
      );
      setTaskToUpdate((prev) => {
        const newTaskToUpdate = { ...prev };
        delete newTaskToUpdate[taskId];
        return newTaskToUpdate;
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task');
    }
  };

  const handleTaskUpdateInputChange = (taskId, e) => {
    const { name, value } = e.target;
    setTaskToUpdate((prevState) => ({
      ...prevState,
      [taskId]: {
        ...prevState[taskId],
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    const taskTexts = document.querySelectorAll('.bar-group .bar-label');
    taskTexts.forEach((text) => {
      text.classList.add('task-text');
    });
  }, [tasks]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="m-10">
      <FrappeGantt
        tasks={tasks}
        viewMode={mode}
        onClick={(task) => console.log('Clicked task:', task)}
        onDateChange={(task, start, end) => console.log(task, start, end)}
        onTasksChange={(tasks) => console.log(tasks)}
      />
      <div className="border-2 ">
        <h3 className="font-indie text-2xl font-bold">Add New Task</h3>
        <div className="p-2 border rounded flex flex-row gap-2 justify-between flex-wrap">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-indie test-2xl font-bold">
              Task Name
            </label>
            <input
              type="text"
              name="name"
              value={newTask.name}
              onChange={handleInputChange}
              placeholder="Task Name"
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="start_date"
              className="font-indie test-2xl font-bold"
            >
              Start Date
            </label>
            <input
              type="date"
              name="start_date"
              value={newTask.start_date}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="end_date" className="font-indie test-2xl font-bold">
              End Date
            </label>
            <input
              type="date"
              name="end_date"
              value={newTask.end_date}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="progress" className="font-indie test-2xl font-bold">
              Progress ( 1 - 100 )
            </label>
            <input
              type="number"
              name="progress"
              value={newTask.progress === 0 ? ' ' : newTask.progress}
              onChange={handleInputChange}
              className="p-2 border rounded"
              placeholder="0"
            />
          </div>

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
      <div className="mt-4">
        <h3 className=" font-bold mb-2 font-indie text-2xl">Tasks List</h3>
        <div className="grid grid-cols-1 gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="p-2 border rounded flex flex-row gap-2 justify-between flex-wrap"
            >
              <input
                type="text"
                name="name"
                value={taskToUpdate[task._id]?.name || task.name}
                onChange={(e) => handleTaskUpdateInputChange(task._id, e)}
                placeholder="Task Name"
                className="p-2 border rounded"
              />
              <input
                type="date"
                name="start_date"
                value={taskToUpdate[task._id]?.start_date || task.start}
                onChange={(e) => handleTaskUpdateInputChange(task._id, e)}
                className="p-2 border rounded"
              />
              <input
                type="date"
                name="end_date"
                value={taskToUpdate[task._id]?.end_date || task.end}
                onChange={(e) => handleTaskUpdateInputChange(task._id, e)}
                className="p-2 border rounded"
              />
              <input
                type="number"
                name="progress"
                value={taskToUpdate[task._id]?.progress || task.progress}
                onChange={(e) => handleTaskUpdateInputChange(task._id, e)}
                className="p-2 border rounded"
              />

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
    </div>
  );
};

export default Frappe;
