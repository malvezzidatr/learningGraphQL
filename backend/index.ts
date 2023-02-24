import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import path from 'path';
import { UserResolver } from './src/resolvers/User-resolver';

async function main() {
    const schema = await buildSchema({
        resolvers: [
            UserResolver,
        ],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    })

    const server = new ApolloServer({
        schema,
    })

    const { url } = await server.listen()
    console.log(url)
}

main();