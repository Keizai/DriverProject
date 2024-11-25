import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {acceptRide, declineRide} from '../reducers';
import {Ride} from '../reducers/ridesSlice';

type RideDetailsScreenProps = {
  route: {params: {ride: Ride}};
};

const RideDetailsScreen: React.FC<RideDetailsScreenProps> = ({route}) => {
  const {ride} = route.params;
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>
        Pickup Location: {ride.pickupLocation.latitude},{' '}
        {ride.pickupLocation.longitude}
      </Text>
      <Text>
        Destination: {ride.destination.latitude}, {ride.destination.longitude}
      </Text>
      <Text>Status: {ride.status}</Text>
      <Button
        title="Accept Ride"
        onPress={() => dispatch(acceptRide(ride.id))}
      />
      <Button
        title="Decline Ride"
        onPress={() => dispatch(declineRide(ride.id))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
});

export default RideDetailsScreen;
