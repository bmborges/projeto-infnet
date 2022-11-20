import Geolocation, {GeoCoordinates} from 'react-native-geolocation-service';

export function getUserCoords(): Promise<GeoCoordinates | undefined> {
  return new Promise(resolve => {
    Geolocation.getCurrentPosition(
      position => {
        position?.coords && resolve(position.coords);
      },
      error => {
        // console.log(error)
        resolve(undefined);
      },
    );
  });
}