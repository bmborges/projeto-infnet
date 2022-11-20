import { useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import { Text, VStack } from "native-base";

type ItemAccessibilityTypeProps = {
    id: string;
    description: string;
    title: string;
    showDescription?: boolean | true;
}

export function ItemAccessibilityType({id, showDescription}:ItemAccessibilityTypeProps){

    const [ accessibilityType, setAccessibilityType] = useState({} as ItemAccessibilityTypeProps);

    useEffect(()=>{

        (async()=>{
            let query = firestore()
            .collection("accessibilityType")
            .where(firestore.FieldPath.documentId(),"==",id)
            
            const getAccessibilityType = await query.get();

            getAccessibilityType.docs.forEach(doc=>{
                
                setAccessibilityType({
                    id: doc.id,
                    ...doc.data()
                } as ItemAccessibilityTypeProps);
            })
            
        })()

    },[])

    return (
        <VStack
            p={2}
        >
            <Text fontWeight={"bold"}>{accessibilityType?.title}</Text>
            {showDescription ? (
                <Text textAlign={"justify"}>{accessibilityType?.description}</Text>
            ) : (<></>)}
        </VStack>
    )
}