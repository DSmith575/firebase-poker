import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthForm from '../../components/authentication/forms/AuthForm';
import { act } from 'react';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));

jest.mock('../../context/FirestoreAuthContext', () => ({
  AuthContextProvider: ({ children }) => <div>{children}</div>,
  useUserAuth: jest.fn(),
}));

describe('AuthForm', () => {
  test('should render AuthForm component', async () => {
    const formLabel = 'Test Form';

    await act(async () => {
      render(<AuthForm formLabel={formLabel} />);
    });

    expect(screen.getByText(formLabel)).toBeInTheDocument();
  });

  test('should render AuthForm component with loading state', async () => {
    const handleSubmit = jest.fn();
    const buttonType = 'submit';
    const loadingState = true;
    const buttonLabel = 'Loading...';

    await act(async () => {
      render(
        <AuthForm handleSubmit={handleSubmit} buttonType={buttonType} loadingState={loadingState} buttonLabel={buttonLabel} />,
      );
    });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('should render AuthForm component without loading state', async () => {
    const handleSubmit = jest.fn();
    const buttonType = 'submit';
    const loadingState = false;
    const buttonLabel = 'Submit';

    await act(async () => {
      render(
        <AuthForm handleSubmit={handleSubmit} buttonType={buttonType} loadingState={loadingState} buttonLabel={buttonLabel} />,
      );
    });

    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('should render AuthForm and call handleSubmit', async () => {
    const handleSubmit = jest.fn();
    const buttonType = 'submit';
    const loadingState = false;
    const buttonLabel = 'Submit';

    await act(async () => {
      render(
        <AuthForm handleSubmit={handleSubmit} buttonType={buttonType} loadingState={loadingState} buttonLabel={buttonLabel} />,
      );
    });

    const button = screen.getByText('Submit');
    await act(async () => {
      fireEvent.click(button);
    });

    expect(handleSubmit).toHaveBeenCalled();
  });
});
