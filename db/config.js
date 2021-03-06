const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log("DB online");
  } catch (error) {
    console.log(error);
    throw new Error("DB connection");
  }
};

module.exports = { dbConnection };
