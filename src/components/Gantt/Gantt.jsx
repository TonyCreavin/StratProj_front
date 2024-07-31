import { useState, useEffect } from 'react';
import axios from 'axios';
import { FrappeGantt } from 'frappe-gantt-react';

import GanttAddTask from '../GanttAddTask';
import GanttTaskList from '../GanttTaskList';

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
    if (name === 'progress' && (value < 0 || value > 100)) {
      alert('Progress must be between 0 and 100');
      return;
    }
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

      <GanttAddTask
        newTask={newTask}
        handleInputChange={handleInputChange}
        handleAddTask={handleAddTask}
      />

      <GanttTaskList
        handleTaskUpdate={handleTaskUpdate}
        handleDeleteTask={handleDeleteTask}
        handleTaskUpdateInputChange={handleTaskUpdateInputChange}
        tasks={tasks}
        taskToUpdate={taskToUpdate}
      />
    </div>
  );
};

export default Frappe;
