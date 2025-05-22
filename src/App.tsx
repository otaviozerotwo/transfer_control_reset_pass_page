import { Route, Routes } from 'react-router-dom';
import { ResetPassword } from './pages/ResetPassword';

function App() {
  return (
    <Routes>
      <Route path='/reset-password' element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
