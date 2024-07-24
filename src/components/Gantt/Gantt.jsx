import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import gantt from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './Gantt.css';

const Gantt = ({ tasks, onDataChange }) => {
  const ganttContainer = useRef(null);

  useEffect(() => {
    console.log('Gantt tasks:', tasks); // Log the tasks passed to Gantt
    gantt.config.date_format = '%Y-%m-%d %H:%i';
    gantt.config.editable = true; // Enable editing
    gantt.config.columns = [
      { name: 'name', label: 'Task name', width: 200 },
      { name: 'start_date', label: 'Start time', align: 'center' },
      { name: 'duration', label: 'Duration', align: 'center' },
      { name: 'progress', label: 'Progress', width: 44 },
    ];
    gantt.init(ganttContainer.current);
    gantt.parse(tasks);

    // Notify parent about data changes
    gantt.attachEvent('onAfterTaskAdd', () => notifyDataChange());
    gantt.attachEvent('onAfterTaskUpdate', () => notifyDataChange());
    gantt.attachEvent('onAfterTaskDelete', () => notifyDataChange());

    return () => {
      gantt.clearAll();
    };
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
  tasks: PropTypes.object.isRequired, // Changed to object to align with Gantt data structure
  onDataChange: PropTypes.func,
};

export default Gantt;
