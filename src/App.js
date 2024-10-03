import React from 'react';
import router from './router/router';
import { RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './context/FirestoreAuthContext';

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
};

export default App;
