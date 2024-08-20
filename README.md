Your GitHub README looks great with the improvements. Here’s a slight refinement to ensure consistency and readability, with some formatting adjustments and minor fixes:

---

# :checkered_flag: What It Looks Like :checkered_flag:

![ReactEmail](public/App.png)

# How It's Made :nut_and_bolt:🔨 :hammer::wrench:

This application is built with the following technologies:

- **Frontend:** React.js, Formik, Yup, styled-components
- **Backend:** Express.js, Node.js, Sequelize
- **Database:** MySQL
- **Build Tool:** Vite

## Optimizations 📶

The app is fully functional and optimized for both development and production environments.

# How It Works :white_check_mark:

1. Users can submit form data, which is sent to a MySQL database table.
2. Upon submission, users will see a JSON representation of the submitted data as an alert.

# My Awesome Project 🖥 & Lessons Learned :mortar_board:

Through this project, I enhanced my skills in integrating MySQL with Node.js and Express. I deepened my understanding of React, Formik, and Yup for form validation, and improved my knowledge of styled-components for styling.

## Code Examples

### React Component Example

#### `src/client/TextInput.jsx`

A reusable text input component with dynamic sizing and error handling.

```jsx
import PropTypes from 'prop-types';
import { Container, InputWrapper, InputField, FocusBorder, ErrorText } from './StyledComponents';

const TextInput = ({
  title,
  name,
  value,
  onChange,
  onBlur,
  error,
  required,
  size
}) => (
  <Container error={error}>
    {title && (
      <label htmlFor={name}>
        {title} {required && "*"}
      </label>
    )}
    <InputWrapper>
      <InputField
        type="text"
        name={name}
        placeholder={title || "Placeholder Text"}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        required={required}
        size={size}
      />
      <FocusBorder />
    </InputWrapper>
    {error && <ErrorText>{error}</ErrorText>}
  </Container>
);

TextInput.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"])
};

TextInput.defaultProps = {
  title: "",
  error: "",
  required: false,
  size: "medium"
};

export default TextInput;
```

### Formik and Yup Example

#### `src/index.jsx`

A form component using Formik and Yup for validation, styled with styled-components.

```jsx
import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import TextInput from './components/TextInput';
import { FormSection, Button, AnimatedTitle } from './StyledComponents';

const phoneRegExp = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌​)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌​|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})\s*(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+)\s*)?$/i;

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required").min(2, "First Name must be at least 2 characters"),
  lastName: yup.string().required("Last Name is required").min(2, "Last Name must be at least 2 characters"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  confirmEmail: yup.string().email("Invalid email format").required("Confirm Email is required").oneOf([yup.ref("email")], "Emails must match"),
  StreetAddress: yup.string().min(2, "Street Address must be at least 2 characters"),
  unit: yup.string().min(1, "Unit/Apt is too short"),
  city: yup.string().required("City is required").min(3, "City must be at least 3 characters"),
  state: yup.string().required("State is required"),
  phone: yup.string().matches(phoneRegExp, "Invalid phone number").required("Phone number is required"),
  zip: yup.string().required("Zip Code is required").matches(/^\d{5}$/, "Zip Code must be 5 digits"),
  typeOfDegree: yup.string().required("Type of Degree is required").min(2, "Type of Degree must be at least 2 characters"),
  degreeAttained: yup.string().required("Degree Attained is required").min(2, "Degree Attained must be at least 2 characters"),
  educationalInstitution: yup.string().required("Educational Institution is required").min(2, "Educational Institution must be at least 2 characters"),
  otherInformation: yup.string().min(2, "Other Information must be at least 2 characters")
});

<Formik
  initialValues={{
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    StreetAddress: "",
    unit: "",
    city: "",
    state: "",
    phone: "",
    zip: "",
    typeOfDegree: "",
    degreeAttained: "",
    educationalInstitution: "",
    otherInformation: ""
  }}
  validationSchema={validationSchema}
  onSubmit={(values, { setSubmitting, setErrors }) => {
    axios.post("/api/submit", values)
      .then(response => {
        console.log("Form submitted successfully:", response);
      })
      .catch(error => {
        console.error("Error submitting form:", error);
        setErrors({ general: "There was an error submitting the form" });
      })
      .finally(() => setSubmitting(false));
  }}
>
  {({
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting
  }) => (
    <form onSubmit={handleSubmit}>
      <AnimatedTitle>Contact Form</AnimatedTitle>
      <FormSection>
        <TextInput
          title="First Name"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstName && errors.firstName}
          required
        />
        <TextInput
          title="Last Name"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastName && errors.lastName}
          required
        />
       {/* Add other form fields here */}
      </FormSection>
      <Button type="submit" disabled={isSubmitting}>Submit</Button>
      {errors.general && <div>{errors.general}</div>}
    </form>
  )}
</Formik>
```

## Backend Setup with Express, Nodemon, Body-Parser, and CORS

### Express Server Example

#### `src/server/index.js`

A basic Express server setup.

