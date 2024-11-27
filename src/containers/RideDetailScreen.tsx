import React from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {acceptRide, declineRide} from '../reducers';
import {Ride} from '../reducers/ridesSlice';
import {RootState} from '../types';
import {selectRideById} from '../selectors';

type RideDetailsScreenProps = {
  route: {params: {rideId: string}};
};

const RideDetailsScreen: React.FC<RideDetailsScreenProps> = ({route}) => {
  const {rideId} = route.params;
  const dispatch = useDispatch();
  console.log('rideId', rideId);
  const [rideStatus, setRideStatus] = React.useState<string | undefined>(
    undefined,
  );

  React.useEffect(() => {
    if (ride) {
      setRideStatus(ride.status);
    }
  }, [ride]);
  const ride = useSelector((state: RootState) => selectRideById(rideId)(state));
  if (!ride) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Ride not found.</Text>
      </View>
    );
  }

  // Handle accept ride
  const handleAccept = () => {
    if (ride.status !== 'pending') {
      Alert.alert('Action not allowed', 'This ride has already been handled.');
      return;
    }
    dispatch(acceptRide(rideId));
    Alert.alert('Ride Accepted', 'You have successfully accepted the ride.');
  };

  // Handle decline ride
  const handleDecline = () => {
    if (ride.status !== 'pending') {
      Alert.alert('Action not allowed', 'This ride has already been handled.');
      return;
    }
    dispatch(declineRide(rideId));
    Alert.alert('Ride Declined', 'You have successfully declined the ride.');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ride Details</Text>
      <Text>
        Pickup Location: {ride.pickupLocation.latitude},{' '}
        {ride.pickupLocation.longitude}
      </Text>
      <Text>
        Destination: {ride.destination.latitude}, {ride.destination.longitude}
      </Text>
      <Text>Status: {ride.status}</Text>

      {ride.status === 'pending' ? (
        <View>
          <Button title="Accept Ride" onPress={handleAccept} />
          <Button title="Decline Ride" onPress={handleDecline} />
        </View>
      ) : (
        <Text style={styles.notice}>
          This ride has already been {ride.status}.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  notice: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default RideDetailsScreen;
