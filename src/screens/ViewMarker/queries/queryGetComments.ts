import {gql} from './../../../utils/apolloClient';

export const queryGetComments = gql`
  query GetComments {
    raMarkerComments {
        data {
            id
            attributes {
                comment
                markerUid
            }
        }
    }
  }
`;