import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { MapMarker, Marker } from 'react-native-maps';
import styled from 'styled-components/native';

import { Fab } from 'native-base';
import { Plus } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

const MapContainer = styled.View`
    width: 100%;
    height: 100%;
`;

const delta = 0.003;

export function Home(){
    const [userCoords, setUserCoords] = useState();
    const navigation = useNavigation();

    useEffect(()=>{





    },[]);


    return (
        <>
          <MapContainer>
          <MapView
            showsUserLocation
            style={styles.map}
            region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: delta,
                longitudeDelta: delta,
              }}>
            {/* {positionsArray.map(
              user =>
                user?.id &&
                user?.coords && (
                  <Marker.Animated
                    coordinate={user.coords}
                    key={user.id}
                    onPress={() => {
                        // navigation.navigate(screens.messenger, {
                            //   screen: messengerScreens.chat,
                            //   params: user,
                            //   initial: false,
                            // });
                          }}/>
                ),
              )} */}
          </MapView>
        </MapContainer>
        <Fab renderInPortal={false} size="sm" 
          onPress={()=>{navigation.navigate('AddMarker')}}
        icon={<Plus size={32} weight="fill" color={'white'}/>} />
      </>
        
    )
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
  });