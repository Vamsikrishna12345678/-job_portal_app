import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const CreateJob = () => {

    const [job, setJob] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        type: ""
    })

    const navigate = useNavigate()

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    )

    const handleChange = (e) => {
        setJob({
            ...job,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (
            !job.title ||
            !job.company ||
            !job.location ||
            !job.salary ||
            !job.type
        ) {
            alert("Please fill all the fields")
            return
        }

        try {
            const response = await axios.post(
                "https://job-portal-backend-api-uskh.onrender.com/jobs",
                {
                    title: job.title,
                    company: job.company,
                    location: job.location,
                    salary: job.salary,
                    type: job.type,
                    employerEmail: currentUser.email
                }
            )

            console.log(response.data)

            alert("Job created successfully")

            navigate("/jobs")

        } catch (error) {
            console.log(error)
            alert("Failed to create job")
        }
    }

    return (
        <div className="form-page">

            <form
                className="form-card create-job-form"
                onSubmit={handleSubmit}
            >

                <h1>Create Job</h1>

                <p className="form-subtitle">
                    Post a new job opportunity
                </p>

                <div className="form-field">
                    <label>Job Title</label>

                    <input
                        type="text"
                        name="title"
                        placeholder="Enter job title"
                        value={job.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-field">
                    <label>Company</label>

                    <input
                        type="text"
                        name="company"
                        placeholder="Enter company name"
                        value={job.company}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-field">
                    <label>Location</label>

                    <input
                        type="text"
                        name="location"
                        placeholder="Enter job location"
                        value={job.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-field">
                    <label>Salary</label>

                    <input
                        type="text"
                        name="salary"
                        placeholder="e.g. ₹4 LPA"
                        value={job.salary}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-field">
                    <label>Job Type</label>

                    <select
                        name="type"
                        value={job.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">
                            Select Job Type
                        </option>

                        <option value="Full Time">
                            Full Time
                        </option>

                        <option value="Part Time">
                            Part Time
                        </option>

                        <option value="Internship">
                            Internship
                        </option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="create-job-button"
                >
                    Create Job
                </button>

                <button
                    type="button"
                    className="cancel-job-button"
                    onClick={() => navigate("/jobs")}
                >
                    Cancel
                </button>

            </form>

        </div>
    )
}

export default CreateJob