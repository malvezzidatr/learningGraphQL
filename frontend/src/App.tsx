import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react/hooks"
import { useEffect } from "react";
import { NewUserForm } from "./components/NewUserForm";

type User = {
  id: string;
  name: string;
}

export const GET_USER = gql`
  query {
    users {
      id
      name
    }
  }
`

function App() {

  const { data, loading } = useQuery<{users: User[]}>(GET_USER)

  if(loading) {
    return <p>Carregando</p>
  }

  return (
    <div className="App">
      <NewUserForm />
      <ul>
        {data?.users.map(user => <li>{user.name}</li>)}
      </ul>
    </div>
  )
}

export default App
