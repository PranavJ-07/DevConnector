import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
// now in order to connect this component to the redux store we need to import connect from react-redux
// whenever we use connect then we need to export the component using connect and we need to pass the component as an argument to connect
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

const Register = ({ setAlert }) => {
  // useState is a hook that allows us to use state in functional components
  // formData is the state variable that holds the form data
  // setFormData is the function that updates the formData state variable
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({
      // [e.target.name] this is done to dynamically set the key of the object
      // i.e. if name is same in some other input field it will update that key's value
      // hence to avoid that we use this syntax i.e. [e.target.name] which will set the key as the name of the input field
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password != password2) {
      setAlert('Passwords do not match', 'danger'); // this will dispatch the setAlert action with the message and alert type as arguments
    } else {
      console.log('SUCCESS');
    }
  };

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead' style={{ marginBottom: '2rem' }}>
          <i className='fas fa-user'></i> Create Your Account
        </p>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
            <small className='form-text'>
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
              minLength='6'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Confirm Password'
              name='password2'
              value={password2}
              onChange={(e) => onChange(e)}
              minLength='6'
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Register' />
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Register); // this setALert and its types can be accessed using the props of the component, hence we can use props.setAlert to dispatch the setAlert action from this component
