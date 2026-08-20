import {useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthLayout from "../components/auth/AuthLayout.jsx"
import AuthInput from "../components/auth/AuthInput.jsx"
import AuthButton from "../components/auth/AuthButton.jsx"

import { signUpUser } from "../firebase/auth.js"
import getAuthErrorMessage from "../firebase/authErrors.js"

function Signup(){
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e){
        e.preventDefault();
        setError("");

        const trimmedName = name.trim()
        const trimmedEmail = email.trim();

        if(!trimmedName){
            setError("Please enter your name.");
            return;
        }
        if(!trimmedEmail){
            setError("Please enter your email.");
            return;
        }
        if(!password){
            setError("Please enter your password.");
            return;
        }
        if(!confirmPassword){
            setError("Please confirm your password.");
            return;
        }
        if(password.length < 8){
            setError("Password must be at least 8 characters.");
            return;
        }
        if(password !== confirmPassword){
            setError("Passwords do not match.");
            return;
        }

        try{
            setLoading(true);
            
            const user = await signUpUser(
                trimmedName,
                trimmedEmail,
                password
            );
            navigate("/")
        }catch(error){
            console.error(error);
            setError(getAuthErrorMessage(error))

        }finally{
            setLoading(false);
        }
    }

    return(
        <AuthLayout>
            <div className="auth-form-container">
                <div className="auth-form-header">
                    <h2>Create your account</h2>
                    <p>Join ChatNest and start chatting.</p>
                </div>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >
                    <AuthInput
                        label="Name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        autoComplete="name"
                        required
                    />

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
                        placeholder="Create a password"
                        autoComplete="new-password"
                        minLength={8}
                        required
                    />

                    <AuthInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        minLength={8}
                        required
                    />

                    {error && (
                        <p className="auth-form-error">{error}</p>
                    )}

                    <AuthButton loading={loading}>
                        Create Account
                    </AuthButton>
                </form>

                <p className="auth-switch">
                    Already have an account? {" "}
                    <Link to="/login" className="auth-switch-link">Login</Link>
                </p>
            </div>
        </AuthLayout>
    )

}
export default Signup