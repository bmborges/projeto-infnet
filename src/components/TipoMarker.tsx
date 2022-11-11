import { Center, FlatList, Stack, Text, VStack } from "native-base"
import { ChatTeardropText } from "phosphor-react-native"
import { useState } from "react"

export function TipoMarker(){

    const [tipo, setTipo] = useState([
        {tipo: 1 , descricao : "Rampa"},
        {tipo: 2 , descricao : "Faixa Livre"},
        {tipo: 3 , descricao : "Passarela de Pedestre"},
        {tipo: 4 , descricao : "Escada"},
    ]);

    return (

        <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            data={tipo}
            initialNumToRender={7}
            removeClippedSubviews
            ItemSeparatorComponent={()=>{
                return (
                  <Stack
                    px={2}
                  />
                )
              }
            }
            keyExtractor={(item, index) => index}
            renderItem={({item}) => {
                return (
                  <VStack
                    p={3}
                  >
                    <Text fontSize={18}>
                      {item.descricao}
                    </Text>
                  </VStack>
                )
            }}
        ListEmptyComponent={
          () => (
            <Center>
              <ChatTeardropText size={40} />
              <Text color="black" fontSize="xl" mt={6} textAlign="center">
                Não temos nenhum opção, desculpe - nos pelo transtorno.
              </Text>
            </Center>
          )
        }    
        />


    )
}