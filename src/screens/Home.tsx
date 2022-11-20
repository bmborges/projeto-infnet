import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { LongPressEvent, MapMarker, Marker } from 'react-native-maps';
import styled from 'styled-components/native';
import { Fab, Heading, HStack, IconButton, VStack } from 'native-base';
import { Plus, UserCircle } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { getUserCoords } from '../functions/getUserCoords';
import { GeoCoordinates } from 'react-native-geolocation-service';
import { Loading } from '../components/Loading';
import firestore from '@react-native-firebase/firestore';
import { firestoreDateFormat } from '../functions/firestoreDateFormat';
import screens from './../screens.json';
import { ModalAddMarker } from '../components/ModalAddMarker';

const TextHeader = styled.Text`
    font-size: 20px;
    color: 'black';
`;

const delta = 0.003;

export function Home(){
    const [userCoords, setUserCoords] = useState<GeoCoordinates>();
    const navigation = useNavigation();
    const [isLoading, setIsLoading]= useState(true);
    const [markers, setMarkers] = useState([]);
    const [modalAddMarkerVisible, setModalAddMarkerVisible] = useState(false);



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


    useEffect(() => {

      let query = firestore()
        .collection("markers")
  
      const subscriberGetAllMarkers = query.onSnapshot(snapshot => {
        const data = snapshot.docs.map((document) => {
          const { coords, stateMarker, typeMarker, createdAt } = document.data();
          return {
            id: document.id,
            createdAt: firestoreDateFormat(createdAt),
            coords,
            stateMarker,
            typeMarker
          };
        });
        setMarkers(data)
  
      }, console.warn);
  
      return subscriberGetAllMarkers;
    }, []);

    const onHandleLongPressMap = (e:LongPressEvent) => {
      const coords = e.nativeEvent;  
      navigation.navigate(screens.addMarker,{coords})
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
                onPress={
                  () => {
                    navigation.navigate(screens.profile);
                  }
                }
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
              }}
              onLongPress={(e)=>{onHandleLongPressMap(e)}}  
            >
            {markers.map(
              marker =>
                marker?.id &&
                marker?.coords && (
                  <Marker.Animated
                    coordinate={marker.coords}
                    key={marker.id}
                    onPress={() => {
                      navigation.navigate(screens.viewMarker, {marker});
                    }}/>
                ),
              )}
          </MapView>
          <Fab renderInPortal={false} size="sm" 
            onPress={()=>{navigation.navigate(screens.addMarker)}}
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