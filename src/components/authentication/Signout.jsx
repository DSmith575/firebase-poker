import { useUserAuth } from '../../context/FirestoreAuthContext';

const SignOut = () => {
  const { logout } = useUserAuth();
  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Signout</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;
