import { Router } from "express";
import { body, param } from "express-validator";
import { createBlogController, getAllBlogsController, getBlogByIdController } from "../controllers/blogs.js";
import validateRequestDataMiddleware from "../middlewares/validation.js";
import tokenVerifierMiddleware from "../middlewares/tokenVerifier.js";

const blogsRouter = Router();

blogsRouter.get("/", tokenVerifierMiddleware, getAllBlogsController);

blogsRouter.get("/:id", 
    param("id").isMongoId().withMessage("Invalid blog id"),
    tokenVerifierMiddleware,
    validateRequestDataMiddleware,
    getBlogByIdController
);

blogsRouter.post("/", 
    body("title").exists().isString(),
    body("content").exists().isString(),
    body("categories").exists().isArray(),
    body("imageURL").exists().isString(),
    tokenVerifierMiddleware,
    validateRequestDataMiddleware,
    createBlogController
)

export default blogsRouter;