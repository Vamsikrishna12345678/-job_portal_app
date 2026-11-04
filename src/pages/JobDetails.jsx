import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const JobDetails = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    )

    useEffect(() => {

        async function getJob() {

            try {

                const response = await axios.get(
                    `https://job-portal-backend-api-uskh.onrender.com/jobs/${id}`
                )

                setJob(response.data)

            } catch (error) {

                console.log(error)

                setError("Failed to fetch job")

            } finally {

                setLoading(false)

            }
        }

        getJob()

    }, [id])


    if (loading) {

        return (
            <div className="page-message">
                <h2>Loading job...</h2>
            </div>
        )

    }


    if (error) {

        return (
            <div className="page-message error-message">
                <h2>{error}</h2>
            </div>
        )

    }


    if (!job) {

        return (
            <div className="page-message">
                <h2>Job not found</h2>
            </div>
        )

    }


    return (

        <div className="job-details-page">

            <div className="job-details-card">

                {/* Header */}

                <div className="job-details-header">

                    <div>

                        <h1>
                            {job.title}
                        </h1>

                        <h2>
                            {job.company}
                        </h2>

                    </div>

                    <span className="job-details-type">
                        {job.type}
                    </span>

                </div>


                {/* Job Information */}

                <div className="job-details-info">

                    <div className="detail-item">

                        <span className="detail-icon">
                            📍
                        </span>

                        <div>
                            <small>
                                Location
                            </small>

                            <p>
                                {job.location}
                            </p>
                        </div>

                    </div>


                    <div className="detail-item">

                        <span className="detail-icon">
                            💰
                        </span>

                        <div>
                            <small>
                                Salary
                            </small>

                            <p>
                                {job.salary}
                            </p>
                        </div>

                    </div>


                    <div className="detail-item">

                        <span className="detail-icon">
                            💼
                        </span>

                        <div>
                            <small>
                                Job Type
                            </small>

                            <p>
                                {job.type}
                            </p>
                        </div>

                    </div>

                </div>


                {/* Actions */}

                <div className="job-details-actions">

                    {currentUser?.role === "applicant" && (

                        <button
                            className="apply-button"
                            onClick={() =>
                                navigate(
                                    `/jobs/${id}/apply`
                                )
                            }
                        >
                            Apply Now
                        </button>

                    )}

                    <button
                        className="back-button"
                        onClick={() =>
                            navigate("/jobs")
                        }
                    >
                        Back to Jobs
                    </button>

                </div>

            </div>

        </div>

    )
}

export default JobDetails