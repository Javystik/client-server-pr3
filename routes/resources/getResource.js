const { resourceRepository } = require("./../../repositories/resource.repo");

module.exports = {
  getResource: {
    url: "/resources/:id",
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

        const found = await resourceRepository.findByPK(targetId);

        if (!found) {
          return reply.code(404).send({
            message: "Resource not found",
          });
        }

        return reply.code(200).send(found);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: "Failed to fetch resource" });
      }
    },
  },
};
