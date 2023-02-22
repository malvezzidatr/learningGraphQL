import { ApolloServer, gql } from 'apollo-server';
import { randomUUID } from 'node:crypto';

const typeDefs = gql`
    type User {
        id: String
        name: String!
    }

    type Query {
        users: [User!]!
    }

    type Mutation {
        createUsers(name: String): User!
    }
`

interface IUser {
    id: string;
    name: string;
}

const users: IUser[] = [];

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query: {
            users: () => {
                return users;
            }
        },
        Mutation: {
            createUsers: (_, args, ctx) => {
                const user = {
                    id: randomUUID(),
                    name: args.name
                }
                users.push(user);
                return user;
            }
        }
    }
});

server.listen().then(({ url }) => {
    console.log(`HTTP server running on ${url}`);
})