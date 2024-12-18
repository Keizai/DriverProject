import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRideRequests} from '../redux';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootState, AppDispatch} from '../types';

type RootStackParamList = {
  RideDetails: {rideId: string};
  // ... other screens
};

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {rides, loading, error} = useSelector(
    (state: RootState) => state.rides,
  );

  useEffect(() => {
    dispatch(fetchRideRequests('/rides'));
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
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {/* Driver's location marker */}
        <Marker
          coordinate={{
            latitude: 37.7749,
            longitude: -122.4194,
          }}
          key={'driver'}
          pinColor="blue"
          title="You are here"
        />
        {rides.map(ride => (
          <Marker
            key={ride.id}
            coordinate={ride.pickupLocation}
            onPress={() =>
              navigation.navigate('RideDetails', {rideId: ride.id})
            }
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
