const {
  mongoDBAdapter: { $db, asObjectId },
} = require("./../adapters/mongodb");

class ReceiptRepository {

  #db;

  #collection;

  constructor() {
    this.#db = $db;
    this.#collection = $db.collection("receipts");
  }

  async create(data) {
    const { items } = data;

    const newReceipt = {
      items,
      createdAt: new Date(),
    };

    const result = await this.#collection.insertOne(newReceipt);

    return result.insertedId;
  }

  async findById(id) {
    const receipt = await this.#collection.findOne({ _id: asObjectId(id) });

    if (!receipt) {
      throw new Error("Receipt not found");
    }

    return receipt;
  }
}

module.exports.receiptRepository = new ReceiptRepository();
