import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Customers =
  mongoose.models.customers || mongoose.model("Customers", customerSchema);

export default Customers;
