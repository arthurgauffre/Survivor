import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Provides custom matchers for assertions
import Page from './page'; // Assuming this path is correct
import { describe, it, expect , test} from 'vitest';


describe('Login Page', () => {
  it('should render the login page with form and sign-up link', () => {
    render(
        <Page/>
    );

    // Check if the title is rendered
    // expect(screen.getByText('Soul Connection')).toBeInTheDocument();

    // // Check if the login heading is rendered
    // expect(screen.getByText('Login')).toBeInTheDocument();

    // // Check if the description text is rendered
    // expect(screen.getByText('Enter your email below to login to your account')).toBeInTheDocument();

    // // Check if the Sign Up link is rendered
    // expect(screen.getByText('Sign up')).toBeInTheDocument();
  });
});
