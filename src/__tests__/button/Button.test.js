import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Button from '../../components/button/Button';

describe('Button', () => {
  test('should render Button component', () => {
    render(<Button label={'Test Button'} />);
    const button = screen.getByText('Test Button');

    expect(button).toBeInTheDocument();
  });

  test('should render Button component with disabled attribute', () => {
    render(<Button label={'Test Button'} disabled={true} />);
    const button = screen.getByText('Test Button');

    expect(button).toBeDisabled();
  });

  test('should render Button component with value attribute', () => {
    render(<Button label={'Test Button'} type={'button'} value={'test'} />);
    const button = screen.getByText('Test Button');

    expect(button).toHaveAttribute('value', 'test');
  });

  test('should render Button component with type attribute', () => {
    render(<Button label={'Test Button'} type={'submit'} />);
    const button = screen.getByText('Test Button');

    expect(button).toHaveAttribute('type', 'submit');
  });

  test('should call onClick function when button is clicked', () => {
    const onClick = jest.fn();
    render(<Button label={'Test Button'} onClick={onClick} />);
    const button = screen.getByText('Test Button');

    button.click();
    expect(onClick).toHaveBeenCalled();
  });
});
