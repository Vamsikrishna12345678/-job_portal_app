import { Link } from "react-router-dom"

const Jobcard = ({ job, onDelete }) => {

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    )

    const isEmployer =
        currentUser?.role === "employer"


    return (

        <div className="job-card">

            {/* Job Header */}

            <div className="job-card-header">

                <div>

                    <h2>
                        {job.title}
                    </h2>

                    <h3>
                        {job.company}
                    </h3>

                </div>

                <span className="job-type">
                    {job.type}
                </span>

            </div>


            {/* Job Information */}

            <div className="job-info">

                <p>
                    <span>📍</span>
                    {job.location}
                </p>

                <p>
                    <span>💰</span>
                    {job.salary}
                </p>

            </div>


            {/* Actions */}

            <div className="job-actions">

                <Link
                    className="view-button"
                    to={`/jobs/${job.id}`}
                >
                    View Details
                </Link>


                {isEmployer && (

                    <>

                        <Link
                            className="edit-button"
                            to={`/jobs/edit/${job.id}`}
                        >
                            Edit
                        </Link>


                        <button
                            className="delete-button"
                            onClick={() =>
                                onDelete(job.id)
                            }
                        >
                            Delete
                        </button>

                    </>

                )}

            </div>

        </div>
    )
}

export default Jobcard