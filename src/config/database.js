const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://radharani8824_db_user:OX7GQmCgP59P8i76@namastenode.ltsm217.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };
