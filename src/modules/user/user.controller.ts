import { FastifyReply, FastifyRequest } from "fastify";
import { createUser } from "./user.service";
import { CreateUserInput } from "./user.schema";

async function registerUserHandler(request: FastifyRequest<{
    Body: CreateUserInput}>, reply: FastifyReply) {
    const body = request.body;

    try {
        const user = await createUser(body);

        return reply.code(201).send(user);
    } catch (error) {
        reply.code(500).send('Internal server error');
    }
}

export default registerUserHandler