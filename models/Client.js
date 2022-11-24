const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phone: String,
  },
  { timestamps: true }
);

clientSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
