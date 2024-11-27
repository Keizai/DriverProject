/*
 * @Author: changaowu
 * @Date: 2024-11-27 14:02:57
 * @LastEditors: changaowu
 * @LastEditTime: 2024-11-27 14:16:37
 * @Description: file content
 * @FilePath: \DriverProject\src\containers\HomeScreen.tsx
 */
import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRideRequests} from '../reducers';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../types';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {rides, loading, error} = useSelector(
    (state: RootState) => state.rides,
  );

  useEffect(() => {
    dispatch(fetchRideRequests());
  }, [dispatch]);
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading rides...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  if (rides.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No rides available at the moment.</Text>
      </View>
    );
  }
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
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
