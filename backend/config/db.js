import mongoose from "mongoose";

// export default function connectToDB() {
//   mongoose
//     .connect(process.env.MONGODB_URI)
//     .then(() => {
//       console.log("Connected to DB");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

const connectToDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log("DB Connected");
  })
  await mongoose.connect(`${process.env.MONGODB_URI}/ECommerce`)
}

export default connectToDB;
