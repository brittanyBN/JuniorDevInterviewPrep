import { useState } from 'react';
import axios from 'axios';

export const ForgotPasswordPage = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');

    const resetPassword = async () => {
        try {
            await axios.post('/forgotPassword', { email });
            setSuccess(true);
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    };

    return success ? (
        <div className="content-container">
            <h1>Success</h1>
            <p>Check your email for a reset link. Make sure to check your spam folder.</p>
        </div>
    ) : (
        <div className="content-container">
            <h1>Forgot Password</h1>
            <p>Enter your email and we'll send you a reset link</p>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="someone@gmail.com"
            />
            <button
                disabled={!email}
                onClick={resetPassword}
            >
                Send Reset Link
            </button>
        </div>
    );
};
