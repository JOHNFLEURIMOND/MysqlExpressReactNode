# :checkered_flag:What It Looks Like :checkered_flag::

![ReactEmail](public/App.png)

# How It's Made :nut_and_bolt:🔨 :hammer::wrench::

This application built with React.js, Express, Node, Passport, & Using MySql for a database.

## Optimizations📶.

The app is done.

# How It's Works:white_check_mark::

1.) A user can send form data to MySql Database Table.

2.) User can see the json data once submit as an alert!

# My Awesome Project 🖥 & Lessons Learned :mortar_board:

I learned how to use MySQL and I am getting better and better with Node and Express, the more I have to buid my own server.This is a MERN-Stack Email application that allows data to be submit via Formik and Yup validation. As you may know, React is a JavaScript library for building user interfaces. That’s it. It’s a way to use JavaScript to define UI elements based on user-defined properties and internal state. Let me talk about the Frameworks I used and I am going to show you some examples.

```//------
import React, { Component } from 'react'

export default class SimpleForm extends Component {
  state = {
    searchTerm: '',
  }

  handleSubmit = event => {
    event.preventDefault() // prevent form post
    this.props.onSearch(this.state.searchTerm)
  }

  handleSearch = event => {
    const searchTerm = event.target.value
    this.setState((prevState, props) => ({
      searchTerm,
    }))
  }

  render = () => (
    <div>
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Search games"
          value={this.state.searchTerm}
          onChange={this.handleSearch}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}
```

With Formik, You can use it as a higher-order component or a render callback (also applicable as a child function). This allows for greater flexibility in the props and state, as well as enhanced composability. There is also no need to track the state of the form elements explicitly. You can allow your form to handle itself, which is one of the key elements of React and a component-based architecture.Formik leans on Yup for validation. This provides a simple, yet powerful, way to validate an object schema for your form controls. The validationSchema prop takes a Yup schema or a function that returns one. There are many types of validators, such as for objects, strings, numbers, dates, etc. You can also create your own. The validators can be chained to allow precise constraints for acceptable values.

```//------
import React, { Component } from 'react'
import TextInput from './TextInputFormik'
import { Formik, Form, Field } from 'formik'
import Yup from 'yup'
import isEmpty from 'lodash/isEmpty'

export default class AddGameForm extends Component {
  render() {
    return (
      <div className="addGameForm">
        <Formik
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .min(3, 'Title must be at least 3 characters long.')
              .required('Title is required.'),
          })}
          initialValues={{
            title: 'asdf',
            releaseYear: '',
            genre: '',
            price: '12',
          }}
          onSubmit={(values, actions) => {
            // this could also easily use props or other
            // local state to alter the behavior if needed
            // this.props.sendValuesToServer(values)

            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              actions.setSubmitting(false)
            }, 1000)
          }}
          render={({ values, touched, errors, dirty, isSubmitting }) => (
            <Form>
              <Field
                type="text"
                name="title"
                label="Title"
                component={TextInput}
              />
              <Field
                type="text"
                name="releaseYear"
                label="Release Year"
                component={TextInput}
              />
              <Field
                type="text"
                name="genre"
                label="Genre"
                component={TextInput}
              />
              <Field
                type="text"
                name="price"
                label="Price"
                component={TextInput}
              />
              <button
                type="submit"
                className="btn btn-default"
                disabled={isSubmitting || !isEmpty(errors) || !dirty}
              >
                Add Game
              </button>
            </Form>
          )}
        />
      </div>
    )
  }
}
```

# Express, Nodemon, Body-Parser, Cors

The first thing I wanted to do is to create a server where browsers can connect to. We can do so with the help of a listen method provided by Express You define routing using methods of the Express app object that correspond to HTTP methods; for example, app.get() to handle GET requests and app.post to handle POST requests. Like app.METHOD or You can also use app.all() to handle all HTTP methods and app.use() to specify middleware as the callback function and using Nodemon to restart the server automatically whenever I or the user save a file that the server uses.

```//------

const express = require('express');
const app = express();

app.use(express.json());
```

```//------
app.listen(8080, function() {
  console.log('listening on 3000')
})
```

or

```//------
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});
```

Express allows us to add middleware like body-parser to our application with the use method. You’ll hear the term middleware a lot when dealing with Express. These things are basically plugins that change the request or response object before they get handled by our application. Make sure you place body-parser before your CRUD handlers!
// Parse incoming requests data (https://github.com/expressjs/body-parser)

```//------
const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
// All your handlers here...
```

A request for a resource (like an image or a font) outside of the origin is known as a cross-origin request. CORS (cross-origin resource sharing) manages cross-origin requests.

Cross-origin requests, however, that means servers must implement ways to handle requests from origins outside of their own. CORS allows servers to specify who (i.e., which origins) can access the assets on the server, among many other things.

The CORS standard is needed because it allows servers to specify not just who can access its assets, but also how the assets can be accessed.

```//------

const cors = require('cors');

app.use(cors());
```

# MySql

I would say it wasn't that hard to set up everything but MySQL is a database management system. A database is a structured collection of data, MySql is a Software delivers a very fast, multithreaded, multi-user, and robust SQL (Structured Query Language). It may be anything from a simple shopping list to a picture gallery or the vast amounts of information in a corporate or non-corperate network. MySQL databases are relational. A relational database stores data in separate tables rather than putting all the data in one big storeroom. The database structures are organized into physical files optimized for speed. The logical model, with objects such as databases, tables, views, rows, and columns, offers a flexible programming environment.

