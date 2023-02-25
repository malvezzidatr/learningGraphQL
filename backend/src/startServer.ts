import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';

const username = 'guruapp'
const password = 't33dCzoyge81zggz'
const MONGODB = `mongodb+srv://${username}:${password}@guru.vo6kvqc.mongodb.net/?retryWrites=true&w=majority`

function startServer({ typeDefs, resolvers }) {
    mongoose.connect(MONGODB)

    const server = new ApolloServer({ typeDefs, resolvers});
    server.listen().then(({ url }) => console.log(`🐱‍🏍 server started at ${url} 🐱‍🏍`))
}

export default startServer;