import { Smiley, SmileyMeh, SmileySad } from "phosphor-react-native"

type SmileyStateMarkerProps = {
    stateMarker?:string | '';
}

export function SmileyStateMarker({stateMarker}:SmileyStateMarkerProps){
    
    if(stateMarker == "-1"){
        return (
            <SmileySad size={32} weight="fill" color="red"/>
        )
    }

    if(stateMarker == "0"){
        return (
            <SmileyMeh size={32} weight="fill" color="#facd34" />
        )
    }

    if(stateMarker == "1"){
        return (
            <Smiley size={32} weight="fill"  color="green"/>
        )
    }

    return (
        <></>
    )
}