import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import InputField from '../../components/input/Input';

describe('InputField', () => {
  test('should render InputField component', () => {
    render(<InputField />);
    const inputField = screen.getByRole('textbox');

    expect(inputField).toBeInTheDocument();
  });

  test('should render InputField component with a placeholder', () => {
    render(<InputField placeHolder={'Enter your name'} />);
    const inputField = screen.getByPlaceholderText('Enter your name');

    expect(inputField).toBeInTheDocument();
  });

  test('should render InputField component with a value', () => {
    render(<InputField value={'Alice'} />);
    const inputField = screen.getByDisplayValue('Alice');

    expect(inputField).toBeInTheDocument();
  });

  test('should render InputField component with a type', () => {
    render(<InputField inputType={'email'} />);
    const inputField = screen.getByRole('textbox');

    expect(inputField).toHaveAttribute('type', 'email');
  });

  test('should render InputField component with a minLength', () => {
    render(<InputField min={2} />);
    const inputField = screen.getByRole('textbox');

    expect(inputField).toHaveAttribute('minlength', '2');
  });

  test('should render InputField component with a maxLength', () => {
    render(<InputField max={10} />);
    const inputField = screen.getByRole('textbox');

    expect(inputField).toHaveAttribute('maxlength', '10');
  });
});
