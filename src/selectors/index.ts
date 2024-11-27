import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../types';

// Selector for a specific ride by ID
export const selectRideById = (rideId: string) =>
  createSelector(
    (state: RootState) => state.rides.rides,
    rides => rides.find(ride => ride.id === rideId),
  );
