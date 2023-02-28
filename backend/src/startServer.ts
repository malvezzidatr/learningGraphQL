import { ApolloServer, BaseContext } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { createServer } from 'http';
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import bodyParser from 'body-parser';
import express from 'express'
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws'
import { PubSub } from 'graphql-subscriptions';
import cors from 'cors';
import mongoose from 'mongoose';


const username = 'guruapp'
const password = 't33dCzoyge81zggz'
const MONGODB = `mongodb+srv://${username}:${password}@guru.vo6kvqc.mongodb.net/guru?retryWrites=true&w=majority`

async function startServer({ typeDefs, resolvers }) {
    mongoose.connect(MONGODB);
    const port = 3000;
    const schema = makeExecutableSchema({ typeDefs, resolvers },)
    const app = express();
    const httpServer = createServer(app)
    const pubsub = new PubSub();

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    })
    const serverCleanup = useServer({ schema }, wsServer);
    
    const apolloServer = new ApolloServer<BaseContext>({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose()
                        }
                    }
                }
            },

        ]
    });


    await apolloServer.start();
    app.use('/graphql', bodyParser.json(), cors({ origin: '*'}), expressMiddleware(apolloServer))
    app.listen(port, () => {
        console.log(`🚀 Query endpoint ready at http://localhost:${port}/graphql`);
        console.log(`🚀 Subscription endpoint ready at ws://localhost:${port}/graphql`);
    })
}

export default startServer;