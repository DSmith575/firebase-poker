import { useState } from 'react';
import useLoading from '../../hooks/loading/useLoading';
import { useUserAuth } from '../../context/FirestoreAuthContext';
import { Navigate } from 'react-router-dom';
import Button from '../button/Button';
import { ImSpinner } from 'react-icons/im';

const Login = () => {
  const [error, setError] = useState('');
  const { user, signInAnonUser } = useUserAuth();
  const { loading, setLoading } = useLoading();

  if (user) {
    return <Navigate to={'/'} replace={true} />;
  }

  console.log(loading('login'));

  const handleSignIn = async (event) => {
    event.preventDefault();
    setLoading('login', true);
    try {
      await signInAnonUser();
      setError('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading('login', false);
    }
  };

  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-gray-50 sm:py-12">
      <div className="mx-auto max-w-md">
        <h1 className="text-6xl p-4">Login</h1>
        <form onSubmit={handleSignIn}>
          <Button
            styles={`p-4 w-[185px] flex justify-center border rounded-lg bg-slate-500 text-white hover:bg-sky-600 transition ease-in-and-out duration-700`}
            type="submit"
            disabled={loading('login')}
            label={
              loading('login') ? (
                <>
                  <ImSpinner className="animate-spin h-6 w-6" />
                </>
              ) : (
                'Sign In Anonymously'
              )
            }
          />
          {error && <p>{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default Login;
