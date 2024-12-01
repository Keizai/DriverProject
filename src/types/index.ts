import {Ride, RidesState} from '../redux/ridesSlice';
import {store} from '../store';

export interface RootState {
  rides: RidesState;
}

export type AppDispatch = typeof store.dispatch;
