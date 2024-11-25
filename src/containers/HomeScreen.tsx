import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRideRequests} from '../reducers';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../types';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const rides = useSelector((state: RootState) => state.rides.rides);

  useEffect(() => {}, [dispatch]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {rides.map(ride => (
          <Marker
            key={ride.id}
            coordinate={ride.pickupLocation}
            onPress={() => navigation.navigate('RideDetails', {ride})}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  map: {flex: 1},
});

export default HomeScreen;
