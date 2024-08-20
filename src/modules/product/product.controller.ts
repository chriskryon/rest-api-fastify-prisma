import { FastifyReply, FastifyRequest } from "fastify";
import { createProduct, getProducts } from "./product.service";
import { CreateProductInput } from "./product.schema";

export async function createProductHandler(request: FastifyRequest<{
    Body: CreateProductInput;
}>, reply: FastifyReply) {
    const ownerId = request.user.id;
    const product = await createProduct ({ ...request.body, ownerId });
    reply.send(product);
}

export async function getProductsHandler() {
    const products = await getProducts();
    
    return products;
}