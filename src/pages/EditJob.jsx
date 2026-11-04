import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const EditJob = () => {

    const { id } = useParams()

    const [job, setJob] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        type: ""
    })

    const navigate = useNavigate()

    useEffect(() => {

        async function getJob() {

            try {

                const response = await axios.get(
                    `https://job-portal-backend-api-uskh.onrender.com/jobs/${id}`
                )

                setJob(response.data)

            } catch (error) {

                console.log(error)

                alert("Failed to fetch job")

            }
        }

        getJob()

    }, [id])

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

            const response = await axios.put(
                `https://job-portal-backend-api-uskh.onrender.com/jobs/${id}`,
                job
            )

            console.log(response.data)

            alert("Job updated successfully")

            navigate("/jobs")

        } catch (error) {

            console.log(error)

            alert("Failed to update job")

        }
    }

    return (
        <div className="form-page">

            <form
                className="form-card edit-job-form"
                onSubmit={handleSubmit}
            >

                <h1>Edit Job</h1>

                <p className="form-subtitle">
                    Update the job posting details
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
                    className="update-job-button"
                >
                    Update Job
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

export default EditJob