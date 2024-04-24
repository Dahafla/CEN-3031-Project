import { useState } from 'react'
import './CustomerLogin.css'

const CustomerLogin = () => {
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
                    <small>Format: 123-456-7890</small>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default CustomerLogin;