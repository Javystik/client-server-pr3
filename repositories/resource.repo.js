const {
  postgresAdapter: { $prisma },
} = require("./../adapters/postgres");

class ResourceRepository {
  #prisma;

  constructor() {
    this.#prisma = $prisma;
  }

  async create(data) {
    return await this.#prisma.resource.create({
      data,
    });
  }

  async findByPK(id) {
    const resource = await this.#prisma.resource.findUnique({
      where: { id },
    });

    if (!resource) {
      throw new Error("Resource not found");
    }

    return resource;
  }

  async find({ term, limit, offset, sort }) {
    const resources = await this.#prisma.resource.findMany({
      where: term ? { name: { contains: term } } : {},
      skip: offset,
      take: limit,
      orderBy: { [sort]: "desc" },
    });

    return resources;
  }

  async update(id, data) {
    return await this.#prisma.resource.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await this.#prisma.resource.delete({
      where: { id },
    });
  }
}

module.exports.resourceRepository = new ResourceRepository();