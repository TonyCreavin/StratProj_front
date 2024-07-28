import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Gantt from '../components/Gantt';
import { IoLogOutOutline } from 'react-icons/io5';
import { useAuth } from '../context/authContext';
import { CgProfile } from 'react-icons/cg';

const Home = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState({ data: [], links: [] });
  const [taskName, setTaskName] = useState('');
  const [taskStartDate, setTaskStartDate] = useState(
    dayjs().format('YYYY-MM-DD HH:mm')
  );
  const [taskDuration, setTaskDuration] = useState(1);
  const [taskProgress, setTaskProgress] = useState(0);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [linkSource, setLinkSource] = useState('');
  const [linkTarget, setLinkTarget] = useState('');

  const getTasks = async () => {
    if (isAuthenticated) {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/tasks');
        const formattedTasks = {
          data: response.data.data.tasks.map((task) => ({
            id: task._id,
            name: task.name,
            start_date: dayjs(task.start_date).format('YYYY-MM-DD HH:mm'),
            // end_date: dayjs(task.start_date)
            //   .add(task.duration, 'day')
            //   .format('YYYY-MM-DD HH:mm'),

            duration: task.duration,
            progress: task.progress,
          })),
          links: response.data.data.links || [],
        };

        setTasks(formattedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/tasks/${taskId}`);
      setTasks((prevTasks) => ({
        ...prevTasks,
        data: prevTasks.data.filter((task) => task.id !== taskId),
      }));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
    setEditingTaskId(null);
    setTaskName('');
    setTaskStartDate(dayjs().format('YYYY-MM-DD HH:mm'));
    setTaskDuration(1);
    setTaskProgress(0);
  };

  const updateTask = async (taskId, updatedTask) => {
    try {
      const formattedTask = {
        ...updatedTask,
        start_date: dayjs(updatedTask.start_date).format('YYYY-MM-DD HH:mm'),
      };

      await axios.put(
        `http://localhost:3000/api/v1/tasks/${taskId}`,
        formattedTask
      );

      setTasks((prevTasks) => ({
        ...prevTasks,
        data: prevTasks.data.map((task) =>
          task.id === taskId ? { ...task, ...formattedTask } : task
        ),
      }));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const addTask = async () => {
    const newTask = {
      name: taskName,
      start_date: dayjs(taskStartDate).format('YYYY-MM-DD HH:mm'),
      duration: taskDuration,
      progress: parseFloat(taskProgress),
    };

    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/v1/tasks',
        newTask
      );
      const createdTask = data.data.task;

      setTasks((prevTasks) => ({
        ...prevTasks,
        data: [...prevTasks.data, createdTask],
      }));

      // Reset form fields
      setTaskName('');
      setTaskStartDate(dayjs().format('YYYY-MM-DD HH:mm'));
      setTaskDuration(1);
      setTaskProgress(0);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = (task) => {
    setTaskName(task.name);
    setTaskStartDate(dayjs(task.start_date).format('YYYY-MM-DD HH:mm'));
    setTaskDuration(task.duration);
    setTaskProgress(task.progress);
    setEditingTaskId(task.id);
  };

  const handleUpdateTask = () => {
    if (editingTaskId) {
      const updatedTask = {
        id: editingTaskId,
        name: taskName,
        start_date: taskStartDate,
        duration: taskDuration,
        progress: parseFloat(taskProgress),
      };
      updateTask(editingTaskId, updatedTask);
      setEditingTaskId(null);
      setTaskName('');
      setTaskStartDate(dayjs().format('YYYY-MM-DD HH:mm'));
      setTaskDuration(1);
      setTaskProgress(0);
    }
  };

  const handleAddLink = async () => {
    const newLink = {
      id: Date.now().toString(),
      source: linkSource,
      target: linkTarget,
      type: '0', // Assuming 0 is the default link type
    };

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/links',
        newLink
      );

      setTasks((prevTasks) => ({
        ...prevTasks,
        links: [...prevTasks.links, response.data.data.link],
      }));

      setLinkSource('');
      setLinkTarget('');
    } catch (error) {
      console.error('Error adding link:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/logout');
  };
  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <>
      <nav className="w-full h-16 bg-[rgb(80,154,177)] flex justify-content py-1">
        <div className="flex-1">
          <h1 className="text-white text-4xl text-center pl-24 font-concert">
            Gantt Chart
          </h1>
        </div>{' '}
        <div className="flex justify-between">
          <ul className="flex justify-end">
            <li className="pr-5">
              <button onClick={handleProfile}>
                <CgProfile size={40} color="white " />
              </button>
              <p className="text-white text-xs">Profile</p>
            </li>
            <li className="pr-5">
              <button onClick={handleLogout}>
                <IoLogOutOutline size={40} color="white" />
              </button>
              <p className="text-white text-xs">Logout</p>
            </li>
          </ul>
        </div>
      </nav>

      <div className="task-input">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
        />
        <input
          type="text"
          value={taskStartDate}
          onChange={(e) => setTaskStartDate(e.target.value)}
          placeholder="Start Date (YYYY-MM-DD HH:mm)"
        />
        <input
          type="number"
          value={taskDuration}
          onChange={(e) => setTaskDuration(Number(e.target.value))}
          placeholder="Duration"
        />
        <input
          type="number"
          step="0.01"
          value={taskProgress}
          onChange={(e) => setTaskProgress(Number(e.target.value))}
          placeholder="Progress (0-1)"
        />
        <button
          onClick={addTask}
          className="m-4 text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-indie font-bold text-xl rounded-lg w-50  px-5 py-2.5 text-center h-10 mb-3"
        >
          Add Task
        </button>
        {editingTaskId && (
          <button
            onClick={handleUpdateTask}
            className="m-4 text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-indie font-bold text-xl rounded-lg w-50  px-5 py-2.5 text-center h-10 mb-3"
          >
            Update Task
          </button>
        )}
      </div>

      <div className="link-input">
        <input
          type="text"
          value={linkSource}
          onChange={(e) => setLinkSource(e.target.value)}
          placeholder="Source Task ID"
        />
        <input
          type="text"
          value={linkTarget}
          onChange={(e) => setLinkTarget(e.target.value)}
          placeholder="Target Task ID"
        />
        <button onClick={handleAddLink}>Add Link</button>
      </div>

      <div className="gantt-container">
        <Gantt
          tasks={tasks}
          onDataChange={(newData) => setTasks(newData)}
          onEditTask={handleEditTask}
          onDeleteTask={deleteTask}
          onUpdate={updateTask}
        />
      </div>
    </>
  );
};

export default Home;
