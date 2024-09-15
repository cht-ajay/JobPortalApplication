// src/components/Profile.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "../../redux/actions/profileAction";

const Profile = () => {
  const dispatch = useDispatch();

  // Get profile data from Redux state
  const { profile, loading, error } = useSelector((state) => state.profile);

  // Fetch profile data on component mount
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile">
      {profile ? (
        <div>
          <h1>{profile.name}'s Profile</h1>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Address:</strong> {profile.address}
          </p>
          <p>
            <strong>Profile Headline:</strong> {profile.profileHeadline}
          </p>
          {profile.skills && (
            <p>
              <strong>Skills:</strong> {profile.skills}
            </p>
          )}
          {profile.education && (
            <p>
              <strong>Education:</strong> {profile.education}
            </p>
          )}
          {profile.experience && (
            <p>
              <strong>Experience:</strong> {profile.experience}
            </p>
          )}
          {profile.phone && (
            <p>
              <strong>Phone:</strong> {profile.phone}
            </p>
          )}
        </div>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
};

export default Profile;
