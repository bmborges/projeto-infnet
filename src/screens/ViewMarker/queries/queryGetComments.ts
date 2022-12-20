import {gql} from './../../../utils/apolloClient';

export const queryGetComments = gql`
    query GetComments(
      $markerUid : String!
    ){
      raMarkerComments(filters : {
            markerUid : {eq : $markerUid}
        }
      ){
        data{
          id
          attributes{
            comment
            markerUid
          }
        }
      }
    }
`;