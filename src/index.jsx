import React, { Suspense } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { animated, useSpring } from '@react-spring/web';
import Navbar from './client/Navbar';
import TextInput from './client/TextInput';
import TextInput from './client/ProfilePage';
import Button from './client/Button';
import FleurimondTheme from './theme';
import styled from 'styled-components';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  middleName: Yup.string(),
  lastName: Yup.string().required('Last name is required'),
  phone: Yup.string().required('Phone number is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  confirmEmail: Yup.string()
    .email('Invalid email address')
    .required('Confirm Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const { colors } = FleurimondTheme;

const MainContent = styled.div`
  padding: 2rem;
  background-color: ${colors.background};
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-family: var(--font-heading);
  color: ${colors.primaryText};
`;

const FormContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: ${FleurimondTheme.colors.shadow};
  box-sizing: border-box;
`;

const FormSection = styled.div`
  margin-bottom: 1.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ErrorMessage = styled.div`
  color: ${colors.error};
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const Index = () => {
  const navigate = useNavigate();

  const animationProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 2200 },
  });

  const handleSubmit = async (values, actions) => {
    try {
      await axios.post('http://localhost:8080/users/register', values);
      alert('Form submitted successfully!');
      navigate('/profile');
    } catch (error) {
      // Log the entire error object to see all details
      console.error(
        'Error:',
        error.response ? error.response.data : error.message
      );
      alert('An error occurred while submitting the form. Please try again.');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <MainContent>
        <Formik
          initialValues={{
            firstName: '',
            middleName: '',
            lastName: '',
            phone: '',
            email: '',
            confirmEmail: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({
            isSubmitting,
            handleSubmit,
            values,
            handleChange,
            errors,
            touched,
            handleBlur,
            dirty,
          }) => (
            <Suspense fallback={<div>Loading...</div>}>
              <animated.div style={animationProps}>
                <FormContainer>
                  <Title>Registration Form</Title>
                  <form onSubmit={handleSubmit}>
                    <FormSection>
                      <FormGrid>
                        <TextInput
                          title='First Name'
                          name='firstName'
                          placeholder='First Name'
                          value={values.firstName}
                          onChange={handleChange}
                          error={touched.firstName && errors.firstName}
                          onBlur={handleBlur}
                          required
                        />
                        <TextInput
                          title='Middle Name'
                          name='middleName'
                          placeholder='Middle Name'
                          value={values.middleName}
                          onChange={handleChange}
                          error={touched.middleName && errors.middleName}
                          onBlur={handleBlur}
                        />
                        <TextInput
                          title='Last Name'
                          name='lastName'
                          placeholder='Last Name'
                          value={values.lastName}
                          onChange={handleChange}
                          error={touched.lastName && errors.lastName}
                          onBlur={handleBlur}
                          required
                        />
                      </FormGrid>
                      {touched.firstName && errors.firstName && (
                        <ErrorMessage>{errors.firstName}</ErrorMessage>
                      )}
                      {touched.middleName && errors.middleName && (
                        <ErrorMessage>{errors.middleName}</ErrorMessage>
                      )}
                      {touched.lastName && errors.lastName && (
                        <ErrorMessage>{errors.lastName}</ErrorMessage>
                      )}

                      <FormGrid>
                        <TextInput
                          title='Phone'
                          name='phone'
                          placeholder='Phone'
                          value={values.phone}
                          onChange={handleChange}
                          error={touched.phone && errors.phone}
                          onBlur={handleBlur}
                          required
                        />
                        <TextInput
                          title='Email'
                          name='email'
                          placeholder='Email'
                          value={values.email}
                          onChange={handleChange}
                          error={touched.email && errors.email}
                          onBlur={handleBlur}
                          required
                        />
                        <TextInput
                          title='Confirm Email'
                          name='confirmEmail'
                          placeholder='Confirm Email'
                          value={values.confirmEmail}
                          onChange={handleChange}
                          error={touched.confirmEmail && errors.confirmEmail}
                          onBlur={handleBlur}
                          required
                        />
                      </FormGrid>
                      {touched.phone && errors.phone && (
                        <ErrorMessage>{errors.phone}</ErrorMessage>
                      )}
                      {touched.email && errors.email && (
                        <ErrorMessage>{errors.email}</ErrorMessage>
                      )}
                      {touched.confirmEmail && errors.confirmEmail && (
                        <ErrorMessage>{errors.confirmEmail}</ErrorMessage>
                      )}

                      <TextInput
                        title='Password'
                        name='password'
                        placeholder='Password'
                        value={values.password}
                        onChange={handleChange}
                        error={touched.password && errors.password}
                        onBlur={handleBlur}
                        type='password'
                        required
                      />
                      {touched.password && errors.password && (
                        <ErrorMessage>{errors.password}</ErrorMessage>
                      )}

                      <TextInput
                        title='Confirm Password'
                        name='confirmPassword'
                        placeholder='Confirm Password'
                        value={values.confirmPassword}
                        onChange={handleChange}
                        error={
                          touched.confirmPassword && errors.confirmPassword
                        }
                        onBlur={handleBlur}
                        type='password'
                        required
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
                      )}

                      <Button
                        type='submit'
                        variant='primary'
                        size='large'
                        disabled={isSubmitting || !dirty}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </Button>
                    </FormSection>
                  </form>
                </FormContainer>
              </animated.div>
            </Suspense>
          )}
        </Formik>
      </MainContent>
    </>
  );
};

export default Index;
