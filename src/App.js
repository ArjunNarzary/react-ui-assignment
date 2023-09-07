import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Roles from './pages/Roles';
import Users from './pages/Users';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Users />} />
        <Route path="/roles" exact element={<Roles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
