import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const ApplyJob = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    )

    const [resume, setResume] = useState(null)

    const handleResumeChange = (e) => {

        const file = e.target.files[0]

        if (!file) {
            return
        }

        if (file.type !== "application/pdf") {

            alert("Please select a PDF file")

            e.target.value = ""

            return
        }

        setResume(file)
    }


    const handleSubmit = async (e) => {

        e.preventDefault()

        if (!resume) {

            alert("Please upload your resume")

            return
        }

        try {

            const response = await axios.get(
                "https://job-portal-backend-api-uskh.onrender.com/applications"
            )

            const applications = response.data

            const alreadyApplied = applications.some(
                (app) =>
                    String(app.jobId) === String(id) &&
                    app.userEmail === currentUser.email
            )

            if (alreadyApplied) {

                alert(
                    "You have already applied for this job"
                )

                return
            }


            const newApplication = await axios.post(
                "https://job-portal-backend-api-uskh.onrender.com/applications",
                {
                    name: currentUser.name,
                    email: currentUser.email,
                    resume: resume.name,
                    jobId: id,
                    userEmail: currentUser.email,
                    status: "Applied",
                    appliedAt: new Date().toISOString()
                }
            )

            console.log(newApplication.data)

            alert(
                "Application submitted successfully"
            )

            navigate(`/jobs/${id}`)

        } catch (error) {

            console.log(error)

            alert(
                "Failed to submit application"
            )
        }
    }


    return (

        <div className="form-page">

            <form
                className="form-card apply-form"
                onSubmit={handleSubmit}
            >

                <h1>Apply for Job</h1>


                {/* Applicant Name */}

                <div className="form-field">

                    <label>
                        Full Name
                    </label>

                    <input
                        type="text"
                        value={currentUser?.name || ""}
                        readOnly
                    />

                </div>


                {/* Applicant Email */}

                <div className="form-field">

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        value={currentUser?.email || ""}
                        readOnly
                    />

                </div>


                {/* Resume */}

                <div className="resume-section">

                    <label className="resume-label">
                        Resume
                    </label>

                    <label
                        htmlFor="resume-upload"
                        className="resume-upload"
                    >

                        <span className="upload-icon">
                            +
                        </span>

                        <span>
                            Upload Resume
                        </span>

                        <small>
                            PDF files only
                        </small>

                    </label>

                    <input
                        id="resume-upload"
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={handleResumeChange}
                        hidden
                    />


                    {resume && (

                        <div className="selected-resume">

                            <span>
                                📄
                            </span>

                            <div>
                                <strong>
                                    {resume.name}
                                </strong>

                                <small>
                                    PDF Resume selected
                                </small>
                            </div>

                        </div>

                    )}

                </div>


                <button
                    type="submit"
                    className="submit-application"
                >
                    Submit Application
                </button>


                <button
                    type="button"
                    className="cancel-application"
                    onClick={() =>
                        navigate(`/jobs/${id}`)
                    }
                >
                    Cancel
                </button>

            </form>

        </div>
    )
}

export default ApplyJob