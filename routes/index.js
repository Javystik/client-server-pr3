const { echoRoute } = require("./echo");
const { resourcesRouter } = require("./resources");
const { recipesRouter } = require("./recipes");

module.exports.patchRouting = (fastify) => {
  fastify.setNotFoundHandler((request, reply) => {
    reply.status(404).send({ error: "Not Found" });
  });

  fastify.setErrorHandler((error, request, reply) => {
    fastify.log.error(error);

    if (error.validation) {
      return reply
        .status(error.statusCode || 400)
        .send({ error: "Invalid request", message: error.message });
    }

    reply.status(500).send({ error: "Internal Server Error" });
  });

  fastify.register(echoRoute);
  fastify.register(recipesRouter);
  fastify.register(resourcesRouter);
};
