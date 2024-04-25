import { useNavigate } from 'react-router-dom';
import './CustomerLogin.css'

const CustomerLogin = () => {
    const navigate = useNavigate();
    
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const phonenumber = formData.get('phone');
        
        fetch('http://127.0.0.1:5000/customer-login?phone=' + phonenumber)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response:', data);
            if (Object.keys(data).length > 1) {
                navigate('/customer-reservation', { state: data });
            } else {
                navigate('/signup', { state: data });
            }
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    {/* <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required /> */}
                    <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" required />
                    <small>Format: 123-456-7890</small>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default CustomerLogin;