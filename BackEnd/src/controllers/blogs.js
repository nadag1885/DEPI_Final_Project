import BlogModel from "../models/blogs.js";

async function createBlogController(req, res) {
    try {
        const blog = await BlogModel.create({ ...req.body, author: req.user._id });
        return res.status(201).json(blog);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function getAllBlogsController(req, res) {
    try {
        const blogs = await BlogModel
            .find()
            .populate("author", "name -_id")
            .exec()
        return res.status(200).json(blogs);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function getBlogByIdController(req, res) {
    try {
        const blog = await BlogModel.findById(req.params.id).populate("author", "name -_id").exec()
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        return res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export { createBlogController, getBlogByIdController, getAllBlogsController };