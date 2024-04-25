import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
import HomePage from './components/HomePage.jsx';
import GuestReservationForm from './components/GuestReservationForm.jsx';
import CustomerReservationForm from './components/CustomerReservationForm.jsx';
import CreateCustomerAccount from './components/CreateCustomerAccount.jsx';
import CustomerLogin from './components/CustomerLogin.jsx';
import EmployeeLogin from './components/EmployeeLogin.jsx';
import EmployeeView from './components/EmployeeView.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guest-reservation" element={<GuestReservationForm />} />
        <Route path="/customer-reservation" element={<CustomerReservationForm />} />
        <Route path="/signup" element={<CreateCustomerAccount />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/host" element={<EmployeeView />} />
      </Routes>
    </Router>
  );
};

export default App;