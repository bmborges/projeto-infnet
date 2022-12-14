import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, Center, Fab, FlatList, Heading, Text, VStack } from 'native-base';
import {useQuery, gql, useLazyQuery} from './../../utils/apolloClient'
import screens from './../../screens.json';
import { Plus } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import { queryGetComments } from './queries/queryGetComments';
import { Loading } from '../../components/Loading';

type CommentProps = {
    comment : string;
}


export function CommentMarker(){

    const {params} = useRoute()
    const {id} = params?.marker;
    console.log(id)

    const navigation = useNavigation();
    const [getComments, {loading}] = useLazyQuery(queryGetComments, {
        fetchPolicy: 'no-cache',
    });

    const [allComments, setAllComments] = useState<CommentProps[]>([])

    useEffect(() => {
        (async()=>{
            const {data} = await getComments(
                {
                    variables: {
                        markerUid: id,
                    },
                }
            );
    
            const comments = CommentDecoder(data);
            setAllComments(comments)
            console.log(comments)
        })()
    }, [navigation]);

    if(loading){
        return <Loading/>
    }

    return (
        <VStack
            flex={1}
        >
            <FlatList
                data={allComments}
                renderItem={({item}) => (
                    <Box
                        bg={"white"} 
                        rounded="8"
                        shadow={3}
                        borderWidth="1"
                        borderColor="coolGray.300"
                        p={3}
                        m={3}
                        marginBottom={3}
                        >
                        <Center>
                            <Text>{item.comment}</Text>
                        </Center>
                    </Box>

                )}
                ListEmptyComponent={
                    ()=>(
                        <Center>
                        <Text>Ainda n??o existe nenhum coment??rio</Text>
                        </Center>
                        )
                    }
                    
                />
                
            <Fab renderInPortal={false} size="sm" 
                placement='bottom-right'
                onPress={()=>{navigation.navigate(screens.addMarkerComment, {id})}}
                icon={<Plus size={32} weight="fill" color={'white'}/>} />
        </VStack>
    )
}

function CommentDecoder(data:any) : CommentProps[] {

    if (data === undefined) {
        return [];
    }
    
    const {data: comment} = data.raMarkerComments;
    const items = comment.map(
        ({attributes: {comment}}: any) => ({
            comment
        }),
    );
    
    return items;

}