import { Button, CheckIcon, FormControl, HStack, IconButton, Input, Stack, Text, useToast, VStack, WarningOutlineIcon } from "native-base";
import { Select } from "native-base";
import { useState } from "react";
import firestore from '@react-native-firebase/firestore';
import { getUserCoords } from "../functions/getUserCoords";
import { useNavigation } from "@react-navigation/native";

export function AddMarker(){

    const [stateMarker, setStateMarker] = useState('');
    const [typeMarker, setTypeMarker] = useState('');
    const [latitude, setLatitude] = useState<Number>();
    const [longitude, setLongitude] = useState<Number>();
    const [ isSavingFirebase, setIsSavingFirebase] = useState(false);
    const {goBack} = useNavigation();

    const toast = useToast();

    const getCurrentPosition = async() => {
        const result = await getUserCoords();
        setLatitude(result?.latitude);
        setLongitude(result?.longitude);
    }

    const onHandleSave = async() => {
        
        setIsSavingFirebase(true);
        try {
            
            await firestore().collection("markers").add({
                typeMarker,
                stateMarker,
                coords : {
                    latitude,
                    longitude,
                },
                createdAt : firestore.FieldValue.serverTimestamp()                
            });
            toast.show({description : "Marcação Salva"})
            goBack();
            
        } catch (error) {
            toast.show({description : "Erro ao salvar Marcação"})
            
        }
        setIsSavingFirebase(false);

    }

    return (
        <VStack
            flex={1}
            bg={'white'}
        >
            <FormControl isRequired>
                <Stack mx="4">
                    <FormControl.Label>Tipo de Marcação</FormControl.Label>
                    <Select selectedValue={typeMarker} minWidth="200" accessibilityLabel="Selecione" placeholder="Selecione" 
                    _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={itemValue => setTypeMarker(itemValue)}>
                        <Select.Item label="Rampa" value="1" />
                        <Select.Item label="Faixa Livre" value="2" />
                        <Select.Item label="Passarela de Pedestre" value="3" />
                        <Select.Item label="Escada" value="4" />
                    </Select>
                </Stack>
            </FormControl>
            <FormControl isRequired>
                <Stack mx="4">
                    <Text fontWeight={"bold"}>Localização</Text>
                    <FormControl.Label>Latitude</FormControl.Label>
                    <Input 
                        type="text"
                        value={latitude?.toString()}
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
                    />
                </Stack>
            </FormControl>
            <Button
                m={4}
                onPress={getCurrentPosition}
            >
                Utilizar Minha Localização
            </Button>


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