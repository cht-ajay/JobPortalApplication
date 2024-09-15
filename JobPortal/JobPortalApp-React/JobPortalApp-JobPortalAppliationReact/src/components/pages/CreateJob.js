import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createJob } from "../../redux/actions/adminAction";
import { Button, Form } from "react-bootstrap";

const CreateJob = () => {
  const dispatch = useDispatch();
  const [job, setJob] = useState({
    title: "",
    description: "",
    companyName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createJob(job));
  };

  return (
    <div>
      <h1>Create Job</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={job.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={job.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formCompanyName">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            name="companyName"
            value={job.companyName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Job
        </Button>
      </Form>
    </div>
  );
};

export default CreateJob;
