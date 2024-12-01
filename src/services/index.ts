import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {Ride} from '../redux/ridesSlice';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'https://mockapi.io/api/v1', // Replace with real API base URL when ready
  timeout: 5000,
});

// Mock the API for development
if (__DEV__) {
  const mock = new MockAdapter(axiosInstance, {delayResponse: 1000}); // Simulates network delay

  // Mock response for GET /rides
  mock.onGet('/rides').reply(200, [
    {
      id: '1',
      userId: '101',
      driverId: null,
      pickupLocation: {latitude: 37.7749, longitude: -122.4394},
      destination: {latitude: 37.7849, longitude: -122.4094},
      status: 'pending',
      pickupTime: new Date().toISOString(),
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      userId: '102',
      driverId: null,
      pickupLocation: {latitude: 37.8049, longitude: -122.4294},
      destination: {latitude: 37.8149, longitude: -122.4194},
      status: 'pending',
      pickupTime: new Date().toISOString(),
      timestamp: new Date().toISOString(),
    },
  ]);

  // Simulate no rides available
  mock.onGet('/rides-empty').reply(200, []);

  // Simulate an API error
  mock.onGet('/rides-error').reply(500, {message: 'Internal Server Error'});
}

export default axiosInstance;
