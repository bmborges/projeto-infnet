import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { CommentMarker } from "./CommentMarker";
import { InfoMarker } from "./InfoMarker";

export function ViewMarker(){

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {key: 'info', title: 'Marcação'},
        {key: 'comment', title: 'Comentários'},
    ])


    const InfoRoute = () => (
        <InfoMarker/>
    )
    const CommentRoute = () => (
        <CommentMarker/>
    )
    
    const renderScene = SceneMap(
        {
            info: InfoRoute,
            comment: CommentMarker,
        }
    );



    return (

        <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}
        />

    )
}