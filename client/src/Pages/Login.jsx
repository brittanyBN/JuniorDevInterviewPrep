import { useRef, useState, useEffect, useContext } from "react";
import { NavigationBar } from "../Components/NavigationBar";
import AuthContext from "../Context/AuthProvider";
import "./Login.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMessage('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/login",
                JSON.stringify({email, password}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            navigate("/home")
            const accessToken = response?.data?.accessToken;
            const refreshToken = response?.data?.refreshToken;
            const role = response?.data?.role;
            if (accessToken && refreshToken) {
                setAuth({ email, password, role, accessToken, refreshToken });
                setSuccess(true);
                setEmail('');
                setPassword('');
            }
        } catch (err) {
            console.log(err);
            setErrorMessage(err?.response?.data?.message);
            errRef.current.focus();
        }
    }

    return (
        <section className="Main-login-wrapper">
            <p ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</p>
            <NavigationBar />
            <div className="container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} method="POST">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        ref={emailRef}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required />
                    <input type="submit" value="Login" />
                </form>
                <div className="register-link">
                    <a href="/signup">Signup</a>
                </div>
            </div>
        </section>
    );
}
