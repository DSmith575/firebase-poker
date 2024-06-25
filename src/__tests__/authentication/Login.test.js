import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Login from '../../components/authentication/Login';
import { AuthContextProvider, useUserAuth } from '../../context/FirestoreAuthContext';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));

jest.mock('../../context/FirestoreAuthContext', () => ({
  AuthContextProvider: ({ children }) => <div>{children}</div>,
  useUserAuth: jest.fn(),
}));

const mockRenderComponent = async (component) => {
  return render(
    <BrowserRouter>
      <AuthContextProvider>{component}</AuthContextProvider>
    </BrowserRouter>,
  );
};
describe('Login', () => {
  beforeEach(() => {
    useUserAuth.mockReturnValue({
      signInAnonUser: jest.fn(),
    });
  });

  test('should render Login component', async () => {
    await act(async () => {
      mockRenderComponent(<Login />);
    });

    expect(screen.getByText('Sign In Anonymously')).toBeInTheDocument();
  });

  test('should call handleSubmit when Sign In Anonymously button is clicked', async () => {
    const { signInAnonUser } = useUserAuth();

    await act(async () => {
      mockRenderComponent(<Login />);
    });

    const button = screen.getByText('Sign In Anonymously');
    expect(button).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(button);
    });

    expect(signInAnonUser).toHaveBeenCalled();
  });

  test('should show error message if error occurs', async () => {
    const errorMessage = 'Test Error Message';
    useUserAuth.mockReturnValue({
      signInAnonUser: jest.fn().mockRejectedValueOnce(new Error(errorMessage)),
    });

    await act(async () => {
      mockRenderComponent(<Login />);
    });

    const button = screen.getByText('Sign In Anonymously');
    expect(button).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(button);
    });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('should redirect to home page if user is authenticated', async () => {
    useUserAuth.mockReturnValue({
      user: { uid: 'testUser' },
    });

    await act(async () => {
      mockRenderComponent(<Login />);
    });
  });
});
