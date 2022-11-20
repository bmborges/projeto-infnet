import {PermissionsAndroid} from 'react-native';

export async function requestPermission() {
  const response = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  // console.log(response)
  if (response == PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  return false;
}