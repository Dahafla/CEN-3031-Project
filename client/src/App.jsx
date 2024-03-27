import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import ReservationForm from './components/ReservationForm.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservation-form" element={<ReservationForm />} />
      </Routes>
    </Router>
  );
};

export default App;