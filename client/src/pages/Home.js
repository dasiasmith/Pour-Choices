import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from "react-router-dom";




//We should add an if statement, if user is logged in then render option for
//home or outside bar. If user is not logged in then redirect to login page

const Home = () => {
 
  return (
    <main>
      <div className="flex-row justify-center">
     This is the home page where we'll render the options for home or bar
      </div>
      <li className="flex-row">
            <Link to="/homebar">
              Homebar
            </Link>
          </li>
          <li className="flex-row">
            <Link to="/awaybar">
              Awaybar
            </Link>
            </li>
            <li className="flex-row">
            <Link to="/profile">
              profile
            </Link>
            </li>
    </main>
  );
};

export default Home;
