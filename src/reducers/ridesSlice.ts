import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from '../services';

export interface Ride {
  id: string;
  userId: string;
  driverId: string | null;
  pickupLocation: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  status:
    | 'pending'
    | 'accepted'
    | 'declined'
    | 'started'
    | 'picked-up'
    | 'dropped-off';
  pickupTime: Date;
  timestamp: Date;
}

interface RidesState {
  rides: Ride[];
  loading: boolean;
  error: string | null;
}

const initialState: RidesState = {
  rides: [],
  loading: false,
  error: null,
};
// Async thunk to fetch ride requests
export const fetchRideRequests = createAsyncThunk(
  'rides/fetchRideRequests',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Ride[]>('/rides'); // Use `/rides-empty` or `/rides-error` to test edge cases
      if (response.data.length === 0) {
        throw new Error('No rides available.');
      }
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch rides',
      );
    }
  },
);
// Create slice using `createSlice`
const ridesSlice = createSlice({
  name: 'rides',
  initialState,
  reducers: {
    // Action to accept a ride
    acceptRide: (state, action: PayloadAction<string>) => {
      const rideId = action.payload;
      const ride = state.rides.find(ride => ride.id === rideId);
      if (ride) {
        ride.status = 'accepted';
      }
    },
    // Action to decline a ride
    declineRide: (state, action: PayloadAction<string>) => {
      const rideId = action.payload;
      const ride = state.rides.find(ride => ride.id === rideId);
      if (ride) {
        ride.status = 'declined';
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRideRequests.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRideRequests.fulfilled,
        (state, action: PayloadAction<Ride[]>) => {
          state.rides = action.payload;
          state.loading = false;
        },
      )
      .addCase(
        fetchRideRequests.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload || 'Failed to fetch rides';
        },
      );
  },
});

// Export actions to use them in the components
export const {acceptRide, declineRide} = ridesSlice.actions;

// Export the reducer to use in the store
export default ridesSlice.reducer;
