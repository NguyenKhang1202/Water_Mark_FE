import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  return children;
}

export default PrivateRoute;
