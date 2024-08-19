import { FastifyInstance } from "fastify";
import registerUserHandler from "./user.controller";

async function userRoutes(server: FastifyInstance) {
    server.post('/', registerUserHandler);
    server.get('/a', async (request, reply) => {
        return { hello: 'world' };
    });

}

export default userRoutes;