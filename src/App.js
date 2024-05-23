import React from 'react';
import router from './router/router';
import { RouterProvider } from 'react-router-dom';
import Button from './components/button/Button';

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      {/* <div>
        <Button styles={'bg-black'} text={'test'} />
      </div> */}
    </>
  );
};

export default App;
