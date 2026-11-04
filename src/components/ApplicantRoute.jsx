import { Navigate } from "react-router-dom"

const ApplicantRoute = ({ children }) => {

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
        currentUser.role !== "applicant"
    ) {
        return <Navigate to="/jobs" />
    }

    return children
}

export default ApplicantRoute