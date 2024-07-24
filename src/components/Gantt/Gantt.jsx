// import PropTypes from 'prop-types';
// import { gantt } from 'dhtmlx-gantt';
// import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
// import './Gantt.css';
// import { useEffect, useRef } from 'react';

// const Gantt = ({ tasks, zoom }) => {
//   const ganttContainer = useRef(null);

//   const initZoom = () => {
//     gantt.ext.zoom.init({
//       levels: [
//         {
//           name: 'Hours',
//           scale_height: 60,
//           min_column_width: 30,
//           scales: [
//             { unit: 'day', step: 1, format: '%d %M' },
//             { unit: 'hour', step: 1, format: '%H' },
//           ],
//         },
//         {
//           name: 'Days',
//           scale_height: 60,
//           min_column_width: 70,
//           scales: [
//             { unit: 'week', step: 1, format: 'Week #%W' },
//             { unit: 'day', step: 1, format: '%d %M' },
//           ],
//         },
//         {
//           name: 'Months',
//           scale_height: 60,
//           min_column_width: 70,
//           scales: [
//             { unit: 'month', step: 1, format: '%F' },
//             { unit: 'week', step: 1, format: '#%W' },
//           ],
//         },
//       ],
//     });
//   };

//   useEffect(() => {
//     gantt.config.date_format = '%Y-%m-%d %H:%i';
//     gantt.init(ganttContainer.current);
//     initZoom();
//     gantt.parse(tasks);

//     // Cleanup function if necessary (depends on how gantt needs to be cleaned up)
//     return () => {
//       gantt.clearAll(); // Example cleanup, adjust as needed
//     };
//   }, [tasks]);

//   useEffect(() => {
//     initZoom();
//     gantt.render();
//   }, [zoom]);

//   return (
//     <div ref={ganttContainer} style={{ width: '100%', height: '100%' }}></div>
//   );
// };

// Gantt.propTypes = {
//   tasks: PropTypes.array.isRequired,
//   zoom: PropTypes.string,
// };

// export default Gantt;

import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './Gantt.css';

const Gantt = ({ tasks }) => {
  const ganttContainer = useRef(null);

  useEffect(() => {
    gantt.config.date_format = '%Y-%m-%d %H:%i';
    gantt.init(ganttContainer.current);
    gantt.parse(tasks);

    return () => {
      gantt.clearAll();
    };
  }, [tasks]);

  return (
    <div ref={ganttContainer} style={{ width: '100%', height: '100%' }}></div>
  );
};

Gantt.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default Gantt;
