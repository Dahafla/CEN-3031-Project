import { Link } from 'react-router-dom';
import '../App.css'

const HomePage = () => {
    return (
        <div className="container">
            <h1 className="title">Welcome to DAGZ!</h1>
            <p className="description">Want to make a reservation? Click the button below.</p>
            <Link to="/reservation-form">
                <button className="button">Go to Reservation Form</button>
            </Link>
        </div>
    );
};

export default HomePage;