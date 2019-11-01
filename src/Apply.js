import React, { Component } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import moment from 'moment'
import axios from 'axios'
import { Animated } from 'react-animated-css'
import {
  Container,
  Row,
  Col,
  Jumbotron,
} from 'reactstrap'
import CommentInput from './client/common/CommentInput'
import TextInput from './client/common/TextInput'

class Apply extends Component {
  render() {
    return (
      <div>
        <nav className='nv-s nv-s--c'>
          <ul className='nv-s-l'>
            <li className='nv-s-l-i'>
              <a className=' nv-s-l-b' href='https://johnfleurimond.com'>
                Fleurimond
              </a>
            </li>

            <li className='nv-s-l-i'>
              <a
                className='nv-s-l-a nv-s-l-a--active'
                href='https://johnfleurimond.com'
                title='Report a Problem'>
                Fleurimond
              </a>
            </li>
            <li className='nv-s-l-i'>
              <a
                href='https://github.com/JOHNFLEURIMOND'
                title='Github'
                className='nv-s-l-a'>
                Github
              </a>
            </li>
            <li className='nv-s-l-i'>
              <a
                href='https://twitter.com/tcodemonger'
                title='Twitter'
                className='nv-s-l-a'>
                Twitter
              </a>
            </li>
            <li className='nv-s-l-i'>
              <a
                href='https://www.linkedin.com/in/john-fleurimond/'
                className='nv-s-l-a'
                title='Linked'>
                Linkedin
              </a>
            </li>
          </ul>
        </nav>
        <Jumbotron>
          <div className='mn'>
            <div className='b b--b'>
              <div className='str  str--r'>
                <div className='str-c'>
                  <div className='str-t'>John Fleurimond</div>
                </div>
              </div>
            </div>
          </div>
        </Jumbotron>
        <Container>
          <Row>
            <Col xs='3' />
            <Col />
            <Col xs='auto'>
                

                    <div className='b b-c p-a700'>
                    <Formik
                initialValues={{
                  firstName: "",
                  middleName: "",
                  lastName: "",
                  phone: "",
                  email: "",
                  confirmEmail: "",
                  comments: "",
                }}
                validationSchema={yup.object().shape({
                  firstName: yup
                    .string()
                    .required("Your First Name Is Required!")
                    .min(2, "Your First Name Needs To Be Valid"),
                  lastName: yup
                    .string()
                    .required("Your Last Name Is Required!")
                    .min(2, "Your Last Name Needs To Be Valid"),
                  phone: yup
                    .number()
                    .required("Your Telephone Number Is Required!")
                    .positive(),
                  email: yup
                    .string()
                    .email()
                    .required("Your Email Is Required!"),
                  confirmEmail: yup
                    .string()
                    .email()
                    .required("Your Confirm Email Is Required!")
                    .oneOf([yup.ref("email", undefined)], "Make Sure Emails Match!"),
                })}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    axios
                    .post('/', values, actions) // no try/catch here
                    .then(response => {
                      console.log(response);
                    })
                    .catch(error => {
                      console.log(error.response);
                    });
                    console.log({ values, actions });
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                  }, 400);
                }}
                render={({
                  isSubmitting,
                  handleSubmit,
                  values,
                  handleChange,
                  errors,
                  touched,
                  handleBlur,
                  dirty,
                  handleReset,
                }) => (
                  <Animated
                    animationInDelay={0}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    isVisible
                  >
                      <div className="mn p-a700">
                        <div className="b b-c p-a700">
                          <div className="str">
                            <div className="str-c">
                              <div className="str-t">Email Us</div>
                            </div>
                          </div>

                          <div className="b b-c p-a700"></div>
                          <form action="/" method="POST" onSubmit={handleSubmit}>
                            <div className="g">
                              <div className="sel">
                                <label className="txt-l txt-l--sm">Prefix </label>
                                <div
                                  className="sel-c sel-c--thin"
                                  style={{
                                    marginRight: 14,
                                  }}
                                >
                                  <select className="sel-f sel-f--thin">
                                    <option>Mr</option>
                                    <option>Mrs</option>
                                    <option>Miss</option>
                                    <option>Mx</option>
                                  </select>
                                </div>
                              </div>
                              <div className="g--3 m-b300">
                                <TextInput
                                  title="First Name"
                                  name="firstName"
                                  placeholder="First Name"
                                  value={values.firstName}
                                  onChange={handleChange}
                                  error={touched.firstName && errors.firstName}
                                  onBlur={handleBlur}
                                  required
                                />
                              </div>
                              <div className="g--1 m-b300">
                                <TextInput
                                  title="Initial"
                                  name="middleName"
                                  placeholder="Middle Initial"
                                  value={values.middleName}
                                  onChange={handleChange}
                                  error={touched.middleName && errors.middleName}
                                  onBlur={handleBlur}
                                />
                              </div>
                              <div className="g--6 m-b300">
                                <TextInput
                                  title="Last Name"
                                  name="lastName"
                                  placeholder="Last Name"
                                  value={values.lastName}
                                  onChange={handleChange}
                                  error={touched.lastName && errors.lastName}
                                  onBlur={handleBlur}
                                  required
                                />
                              </div>
                            </div>

                            <TextInput
                              title="Phone"
                              name="phone"
                              placeholder="Phone Number"
                              value={values.phone}
                              onChange={handleChange}
                              error={touched.phone && errors.phone}
                              onBlur={handleBlur}
                            />
                            <TextInput
                              title="Email"
                              name="email"
                              placeholder="Email"
                              value={values.email}
                              onChange={handleChange}
                              error={touched.email && errors.email}
                              required
                              onBlur={handleBlur}
                            />
                            <TextInput
                              title="Confirm Email"
                              name="confirmEmail"
                              placeholder="Confirm Email"
                              value={values.confirmEmail}
                              onChange={handleChange}
                              error={touched.confirmEmail && errors.confirmEmail}
                              onBlur={handleBlur}
                              required
                            />
                            <hr className="hr hr--sq" />
                            <h2>
                              Please note it might take 1-3 days to respond back. Please
                              still fill this form out and I will get back to you ASAP!
                            </h2>

                            <hr className="hr hr--sq" />
                            <CommentInput
                              name="comments"
                              placeholder="Other Comments You Would Like Us to Know."
                              value={values.comments}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div className="b">
                              <div className="m-v400 m-h200">
                                <button
                                  disabled={!dirty || isSubmitting}
                                  onClick={values.handleSubmit}
                                  type="submit"
                                  className="btn btn--c btn--br"
                                >
                                  Send Message
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                  </Animated>
                )}
                      />
                    </div>
                
            </Col>
            <Col xs='3' />
          </Row>
        </Container>
        <div className="mn">
         <div className="b b--b b--fw">
                <div className="b-c">
                  <div className="sh sh--w">
                    <h2 className="sh-title">{moment().format("llll")}</h2>
                  </div>
                </div>
              </div>
          </div>
        <footer className='ft'>
          <div className='ft-c'>
          <ul className="ft-ll ft-ll--r">
            <li className="ft-ll-i"><a href="http://www.cityofboston.gov/311/" className="ft-ll-a lnk--yellow"><span className="ft-ll">Made With Love From </span><span className="tablet--hidden"> - </span>Boston,Ma </a></li>
        </ul>
            <ul className='ft-ll'>
              <li className='ft-ll-i'>
                <a href='https://johnfleurimond.com' className='ft-ll-a'>
                  John Fleurimond
                </a>
              </li>
              <li className='ft-ll-i'>
                <a href='https://twitter.com/tcodemonger' className='ft-ll-a'>
                  Twitter
                </a>
              </li>
              <li className='ft-ll-i'>
                <a href='https://github.com/JOHNFLEURIMOND' className='ft-ll-a'>
                  Github
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    )
  }
}

export default Apply
