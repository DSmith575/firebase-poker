import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { AuthContextProvider, useUserAuth } from '../../context/FirestoreAuthContext';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react';
import Signout from '../../components/authentication/Signout';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('../../context/FirestoreAuthContext', () => ({
  AuthContextProvider: ({ children }) => <div>{children}</div>,
  useUserAuth: jest.fn(),
}));

const mockLogout = jest.fn();

const mockRenderComponent = async (component) => {
  return render(
    <BrowserRouter>
      <AuthContextProvider>{component}</AuthContextProvider>
    </BrowserRouter>,
  );
};

describe('Signout', () => {
  beforeEach(() => {
    useUserAuth.mockReturnValue({
      user: 'alice',
      logout: mockLogout,
    });
  });

  test('should render Signout component', async () => {
    await act(async () => {
      mockRenderComponent(<Signout />);
    });

    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  test('should call handleSignOut when Sign Out button is clicked', async () => {
    // due to using a promise setTimeout in the handleSignOut function we need to use jest fake timers
    jest.useFakeTimers();
    await act(async () => {
      mockRenderComponent(<Signout />);
    });

    const button = screen.getByText('Sign out');
    expect(button).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(button);
      jest.advanceTimersByTime(2000);
    });

    expect(mockLogout).toHaveBeenCalled();
    jest.useRealTimers();
  });

  test('should render error message if signout fails', async () => {
    jest.useFakeTimers();

    const errorMessage = 'Signout failed';
    mockLogout.mockRejectedValue(new Error(errorMessage));

    await act(async () => {
      mockRenderComponent(<Signout />);
    });

    const button = screen.getByText('Sign out');
    expect(button).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(button);
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    jest.useRealTimers();
  });

  test('should redirect to home if user is not signed in', async () => {
    useUserAuth.mockReturnValue({
      user: null,
      logout: mockLogout,
    });

    await act(async () => {
      mockRenderComponent(<Signout />);
    });

    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
  });
});
