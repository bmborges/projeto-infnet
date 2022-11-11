import { Center, Spinner } from "native-base";

export function Loading(){
    return (
        <Center flex={1}>
            <Spinner size={18}/>
        </Center>
    )
}