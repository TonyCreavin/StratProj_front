import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import gantt from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './Gantt.css';
import dayjs from 'dayjs';

const Gantt = ({ tasks, onDataChange, onEditTask, onDeleteTask, onUpdate }) => {
  const ganttContainer = useRef(null);

  const initGantt = () => {
    gantt.config.editable = false; // Enable editing
    gantt.init(ganttContainer.current);

    // const formattedTasks = tasks.data.map((task) => ({
    //   ...task,
    //   start_date: dayjs(task.start_date).format('DD-MM-YYYY'),
    //   end_date: dayjs(task.start_date)
    //     .add(task.duration, 'day')
    //     .format('DD-MM-YYYY'),
    //   log: console.log('task start_date', task.start_date),
    // }));

    // console.log('Formatted tasks:', formattedTasks); // Debugging
    // gantt.parse({ data: formattedTasks });

    const formattedTasks = tasks.data.map((task) => {
      const parsedStartDate = dayjs(task.start_date);
      const start_date = parsedStartDate.isValid()
        ? parsedStartDate.format('DD-MM-YYYY')
        : 'Invalid Date';
      const end_date = parsedStartDate.isValid()
        ? parsedStartDate.add(task.duration, 'day').format('DD-MM-YYYY')
        : 'Invalid Date';

      console.log('task start_date', task.start_date);

      return {
        ...task,
        start_date,
        end_date,
      };
    });

    console.log('Formatted tasks:', formattedTasks); // Debugging
    gantt.parse({ data: formattedTasks });

    // Set custom task content template
    gantt.templates.task_text = (start, end, task) => {
      const progress =
        typeof task.progress === 'number' &&
        !isNaN(task.progress) &&
        task.progress >= 0 &&
        task.progress <= 1
          ? Math.round(task.progress * 100) // Convert progress to percentage
          : 0; // Default to 0% if undefined or invalid

      return `
        <div>

          <div> ${progress}%</div>
        </div>
      `;
    };

    gantt.config.columns = [
      { name: 'name', label: 'Task name', width: 100 },
      { name: 'start_date', label: 'Start time', align: 'center', width: 100 },
      { name: 'duration', label: 'Duration', align: 'center', width: 60 },
      { name: 'progress', label: 'Progress', width: 60 },
      {
        name: 'delete',
        label: 'Delete',
        width: 200,
        template: (task) =>
          `<button class="delete-btn" data-id="${task.id}" >Delete</button>`,
      },
    ];

    gantt.attachEvent('onTaskClick', (id) => {
      const task = gantt.getTask(id);
      onEditTask(task);
      return false;
    });

    gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
      onUpdate(id, task);
      notifyDataChange(); // Notify about data changes after update
    });

    gantt.createDataProcessor((entity, action, data, id) => {
      gantt.message(`${entity} ${action}`); // Display a message for each action
      console.log(
        `Entity: ${entity}, Action: ${action}, Data:`,
        data,
        `ID: ${id}`
      );

      if (action === 'update') {
        onUpdate(id, data);
      }

      if (onDataChange) {
        onDataChange(gantt.serialize());
      }

      return Promise.resolve();
    });

    // Notify parent about data changes
    gantt.attachEvent('onAfterTaskAdd', notifyDataChange);
    gantt.attachEvent('onAfterTaskUpdate', notifyDataChange);
    gantt.attachEvent('onAfterTaskDelete', (id) => {
      onDeleteTask(id);
      notifyDataChange();
    });

    document.addEventListener('click', handleDeleteButtonClick);
  };

  useEffect(() => {
    if (tasks.data.length > 0) {
      initGantt();
      return () => {
        gantt.clearAll();
        document.removeEventListener('click', handleDeleteButtonClick);
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

  const handleDeleteButtonClick = (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const taskId = event.target.getAttribute('data-id');
      onDeleteTask(taskId);
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
  onEditTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Gantt;
