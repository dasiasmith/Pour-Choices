import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/PCLogo.png';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import loginBar from "../assets/loginBar.jpeg";
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
    className="flex-column justify-flex-start"
    style={{
      backgroundImage: `url(${loginBar})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100vw",
      height: "100vh",
    }}
  >
    <main className="flex-column justify-center align-center">
    <header className="text-light flex-column align-center mb-5 p-5">
        <div className="flex-row justify-center">
        <img src={logo}/>
        </div>
          <div className="flex-row">
            <Link className="m-2 decoration-none text-light" to="/login">
              <h5>Log in</h5>
            </Link>
          </div>
      </header>
      <div className="col-12 col-lg-4">
        <div className="card">
          <h1 className="card-header text-dark text-center">Sign Up</h1>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  </div>
  );
};

export default Signup;
