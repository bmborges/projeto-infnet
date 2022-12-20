import { gql } from "@apollo/client";

export const mutationCreateComments = gql`
    mutation CreateRaMarkerComment(
        $comment: String!
        $title: String!
        $markerUid: String
    ) {
        createRaMarkerComment(
            data : {
                comment: $comment
                title: $title
                markerUid: $markerUid
            }
        ) {
            data {
                id
            }
        }
    }
`