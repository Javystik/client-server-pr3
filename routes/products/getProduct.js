const { productRepository } = require("../../repositories/product.repo");

module.exports = {
  getProduct: {
    url: "/products/:id",
    method: "GET",
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
        required: ["id"],
      },
    },
    handler: async (request, reply) => {
      try {
        const targetId = request.params.id;

        const found = await productRepository.read(targetId);

        if (!found) {
          return reply.code(404).send({
            message: "Product not found",
          });
        }

        return reply.code(200).send(found);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: "Failed to fetch product" });
      }
    },
  },
};