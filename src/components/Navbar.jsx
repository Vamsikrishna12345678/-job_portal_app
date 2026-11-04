import { Link, useNavigate } from "react-router-dom"

function Navbar() {

    const navigate = useNavigate()

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    )

    const handleLogOut = () => {

        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("user")

        navigate("/login")
    }

    return (
        <nav>

            <h2>Job Portal</h2>

            <div>

                <Link to="/">
                    Home
                </Link>

                <Link to="/jobs">
                    Jobs
                </Link>

                {/* Employer only */}
                {currentUser?.role === "employer" && (
                    <>
                        <Link to="/create-job">
                            Create Job
                        </Link>

                        <Link to="/manage-applications">
                            Manage Applications
                        </Link>
                    </>
                )}

                {/* Applicant only */}
                {currentUser?.role === "applicant" && (
                    <Link to="/applications">
                        My Applications
                    </Link>
                )}

                {!currentUser && (
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                )}

                {currentUser && (
                    <button onClick={handleLogOut}>
                        Logout
                    </button>
                )}

            </div>

        </nav>
    )
}

export default Navbar