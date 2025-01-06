const { createProduct } = require("./createProduct");
const { getProduct } = require("./getProduct");
const { getProducts } = require("./getProducts");
const { updateProduct } = require("./updateProduct");
const { deleteProduct } = require("./deleteProduct");

module.exports.productsRouter = async function (fastify, opts) {
  fastify.route(createProduct);
  fastify.route(getProducts);
  fastify.route(getProduct);
  fastify.route(updateProduct);
  fastify.route(deleteProduct);
};
