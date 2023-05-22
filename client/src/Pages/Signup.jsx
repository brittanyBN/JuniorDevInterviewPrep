import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Signup.css";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const SIGNUP_URL = '/signup';

export const SignupPage = () => {
    const emailRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [validateName, setValidateName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validateEmail, setValidateEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validatePassword, setValidatePassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validateConfirmation, setValidateConfirmation] = useState(false);
    const [confirmFocus, setConfirmFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidateName(name.length > 0);
    }, [name])

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setValidateEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidatePassword(PASSWORD_REGEX.test(password));
        setValidateConfirmation(password === confirmPassword);
    }, [password, confirmPassword])

    useEffect(() => {
        setErrorMessage('');
    }, [email, password, confirmPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v = name.length > 0;
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PASSWORD_REGEX.test(password);
        if (!v ||!v1 || !v2) {
            setErrorMessage("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(SIGNUP_URL,
                JSON.stringify({ name, email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            navigate("/login")
            setSuccess(true);
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            if (!err?.response) {
                setErrorMessage('No Server Response');
            } else if (err.response?.status === 409) {
                setErrorMessage('This email is already in registered');
            } else {
                setErrorMessage('Failed to register user');
            }
            errRef.current.focus();
        }
    }

    return (
                <section>
                    <p ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</p>
                    <div className="container">
                    <h2>Signup</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">
                            Name:
                            <FontAwesomeIcon icon={faCheck} className={validateName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validateName || !name ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                            aria-invalid={validateName ? "false" : "true"}
                            aria-describedby="namenote"
                            onFocus={() => setNameFocus(true)}
                            onBlur={() => setNameFocus(false)}
                        />
                        <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validateEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validateEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validateEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="uidnote" className={emailFocus && !validateEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must be a valid email. Include the @ symbol.
                        </p>

                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validatePassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validatePassword || !password ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validatePassword ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p id="pwdnote" className={passwordFocus && !validatePassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_password">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validateConfirmation && confirmPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validateConfirmation || !confirmPassword ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            required
                            aria-invalid={validateConfirmation ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setConfirmFocus(true)}
                            onBlur={() => setConfirmFocus(false)}
                        />
                        <p id="confirmnote" className={confirmFocus && !validateConfirmation ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Passwords must match.
                        </p>
                        <button className="center" id="signup" disabled={!validateName || !validateEmail || !validatePassword || !validateConfirmation}>Sign Up</button>
                    </form>
                    <p className="center">
                        Already registered?<br />
                        <span className="link">
                            <a href="/login">Sign In</a>
                        </span>
                    </p>
                    </div>
                </section>
    )
}

