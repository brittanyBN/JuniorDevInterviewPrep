import React from "react";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "../Components/NavigationBar";
import "./Login.css";

export const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <div className="Main-login-wrapper">
            <NavigationBar />
            <div className="container">
                <h2>Login</h2>
                <form action="#" method="POST">
                    <input type="email" name="email" placeholder="Email" required />
                    <input type="password" name="password" placeholder="Password" required />
                    <input type="submit" value="Login" />
                </form>
                <div className="register-link">
                    <a href="#">Register a new user</a>
                </div>
            </div>
        </div>
    );
}
