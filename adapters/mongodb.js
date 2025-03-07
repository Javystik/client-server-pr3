const { MongoClient, ObjectId } = require("mongodb");
const { MONGODB_URI, MONGODB_DB } = require("./../config");

class MongoDBAdapter {
  static instance;

  #client;

  #database;
  constructor() {
    if (MongoDBAdapter.instance) {
      return MongoDBAdapter.instance;
    }

    this.#client = new MongoClient(MONGODB_URI);

    MongoDBAdapter.instance = this;

    return this;
  }

  async connect() {
    try {
      await this.#client.connect();

      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }

  get $db() {
    return this.#client.db(MONGODB_DB);
  }

  async close() {
    await this.#client.close();
  }

  asObjectId(id) {
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      throw new Error("Invalid ID");
    }

    return ObjectId.createFromHexString(id);
  }
}

const mongoDBAdapter = new MongoDBAdapter();
Object.freeze(mongoDBAdapter);

module.exports.mongoDBAdapter = mongoDBAdapter;
