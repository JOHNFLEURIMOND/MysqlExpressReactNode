// src/index.jsx
import React, { Suspense } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
import TextInput from './client/TextInput';
import Button from './client/Button';
import Navbar from './client/Navbar';
import { useSpring, animated } from '@react-spring/web';
import FleurimondTheme from './theme';

// Validation schema
const phoneRegExp =
  /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌​)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌​|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})\s*(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+)\s*)?$/i;

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First Name is required')
    .min(2, 'First Name must be at least 2 characters'),
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
    .required('Confirm Email is required')
    .oneOf([yup.ref('email')], 'Emails must match'),
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

// Extract colors from theme
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
  max-width: 1200px; // Adjusted max-width for better responsiveness
  margin: 0 auto;
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: ${FleurimondTheme.colors.shadow};
  box-sizing: border-box; // Ensures padding is included in width
`;

const FormSection = styled.div`
  margin-bottom: 1.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(250px, 1fr)
  ); // Responsive grid columns
  gap: 1.5rem; // Spacing between grid items
`;

const ErrorMessage = styled.div`
  color: ${colors.error};
  font-size: 0.875rem;
  margin-top: 0.5rem; // Spacing between input and error message
`;

// Container for the select element
const SelectContainer = styled.div`
  position: relative;
  display: inline-block; // Change to inline-block to fit select to content width

  label {
    display: block;
    margin-bottom: 0.5rem; // Space between label and select
    font-size: 1rem;
    color: ${FleurimondTheme.colors.primaryText}; // Use primary text color
  }

  select {
    display: inline; // Make select fit its content
    padding: 0.5rem;
    border: 1px solid ${FleurimondTheme.colors.earthy.darkGreen}; // Using earthy dark green for border
    border-radius: 4px;
    background-color: ${FleurimondTheme.colors
      .background}; // Using earthy light green for background
    color: ${FleurimondTheme.colors.primaryText}; // Text color
    font-size: 1rem;
    appearance: none; // Removes default select arrow
    cursor: pointer;
    outline: none;
    width: auto; // Fit to content width
    min-width: 120px; // Ensure a minimum width for usability
  }

  select option {
    background-color: ${FleurimondTheme.colors.earthy
      .darkGreen}; // Background for options
    color: ${FleurimondTheme.colors.primaryText}; // Text color for options

    &:hover,
    &:checked {
      color: ${FleurimondTheme.colors.warmTones
        .coral}; // Text color on hover/selected
      background-color: ${FleurimondTheme.colors.warmTones
        .lightPeach}; // Background color on hover/selected
    }
  }
`;

const Index = () => {
  const animationProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 2200 },
  });

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
          onSubmit={(values, actions) => {
            axios
              .post('http://localhost:8080/users/register', values) // Corrected API endpoint
              .then(response => console.log(response))
              .catch(error => console.log(error.response));
            alert('Form submitted successfully!');
            actions.setSubmitting(false);
          }}>
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
                          value={values.prefix || 'Mr'} // Default to 'Mr'
                        >
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
                          size='medium' // Ensure size is consistent
                        />
                        <TextInput
                          title='Middle Initial'
                          name='middleName'
                          placeholder='Middle Initial'
                          value={values.middleName}
                          onChange={handleChange}
                          error={touched.middleName && errors.middleName}
                          onBlur={handleBlur}
                          size='medium' // Ensure size is consistent
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
                          size='medium' // Ensure size is consistent
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
                          required
                          size='medium' // Ensure size is consistent
                        />
                        <TextInput
                          title='Unit/Apt'
                          name='unit'
                          placeholder='Unit/Apt'
                          value={values.unit}
                          onChange={handleChange}
                          error={touched.unit && errors.unit}
                          onBlur={handleBlur}
                          size='medium' // Ensure size is consistent
                        />
                        <TextInput
                          title='City'
                          name='city'
                          placeholder='City'
                          value={values.city}
                          onChange={handleChange}
                          error={touched.city && errors.city}
                          onBlur={handleBlur}
                          required
                          size='medium' // Ensure size is consistent
                        />
                      </FormGrid>
                      {touched.StreetAddress && errors.StreetAddress && (
                        <ErrorMessage>{errors.StreetAddress}</ErrorMessage>
                      )}
                      {touched.unit && errors.unit && (
                        <ErrorMessage>{errors.unit}</ErrorMessage>
                      )}
                      {touched.city && errors.city && (
                        <ErrorMessage>{errors.city}</ErrorMessage>
                      )}
                    </FormSection>

                    <FormSection>
                      <FormGrid>
                        <TextInput
                          title='State'
                          name='state'
                          placeholder='State'
                          value={values.state}
                          onChange={handleChange}
                          error={touched.state && errors.state}
                          onBlur={handleBlur}
                          required
                          size='medium' // Ensure size is consistent
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
                          size='medium' // Ensure size is consistent
                        />
                        <TextInput
                          title='Phone'
                          name='phone'
                          placeholder='Phone Number'
                          value={values.phone}
                          onChange={handleChange}
                          error={touched.phone && errors.phone}
                          onBlur={handleBlur}
                          required
                          size='medium' // Ensure size is consistent
                        />
                      </FormGrid>
                      {touched.state && errors.state && (
                        <ErrorMessage>{errors.state}</ErrorMessage>
                      )}
                      {touched.zip && errors.zip && (
                        <ErrorMessage>{errors.zip}</ErrorMessage>
                      )}
                      {touched.phone && errors.phone && (
                        <ErrorMessage>{errors.phone}</ErrorMessage>
                      )}
                    </FormSection>

                    <FormSection>
                      <FormGrid>
                        <TextInput
                          title='Email'
                          name='email'
                          type='email'
                          placeholder='Email Address'
                          value={values.email}
                          onChange={handleChange}
                          error={touched.email && errors.email}
                          onBlur={handleBlur}
                          required
                          size='medium' // Ensure size is consistent
                        />
                        <TextInput
                          title='Confirm Email'
                          name='confirmEmail'
                          type='email'
                          placeholder='Confirm Email Address'
                          value={values.confirmEmail}
                          onChange={handleChange}
                          error={touched.confirmEmail && errors.confirmEmail}
                          onBlur={handleBlur}
                          required
                          size='medium' // Ensure size is consistent
                        />
                      </FormGrid>
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
                          size='medium' // Ensure size is consistent
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
                          size='medium' // Ensure size is consistent
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
                          size='medium' // Ensure size is consistent
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
                        size='medium' // Ensure size is consistent
                      />
                      {touched.otherInformation && errors.otherInformation && (
                        <ErrorMessage>{errors.otherInformation}</ErrorMessage>
                      )}
                    </FormSection>

                    <Button type='submit' disabled={isSubmitting || !dirty}>
                      Submit
                    </Button>
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
