// src/components/JobDetails.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJob } from "../../redux/actions/adminAction";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
const JobDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { job_id } = useParams();
  const { job, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getJob(job_id));
  }, [dispatch, job_id]);

  const handleViewUserDetails = (userId) => {
    navigate(`/userdetails/${userId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Job Details</h1>
      {job && (
        <div>
          <h2>{job.title}</h2>
          <p>{job.description}</p>
          <p>
            <strong>Company:</strong> {job.companyName}
          </p>
          <p>
            <strong>Posted On:</strong>{" "}
            {new Date(job.postedOn).toLocaleDateString()}
          </p>
          <p>
            <strong>Posted By:</strong> {job.postedBy.name}
          </p>
          <h3>Applicants</h3>
          {job.applicants && job.applicants.length > 0 ? (
            <ul>
              {job.applicants.map((applicant) => (
                <li key={applicant.id}>
                  <p>
                    <strong>Name:</strong> {applicant.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {applicant.email}
                  </p>
                  <p>
                    <strong>Resume:</strong>{" "}
                    <a
                      href={applicant.resumeFileAddress}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => handleViewUserDetails(applicant.id)}
                  >
                    View Applicant Details
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No applicants for this job.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default JobDetails;
