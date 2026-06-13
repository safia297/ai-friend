import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("userName", data.name);
            navigate("/");
        } else {
            setError(data.error);
        }
    };

    return (
        <div className="auth">
            <h1>Welcome Back 👋</h1>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Log In</button>
            {error && <p className="error">{error}</p>}
            <p>No account? <a onClick={() => navigate("/signup")}>Sign up</a></p>
        </div>
    );
}

export default Login;