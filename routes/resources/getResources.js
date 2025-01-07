const { resourceRepository } = require("./../../repositories/resource.repo");

module.exports = {
  getResources: {
    url: "/resources",
    method: "GET",
    schema: {
      querystring: {
        type: "object",
        properties: {
          term: { type: "string" },
          page: { type: "number" },
          limit: { type: "number" },
          sort: { type: "string" },
        },
      },
    },
    handler: async (request, reply) => {
      try {
        const {
          term = "",
          page = 1,
          limit = 10,
          sort = "createdAt",
        } = request.query;

        const offset = (page - 1) * limit;

        const list = await resourceRepository.find({
          term,
          limit,
          offset,
          sort,
        });

        return reply.code(200).send(list);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: "Failed to fetch resources" });
      }
    },
  },
};
