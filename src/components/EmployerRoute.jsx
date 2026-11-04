import { Navigate } from "react-router-dom"

const EmployerRoute = ({ children }) => {

    const isLoggedIn =
        localStorage.getItem("isLoggedIn")

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    )

    if (!isLoggedIn) {
        return <Navigate to="/login" />
    }

    if (
        !currentUser ||
        currentUser.role !== "employer"
    ) {
        return <Navigate to="/" />
    }

    return children
}

export default EmployerRoute