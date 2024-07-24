import { useNavigate } from 'react-router-dom';
import Gantt from '../components/Gantt';
import { IoLogOutOutline } from 'react-icons/io5';

const data = {
  data: [
    {
      id: 1,
      name: 'Task #1',
      start_date: '2024-04-15',
      duration: 3,
      progress: 0.6,
    },
    {
      id: 2,
      name: 'Task #2',
      start_date: '2024-04-18',
      duration: 3,
      progress: 0.4,
    },
  ],
  links: [{ id: 1, source: 1, target: 2, type: '0' }],
};

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/logout');
  };

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
        <Gantt tasks={data} />
      </div>
    </>
  );
};

export default Home;
