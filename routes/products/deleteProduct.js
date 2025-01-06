const { productRepository } = require("./../../repositories/product.repo");

module.exports = {
  deleteProduct: {
    url: "/products/:id",
    method: "DELETE",
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

        const deleted = await productRepository.delete(targetId);

        return reply.code(200).send(deleted);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: "Failed to delete product" });
      }
    },
  },
};