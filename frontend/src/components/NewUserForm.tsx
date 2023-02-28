import { FormEvent, useState } from "react"
import { gql, useMutation } from '@apollo/client';
import { GET_USER } from "../App";

const CREATE_USER = gql`
    mutation ($firstName: String!, $lastName: String!, $email: String!, $active: Boolean!) {
        createUser(firstName: $firstName, lastName: $lastName, email: $email, active: $active) {
            firstName
            lastName
        }
    }
`

export function NewUserForm() {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [active, setActive] = useState<boolean>(false);
    const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
    
    async function handleCreateUser(event: FormEvent) {
        event?.preventDefault()
        if(!firstName) {
            return
        }

        await createUser({
            variables: {
                data: {
                    firstName,
                    lastName,
                    email,
                    active
                }
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
            <input type='text' value={firstName} onChange={e => setFirstName(e.target.value)} />
            <input type='text' value={lastName} onChange={e => setLastName(e.target.value)} />
            <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
            <input type='checkbox' onChange={e => setActive(e.target.checked)} />
            {console.log(active)}
            <button type="submit">Enviar</button>
        </form>
    )
}