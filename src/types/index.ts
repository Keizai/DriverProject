import {Ride} from '../reducers/ridesSlice';

export interface RootState {
  rides: {
    rides: Ride[];
  };
}
