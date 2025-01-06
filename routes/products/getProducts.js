const { productRepository } = require("./../../repositories/product.repo");

module.exports = {
  getProducts: {
    url: "/products",
    method: "GET",
    handler: async (request, reply) => {
      try {
        const list = await productRepository.read();

        return reply.code(200).send(list);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: "Failed to fetch products" });
      }
    },
  },
};
