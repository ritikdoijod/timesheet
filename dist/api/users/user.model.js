import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tasks" }],
    roles: { type: String, enum: ["admin", "user"] },
});
userSchema.methods.toJSON = function () {
    const obj = this.toObject(); // or const obj = this;
    delete obj.password;
    return obj;
};
const Users = mongoose.models.Users || mongoose.model("Users", userSchema);
export default Users;
