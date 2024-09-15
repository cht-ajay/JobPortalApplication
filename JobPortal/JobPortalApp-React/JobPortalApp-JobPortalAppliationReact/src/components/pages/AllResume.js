import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllResumes } from "../../redux/actions/adminAction";

const AllResumes = () => {
  const dispatch = useDispatch();
  const { resumes, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllResumes());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>All Resumes</h1>
      <ul>
        {resumes.map((resume) => (
          <li key={resume.id}>
            <h2>{resume.name}</h2>
            <p>
              <strong>Email:</strong> {resume.email}
            </p>
            <p>
              <strong>Resume File Address:</strong> {resume.resumeFileAddress}
            </p>
            <p>
              <strong>Skills:</strong> {resume.skills}
            </p>
            <p>
              <strong>Education:</strong> {resume.education}
            </p>
            <p>
              <strong>Experience:</strong> {resume.experience}
            </p>
            <p>
              <strong>Phone:</strong> {resume.phone}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllResumes;
