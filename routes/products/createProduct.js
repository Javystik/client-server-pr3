const { productRepository } = require("../../repositories/product.repo");

module.exports = {
  createProduct: {
    url: "/products",
    method: "POST",
    bodyLimit: 1024,
    schema: {
      body: {
        type: "object",
        required: ["name", "type", "price", "amount"],
        properties: {
          name: { type: "string" },
          type: { type: "string" },
          price: { type: "number" },
          amount: { type: "number" },
        },
      },
    },
    handler: async (request, reply) => {
      try {
        const { name, type, amount = 0, price = 0 } = request.body;

        const product = await productRepository.create({
          name,
          type,
          amount,
          price,
        });

        return reply.code(201).send(product);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: "Failed to create product" });
      }
    },
  },
};
