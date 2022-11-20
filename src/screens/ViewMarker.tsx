import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Center, Stack, Text, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { firestoreDateFormat } from "../functions/firestoreDateFormat";
import firestore from '@react-native-firebase/firestore';
import { ItemAccessibilityType } from "../components/ItemAccessibilityType";
import MapView, { Marker } from "react-native-maps";
import { Dimensions, StyleSheet } from "react-native";
import { Loading } from "../components/Loading";
import styled from 'styled-components/native';
import { SmileyStateMarker } from "../components/SmileyStateMarker";



const TextHeader = styled.Text`
    font-size: 20px;
    align-self: center;
`;

type markerProps = {
    id: string;
    coords: any;
    accessibilityType: string;
    stateMarker: string;
    createdAt: Date;
}

const delta = 0.003;


export function ViewMarker(){
    const {params} = useRoute()
    const {goBack} = useNavigation();
    const [marker, setMarker] = useState<markerProps>();
    const [isLoading, setIsLoading] = useState(true);
    const [ isSavingFirebase, setIsSavingFirebase] = useState(false);

    // console.log(params)


    const toast = useToast()
    useEffect(()=>{

        let query = firestore()
        .collection("markers")
        .where(firestore.FieldPath.documentId(),"==",params.marker.id)
  
      const subscriberGetMarker = query.onSnapshot(snapshot => {
        const data = snapshot.docs.map((document) => {
          const { coords, accessibilityType, stateMarker, createdAt } = document.data() as markerProps;
          setMarker({
            id: document.id,
            createdAt: firestoreDateFormat(createdAt),
            coords,
            stateMarker,
            accessibilityType
          });
        });
        setIsLoading(false);
      }, console.warn);
  
      return subscriberGetMarker;

    },[])


    const onHandleRemoveMarker = async() => {
        setIsSavingFirebase(true)

        try {
            await firestore()
            .collection("markers")
            .doc(params.marker.id)
            .delete()

            toast.show({
                description: "Ponto Removido"
            })
            goBack();
        } catch (error) {
            toast.show({
                description: "Erro ao Remover Ponto"
            })
        }
        setIsSavingFirebase(false)
    }

    if(isLoading){
        return <Loading/>
    }

    return (
        <VStack
            flex={1}
        >
            <Button
                isLoading={isSavingFirebase}
                onPress={onHandleRemoveMarker}
                bg={'red.600'}
                m={2}
            >
                Remover Ponto
            </Button>
            <ItemAccessibilityType id={marker?.accessibilityType}/>
            
            <Stack
                bg={'black'}
                p={2}
            >
                <TextHeader>Estado de Conservação</TextHeader>
            </Stack>
            <Center
                m={4}
            >
                <SmileyStateMarker stateMarker={marker?.stateMarker}/>
            </Center>

            <MapView
                style={styles.map}
                region={{
                    latitude: marker.coords?.latitude,
                    longitude: marker.coords?.longitude,
                    latitudeDelta: delta,
                    longitudeDelta: delta,
                }}
                >
                    <Marker.Animated
                        coordinate={marker.coords}
                        key={marker.id}
                    />
            </MapView>
        </VStack>
    )
}
const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('screen').width,
        height: '50%'
    },
});