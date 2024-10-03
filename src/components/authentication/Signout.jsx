import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../../context/FirestoreAuthContext';
import ButtonSpinner from '../spinner/ButtonSpinner';
import AuthForm from './forms/AuthForm';
import useLoading from '../../hooks/loading/useLoading';

const SignOut = () => {
  const [error, setError] = useState('');
  const { user, logout } = useUserAuth();
  const { loading, setLoading } = useLoading();

  if (!user) {
    return <Navigate to={'/'} replace={true} />;
  }

  const handleSignOut = async (event) => {
    try {
      event.preventDefault();
      setError('');
      setLoading('signout', true);
      await logout();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading('signout', false);
    }
  };

  return (
    <>
      <section className={'sm:relative sm:flex sm:flex-col sm:overflow-hidden w-screen sm:rounded-lg items-center'}>
        <AuthForm
          formLabel={'Sign Out'}
          handleSubmit={handleSignOut}
          buttonStyles={
            'p-4 w-[185px] flex justify-center border rounded-lg bg-slate-500 text-white hover:bg-sky-600 transition ease-in-and-out duration-700'
          }
          buttonType="submit"
          loadingState={loading('signout')}
          buttonLabel={loading('signout') ? <ButtonSpinner styles={'animate-spin h-6 w-6'} /> : 'Sign out'}
        />
        {error && <p>{error}</p>}
      </section>
    </>
  );
};

export default SignOut;
