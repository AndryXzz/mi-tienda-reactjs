import React from 'react'
import 'moment/locale/es'
import Dashboard from './layouts/Dashboard'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dashboard />
    </LocalizationProvider>
  );
}

export default App;