To use MySql you have to first download the community version and have created a root password for your account. To create a database you have to log via command line by typing this command.. `mysql -u root -p`, I learned that if you get a command not found you can add the path by entering these commands:

### Current Session

`export PATH=${PATH}:/usr/local/mysql/bin`

### Permanantly

`echo 'export PATH="/usr/local/mysql/bin:$PATH"' >> ~/.bash_profile`

Once logged in, you could create a database query by entering this command `CREATE DATABASE test;` and to use it `USE test;` but to delete `DROP DATABASE test;`.

To Create a user query it is just as easy.

```//------
CREATE TABLE users(
id INT AUTO_INCREMENT,
   first_name VARCHAR(100),
   last_name VARCHAR(100),
   email VARCHAR(50),
   password VARCHAR(20),
   location VARCHAR(100),
   dept VARCHAR(100),
   is_admin TINYINT(1),
   register_date DATETIME,
   PRIMARY KEY(id)
);
```

& to show this table `SHOW USERS;` or `DESCRIBE USERS;` will show you the users table that we created in the console the and to delete the table users enter `DROP TABLE USERS;`

To insert data Insert Row / Record query you have to put it in the same order as the create table query:

```//------
INSERT INTO users (first_name, last_name, email, password, location, dept, is_admin, register_date) values ('John', 'Fleurimond', 'Boston@gmail.com', '02124','Massachusetts', 'development', 1, now());
```

That was easy, the hard part was to connect the back end using Node, Express, Sequelize which I never used before but Sequelize is a ORM or Object Relation Mapping is a process of mapping between objects and relation database systems. An ORM acts like an interface between two system. Sequelize is a promise-based ORM for Node.js apps that use Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. Just like Mongoose is for MongoDB (Documents), which is a non-relational database vs MySQL is relational (Tables) but less about that and more about the code...

Just like Mongoose does for mongoDB, In MySql you have to create a schema to define the user using Sequelize.

```//------
const Sequelize = require('sequelize');
const db = require('../database/db.js');

module.exports = db.sequelize.define(
    'user',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: Sequelize.STRING,
        },
        middleName: {
            type: Sequelize.STRING,
        },
        lastName: {
            type: Sequelize.STRING,
        },
        phone: {
            type: Sequelize.INTEGER,
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    },
    {
        timestamps: false,
    }
);
```

and connect to the database:

```const Sequelize = require('sequelize');

module.exports =  new Sequelize('acme', 'root', 'Hellodear83!', {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql',

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
```

# Portfolio :open_file_folder::

** :computer: 🇭🇹 WEBSITE:** [John Fleurimond](http://johnfleurimond.com)

# How To Get It Started :arrow_forward: :

## How It's Made :nut_and_bolt:🔨 :hammer::wrench::

This application is built with the following technologies:

- **Frontend:** React.js, Semantic UI, styled-components
- **Backend:** Express.js, Node.js
- **Build Tool:** Webpack

## Optimizations

This project is optimized for development and production. It features a modern JavaScript setup with Webpack for bundling and Babel for JavaScript compilation.

### Verify Node.js and npm Versions

To check your current Node.js and npm versions:

```bash
node -v && npm -v
# Example output:
# v20.16.0
# 10.8.1
```

### Install and Use the Correct Node.js Version

To install and use the correct Node.js version:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20
```

## My Awesome Project & Lessons Learned :mortar_board::

For more details on the project and the lessons learned, please refer to [My Portfolio](https://johnfleurimond.netlify.app).

## Getting Started :arrow_forward::

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

**Example Output:**

```
webpack-dev-server v5.0.4  ready in 107 ms

  ➜  Local:   http://localhost:5000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Runs the app in development mode. Open [http://localhost:5000](http://localhost:5000) to view it in your browser. The page will reload if you make edits, and lint errors will be displayed in the console.

### `npm run build`

Builds the app for production to the `build` folder. This bundles React in production mode and optimizes the build for the best performance. The build is minified, and the filenames include hashes. Your app is ready to be deployed.

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
rm -rf package-lock.json
rm -rf node_modules
npm install -g npm-check-updates
ncu -u
npm install
npm ls ajv
npm install --save-dev ajv@^8
```

or

```bash
rm -rf package-lock.json && rm -rf node_modules && npm install -g npm-check-updates && ncu -u && npm install && npm ls ajv && npm install --save-dev ajv@^8
```

### :heavy_plus_sign::heavy_plus_sign: Merging Code :heavy_plus_sign::heavy_plus_sign:

1. **Check Your Current Branch:**
   List all branches and check your current branch:

   ```bash
   git branch -a
   ```

   If you need to create a new branch:

   ```bash
   git checkout -b {{name-of-your-branch}}
   ```

2. **Add and Commit Your Changes:**
   Add and commit your work:

   ```bash
   git add .
   git commit -m "{{explain your changes}}"
   git push
   ```

3. **Fetch and Pull Updates:**
   Fetch and pull all changes from remote branches:

   ```bash
   git fetch --all
   git pull --all
   ```

4. **Merge or Rebase:**
   Merge changes from the main branch to your branch:

   ```bash
   git merge main
   ```

   Alternatively, you can rebase:

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

For details on ho w to contribute, please refer to [CONTRIBUTING.md](./CONTRIBUTING.md).

## How It Works:white_check_mark::

The application provides real-time fantasy football news and player projections, utilizing React for the frontend and Express for the backend. It interacts with the Sportsdata.io API to fetch data, which is then displayed through a user-friendly interface with Semantic UI and styled-components.

## Contact

.. For any questions or feedback, please reach out to [Fleur](https://johnfleurimond.netlify.app)..
