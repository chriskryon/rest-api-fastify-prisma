import fastify, { FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
// import fjwp from 'fastify-jwt';
import fjwp from '@fastify/jwt'

const server = fastify();

server.register(fjwp, {
    secret: 'supersecret'
    }
);

server.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify();
    } catch (err) {
        return reply.code(401).send({ message: 'Unauthorized' });
    }
})

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
  