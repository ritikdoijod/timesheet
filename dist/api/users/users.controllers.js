import Users from "./user.model.js";
import { ObjectId } from "mongodb";
import { hash } from "argon2";
const createUser = async (req, res) => {
    try {
        const userExists = await Users.findOne({ username: req.body.username });
        if (userExists)
            return res.status(422).json({ message: "username should be unique" });
        if (req.body.password !== req.body.confirmPassword)
            return res
                .status(422)
                .json({ message: "password and confirm password should match" });
        delete req.body.confirmPassword;
        req.body.password = await hash(req.body.password);
        const user = await Users.create(req.body);
        return res.status(201).json(user);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};
const getUserById = async (req, res) => {
    try {
        const user = await Users.findOne({ _id: new ObjectId(req.params.id) }, { projection: { password: 0 } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
const updateUser = async (req, res) => {
    try {
        if (req.body.username) {
            const userExists = await Users.findOne({ username: req.body.username });
            if (userExists && !userExists._id.equals(req.params.id))
                return res.status(400).json({ message: "username should be unique" });
        }
        const user = await Users.findOneAndUpdate({ _id: new ObjectId(req.params.id) }, { $set: req.body }, { returnDocument: "after", projection: { password: 0 } });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
const deleteUser = (req, res) => {
    try {
        const user = Users.findOneAndDelete({ _id: new ObjectId(req.params.id) });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        return res.status(204).end();
    }
    catch (error) { }
};
export { createUser, getUserById, updateUser, deleteUser };
