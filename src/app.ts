import fastify from "fastify";
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";

const server = fastify();

async function main() {
    for (const schema of userSchemas) {
        server.addSchema(schema);
    }
    
    server.register(userRoutes, {prefix: 'api/users'})
     
    server.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
        if (err) throw err
    })
}

main();

server.get('/healthcheck', (request, reply) => {
    reply.send({ hello: 'world' })
  })
  