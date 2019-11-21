

# :checkered_flag:What It Looks Like :checkered_flag:: 

![ReactEmail](public/App.png)

# How It's Made :nut_and_bolt:🔨 :hammer::wrench::
 This application is written with React.js, Express, Passport.

## Optimizations.
Finish the app, I got the backend going and my tables in mysql created now I need to insert the data.

 # How It's Works:white_check_mark::
1.) A user can send form data to Mongo DB Atlas.

2.) User can see the json data once submit as an alert!

## Lessons Learned :mortar_board::
How to use MySQL and I am getting better and better with Node and Express, the more i have to buid my own server.

I also learned `Sequelize ORM` Sequelize is a promise-based Object-Relational-Mappers for Node.js and io.js. It supports the dialects PostgreSQL, MySQL, MariaDB, SQLite and MSSQL and features solid transaction support which was perfect for this app.


 
# My Awesome Project
This is a MERN-Stack Email application that allows data to be submit via Formik and Yup validation. As you may know, React is a JavaScript library for building user interfaces. That’s it. It’s a way to use JavaScript to define UI elements based on user-defined properties and internal state. 

like so:
```import React, { Component } from 'react'
 
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


```import React, { Component } from 'react'
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



# Portfolio :open_file_folder::

** :computer:   WEBSITE:** [John Fleurimond](http://johnfleurimond.com)

# How To Get It Started :arrow_forward: :

## Installation

1. Clone repo
2. run `npm install`

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.
### `npm run prettier`
This corrects the format.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

