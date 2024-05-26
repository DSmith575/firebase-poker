import { useState } from 'react';
import useLoading from '../../hooks/loading/useLoading';
import { useUserAuth } from '../../context/FirestoreAuthContext';
import { Navigate } from 'react-router-dom';
import { ImSpinner } from 'react-icons/im';
import AuthForm from './forms/AuthForm';
import { authSectionStyles } from '../../styles/authForm/authForm';

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
          buttonLabel={
            loading('signout') ? (
              <>
                <ImSpinner className={authSectionStyles.authButtonSpinner} />
              </>
            ) : (
              'Sign out'
            )
          }
        />
        {error && <p>{error}</p>}
      </section>
    </>
  );
};

export default SignOut;
