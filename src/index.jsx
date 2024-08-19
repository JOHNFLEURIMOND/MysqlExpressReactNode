import React, { Suspense, lazy } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import styled from '@emotion/styled';
import { css, Global } from '@emotion/react';
import TextInput from './client/TextInput';
import ToggleSwitch from './client/ToggleSwitch';
import Navbar from '../client/Navbar'; // Updated import path
import { Animated } from 'react-animated-css';
import GlobalStyle from './GlobalStyle'; // Adjusted import path

const phoneRegExp =
  /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌​)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌​|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})\s*(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+)\s*)?$/i;

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('Your First Name Is Required!')
    .min(2, 'Your First Name Needs To Be Valid'),
  lastName: yup
    .string()
    .required('Your Last Name Is Required!')
    .min(2, 'Your Last Name Needs To Be Valid'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Your Email Is Required!'),
  confirmEmail: yup
    .string()
    .email('Invalid email format')
    .required('Your Confirm Email Is Required!')
    .oneOf([yup.ref('email')], 'Emails must match!'),
  StreetAddress: yup.string().min(2, 'Your Address Needs To Be Valid'),
  unit: yup.string().min(1),
  city: yup.string().required('Your City Name Is Required!').min(3),
  state: yup.string().required('Your State Name Is Required!'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Your Phone Number Is Not Valid')
    .required('Your Phone Number Is Required!'),
  zip: yup
    .string()
    .required('Zip Code Is Required')
    .matches(/^\d{5}$/, 'Zip Code Must Be 5 Digits'),
  typeOfDegree: yup
    .string()
    .required('Type of Degree Is Required!')
    .min(2, 'Type of Degree Needs To Be Valid'),
  degreeAttained: yup
    .string()
    .required('Degree Attained Is Required!')
    .min(2, 'Degree Attained Needs To Be Valid'),
  educationalInstitution: yup
    .string()
    .required('Educational Institution Is Required!')
    .min(2, 'Educational Institution Needs To Be Valid'),
  otherInformation: yup.string().min(2, 'Other Information Needs To Be Valid'),
});

const MainContent = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  padding-bottom: 2rem;
  font-size: 2rem;
  font-family: var(--font-heading); // Use the theme font
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FormSection = styled.div`
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: var(--color-button-primary-bg); // Use theme color
  color: var(--color-button-primary-text); // Use theme color
  padding: 0.5rem 1rem;
  border: none;
  border-radius: var(--border-radius); // Use theme border radius
  cursor: pointer;
  &:disabled {
    background-color: #6c757d;
  }
`;

const Main = () => (
  <>
    <Global styles={GlobalStyle} /> {/* Apply GlobalStyle */}
    <Navbar /> {/* Use the Navbar component */}
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
            .post('http://localhost:8080/users/users', values)
            .then(response => console.log(response))
            .catch(error => console.log(error.response));
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
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
            <Animated
              animationIn='slideInUp'
              animationOut='slideOutDown'
              isVisible
            >
              <FormContainer>
                <Title>Contact Form</Title>

                <form onSubmit={handleSubmit}>
                  <FormSection>
                    <label htmlFor='prefix'>Prefix </label>
                    <select
                      id='prefix'
                      name='prefix'
                      onChange={handleChange}
                      value={values.prefix}
                    >
                      <option value='Mr'>Mr</option>
                      <option value='Mrs'>Mrs</option>
                      <option value='Miss'>Miss</option>
                      <option value='Mx'>Mx</option>
                    </select>
                  </FormSection>

                  <FormSection>
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
                  </FormSection>

                  <FormSection>
                    <TextInput
                      title='Middle Initial'
                      name='middleName'
                      placeholder='Middle Initial'
                      value={values.middleName}
                      onChange={handleChange}
                      error={touched.middleName && errors.middleName}
                      onBlur={handleBlur}
                    />
                  </FormSection>

                  <FormSection>
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
                  </FormSection>

                  <FormSection>
                    <TextInput
                      title='Street Address'
                      name='StreetAddress'
                      placeholder='Street Address'
                      value={values.StreetAddress}
                      onChange={handleChange}
                      error={touched.StreetAddress && errors.StreetAddress}
                      onBlur={handleBlur}
                      required
                    />
                  </FormSection>

                  <FormSection>
                    <TextInput
                      title='Unit'
                      name='unit'
                      placeholder='Unit or Apartment #'
                      value={values.unit}
                      onChange={handleChange}
                      error={touched.unit && errors.unit}
                      onBlur={handleBlur}
                    />
                  </FormSection>

                  <FormSection>
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
                  </FormSection>

                  <FormSection>
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
                  </FormSection>

                  <FormSection>
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
                  </FormSection>

                  <FormSection>
                    <TextInput
                      title='Phone'
                      name='phone'
                      placeholder='Phone Number'
                      value={values.phone}
                      onChange={handleChange}
                      error={touched.phone && errors.phone}
                      onBlur={handleBlur}
                      required
                    />
                  </FormSection>

                  <FormSection>
                    <TextInput
                      title='Email'
                      name='email'
                      placeholder='Email Address'
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && errors.email}
                      onBlur={handleBlur}
                      required
                    />
                  </FormSection>

                  <FormSection>
                    <TextInput
                      title='Confirm Email'
                      name='confirmEmail'
                      placeholder='Confirm Email Address'
                      value={values.confirmEmail}
                      onChange={handleChange}
                      error={touched.confirmEmail && errors.confirmEmail}
                      onBlur={handleBlur}
                      required
                    />
                  </FormSection>

                  <FormSection>
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
                  </FormSection>

                  <FormSection>
                    <TextInput
                      title='Degree Attained'
                      name='degreeAttained'
                      placeholder='Degree Attained'
                      value={values.degreeAttained}
                      onChange={handleChange}
                      error={touched.degreeAttained && errors.degreeAttained}
                      onBlur={handleBlur}
                      required
                    />
                  </FormSection>

                  <FormSection>
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
                    />
                  </FormSection>

                  <FormSection>
                    <Button type='submit' disabled={isSubmitting}>
                      Submit
                    </Button>
                  </FormSection>
                </form>
              </FormContainer>
            </Animated>
          </Suspense>
        )}
      </Formik>
    </MainContent>
  </>
);

export default Main;
