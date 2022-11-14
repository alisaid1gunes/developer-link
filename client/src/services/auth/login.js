import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation login($data: loginInput!) {
    login(data: $data) {
      id
    }
  }
`;
export default LOGIN;
