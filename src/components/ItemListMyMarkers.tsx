import { useNavigation } from "@react-navigation/native";
import { AspectRatio, Box, Center, HStack, Image, Pressable, Text, VStack } from "native-base";
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
                navigation.navigate(screens.viewMarker as never, {marker : {...item}});
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
                                <AspectRatio ratio={320 / 160} width="full">
                                    <Image src={"https://webservices.jumpingcrab.com/uploads/voluptatum_perspiciatis_eius_ab40ff0767.jpg"} alt="" resizeMode="cover" />
                                </AspectRatio>
                                {/* <Text>Id: {item.id}</Text> */}
                                <Text _dark={{color: 'black'}}>Tipo:</Text>
                                <ItemAccessibilityType id={item?.accessibilityType} showDescription={false}/>
                                <Text _dark={{color: 'black'}}>Data Cadastro: </Text>
                                <Text _dark={{color: 'black'}}>{item.createdAt}</Text>
                                <Center>
                                    <TextConservacao>Conservação:</TextConservacao>
                                    <SmileyStateMarker stateMarker={item.stateMarker}/>
                                </Center>
                            </VStack>
                        </HStack>
                    </Box>;
                }}
        </Pressable>

    )
}