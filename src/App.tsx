import { Route, Routes, Navigate } from 'react-router-dom';
import { ResetPassword } from './pages/ResetPassword';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to ='/reset-password' replace />} />
      <Route path='/reset-password' element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
