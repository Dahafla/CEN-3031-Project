import { Link } from 'react-router-dom';
import '../App.css'

const HomePage = () => {
    return (
        <>
        <section id='guest-reservation'>
            <h2>Welcome to DAGZ!</h2>
            <h3>Want to reserve a table without creating an account? Click the button below to book as a guest.</h3>
            <Link to="/guest-reserve">
                <button>Reserve as a guest</button>
            </Link>
        </section>
        <section id="create-account">
            <div>
                <h3>Want to earn rewards for visiting? Click the button below to create an account.</h3>
                <button>Create an account</button>
            </div>
            <hr></hr>
            <div>
                <h3>Want to move your business to DAGZ? Click the button below get started.</h3>
                <Link to="/host">
                    <button>Log in</button>
                </Link>
            </div>
        </section>
        </>
        
    );
};

export default HomePage;