import { createUser, findUserByEmail, findUsers } from "./user.service";
import { CreateUserInput, LoginInput } from "./user.schema";
import { verifyPassword } from "../../utils/hash";
import { FastifyRequest } from "fastify";
import { FastifySerializerCompiler } from "fastify/types/schema";
import { FastifyReply } from "fastify";

async function registerUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (error) {
    reply.code(500).send("deu internal Internal server error");
    console.log(error)
  }
}

export async function loginHandler(
  request: FastifyRequest<{
    Body: LoginInput;
  }>,
  reply: FastifyReply
) {

  const body = request.body;

  const user = await findUserByEmail(body.email);

  if (!user) {
    return reply.code(401).send("Invalid e-mail or password");
  } 

  const correctPassword = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password
  })

  if (correctPassword) {
    const {password, salt, ...rest} = user;
    const jwt = await reply.jwtSign(rest)
    return {accessToken: jwt};
  }

  return reply.code(401).send("Invalid e-mail or password");
}

export async function getUserHandler() {
  const users = await findUsers();

  return users;
}
export default registerUserHandler;
