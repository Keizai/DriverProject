import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './src/reduxStore/configureStore';

import {HomeScreen, RideDetailsScreen} from './src/containers';
import {Ride} from './src/reducers/ridesSlice';

export type RootStackParamList = {
  Home: undefined;
  RideDetails: {ride: Ride};
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RideDetails" component={RideDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
