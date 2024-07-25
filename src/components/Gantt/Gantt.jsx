import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import gantt from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './Gantt.css';
import dayjs from 'dayjs';

const Gantt = ({ tasks, onDataChange }) => {
  const ganttContainer = useRef(null);

  const initGantt = () => {
    gantt.init(ganttContainer.current);

    const formattedTasks = tasks.data.map((task) => ({
      ...task,
      start_date: dayjs(task.start_date).format('DD-MM-YYYY'),
    }));

    console.log('Formatted tasks:', formattedTasks); // Debugging
    gantt.parse({ data: formattedTasks });
    gantt.config.editable = true; // Enable editing
    gantt.config.columns = [
      { name: 'name', label: 'Task name', width: 200 },
      { name: 'start_date', label: 'Start time', align: 'center' },
      { name: 'duration', label: 'Duration', align: 'center' },
      { name: 'progress', label: 'Progress', width: 44 },
    ];
    gantt.createDataProcessor((entity, action, data, id) => {
      gantt.message(`${entity} ${action}`); // Display a message for each action
      console.log(
        `Entity: ${entity}, Action: ${action}, Data:`,
        data,
        `ID: ${id}`
      );
      // Call onDataChange to propagate changes to the parent component
      if (onDataChange) {
        onDataChange(gantt.serialize());
      }
    });

    // Notify parent about data changes
    gantt.attachEvent('onAfterTaskAdd', () => notifyDataChange());
    gantt.attachEvent('onAfterTaskUpdate', () => notifyDataChange());
    gantt.attachEvent('onAfterTaskDelete', () => notifyDataChange());
  };

  useEffect(() => {
    if (tasks.data.length > 0) {
      initGantt();
      return () => {
        gantt.clearAll();
      };
    }
  }, [tasks]);

  const notifyDataChange = () => {
    const updatedData = gantt.serialize();
    console.log('Updated Gantt data:', updatedData); // Debugging
    if (onDataChange) {
      onDataChange(updatedData); // Pass data to parent component
    }
  };

  return (
    <div ref={ganttContainer} style={{ width: '100%', height: '100%' }}></div>
  );
};

Gantt.propTypes = {
  tasks: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        start_date: PropTypes.string,
        duration: PropTypes.number,
        progress: PropTypes.number,
      })
    ).isRequired,
    links: PropTypes.array, // Adjust if you have specific requirements for links
  }).isRequired,
  onDataChange: PropTypes.func,
};

export default Gantt;
