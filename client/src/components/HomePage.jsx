import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="container">
            <h1 className="title">Welcome to DAGZ!</h1>
            <p className="description">Want to make a reservation? Please sign in or continue as a guest.</p>
            <div className="actions">
                <Link to="/customer-login" className="link">
                    <button className="button button-sign-in">Sign In</button>
                </Link>
                <Link to="/guest-reservation" className="link">
                    <button className="button button-guest">Continue as Guest</button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;