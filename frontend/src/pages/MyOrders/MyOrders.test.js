import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyOrders from './MyOrders';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { parcel_icon } from '../../assets/asset';

/*Fetching and displaying orders on render: This test verifies and displays order details (product names, quantities, price, item count, and status) correctly.

Calling fetchOrders when Track Order button is clicked: This test ensures that clicking the "Track Order" button triggers another
 API call to potentially retrieve updated order information. */

// Mock the parcel_icon asset
jest.mock('../../assets/asset', () => ({
  parcel_icon: 'parcel_icon'
}));

// Mock axios
jest.mock('axios');

// Mock StoreContext
const mockStoreContext = {
  url: 'http://localhost:3000',
  token: 'test-token'
};

describe('MyOrders Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays orders on render', async () => {
    // Mock API response
    axios.post.mockResolvedValue({
      data: {
        data: [
          {
            items: [{ name: 'Product A', quantity: 2 }, { name: 'Product B', quantity: 1 }],
            amount: 500,
            status: 'Shipped'
          }
        ]
      }
    });

    // Render the component within the mock context
    await act(async () => {
      render(
        <StoreContext.Provider value={mockStoreContext}>
          <MyOrders />
        </StoreContext.Provider>
      );
    });

    // Output the rendered HTML to debug
    console.log(screen.getByText(/Product A x 2/i).parentElement.outerHTML);

    // Check if the order details are rendered
    expect(screen.getByText(/Product A x 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Product B x 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Ksh500\.00/i)).toBeInTheDocument();
    expect(screen.getByText(/Items: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Shipped/i)).toBeInTheDocument();
  });

  it('calls fetchOrders when Track Order button is clicked', async () => {
    // Mock API response
    axios.post.mockResolvedValue({
      data: {
        data: [
          {
            items: [{ name: 'Product A', quantity: 2 }],
            amount: 300,
            status: 'Delivered'
          }
        ]
      }
    });

    // Render the component within the mock context
    await act(async () => {
      render(
        <StoreContext.Provider value={mockStoreContext}>
          <MyOrders />
        </StoreContext.Provider>
      );
    });

    // Trigger the Track Order button click
    fireEvent.click(screen.getByText('Track Order'));

    // Ensure the API was called again
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(2));
  });
});
