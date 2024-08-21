// client/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Navbar from './Navbar';
import FleurimondTheme from '../theme';

const { colors } = FleurimondTheme;

const ProfileContainer = styled.div`
  padding: 2rem;
  background-color: ${colors.background};
`;

const ProfileHeader = styled.h1`
  font-size: 2rem;
  color: ${colors.primaryText};
`;

const ProfileDetail = styled.div`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: ${colors.primaryText};
`;

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users/profile');
        setUser(response.data);
      } catch (error) {
        setError('Error fetching user profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Navbar />
      <ProfileContainer>
        <ProfileHeader>User Profile</ProfileHeader>
        {user && (
          <>
            <ProfileDetail>
              <strong>First Name:</strong> {user.firstName}
            </ProfileDetail>
            <ProfileDetail>
              <strong>Last Name:</strong> {user.lastName}
            </ProfileDetail>
            <ProfileDetail>
              <strong>Email:</strong> {user.email}
            </ProfileDetail>
            <ProfileDetail>
              <strong>Address:</strong> {user.StreetAddress}, {user.city},{' '}
              {user.state} {user.zip}
            </ProfileDetail>
            <ProfileDetail>
              <strong>Phone:</strong> {user.phone}
            </ProfileDetail>
            <ProfileDetail>
              <strong>Type of Degree:</strong> {user.typeOfDegree}
            </ProfileDetail>
            <ProfileDetail>
              <strong>Degree Attained:</strong> {user.degreeAttained}
            </ProfileDetail>
            <ProfileDetail>
              <strong>Institution:</strong> {user.educationalInstitution}
            </ProfileDetail>
            <ProfileDetail>
              <strong>Other Information:</strong> {user.otherInformation}
            </ProfileDetail>
          </>
        )}
      </ProfileContainer>
    </>
  );
};

export default UserProfile;
