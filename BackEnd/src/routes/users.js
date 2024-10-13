import { Router } from "express";
import { body } from "express-validator";
import { loginController, registerController } from "../controllers/users.js";
import validateRequestDataMiddleware from "../middlewares/validation.js";

const usersRouter = Router();

usersRouter.post("/register", 
    body("name").exists().isString(),
    body("email").exists().isEmail(),
    body("password").exists().isString(),
    validateRequestDataMiddleware,
    registerController
);

usersRouter.post("/login",
    body("email").exists().isEmail(),
    body("password").exists().isString(),
    validateRequestDataMiddleware,
    loginController
);

export default usersRouter;