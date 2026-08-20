import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import AuthLayout from "../components/auth/AuthLayout.jsx"
import AuthInput from "../components/auth/AuthInput"
import AuthButton from "../components/auth/AuthButton"

import { loginUser } from "../firebase/auth.js"
import getAuthErrorMessage from "../firebase/authErrors.js" 

function Login(){
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        setError("");

        const trimmedEmail = email.trim();

        if(!trimmedEmail){
            setError("Please enter your email.");
            return;
        }
        if(!password){
            setError("Please enter your password.");
            return;
        }

        try{
            setLoading(true);

            const user = await loginUser(
                trimmedEmail,
                password
            );
            navigate("/");
        }catch(error){
            console.error(error);
            setError(getAuthErrorMessage(error));

        }finally{
            setLoading(false);
        }
    }

    return(
        <AuthLayout>
            <div className="auth-form-container">
                <div className="auth-form-header">
                    <h2>Welcome Back</h2>
                    <p>Log in to continue chatting.</p>
                </div>

                <form 
                    onSubmit={handleSubmit}
                    className="auth-form"
                >
                    <AuthInput
                        label="Email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        autoComplete="email"
                        required
                    />

                    <AuthInput
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                    />

                    {error && (
                        <p className="auth-form-error">{error}</p>
                    )}

                    <AuthButton loading={loading}>
                        Login
                    </AuthButton>

                </form>

                <p className="auth-switch">
                    Don't have an account?{" "}
                    <Link to="/signup" className="auth-switch-link">Sign up</Link>
                </p>
            </div>
        </AuthLayout>
    )
}
export default Login