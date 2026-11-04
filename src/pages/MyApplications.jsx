import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const MyApplications = () => {

    const [applications, setApplications] = useState([])
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    )

    useEffect(() => {

        async function getData() {

            try {

                const applicationsResponse =
                    await axios.get(
                        "https://job-portal-backend-api-uskh.onrender.com/applications"
                    )

                const jobsResponse =
                    await axios.get(
                        "https://job-portal-backend-api-uskh.onrender.com/jobs"
                    )

                const myApplications =
                    applicationsResponse.data.filter(
                        (application) =>
                            application.userEmail ===
                            currentUser?.email
                    )

                setApplications(myApplications)
                setJobs(jobsResponse.data)

            } catch (error) {

                console.log(error)

            } finally {

                setLoading(false)

            }
        }

        getData()

    }, [currentUser?.email])


    const getJob = (jobId) => {

        return jobs.find(
            (job) =>
                String(job.id) === String(jobId)
        )

    }


    const getStatusClass = (status) => {

        switch (status) {

            case "Applied":
                return "status-applied"

            case "Under Review":
                return "status-review"

            case "Shortlisted":
                return "status-shortlisted"

            case "Rejected":
                return "status-rejected"

            case "Accepted":
                return "status-accepted"

            default:
                return ""

        }
    }


    const handleWithdraw = async (applicationId) => {

        const confirmWithdraw =
            window.confirm(
                "Are you sure you want to withdraw this application?"
            )

        if (!confirmWithdraw) {
            return
        }

        try {

            await axios.delete(
                `https://job-portal-backend-api-uskh.onrender.com/applications/${applicationId}`
            )

            setApplications(
                applications.filter(
                    (application) =>
                        application.id !== applicationId
                )
            )

            alert(
                "Application withdrawn successfully"
            )

        } catch (error) {

            console.log(error)

            alert(
                "Failed to withdraw application"
            )

        }
    }


    if (loading) {

        return (
            <div className="page-message">
                <h2>Loading applications...</h2>
            </div>
        )

    }


    return (

        <div className="applications-page">

            {/* Header */}

            <div className="applications-header">

                <h1>
                    My Applications
                </h1>

                <p>
                    Track the jobs you have applied for
                    and check your application status.
                </p>

            </div>


            {applications.length === 0 ? (

                <div className="applications-empty">

                    <div className="empty-icon">
                        📄
                    </div>

                    <h2>
                        No Applications Yet
                    </h2>

                    <p>
                        You haven't applied for any jobs yet.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/jobs")
                        }
                    >
                        Browse Jobs
                    </button>

                </div>

            ) : (

                <div className="applications-list">

                    {applications.map(
                        (application) => {

                            const job =
                                getJob(
                                    application.jobId
                                )

                            return (

                                <div
                                    key={application.id}
                                    className="application-card"
                                >

                                    {job ? (

                                        <>
                                            {/* Card Header */}

                                            <div className="application-header">

                                                <div>

                                                    <h2>
                                                        {job.title}
                                                    </h2>

                                                    <h3>
                                                        {job.company}
                                                    </h3>

                                                </div>

                                                <span
                                                    className={getStatusClass(
                                                        application.status
                                                    )}
                                                >
                                                    {application.status}
                                                </span>

                                            </div>


                                            {/* Job Information */}

                                            <div className="application-info">

                                                <div>
                                                    <span>
                                                        📍
                                                    </span>

                                                    <p>
                                                        {job.location}
                                                    </p>
                                                </div>

                                                <div>
                                                    <span>
                                                        💰
                                                    </span>

                                                    <p>
                                                        {job.salary}
                                                    </p>
                                                </div>

                                                <div>
                                                    <span>
                                                        💼
                                                    </span>

                                                    <p>
                                                        {job.type}
                                                    </p>
                                                </div>

                                            </div>


                                            {/* Resume */}

                                            <div className="application-resume">

                                                <span>
                                                    📄
                                                </span>

                                                <div>

                                                    <small>
                                                        Resume
                                                    </small>

                                                    <p>
                                                        {application.resume}
                                                    </p>

                                                </div>

                                            </div>


                                            {/* Actions */}

                                            <div className="application-actions">

                                                {job && (

                                                    <button
                                                        className="view-application-button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/jobs/${application.jobId}`
                                                            )
                                                        }
                                                    >
                                                        View Job
                                                    </button>

                                                )}


                                                {application.status !==
                                                    "Accepted" &&
                                                    application.status !==
                                                    "Rejected" && (

                                                        <button
                                                            className="withdraw-button"
                                                            onClick={() =>
                                                                handleWithdraw(
                                                                    application.id
                                                                )
                                                            }
                                                        >
                                                            Withdraw
                                                        </button>

                                                    )}

                                            </div>

                                        </>

                                    ) : (

                                        <div>

                                            <h2>
                                                Job no longer available
                                            </h2>

                                            <p>
                                                This application is still
                                                recorded, but the job has
                                                been removed.
                                            </p>

                                        </div>

                                    )}

                                </div>

                            )

                        }
                    )}

                </div>

            )}

        </div>
    )
}

export default MyApplications