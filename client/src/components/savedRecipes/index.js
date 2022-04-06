import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';


const savedRecipes = () => {
 
  return (
    <main>
      <div className="flex-row justify-center">
     This is where we'll render a user's saved recipes on the profile page
      </div>
      
    </main>
  );
};

export default savedRecipes;