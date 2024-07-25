// import { useNavigate } from 'react-router-dom';
// import Gantt from '../components/Gantt';
// import { IoLogOutOutline } from 'react-icons/io5';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import dayjs from 'dayjs';

// const Home = () => {
//   const navigate = useNavigate();
//   const [tasks, setTasks] = useState({ data: [], links: [] });
//   const [taskName, setTaskName] = useState('');

//   const getTasks = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/v1/tasks');
//       console.log('API Response:', response.data);

//       if (Array.isArray(response.data.data.tasks)) {
//         const formattedTasks = {
//           data: response.data.data.tasks.map((task) => ({
//             id: task._id,
//             name: task.name,
//             start_date: dayjs(task.start_date).format('YYYY-MM-DD HH:mm'),

//             duration: task.duration,
//             progress: task.progress,
//           })),
//           links: response.data.data.links || [], // Ensure this is an array or provide a default
//         };
//         setTasks(formattedTasks);
//       } else {
//         console.error('Error: response.data.data.tasks is not an array');
//       }
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };
//   useEffect(() => {
//     getTasks();
//   }, []);

//   const handleLogout = () => {
//     navigate('/logout');
//   };

//   const deleteTask = async (taskId) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/v1/tasks/${taskId}`);
//       setTasks((prevTasks) => ({
//         ...prevTasks,
//         data: prevTasks.data.filter((task) => task.id !== taskId),
//       }));
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };

//   const updateTask = async (taskId, updatedTask) => {
//     try {
//       const formattedTask = {
//         ...updatedTask,
//         start_date: dayjs(updatedTask.start_date).format('YYYY-MM-DD HH:mm'),
//       };

//       await axios.put(
//         `http://localhost:3000/api/v1/tasks/${taskId}`,
//         formattedTask
//       );

//       setTasks((prevTasks) => ({
//         ...prevTasks,
//         data: prevTasks.data.map((task) =>
//           task.id === taskId ? { ...task, ...formattedTask } : task
//         ),
//       }));
//     } catch (error) {
//       console.error('Error updating task:', error);
//     }
//   };

//   const addTask = async () => {
//     const newTask = {
//       id: Date.now().toString(), // Ensure ID is a string or adjust according to your requirements
//       name: taskName, // Assume taskName is a state variable or input value
//       start_date: dayjs().format('YYYY-MM-DD HH:mm'),

//       duration: 1,
//       progress: 0,
//     };

//     try {
//       const { data } = await axios.post(
//         'http://localhost:3000/api/v1/tasks',
//         newTask
//       );
//       const createdTask = data.data.task;

//       setTasks((prevTasks) => ({
//         ...prevTasks,
//         data: [...prevTasks.data, createdTask],
//       }));
//     } catch (error) {
//       console.error('Error adding task:', error);
//     }
//   };

//   useEffect(() => {
//     getTasks();
//   }, []);

//   return (
//     <>
//       <nav className="w-full h-16 bg-[rgb(80,154,177)]">
//         <ul className="flex justify-end">
//           <li className="pr-5">
//             <button onClick={handleLogout}>
//               <IoLogOutOutline size={40} color="white" />
//             </button>
//             <p className="text-white text-xs ">Logout</p>
//           </li>
//         </ul>
//       </nav>

//       <div className="task-input">
//         <input
//           type="text"
//           value={taskName}
//           onChange={(e) => setTaskName(e.target.value)}
//           placeholder="Enter task name"
//         />
//         <button onClick={addTask}>Add Task</button>
//       </div>

//       <div className="gantt-container">
//         <Gantt
//           tasks={tasks}
//           onDataChange={(newData) => setTasks(newData)}
//           onDelete={deleteTask}
//           onUpdate={updateTask}
//         />
//       </div>
//     </>
//   );
// };

// export default Home;
import { useNavigate } from 'react-router-dom';
import Gantt from '../components/Gantt';
import { IoLogOutOutline } from 'react-icons/io5';
import axios from 'axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const Home = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState({ data: [], links: [] });
  const [taskName, setTaskName] = useState('');

  const getTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/tasks');
      console.log('API Response:', response.data);

      if (Array.isArray(response.data.data.tasks)) {
        const formattedTasks = {
          data: response.data.data.tasks.map((task) => ({
            id: task._id,
            name: task.name,
            start_date: dayjs(task.start_date).format('YYYY-MM-DD HH:mm'),
            duration: task.duration,
            progress: task.progress,
          })),
          links: response.data.data.links || [], // Ensure this is an array or provide a default
        };
        setTasks(formattedTasks);
      } else {
        console.error('Error: response.data.data.tasks is not an array');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleLogout = () => {
    navigate('/logout');
  };

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
      id: Date.now().toString(), // Ensure ID is a string or adjust according to your requirements
      name: taskName, // Assume taskName is a state variable or input value
      start_date: dayjs().format('YYYY-MM-DD HH:mm'),
      duration: 1,
      progress: 0,
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
      setTaskName(''); // Clear input field after adding task
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <>
      <nav className="w-full h-16 bg-[rgb(80,154,177)] flex items-center justify-between px-4">
        <div>
          <button onClick={handleLogout}>
            <IoLogOutOutline size={40} color="white" />
          </button>
          <p className="text-white text-xs">Logout</p>
        </div>
        <div className="flex-grow text-center">
          <h1 className="text-white text-xl">Task Manager</h1>
        </div>
      </nav>

      <div className="task-input p-4">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
          className="p-2 border rounded"
        />
        <button
          onClick={addTask}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Add Task
        </button>
      </div>

      <div className="gantt-container p-4">
        <Gantt
          tasks={tasks}
          onDataChange={(newData) => setTasks(newData)}
          onDelete={deleteTask}
          onUpdate={updateTask}
        />
      </div>
    </>
  );
};

export default Home;
