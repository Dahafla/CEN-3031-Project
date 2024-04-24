import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
import HomePage from './components/HomePage.jsx';
import GuestReservationForm from './components/GuestReservationForm.jsx';
import CustomerLogin from './components/CustomerLogin.jsx';
import EmployeeLogin from './components/EmployeeLogin.jsx';
import EmployeeView from './components/EmployeeView.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guest-reservation" element={<GuestReservationForm />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/host" element={<EmployeeView />} />
      </Routes>
    </Router>
  );
};

export default App;