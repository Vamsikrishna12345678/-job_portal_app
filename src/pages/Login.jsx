import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (e) => {

        e.preventDefault()

        const users = JSON.parse(
            localStorage.getItem("users")
        ) || []

        const user = users.find(
            (user) =>
                user.email === email &&
                user.password === password
        )

        if (!user) {
            setError("Invalid email or password")
            return
        }

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        )

        localStorage.setItem(
            "isLoggedIn",
            "true"
        )

        navigate("/")
    }

    return (
        <div className="form-page">

            <form
                className="form-card login-form"
                onSubmit={handleSubmit}
            >

                <h1>Welcome Back</h1>

                <p className="form-subtitle">
                    Login to your Job Portal account
                </p>

                <div className="form-field">
                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />
                </div>

                <div className="form-field">
                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />
                </div>

                {error && (
                    <p className="form-error">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="login-button"
                >
                    Login
                </button>

                <p className="form-link">
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </form>

        </div>
    )
}

export default Login