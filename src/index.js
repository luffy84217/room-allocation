import React from 'react';
import { createRoot } from 'react-dom/client';

import './style.css';
import RoomAllocation from './components/RoomAllocation';

const App = () => {
  return (
		<RoomAllocation
			guest={10}
			room={3}
			onChange={(result) => console.log(result)}
		/>
  );
}

const root = createRoot(document.getElementById('root'));

root.render(<App />);
