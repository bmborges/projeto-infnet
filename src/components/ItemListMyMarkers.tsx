import { useNavigation } from "@react-navigation/native";
import { Box, Center, HStack, Pressable, Text, VStack } from "native-base";
import {ItemAccessibilityType} from './ItemAccessibilityType'
import { SmileyStateMarker } from "./SmileyStateMarker";
import screens from './../screens.json'
import styled from 'styled-components/native';


type ItemListMyMarkersProps = {
    id: string;
    coords: any;
    stateMarker:string;
    accessibilityType:string;
    createdAt:string;
}

const TextConservacao = styled.Text`
    font-size: 18px;
    margin-bottom: 10px;
    align-self: center;
    font-weight: bold;
    color: black;
`;


export function ItemListMyMarkers({item}:ItemListMyMarkersProps){

    const navigation = useNavigation();

    return (

        <Pressable 
            mx={5}
            onPress={() => {
                navigation.navigate(screens.viewMarker, {marker : {...item}});
            }}
            maxW="96">
            {({
                isHovered,
                isFocused,
                isPressed
                }) => {
                    return <Box 
                    mb={3}
                    bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "white"} style={{
                    transform: [{
                        scale: isPressed ? 0.96 : 1
                    }]
                    }} p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300">
                        <HStack>
                            <VStack>
                                {/* <Text>Id: {item.id}</Text> */}
                                <Text>Tipo:</Text>
                                <ItemAccessibilityType id={item?.accessibilityType} showDescription={false}/>
                                <Text>Data Cadastro: </Text>
                                <Text>{item.createdAt}</Text>
                            </VStack>
                            <Center>
                                <TextConservacao>Conservação:</TextConservacao>
                                <SmileyStateMarker stateMarker={item.stateMarker}/>
                            </Center>
                        </HStack>
                    </Box>;
                }}
        </Pressable>

    )
}