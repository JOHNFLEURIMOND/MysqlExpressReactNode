import React, { Suspense } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';
import Navbar from './Navbar'; // Adjust import paths as needed
import MainContent from './MainContent';
import FormContainer from './FormContainer';
import Title from './Title';
import FormSection from './FormSection';
import FormGrid from './FormGrid';
import TextInput from './TextInput';
import Button from './Button';
import ErrorMessage from './ErrorMessage';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  middleName: Yup.string(),
  lastName: Yup.string().required('Last name is required'),
  phone: Yup.string().required('Phone number is required'),
  streetAddress: Yup.string(),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  unit: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  zip: Yup.string(),
  password: Yup.string().required('Password is required'),
});

const Index = () => {
  const navigate = useNavigate();

  const animationProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 2200 },
  });

  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/users/register',
        values
      );
      console.log('Response:', response);
      alert('Form submitted successfully!');
      navigate('/profile'); // Redirect to the profile page after successful submission
    } catch (error) {
      console.error('Error:', error.response);
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
            streetAddress: '',
            unit: '',
            city: '',
            state: '',
            zip: '',
            password: '',
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
                  <Title>Contact Form</Title>
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
                    </FormSection>

                    <FormSection>
                      <FormGrid>
                        <TextInput
                          title='Street Address'
                          name='streetAddress'
                          placeholder='Street Address'
                          value={values.streetAddress}
                          onChange={handleChange}
                          error={touched.streetAddress && errors.streetAddress}
                          onBlur={handleBlur}
                        />
                        <TextInput
                          title='Unit/Apt'
                          name='unit'
                          placeholder='Unit/Apt'
                          value={values.unit}
                          onChange={handleChange}
                          error={touched.unit && errors.unit}
                          onBlur={handleBlur}
                        />
                      </FormGrid>
                      {touched.streetAddress && errors.streetAddress && (
                        <ErrorMessage>{errors.streetAddress}</ErrorMessage>
                      )}
                      {touched.unit && errors.unit && (
                        <ErrorMessage>{errors.unit}</ErrorMessage>
                      )}
                    </FormSection>

                    <FormSection>
                      <FormGrid>
                        <TextInput
                          title='City'
                          name='city'
                          placeholder='City'
                          value={values.city}
                          onChange={handleChange}
                          error={touched.city && errors.city}
                          onBlur={handleBlur}
                        />
                        <TextInput
                          title='State'
                          name='state'
                          placeholder='State'
                          value={values.state}
                          onChange={handleChange}
                          error={touched.state && errors.state}
                          onBlur={handleBlur}
                        />
                        <TextInput
                          title='Zip Code'
                          name='zip'
                          placeholder='Zip Code'
                          value={values.zip}
                          onChange={handleChange}
                          error={touched.zip && errors.zip}
                          onBlur={handleBlur}
                        />
                      </FormGrid>
                      {touched.city && errors.city && (
                        <ErrorMessage>{errors.city}</ErrorMessage>
                      )}
                      {touched.state && errors.state && (
                        <ErrorMessage>{errors.state}</ErrorMessage>
                      )}
                      {touched.zip && errors.zip && (
                        <ErrorMessage>{errors.zip}</ErrorMessage>
                      )}
                    </FormSection>

                    <FormSection>
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
                      </FormGrid>
                      {touched.phone && errors.phone && (
                        <ErrorMessage>{errors.phone}</ErrorMessage>
                      )}
                      {touched.email && errors.email && (
                        <ErrorMessage>{errors.email}</ErrorMessage>
                      )}
                    </FormSection>

                    <FormSection>
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
                    </FormSection>

                    <FormSection>
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
