import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import path from 'path';
import { UserResolver } from './src/resolvers/User-resolver';
import Mongoose from 'mongoose';

const username = 'guruapp'
const password = 't33dCzoyge81zggz'
const MONGODB = `mongodb+srv://${username}:${password}@guru.vo6kvqc.mongodb.net/?retryWrites=true&w=majority`

async function main() {
    Mongoose.connect(MONGODB).then(() => {console.log('connectado')}).catch((err) => console.log(err))
    
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