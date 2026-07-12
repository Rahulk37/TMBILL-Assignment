const Store = require("../models/Store");
const generateStoreId = async () => {
  let storeId = "";
  let exists = true;

  while (exists) {
    storeId = Math.floor(100000 + Math.random() * 900000).toString();

    exists = await Store.exists({
      store_id: storeId,
    });
  }

  return storeId;
};

const createStore = async (storeData: any) => {
  // Check if the frontend store_id already exists
  if (storeData.store_id) {
    const existingStore = await Store.findOne({
      store_id: storeData.store_id,
      deleted: false,
    });

    if (existingStore) {
      throw new Error("Store ID already exists");
    }
  }

  // Generate a new random store_id
  const newStoreId = await generateStoreId();

  const store = await Store.create({
    ...storeData,
    store_id: newStoreId,
  });

  return store;
};

const getStores = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
} = {}) => {
  const filter = {
    deleted: false,
  };

  const skip = (page - 1) * limit;

  const [stores, totalRecords] = await Promise.all([
    Store.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),

    Store.countDocuments(filter),
  ]);

  return {
    stores,
    pagination: {
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page,
      limit,
    },
  };
};

const getStoreById = async (store_id: string) => {
  return await Store.findOne({
    store_id,
    deleted: false,
  });
};

const updateStore = async (store_id: string, storeData: any) => {
  return await Store.findOneAndUpdate(
    {
      store_id,
      deleted: false,
    },
    storeData,
    {
      new: true,
      runValidators: true,
    },
  );
};

const deleteStore = async (store_id: string) => {
  return await Store.findOneAndUpdate(
    {
      store_id,
      deleted: false,
    },
    {
      deleted: true,
    },
    {
      new: true,
    },
  );
};

module.exports = {
  createStore,
  getStores,
  getStoreById,
  updateStore,
  deleteStore,
};

export {};
