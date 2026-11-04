import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("")
    const [role, setRole] = useState("applicant")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!name || !email || !password || !gender || !role) {
            alert("Please fill all the fields")
            return
        }

        const users = JSON.parse(
            localStorage.getItem("users")
        ) || []

        const existingUser = users.find(
            (user) => user.email === email
        )

        if (existingUser) {
            alert("User already registered")
            return
        }

        const user = {
            name: name,
            email: email,
            password: password,
            gender: gender,
            role: role
        }

        users.push(user)

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        )

        alert("Registration successful")

        navigate("/login")
    }

    return (
        <div className="form-page">

            <form
                className="form-card register-form"
                onSubmit={handleSubmit}
            >

                <h1>Create Account</h1>

                <p className="form-subtitle">
                    Register to get started with Job Portal
                </p>

                {/* Name */}
                <div className="form-field">
                    <label>Full Name</label>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        required
                    />
                </div>

                {/* Email */}
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

                {/* Password */}
                <div className="form-field">
                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />
                </div>

                {/* Gender */}
                <div className="radio-group">

                    <h3>Gender</h3>

                    <div className="radio-option">
                        <input
                            type="radio"
                            name="gender"
                            id="male"
                            value="Male"
                            checked={gender === "Male"}
                            onChange={(e) =>
                                setGender(e.target.value)
                            }
                        />

                        <label htmlFor="male">
                            Male
                        </label>
                    </div>

                    <div className="radio-option">
                        <input
                            type="radio"
                            name="gender"
                            id="female"
                            value="Female"
                            checked={gender === "Female"}
                            onChange={(e) =>
                                setGender(e.target.value)
                            }
                        />

                        <label htmlFor="female">
                            Female
                        </label>
                    </div>

                </div>

                {/* Role */}
                <div className="radio-group">

                    <h3>Select Role</h3>

                    <div className="radio-option">
                        <input
                            type="radio"
                            name="role"
                            id="applicant"
                            value="applicant"
                            checked={role === "applicant"}
                            onChange={(e) =>
                                setRole(e.target.value)
                            }
                        />

                        <label htmlFor="applicant">
                            Applicant
                        </label>
                    </div>

                    <div className="radio-option">
                        <input
                            type="radio"
                            name="role"
                            id="employer"
                            value="employer"
                            checked={role === "employer"}
                            onChange={(e) =>
                                setRole(e.target.value)
                            }
                        />

                        <label htmlFor="employer">
                            Employer
                        </label>
                    </div>

                </div>

                <button
                    type="submit"
                    className="register-button"
                >
                    Create Account
                </button>

                <p className="form-link">
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </form>

        </div>
    )
}

export default Register