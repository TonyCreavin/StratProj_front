import { useNavigate } from 'react-router-dom';
import Gantt from '../components/Gantt';
import { IoLogOutOutline } from 'react-icons/io5';
import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment';

// const data = {
//   data: [
//     {
//       id: 1,
//       name: 'Task #1',
//       start_date: '2024-04-15',
//       duration: 3,
//       progress: 0.6,
//     },
//     {
//       id: 2,
//       name: 'Task #2',
//       start_date: '2024-04-18',
//       duration: 3,
//       progress: 0.4,
//     },
//   ],
//   links: [{ id: 1, source: 1, target: 2, type: '0' }],
// };

const Home = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState({ data: [], links: [] });

  const handleLogout = () => {
    navigate('/logout');
  };
  const getTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/tasks');
      console.log('API Response:', response.data); // Log the full response
      if (Array.isArray(response.data.data.tasks)) {
        const formattedTasks = {
          data: response.data.data.tasks.map((task) => ({
            id: task._id,
            name: task.name,
            start_date: moment(task.start_date).format('YYYY-MM-DD HH:mm'),
            duration: task.duration,
            progress: task.progress,
          })),
        };
        console.log('Formatted Tasks:', formattedTasks); // Log the formatted tasks
        setTasks(formattedTasks);
      } else {
        console.error('Error: response.data.data is not an array');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <nav className="w-full h-16 bg-[rgb(80,154,177)]">
        <ul className="flex justify-end">
          <li className="pr-5">
            <button onClick={handleLogout}>
              <IoLogOutOutline size={40} color="white" />
            </button>
            <p className="text-white text-xs ">Logout</p>
          </li>
        </ul>
      </nav>

      <div className="gantt-container">
        <Gantt tasks={tasks} onDataChange={(newData) => setTasks(newData)} />
        {/* <button onClick={handleSave}>Save Tasks</button> */}
      </div>
    </>
  );
};

export default Home;
