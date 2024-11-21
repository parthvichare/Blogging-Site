const mongoose = require('mongoose');

const connectDB = async () => {
  const Connectstring = 'mongodb+srv://parthvichare9:parth%4012%2C@cluster0.b3dqx.mongodb.net/blogCollections?retryWrites=true&w=majority';
  
  try {
    await mongoose.connect(Connectstring, {
      useNewUrlParser: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectDB;




// // //Connect MongoDb to Server
// mongoose.connect("mongodb://127.0.0.1:27017/blogCollections")
//     .then(async () => {
//         console.log("MongoDB successfully connected with server:8000");
//     })
//     .catch((err) => console.log("Error is", err));



// // //Connect MongoDb to Server
// const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/blogCollections';
// mongoose.connect(mongoURI, { useNewUrlParser: true });
