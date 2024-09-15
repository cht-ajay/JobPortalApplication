import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/actions/adminAction";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const dispatch = useDispatch();
  const { user_id } = useParams();
  const { userDetails, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getUserDetails(user_id));
  }, [dispatch, user_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>User Details</h1>
      {userDetails && (
        <div>
          <h2>{userDetails.name}</h2>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p>
            <strong>Address:</strong> {userDetails.address}
          </p>
          <p>
            <strong>Profile Headline:</strong> {userDetails.profileHeadline}
          </p>
          <p>
            <strong>Resume File Address:</strong>{" "}
            {userDetails.resumeFileAddress}
          </p>
          <p>
            <strong>Skills:</strong> {userDetails.skills}
          </p>
          <p>
            <strong>Education:</strong> {userDetails.education}
          </p>
          <p>
            <strong>Experience:</strong> {userDetails.experience}
          </p>
          <p>
            <strong>Phone:</strong> {userDetails.phone}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
