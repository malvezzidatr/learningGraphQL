import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react/hooks"
import { useEffect, useState } from "react";
import { NewUserForm } from "./components/NewUserForm";

type User = {
  _id: string;
  firstName: string
  lastName: string
  fullName: string
  email: string 
  active: boolean
}

export const GET_USER = gql`
  query {
    users {
      firstName
    }
  }
`

function App() {

  const { data, loading } = useQuery<{users: User[]}>(GET_USER, {
    context: {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        
      }
    }
    })

  if(loading) {
    return <p>Carregando</p>
  }

  return (
    <div className="App">
      <NewUserForm />
      <ul>
        {data?.users.map((user, index) => <li key={index}>{user.firstName}</li>)}
      </ul>
    </div>
  )
}

export default App
