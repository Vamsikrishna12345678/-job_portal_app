import {
    createBrowserRouter,
    RouterProvider,
    Outlet
} from "react-router-dom"

import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./pages/Home"
import Jobs from "./pages/Jobs"
import Login from "./pages/Login"
import Register from "./pages/Register"
import JobDetails from "./pages/JobDetails"
import CreateJobs from "./pages/CreateJobs"
import EditJob from "./pages/EditJob"
import ApplyJob from "./pages/ApplyJob"
import MyApplications from "./pages/MyApplications"
import ManageApplications from "./pages/ManageApplications"
import EmployerRoute from "./components/EmployerRoute"
import ApplicantRoute from "./components/ApplicantRoute"



function Layout() {
    return (
        <>
            <Navbar />

            <Outlet />
        </>
    )
}


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,

        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/jobs",
                element: (
                    <ProtectedRoute>
                        <Jobs />
                    </ProtectedRoute>
                )
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "/jobs/:id",
                element: (
                    <ProtectedRoute>
                        <JobDetails />
                    </ProtectedRoute>
                )
            },
            {
                path: "create-job",
                element: (
                    <EmployerRoute>
                        <CreateJobs />
                    </EmployerRoute>
                )
            },
            {
                path: "/jobs/edit/:id",
                element: (
                    <EmployerRoute>
                        <EditJob />
                    </EmployerRoute>
                )
            },
            {
                path: "/jobs/:id/apply",
                element: (
                    <ApplicantRoute>
                        <ApplyJob />
                    </ApplicantRoute>
                )
            },
            {
                path: "/applications",
                element: (
                    <ProtectedRoute>
                        <MyApplications />
                    </ProtectedRoute>
                )
            },
            {
                path: "/manage-applications",
                element: (
                    <EmployerRoute>
                        <ManageApplications />
                    </EmployerRoute>
                )
            }
        ]
    }
])


function App() {

    return <RouterProvider router={router} />

}

export default App