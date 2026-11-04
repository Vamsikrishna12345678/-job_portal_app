import { Link } from "react-router-dom"

const Home = () => {
    const currentUser = JSON.parse(
        localStorage.getItem("user")
    )

    return (
        <div className="home-page">

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>
                        Find Your <span>Dream Job</span>
                    </h1>

                    <p>
                        Discover exciting career opportunities,
                        connect with employers, and take the next
                        step toward your future.
                    </p>

                    <div className="hero-buttons">
                        <Link
                            to="/jobs"
                            className="hero-primary-button"
                        >
                            Browse Jobs
                        </Link>

                        {!currentUser && (
                            <Link
                                to="/register"
                                className="hero-secondary-button"
                            >
                                Create Account
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="section-heading">
                    <h2>Why Choose Our Job Portal?</h2>
                    <p>
                        Everything you need to find or manage
                        your next career opportunity.
                    </p>
                </div>

                <div className="features-grid">

                    <div className="feature-card">
                        <div className="feature-icon">
                            🔍
                        </div>
                        <h3>Find Jobs Easily</h3>
                        <p>
                            Search and filter job opportunities
                            based on your skills, location, and
                            preferred job type.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            📄
                        </div>
                        <h3>Apply Easily</h3>
                        <p>
                            Submit your resume and apply for
                            suitable jobs through a simple
                            application process.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            💼
                        </div>
                        <h3>For Employers</h3>
                        <p>
                            Create job postings, manage your
                            applications, and find suitable
                            candidates.
                        </p>
                    </div>

                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <h2>Ready to Take the Next Step?</h2>

                <p>
                    Explore available opportunities and start
                    building your career today.
                </p>

                <Link
                    to="/jobs"
                    className="cta-button"
                >
                    Explore Jobs
                </Link>
            </section>

        </div>
    )
}

export default Home