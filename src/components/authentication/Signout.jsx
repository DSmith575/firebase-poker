import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../../context/FirestoreAuthContext';
import { authSectionStyles } from '../../styles/authForm/authFormStyles';
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
      //   Promise timer to simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await logout();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading('signout', false);
    }
  };

  return (
    <>
      <section className={authSectionStyles.authBase}>
        <AuthForm
          formLabel={'Sign Out'}
          handleSubmit={handleSignOut}
          buttonStyles={authSectionStyles.authButton}
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
