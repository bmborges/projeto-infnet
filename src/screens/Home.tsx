import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { MapMarker, Marker } from 'react-native-maps';
import styled from 'styled-components/native';
import { Fab, Heading, HStack, IconButton, VStack } from 'native-base';
import { Plus, UserCircle } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { getUserCoords } from '../functions/getUserCoords';
import { GeoCoordinates } from 'react-native-geolocation-service';
import { Loading } from '../components/Loading';

const TextHeader = styled.Text`
    font-size: 20px;
    color: 'black';
`;

const delta = 0.003;

export function Home(){
    const [userCoords, setUserCoords] = useState<GeoCoordinates>();
    const navigation = useNavigation();
    const [isLoading, setIsLoading]= useState(true);


    useEffect(()=>{
      setIsLoading(true);
      async function getCoords(){
        const coords = await getUserCoords();
        setUserCoords(coords);
        setIsLoading(false);
      }
      getCoords()
    },[]);

    const userLogin = () => {

    }


    if(isLoading){
      return (
        <Loading/>
      )
    }


    return (
        <VStack
          flex={1}
        >
          <HStack
              p={3}
              alignItems={'center'}
              justifyContent={'space-between'}
          >
              <Heading>Rota Acessível</Heading>
              <IconButton
                onPress={userLogin}
                icon={<UserCircle size={32} weight="fill" color={'black'}/>}
              />
          </HStack>
          <MapView
            showsUserLocation
            style={styles.map}
            region={{
                latitude: userCoords?.latitude,
                longitude: userCoords?.longitude,
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
          <Fab renderInPortal={false} size="sm" 
            onPress={()=>{navigation.navigate('AddMarker')}}
            icon={<Plus size={32} weight="fill" color={'white'}/>} />
      </VStack>
        
    )
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
});