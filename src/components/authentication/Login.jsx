import { useState } from 'react';
import useLoading from '../../hooks/loading/useLoading';
import { useUserAuth } from '../../context/FirestoreAuthContext';
import { Navigate } from 'react-router-dom';
import ButtonSpinner from '../spinner/ButtonSpinner';
import AuthForm from './forms/AuthForm';

const Login = () => {
  const [error, setError] = useState('');
  const { user, signInAnonUser } = useUserAuth();
  const { loading, setLoading } = useLoading();

  if (user) {
    return <Navigate to={'/'} replace={true} />;
  }

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
      <section className={'sm:relative sm:flex sm:flex-col sm:overflow-hidden w-screen sm:rounded-lg items-center'}>
        <AuthForm
          formLabel={'Login'}
          handleSubmit={handleSignIn}
          buttonStyles={
            'p-4 w-[185px] flex justify-center border rounded-lg bg-slate-500 text-white hover:bg-sky-600 transition ease-in-and-out duration-700'
          }
          buttonType={'submit'}
          loadingState={loading('login')}
          buttonLabel={loading('login') ? <ButtonSpinner styles={'animate-spin h-6 w-6'} /> : 'Sign In Anonymously'}
        />
        {error && <p>{error}</p>}
      </section>
    </>
  );
};

export default Login;
