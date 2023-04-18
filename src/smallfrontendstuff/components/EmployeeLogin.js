import React, { useState } from 'react';
import api from '../services';

function EmployeeLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError('Please enter your email and password');
            return;
        }

        api.post('/employee_login', {
            email: email,
            password: password
        })
            .then((response) => {
                localStorage.setItem('eid', response.data.eid);
                alert('Employee login successful!');
                setEmail('');
                setPassword('');
                setError('');
            })
            .catch((error) => {
                setError(error.response.data.error);
            });
    };

    return (
        <div>
            <h2>Employee Login</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
export default EmployeeLogin;
