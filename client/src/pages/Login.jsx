import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Flash from "../components/Flash";
import "./Auth.css";

const Login = () => {
    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });
    const [flash, setFlash] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await loginUser(form);
            if (data.success) {
                navigate("/");
            }
        } catch (err) {
            setFlash({
                message: err.response?.data?.message || "Login failed",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            {flash && (
                <Flash message={flash.message} type={flash.type} onClose={() => setFlash(null)} />
            )}

            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-icon">
                            <i className="fa-solid fa-house-chimney"></i>
                        </div>
                        <h1>Welcome back</h1>
                        <p>Login to your StayHub account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="auth-field">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                placeholder="Enter username"
                                required
                            />
                        </div>

                        <div className="auth-field">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                placeholder="Enter password"
                                required
                            />
                        </div>

                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="btn-spinner"></span>
                                    Logging in...
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Don&apos;t have an account? <Link to="/signup">Sign up here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
