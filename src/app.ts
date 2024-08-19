import fastify from "fastify";
import userRoutes from "./modules/user/user.route";

const server = fastify();

async function main() {
    server.register(userRoutes, {prefix: 'api/users'})
     
    server.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
        console.log("Ouvindo")
        if (err) throw err
    })
}

main();

server.get('/healthcheck', (request, reply) => {
    reply.send({ hello: 'world' })
  })
  