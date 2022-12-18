import { gql } from "@apollo/client";

export const mutationCreateComments = gql`
    mutation CreateComment(
        $comment: String!
        $markerUid: String
    ) {
        createComment(
            data : {
                comment: $comment
                markerUid: $markerUid
            }
        ) {
            data {
                id
            }
        }
    }
`