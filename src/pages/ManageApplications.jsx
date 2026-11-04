import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const ManageApplications = () => {

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

                const allApplications =
                    applicationsResponse.data

                const allJobs =
                    jobsResponse.data

                const employerJobs =
                    allJobs.filter(
                        (job) =>
                            job.employerEmail ===
                            currentUser?.email
                    )

                const employerJobIds =
                    employerJobs.map(
                        (job) => String(job.id)
                    )

                const employerApplications =
                    allApplications.filter(
                        (application) =>
                            employerJobIds.includes(
                                String(application.jobId)
                            )
                    )

                setApplications(
                    employerApplications
                )

                setJobs(employerJobs)

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


    const formatDate = (date) => {

        if (!date) {
            return "Not available"
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
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


    const handleStatusChange = async (
        applicationId,
        newStatus
    ) => {

        try {

            await axios.patch(
                `https://job-portal-backend-api-uskh.onrender.com/applications/${applicationId}`,
                {
                    status: newStatus
                }
            )

            setApplications(
                applications.map(
                    (application) =>
                        application.id ===
                        applicationId
                            ? {
                                ...application,
                                status: newStatus
                            }
                            : application
                )
            )

        } catch (error) {

            console.log(error)

            alert(
                "Failed to update application status"
            )

        }
    }


    if (loading) {

        return (
            <div className="page-message">
                <h2>
                    Loading applications...
                </h2>
            </div>
        )

    }


    return (

        <div className="manage-applications-page">

            {/* Header */}

            <div className="manage-header">

                <h1>
                    Manage Applications
                </h1>

                <p>
                    Review applicants and manage
                    their application status.
                </p>

            </div>


            {applications.length === 0 ? (

                <div className="manage-empty">

                    <div className="empty-icon">
                        📋
                    </div>

                    <h2>
                        No Applications Yet
                    </h2>

                    <p>
                        No applicants have applied
                        for your jobs yet.
                    </p>

                </div>

            ) : (

                <div className="manage-list">

                    {applications.map(
                        (application) => {

                            const job =
                                getJob(
                                    application.jobId
                                )

                            return (

                                <div
                                    key={application.id}
                                    className="manage-card"
                                >

                                    {/* Card Header */}

                                    <div className="manage-card-header">

                                        <div>

                                            <h2>
                                                {job
                                                    ? job.title
                                                    : "Job unavailable"}
                                            </h2>

                                            {job && (
                                                <p className="manage-company">
                                                    {job.company}
                                                </p>
                                            )}

                                        </div>

                                        <span
                                            className={getStatusClass(
                                                application.status
                                            )}
                                        >
                                            {application.status}
                                        </span>

                                    </div>


                                    {/* Applicant */}

                                    <div className="applicant-section">

                                        <h3>
                                            Applicant Information
                                        </h3>

                                        <div className="applicant-info">

                                            <div>
                                                <small>
                                                    Name
                                                </small>

                                                <p>
                                                    {application.name}
                                                </p>
                                            </div>

                                            <div>
                                                <small>
                                                    Email
                                                </small>

                                                <p>
                                                    {application.email}
                                                </p>
                                            </div>

                                        </div>

                                    </div>


                                    {/* Application Details */}

                                    <div className="manage-details">

                                        <div className="resume-box">

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


                                        <div className="date-box">

                                            <span>
                                                📅
                                            </span>

                                            <div>

                                                <small>
                                                    Applied On
                                                </small>

                                                <p>
                                                    {formatDate(
                                                        application.appliedAt
                                                    )}
                                                </p>

                                            </div>

                                        </div>

                                    </div>


                                    {/* Status */}

                                    <div className="status-section">

                                        <label>
                                            Application Status
                                        </label>

                                        <select
                                            value={
                                                application.status
                                            }
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    application.id,
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="Applied">
                                                Applied
                                            </option>

                                            <option value="Under Review">
                                                Under Review
                                            </option>

                                            <option value="Shortlisted">
                                                Shortlisted
                                            </option>

                                            <option value="Rejected">
                                                Rejected
                                            </option>

                                            <option value="Accepted">
                                                Accepted
                                            </option>

                                        </select>

                                    </div>


                                    {/* Actions */}

                                    <div className="manage-actions">

                                        {job && (

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/jobs/${job.id}`
                                                    )
                                                }
                                            >
                                                View Job
                                            </button>

                                        )}

                                    </div>

                                </div>

                            )

                        }
                    )}

                </div>

            )}

        </div>
    )
}

export default ManageApplications