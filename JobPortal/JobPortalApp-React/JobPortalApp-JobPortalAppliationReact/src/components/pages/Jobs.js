import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, applyForJobs } from "../../redux/actions/jobAction";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, status, error } = useSelector((state) => state.jobs);
  const { isAuthenticated, userType } = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleApply = (jobId) => {
    dispatch(applyForJobs(jobId));
  };
  const handleViewDetails = (jobId) => {
    navigate(`/jobdetails/${jobId}`);
    // dispatch(getJob(jobId));
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>{error}</div>;

  return (
    <Container>
      <h1>Job Listings</h1>
      <Row>
        {jobs.map((job) => (
          <Col key={job.id} sm={12} md={6} lg={4} className="mb-3">
            <div className="job-card p-3 border rounded">
              <h2>{job.title}</h2>
              <p>{job.description}</p>
              <p>
                <strong>Posted By:</strong> {job.postedBy.name}
              </p>
              <p>
                <strong>Company:</strong> {job.companyName}
              </p>
              <p>
                <strong>Posted On:</strong>{" "}
                {new Date(job.postedOn).toLocaleDateString()}
              </p>
              <p>
                <strong>Total Applications:</strong> {job.totalApplications}
              </p>
              {isAuthenticated && userType === "Applicant" && (
                <Button variant="primary" onClick={() => handleApply(job.id)}>
                  Apply
                </Button>
              )}
              {isAuthenticated && userType === "Admin" && (
                <Button
                  variant="secondary"
                  onClick={() => handleViewDetails(job.id)}
                >
                  View Details
                </Button>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Jobs;