```js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('../database/db.js'); // Correct path to database file
const userRoutes = require('../routes/users.js'); // Correct path to routes file
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
db.authenticate()
  .then(() => console.log('Database connected successfully 💯'))
  .catch(err => console.error('Error connecting to database:', err));

// Sync User model
db.User.sync()
  .then(() => console.log('User Table Created Successfully!'))
  .catch(err => console.error('Error creating User Table:', err));

// Route Handling
app.use('/users', userRoutes);

// Serve static files from Vite build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../dist'))); // Vite build output directory

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html')); // Vite build entry point
  });
} else {
  app.get('*', (req, res) =>
    res.status(200).send({ message: 'Development environment' })
  );
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### Sequelize ORM Setup

#### `src/server/models/user.js`

Define the Sequelize model for the users table.

```js
const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "

user",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING
    },
    middleName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING // Changed to STRING for phone numbers
    },
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false
  }
);
```

### Database Connection

#### `src/server/database/db.js`

Setup database connection with Sequelize.

```js
const Sequelize = require('sequelize');
require('dotenv').config();

// Database configuration
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// User model
const User = sequelize.define(
  'user',
  {
    firstName: { type: Sequelize.STRING },
    middleName: Sequelize.STRING,
    lastName: { type: Sequelize.STRING },
    phone: { type: Sequelize.STRING }, // Changed to STRING for phone numbers
    streetAddress: Sequelize.STRING,
    email: { type: Sequelize.STRING, unique: true },
    confirmEmail: Sequelize.STRING,
    unit: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zip: Sequelize.STRING,
    typeOfDegree: Sequelize.STRING,
    degreeAttained: Sequelize.STRING,
    educationalInstitution: Sequelize.STRING,
    otherInformation: Sequelize.STRING,
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
  }
);

const db = {
  sequelize,
  User,
  authenticate: () => sequelize.authenticate(),
  createUser: userData => User.create(userData),
  getAllUsers: () => User.findAll(),
  getUser: criteria => User.findOne({ where: criteria }),
};

module.exports = db;
```

## Portfolio :open_file_folder::

**:computer: 🇭🇹 WEBSITE:** [John Fleurimond](http://johnfleurimond.com)

# How To Get It Started :arrow_forward:

## Verify Node.js and npm Versions

To check your current Node.js and npm versions:

```bash
node -v && npm -v
# Example output:
# v20.16.0
# 10.8.1
```

## Install and Use the Correct Node.js Version

To install and use the correct Node.js version:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20
```

## Getting Started :arrow_forward:

### Kill Node Processes

To stop any running Node.js processes:

```bash
pkill -f node
```

### Installation

1. **Clone the Repository:**

   ```bash
   git clone {{repository-url}}
   cd {{repository-directory}}
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

```bash
webpack-dev-server v5.0.4  ready in 107 ms

  ➜  Local:   http://localhost:5000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Runs the app in development mode. Open [http://localhost:5000](http://localhost:5000) to view it in your browser. The page will reload if you make edits, and lint errors will be displayed in the console.

### `npm run build`

Builds the app for production to the build folder. This bundles React in production mode and optimizes the build for the best performance. The build is minified, and the filenames include hashes.

### `npm run prettier`

Formats the code according to Prettier configuration.

### `npm run clean`

Cleans the npm cache and builds the project. Use this to ensure a fresh start for builds.

## :keyboard::computer_mouse::desktop_computer::computer:: GitHub :computer::desktop_computer::keyboard::

### :broom::soap: Clean Up Code Before Pushing :soap::broom:

Before pushing changes to the repository, clean up the code and update dependencies:

```bash
npm run prettier
rm -rf package-lock.json
rm -rf node_modules
git add .
git commit -m "Update README"
git push
```

or

```bash
npm run prettier && rm -rf package-lock.json && rm -rf node_modules && git add . && git commit -m "Update README" && git push
```

To update dependencies and handle known issues:

```bash
rm -rf package-lock.json && rm -rf node_modules && npm install -g npm-check-updates && ncu -u && npm install --legacy-peer-deps && npm install --save-dev ajv@^8
```

### :heavy_plus_sign::heavy_plus_sign: Merging Code :heavy_plus_sign::heavy_plus_sign:

1. **Check Your Current Branch:**

   ```bash
   git branch -a
   ```

   If you need to create a new branch:

   ```bash
   git checkout -b {{name-of-your-branch}}
   ```

2. **Add and Commit Your Changes:**

   ```bash
   git add .
   git commit -m "{{explain your changes}}"
   git push
   ```

3. **Fetch and Pull Updates:**

   ```bash
   git fetch --all
   git pull --all
   ```

4. **Merge or Rebase:**

   ```bash
   git merge main
   ```

   Alternatively, rebase:

   ```bash
   git rebase main
   ```

   **Important:** Resolve any conflicts that arise, accept the incoming changes as needed, and commit the resolved changes:

   ```bash
   git add .
   git commit -m "Merged main branch into current branch"
   git push
   ```

   or

   ```bash
   git add . && git commit -m "Merged main branch into current branch" && git push
   ```

## License

Fleurimond 2024

## Contributing

For details on how to contribute, please refer to [CONTRIBUTING.md](./CONTRIBUTING.md).

## Contact

For any questions or feedback, please reach out to [Fleur](https://johnfleurimond.com).