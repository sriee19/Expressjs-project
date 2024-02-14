const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, 
    });
    console.log("Database connected:", connect.connection.host, connect.connection.name);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDb;