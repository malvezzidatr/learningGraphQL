import { FormEvent, useState } from "react"
import { gql, useMutation } from '@apollo/client';
import { GET_USER } from "../App";
import { client } from "../lib/apollo";

const CREATE_USER = gql`
    mutation ($name: String!, $id: String!) {
        createUser(name: $name, id: $id) {
            id
            name
        }
    }
`

export function NewUserForm() {
    const [name, setName] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
    
    async function handleCreateUser(event: FormEvent) {
        event?.preventDefault()
        if(!name) {
            return
        }

        await createUser({
            variables: {
                name,
                id
            },
            refetchQueries: [GET_USER]
            // update: (cache, { data: { createUser } }) => {
            //     const { users } = client.readQuery({ query: GET_USER })

            //     cache.writeQuery({
            //         query: GET_USER,
            //         data: {
            //             users: {
            //                 ...users,
            //                 createUser,
            //             }
            //         },
            //         variables: {
            //             name, 
            //             id
            //         }
                    
            //     })
            // }
        })
    }

    return (
        <form onSubmit={handleCreateUser}>
            <input type='text' value={name} onChange={e => setName(e.target.value)} />
            <input type='text' value={id} onChange={e => setId(e.target.value)} />
            <button type="submit">Enviar</button>
        </form>
    )
}