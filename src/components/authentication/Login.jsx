import { useState } from 'react';
import useLoading from '../../hooks/loading/useLoading';
import { useUserAuth } from '../../context/FirestoreAuthContext';
import { Navigate } from 'react-router-dom';
import { ImSpinner } from 'react-icons/im';
import AuthForm from './forms/AuthForm';
import { authSectionStyles } from '../../styles/authForm/authForm';

const Login = () => {
  const [error, setError] = useState('');
  const { user, signInAnonUser } = useUserAuth();
  const { loading, setLoading } = useLoading();

  if (user) {
    return <Navigate to={'/'} replace={true} />;
  }

  console.log(loading('login'));

  const handleSignIn = async (event) => {
    try {
      event.preventDefault();
      setError('');
      setLoading('login', true);
      await signInAnonUser();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading('login', false);
    }
  };

  return (
    <>
      <section className={authSectionStyles.authBase}>
        <AuthForm
          formLabel={'Login'}
          handleSubmit={handleSignIn}
          buttonStyles={authSectionStyles.authButton}
          buttonType="submit"
          loadingState={loading('login')}
          buttonLabel={
            loading('login') ? (
              <>
                <ImSpinner className={authSectionStyles.authButtonSpinner} />
              </>
            ) : (
              'Sign In Anonymously'
            )
          }
        />
        {error && <p>{error}</p>}
      </section>
    </>
  );
};

export default Login;
