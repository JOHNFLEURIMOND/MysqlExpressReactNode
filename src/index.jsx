import React, { Suspense } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
import TextInput from './client/TextInput';
import Button from './client/Button'; // Import the updated Button component
import Navbar from './client/Navbar';
import { useSpring, animated } from '@react-spring/web';
import FleurimondTheme from './theme';
import { useNavigate } from 'react-router-dom';

// Validation schema
const phoneRegExp =
  /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌​)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌​|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})\s*(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+)\s*)?$/i;

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required('First Name is required')
    .min(2, 'First Name must be at least 2 characters'),
  middleName: yup.string(),
  lastName: yup
    .string()
    .required('Last Name is required')
    .min(2, 'Last Name must be at least 2 characters'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  confirmEmail: yup
    .string()
    .email('Invalid email format')
    .oneOf([yup.ref('email')], 'Emails must match')
    .required('Confirm Email is required'),
  StreetAddress: yup
    .string()
    .min(2, 'Street Address must be at least 2 characters'),
  unit: yup.string().min(1, 'Unit/Apt is too short'),
  city: yup
    .string()
    .required('City is required')
    .min(3, 'City must be at least 3 characters'),
  state: yup.string().required('State is required'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Invalid phone number')
    .required('Phone number is required'),
  zip: yup
    .string()
    .required('Zip Code is required')
    .matches(/^\d{5}$/, 'Zip Code must be 5 digits'),
  typeOfDegree: yup
    .string()
    .required('Type of Degree is required')
    .min(2, 'Type of Degree must be at least 2 characters'),
  degreeAttained: yup
    .string()
    .required('Degree Attained is required')
    .min(2, 'Degree Attained must be at least 2 characters'),
  educationalInstitution: yup
    .string()
    .required('Educational Institution is required')
    .min(2, 'Educational Institution must be at least 2 characters'),
  otherInformation: yup
    .string()
    .min(2, 'Other Information must be at least 2 characters'),
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

const SelectContainer = styled.div`
  position: relative;
  display: inline-block;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: ${colors.primaryText};
  }

  select {
    display: inline;
    padding: 0.5rem;
    border: 1px solid ${FleurimondTheme.colors.earthy.darkGreen};
    border-radius: 4px;
    background-color: ${FleurimondTheme.colors.background};
    color: ${FleurimondTheme.colors.primaryText};
    font-size: 1rem;
    appearance: none;
    cursor: pointer;
    outline: none;
    width: auto;
    min-width: 120px;
  }

  select option {
    background-color: ${FleurimondTheme.colors.earthy.darkGreen};
    color: ${FleurimondTheme.colors.primaryText};

    &:hover,
    &:checked {
      color: ${FleurimondTheme.colors.warmTones.coral};
      background-color: ${FleurimondTheme.colors.warmTones.lightPeach};
    }
  }
`;

const Index = () => {
  const navigate = useNavigate(); // Initialize useNavigate
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
            confirmEmail: '',
            StreetAddress: '',
            unit: '',
            city: '',
            state: '',
            zip: '',
            typeOfDegree: '',
            degreeAttained: '',
            educationalInstitution: '',
            otherInformation: '',
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
                      <SelectContainer>
                        <label htmlFor='prefix'>Prefix</label>
                        <select
                          id='prefix'
                          name='prefix'
                          onChange={handleChange}
                          value={values.prefix || 'Mr'}>
                          <option value='' disabled hidden>
                            Select an Option
                          </option>
                          <option value='Mr'>Mr</option>
                          <option value='Mrs'>Mrs</option>
                          <option value='Miss'>Miss</option>
                          <option value='Mx'>Mx</option>
                        </select>
                      </SelectContainer>
                    </FormSection>

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
                          name='StreetAddress'
                          placeholder='Street Address'
                          value={values.StreetAddress}
                          onChange={handleChange}
                          error={touched.StreetAddress && errors.StreetAddress}
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
                      {touched.StreetAddress && errors.StreetAddress && (
                        <ErrorMessage>{errors.StreetAddress}</ErrorMessage>
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
                          required
                        />
                        <TextInput
                          title='State'
                          name='state'
                          placeholder='State'
                          value={values.state}
                          onChange={handleChange}
                          error={touched.state && errors.state}
                          onBlur={handleBlur}
                          required
                        />
                        <TextInput
                          title='Zip Code'
                          name='zip'
                          placeholder='Zip Code'
                          value={values.zip}
                          onChange={handleChange}
                          error={touched.zip && errors.zip}
                          onBlur={handleBlur}
                          required
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
                    </FormSection>

                    <FormSection>
                      <FormGrid>
                        <TextInput
                          title='Type of Degree'
                          name='typeOfDegree'
                          placeholder='Type of Degree'
                          value={values.typeOfDegree}
                          onChange={handleChange}
                          error={touched.typeOfDegree && errors.typeOfDegree}
                          onBlur={handleBlur}
                          required
                        />
                        <TextInput
                          title='Degree Attained'
                          name='degreeAttained'
                          placeholder='Degree Attained'
                          value={values.degreeAttained}
                          onChange={handleChange}
                          error={
                            touched.degreeAttained && errors.degreeAttained
                          }
                          onBlur={handleBlur}
                          required
                        />
                        <TextInput
                          title='Educational Institution'
                          name='educationalInstitution'
                          placeholder='Educational Institution'
                          value={values.educationalInstitution}
                          onChange={handleChange}
                          error={
                            touched.educationalInstitution &&
                            errors.educationalInstitution
                          }
                          onBlur={handleBlur}
                          required
                        />
                      </FormGrid>
                      {touched.typeOfDegree && errors.typeOfDegree && (
                        <ErrorMessage>{errors.typeOfDegree}</ErrorMessage>
                      )}
                      {touched.degreeAttained && errors.degreeAttained && (
                        <ErrorMessage>{errors.degreeAttained}</ErrorMessage>
                      )}
                      {touched.educationalInstitution &&
                        errors.educationalInstitution && (
                          <ErrorMessage>
                            {errors.educationalInstitution}
                          </ErrorMessage>
                        )}
                    </FormSection>

                    <FormSection>
                      <TextInput
                        title='Other Information'
                        name='otherInformation'
                        placeholder='Other Information'
                        value={values.otherInformation}
                        onChange={handleChange}
                        error={
                          touched.otherInformation && errors.otherInformation
                        }
                        onBlur={handleBlur}
                        multiline
                      />
                      {touched.otherInformation && errors.otherInformation && (
                        <ErrorMessage>{errors.otherInformation}</ErrorMessage>
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
