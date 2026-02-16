import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Flash from "../components/Flash";
import "./Auth.css";

const Signup = () => {
    const { signupUser } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [flash, setFlash] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await signupUser(form);
            if (data.success) {
                navigate("/");
            }
        } catch (err) {
            setFlash({
                message: err.response?.data?.message || "Signup failed",
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
                        <h1>Join StayHub</h1>
                        <p>Create your account and start exploring</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="auth-field">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                placeholder="Choose a username"
                                required
                            />
                        </div>

                        <div className="auth-field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder="Enter your email"
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
                                placeholder="Create a password"
                                minLength={6}
                                required
                            />
                        </div>

                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="btn-spinner"></span>
                                    Creating account...
                                </>
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Already have an account? <Link to="/login">Login here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
