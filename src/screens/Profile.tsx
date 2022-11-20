import { useEffect, useState } from "react";
import { Button, Center, FlatList, FormControl, Heading, Input, Stack, Text, useToast, VStack } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { firestoreDateFormat } from "../functions/firestoreDateFormat";
import { ItemListMyMarkers } from "../components/ItemListMyMarkers";

export function Profile(){

    const [nome, setNome] = useState('')
    const [userId, setUserId] = useState<string | null>()
    const [myMarkers, setMyMarkers] = useState([]);
    const toast = useToast()

    const onHandleSave = async() => {


        try {
            if(!userId){
                await firestore()
                .collection("users")
                .add(
                    {
                        nome
                    }
                ).then(async(result)=>{
                    await AsyncStorage.setItem('@storage_perfilid', result.id)
                })
            }


            await AsyncStorage.setItem('@storage_perfil', nome)

            toast.show({
                description: "Perfil Salvo"
            })
        } catch (error) {
            toast.show({
                description: "Erro Registrar usuario"
            })
        }

    }
    const onHandleDelete = async() => {

        await AsyncStorage.removeItem('@storage_perfilid');

        await AsyncStorage.removeItem('@storage_perfil');
        setNome('')
        toast.show({
            description: "Perfil Deletado"
        })
    }



    useEffect(()=>{
        (async()=>{
            try {
                const value = await AsyncStorage.getItem('@storage_perfil')
                if(value !== null) {
                    setNome(value)
                }

                const userId = await AsyncStorage.getItem('@storage_perfilid')
                if(userId !== null) {
                    setUserId(userId)
                }
            } catch (error) {
                
            }
        })()
    },[])



    useEffect(()=>{

        if(!userId) return;

        let queryMyMarkers = firestore()
        .collection("markers")
        .where("userId","==",userId)
  
        const subscriberGetMyMarkers = queryMyMarkers.onSnapshot(snapshot => {
            const data = snapshot.docs.map((document) => {
              const { coords, stateMarker, accessibilityType, createdAt } = document.data();
              return {
                id: document.id,
                createdAt: firestoreDateFormat(createdAt),
                coords,
                stateMarker,
                accessibilityType
              };
            });
            setMyMarkers(data)
      
          }, console.warn);
      
  
      return subscriberGetMyMarkers;

    },[userId])
    return (
        <VStack>
            <FormControl isRequired>
                <Stack mx="4">
                    <FormControl.Label>Nome</FormControl.Label>
                    <Input 
                        bg={'white'}
                        type="text"
                        value={nome}
                        onChangeText={(text)=>{setNome(text)}}
                    />
                </Stack>
            </FormControl>
            <Button
                m={4}
                onPress={onHandleSave}
            >
                Salvar
            </Button>

            <Button
                m={4}
                bg={'red.600'}
                onPress={onHandleDelete}
            >
                Deletar
            </Button>

            <FlatList
                data={myMarkers}
                renderItem={({item}) => (
                    <ItemListMyMarkers item={item}/>
                )}
                ListHeaderComponent={
                    ()=>(
                        <Center>
                            <Heading>Marcações que eu fiz</Heading>
                        </Center>
                    )
                }
                ListEmptyComponent={
                    ()=>(
                        <Center>
                            <Text>Ainda não fiz nenhuma</Text>
                        </Center>
                    )
                }
                
            />
            
        </VStack>
    )
}