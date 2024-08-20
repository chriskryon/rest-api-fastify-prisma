import fastify, { FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
import fjwp from '@fastify/jwt'
import { productSchemas } from "./modules/product/product.schema";
import ProductRoutes from "./modules/product/product.route";

const server = fastify();

declare module "fastify" {
    export interface FastifyInstance {
        authenticate: any;
    }
}

declare module "@fastify/jwt" {
    interface FastifyJWT {
        user: {
            id: number,
            email: string,
            name: string,
        }
    }
}


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
    for (const schema of [...userSchemas, ...productSchemas]) {
        server.addSchema(schema);
    }
    
    server.register(userRoutes, {prefix: 'api/users'})
    server.register(ProductRoutes, {prefix: 'api/products'})
     
    server.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
        if (err) throw err
    })
}

main();

server.get('/healthcheck', (request, reply) => {
    reply.send({ hello: 'world' })
  })
  