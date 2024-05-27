import { useState } from 'react';
import { useUserAuth } from '../../../context/FirestoreAuthContext';

const JoinGame = ({}) => {
  const { user } = useUserAuth();
  const [error, setError] = useState('');

  const handleJoinGame = async (games) => {
    try {
      setError('');
    } catch (error) {
      console.log(error);
    }
  };

  return <></>;
};

export default JoinGame;
