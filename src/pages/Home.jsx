import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Frappe from '../components/Gantt/Gantt';

import { IoLogOutOutline } from 'react-icons/io5';
import { useAuth } from '../context/authContext';
import { CgProfile } from 'react-icons/cg';

const Home = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    if (!isAuthenticated) {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/tasks');
        if (Array.isArray(response.data.data.tasks)) {
          const fetchedTasks = response.data.data.tasks.map((task) => ({
            id: task._id,
            name: task.name,
            start: task.start_date,
            end: task.end_date,
            progress: task.progress,
          }));
          setTasks(fetchedTasks);
        } else {
          throw new Error('Response data is not an array');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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

      <Frappe tasks={tasks} />
    </>
  );
};

export default Home;
