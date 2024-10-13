import bcrypt from "bcrypt";
import UserModel from "../models/users.js";
import { createJWT } from "../utils/jwt.js";

async function loginController(req, res){
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const hashCheckResult = await bcrypt.compare(req.body.password, user.password)
        if (!hashCheckResult) {
            return res.status(401).json({ message: "Invalid password" });
        }

        return res.status(200).json({ token: createJWT({ userId: user._id }), type: "Bearer" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function registerController(req, res){
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashedPassword;

        const user = await UserModel.create(req.body);

        return res.status(201).json({ token: createJWT({ userId: user._id }), type: "Bearer" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Email already exists" });
        }
        return res.status(500).json({ error: error.message });
    }

}

export { loginController, registerController };