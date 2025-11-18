// src/components/Login/Login.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { StoreContext } from '../../context/StoreContext';
import Login from './Login';


jest.fn(); // Mock window.alert
/*renders login form: This test verifies that the login form displays essential elements like email, password input fields,
 and a login button.

switches to sign up form: This test ensures clicking the "Click here!" link toggles to the sign-up form with a name input 
field and a "Create account" button.

logs in successfully (async): This test simulates a successful login flow:
Enters email and password in the login form

shows error message on login failure (async): This test simulates an unsuccessful login scenario: */

const mockAxios = new MockAdapter(axios);

const url = "http://localhost:5000"; // Replace with your actual API URL
const setToken = jest.fn();

const renderLogin = () => {
  return render(
    <StoreContext.Provider value={{ url, setToken }}>
      <Login setShowLogin={jest.fn()} />
    </StoreContext.Provider>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  test('renders login form', () => {
    renderLogin();
    expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Login');
  });

  test('switches to sign up form', () => {
    renderLogin();
    fireEvent.click(screen.getByText('Click here!'));
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Create account');
  });

  test('logs in successfully', async () => {
    renderLogin();
    fireEvent.change(screen.getByPlaceholderText('Your email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });

    mockAxios.onPost(`${url}/api/user/login`).reply(200, {
      success: true,
      token: 'fake-token'
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(setToken).toHaveBeenCalledWith('fake-token');
      expect(localStorage.getItem('token')).toBe('fake-token');
    });
  });

 
  test('shows error message on login failure', async () => {
    renderLogin();
    fireEvent.change(screen.getByPlaceholderText('Your email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
  
    mockAxios.onPost(`${url}/api/user/login`).reply(200, {
      success: false,
      message: 'Invalid credentials'
    });
  
    fireEvent.click(screen.getByRole('button'));
  
    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });
  
});
