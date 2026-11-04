import { useState, useEffect } from "react"
import axios from "axios"
import Jobcard from "../components/Jobcard"

const Jobs = () => {

    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const [search, setSearch] = useState("")
    const [location, setLocation] = useState("")
    const [type, setType] = useState("")

    useEffect(() => {

        async function getJobs() {

            try {

                const response = await axios.get(
                    "https://job-portal-backend-api-uskh.onrender.com/jobs"
                )

                setJobs(response.data)

            } catch (error) {

                console.log(error)

                setError("Failed to fetch jobs")

            } finally {

                setLoading(false)

            }
        }

        getJobs()

    }, [])


    // Get unique locations
    const locations = [
        ...new Set(
            jobs.map((job) => job.location)
        )
    ]


    // Get unique job types
    const jobTypes = [
        ...new Set(
            jobs.map((job) => job.type)
        )
    ]


    // Delete job
    const handleDelete = async (id) => {

        const currentUser = JSON.parse(
            localStorage.getItem("user")
        )

        if (currentUser?.role !== "employer") {

            alert("Only employers can delete jobs")

            return
        }


        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        )

        if (!confirmDelete) {
            return
        }


        try {

            await axios.delete(
                `https://job-portal-backend-api-uskh.onrender.com/jobs/${id}`
            )

            setJobs(
                jobs.filter(
                    (job) => job.id !== id
                )
            )

            alert("Job deleted successfully")

        } catch (error) {

            console.log(error)

            alert("Failed to delete job")

        }
    }


    // Filter jobs
    const filteredJobs = jobs.filter((job) => {

        const matchesSearch =
            job.title
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )

        const matchesLocation =
            location === "" ||
            job.location === location

        const matchesType =
            type === "" ||
            job.type === type

        return (
            matchesSearch &&
            matchesLocation &&
            matchesType
        )
    })


    if (loading) {

        return (
            <div className="page-message">
                <h2>Loading jobs...</h2>
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


    return (

        <div className="jobs-container">

            {/* Page Header */}

            <div className="jobs-header">

                <h1>Find Your Next Job</h1>

                <p>
                    Explore opportunities and find
                    the right job for you.
                </p>

            </div>


            {/* Filters */}

            <div className="filters">

                <div className="search-box">

                    <span>🔍</span>

                    <input
                        type="text"
                        placeholder="Search by job title..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>


                <select
                    value={location}
                    onChange={(e) =>
                        setLocation(e.target.value)
                    }
                >

                    <option value="">
                        All Locations
                    </option>

                    {locations.map((location) => (

                        <option
                            key={location}
                            value={location}
                        >
                            {location}
                        </option>

                    ))}

                </select>


                <select
                    value={type}
                    onChange={(e) =>
                        setType(e.target.value)
                    }
                >

                    <option value="">
                        All Job Types
                    </option>

                    {jobTypes.map((jobType) => (

                        <option
                            key={jobType}
                            value={jobType}
                        >
                            {jobType}
                        </option>

                    ))}

                </select>

            </div>


            {/* Results count */}

            <div className="jobs-result">

                <p>
                    Showing{" "}
                    <strong>
                        {filteredJobs.length}
                    </strong>{" "}
                    {filteredJobs.length === 1
                        ? "job"
                        : "jobs"}
                </p>

            </div>


            {/* Job Cards */}

            <div className="jobs-list">

                {filteredJobs.length > 0 ? (

                    filteredJobs.map((job) => (

                        <Jobcard
                            key={job.id}
                            job={job}
                            onDelete={handleDelete}
                        />

                    ))

                ) : (

                    <div className="no-jobs">

                        <div className="no-jobs-icon">
                            🔍
                        </div>

                        <h2>
                            No jobs found
                        </h2>

                        <p>
                            Try changing your search
                            or filters.
                        </p>

                    </div>

                )}

            </div>

        </div>
    )
}

export default Jobs