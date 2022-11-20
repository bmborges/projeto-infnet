import { Button, CheckIcon, FormControl, Input, Stack, Text, useToast, VStack } from "native-base";
import { Select } from "native-base";
import { useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import { getUserCoords } from "../functions/getUserCoords";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import screens from './../screens.json'

type accessibilityTypeProps = {
    id: string;
    description: string;
    title: string;
}


export function AddMarker(){
    
    const {params} = useRoute();
    const [stateMarker, setStateMarker] = useState('');
    const [accessibilityType, setAccessibilityType] = useState('');
    const [latitude, setLatitude] = useState<Number>();
    const [longitude, setLongitude] = useState<Number>();
    const [ isSavingFirebase, setIsSavingFirebase] = useState(false);
    const [accessibilityTypes, setAccessibilityTypes] = useState([]);
    const [nomeProfile, setNomeProfile] = useState('')
    const [userId, setUserId] = useState('')

    const navigation = useNavigation();
    
    const {goBack} = useNavigation();

    const toast = useToast();

    const getCurrentPosition = async() => {
        const result = await getUserCoords();
        setLatitude(result?.latitude);
        setLongitude(result?.longitude);
    }

    useEffect(()=>{
        if(!!params?.coords){

            let latitude = params?.coords?.coordinate.latitude;
            let longitude = params?.coords?.coordinate.longitude;
            setLatitude(latitude);
            setLongitude(longitude);
        }
    },[])

    useEffect(()=>{
        (async()=>{
            try {
                const value = await AsyncStorage.getItem('@storage_perfil')
                if(value !== null) {
                    setNomeProfile(value)
                }

                const userId = await AsyncStorage.getItem('@storage_perfilid')
                if(userId !== null) {
                    setUserId(userId)
                }

            } catch (error) {
                
            }
        })()
    },[navigation.isFocused()])


    const onHandleSave = async() => {


        if(!nomeProfile) return Alert.alert("Atenção!", "Para salvar uma marcação cadastre um nome no Perfil",
        [
            {
                text: "Cadastrar",
                onPress: ()=>{navigation.navigate(screens.profile)}
            },
            {
                text: "Ok"
            }
        ]
        )

        
        setIsSavingFirebase(true);
        try {

            
            await firestore().collection("markers").add({
                accessibilityType,
                stateMarker,
                coords : {
                    latitude,
                    longitude,
                },
                createdAt : firestore.FieldValue.serverTimestamp(),
                nomeProfile,
                userId                
            });
            toast.show({description : "Marcação Salva"})
            goBack();
            
        } catch (error) {
            toast.show({description : "Erro ao salvar Marcação"})
            
        }
        setIsSavingFirebase(false);

    }

    useEffect(()=>{

        let query = firestore()
        .collection("accessibilityType")
        .orderBy("description",'asc')

        const subscriberAccessibilityType = query.onSnapshot(snapshot => {
            const data = snapshot.docs.map((document) => {
              const { description, title } = document.data();
              return {
                id: document.id,
                description,
                title
              };
            });
            setAccessibilityTypes(data);
          }, console.warn);
      
          return subscriberAccessibilityType;
    },[])



    return (
        <VStack
            flex={1}
            bg={'white'}
        >
            <FormControl isRequired>
                <Stack mx="4">
                    <FormControl.Label>Tipo de Marcação</FormControl.Label>
                    <Select selectedValue={accessibilityType} minWidth="200" accessibilityLabel="Selecione" placeholder="Selecione" 
                    _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={itemValue => setAccessibilityType(itemValue)}>
                        {accessibilityTypes.map((type:accessibilityTypeProps)=>{
                            return (
                                <Select.Item key={type.id} label={type.title} value={type.id} />
                            )
                        })}
                    </Select>
                </Stack>
            </FormControl>
            <FormControl isRequired>
                <Stack mx="4">
                    <Text fontWeight={"bold"}>Localização</Text>
                    <FormControl.Label>Latitude</FormControl.Label>
                    <Input 
                        type="text"
                        keyboardType="number-pad"
                        value={latitude?.toString()}
                        onChangeText={(text)=>{setLatitude(Number(text))}}
                    />
                </Stack>
            </FormControl>
            <FormControl isRequired>
                <Stack mx="4">
                    <FormControl.Label>Longitude</FormControl.Label>
                    <Input 
                        type="text" 
                        keyboardType="number-pad"
                        value={longitude?.toString()}
                        onChangeText={(text)=>{setLongitude(Number(text))}}
                    />
                </Stack>
            </FormControl>
            {!(!!params?.coords) ? (
                <Button
                    m={4}
                    onPress={getCurrentPosition}
                    >
                    Utilizar Minha Localização
                </Button>
            ) : (<></>)}


            <FormControl isRequired>
                <Stack mx="4">
                    <FormControl.Label>Estado de Conservação</FormControl.Label>
                    <Select selectedValue={stateMarker} minWidth="200" accessibilityLabel="Selecione" placeholder="Selecione" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={itemValue => setStateMarker(itemValue)}>
                        <Select.Item label="Ruim" value="-1" />
                        <Select.Item label="Bom" value="0" />
                        <Select.Item label="Excelente" value="1" />
                    </Select>
                </Stack>
            </FormControl>


            <Button
                m={4}
                onPress={onHandleSave}
                isLoading={isSavingFirebase}
            >
                Salvar
            </Button>


            

        </VStack>
    )
}