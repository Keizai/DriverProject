import ridesReducer, {
  fetchRideRequests,
  acceptRide,
  declineRide,
  Ride,
  RidesState,
} from '../src/redux/ridesSlice';
import {configureStore} from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {RootState} from '../src/types';

// Mock Axios
const mock = new MockAdapter(axios);

describe('ridesSlice', () => {
  let store: ReturnType<typeof configureStore<RootState>>;
  const initialState: RidesState = {
    rides: [],
    loading: false,
    error: null,
  };

  beforeEach(() => {
    store = configureStore({reducer: {rides: ridesReducer}});
  });

  it('should handle initial state', () => {
    const state = store.getState().rides;
    expect(state).toEqual(initialState);
  });

  it('should handle acceptRide', () => {
    const ride: Ride = {
      id: '1',
      userId: '101',
      driverId: null,
      pickupLocation: {latitude: 37.7749, longitude: -122.4194},
      destination: {latitude: 37.7849, longitude: -122.4094},
      status: 'pending',
      pickupTime: '2024-11-25T12:42:57.235Z',
      timestamp: '2024-11-25T12:42:57.235Z',
    };

    const state = ridesReducer(
      {...initialState, rides: [ride]},
      acceptRide('1'),
    );

    expect(state.rides[0].status).toBe('accepted');
  });

  it('should handle declineRide', () => {
    const ride: Ride = {
      id: '1',
      userId: '101',
      driverId: null,
      pickupLocation: {latitude: 37.7749, longitude: -122.4194},
      destination: {latitude: 37.7849, longitude: -122.4094},
      status: 'pending',
      pickupTime: '2024-11-25T12:42:57.235Z',
      timestamp: '2024-11-25T12:42:57.235Z',
    };

    const state = ridesReducer(
      {...initialState, rides: [ride]},
      declineRide('1'),
    );

    expect(state.rides[0].status).toBe('declined');
  });

  it('should handle fetchRideRequests - rejected', async () => {
    // Mock API error
    mock.onGet('/rides-error').reply(500);

    await store.dispatch(fetchRideRequests('/rides-error') as any);

    const state = store.getState();
    expect(state.rides.error).toBe('Request failed with status code 500');
    expect(state.rides.loading).toBe(false);
  });

  it('should handle fetchRideRequests - no rides', async () => {
    // Mock API empty response
    mock.onGet('/rides-empty').reply(200, []);

    await store.dispatch(fetchRideRequests('/rides-empty') as any);

    expect(store.getState().rides.error).toBe('No rides available.');
    expect(store.getState().rides.loading).toBe(false);
  });
});
