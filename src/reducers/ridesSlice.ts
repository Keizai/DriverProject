/*
 * @Author: changaowu
 * @Date: 2024-11-25 10:07:33
 * @LastEditors: changaowu
 * @LastEditTime: 2024-11-25 10:07:37
 * @Description: file content
 * @FilePath: \DriverProject\src\reducers\ridesSlice.ts
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  status: 'pending' | 'accepted' | 'declined' | 'started' | 'picked-up' | 'dropped-off';
  pickupTime: Date;
  timestamp: Date;
}

interface RidesState {
  rides: Ride[];
}

const initialState: RidesState = {
  rides: [],
};

// Create slice using `createSlice`
const ridesSlice = createSlice({
  name: 'rides',
  initialState,
  reducers: {
    // Action to set the list of ride requests
    fetchRideRequests: (state, action: PayloadAction<Ride[]>) => {
      state.rides = action.payload;
    },
    // Action to accept a ride
    acceptRide: (state, action: PayloadAction<string>) => {
      const rideId = action.payload;
      const ride = state.rides.find((ride) => ride.id === rideId);
      if (ride) {
        ride.status = 'accepted';
      }
    },
    // Action to decline a ride
    declineRide: (state, action: PayloadAction<string>) => {
      const rideId = action.payload;
      const ride = state.rides.find((ride) => ride.id === rideId);
      if (ride) {
        ride.status = 'declined';
      }
    },
  },
});

// Export actions to use them in the components
export const { fetchRideRequests, acceptRide, declineRide } = ridesSlice.actions;

// Export the reducer to use in the store
export default ridesSlice.reducer;
